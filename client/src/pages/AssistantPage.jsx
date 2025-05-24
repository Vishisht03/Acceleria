import { useState } from "react";

function AssistantPage() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { role: "user", content: userInput },
    ];
    setChatHistory(newChatHistory);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userInput }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const assistantResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      // Add assistant's response to the chat history
      setChatHistory([
        ...newChatHistory,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error while calling Gemini API", error);
      setChatHistory([
        ...newChatHistory,
        { role: "assistant", content: "Error contacting Gemini API" },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Ask your questions to clear doubts
      </h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Chat History */}
        <div className="space-y-4 max-h-96 overflow-y-auto p-2">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 rounded-lg max-w-xl ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <strong>{message.role === "user" ? "You" : "Assistant"}:</strong>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex flex-col items-center">
          <textarea
            className="w-full p-3 mb-4 border-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            rows="4"
            value={userInput}
            onChange={handleUserInputChange}
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg disabled:bg-gray-400"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssistantPage;
