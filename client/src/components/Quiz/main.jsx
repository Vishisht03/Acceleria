import { setUserId } from '@/redux/result-reducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Main() {
  const inputRef = useRef(null);

  // Optional startQuiz handler
  const dispatch = useDispatch();
  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Take a Quiz</h1>

        <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
          <li>You will be asked 10 questions one after another.</li>
          <li>10 points is awarded for the correct answer.</li>
          <li>Each question has three options. You can choose only one option.</li>
          <li>You can review and change answers before the quiz finishes.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form" className="mb-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="Username*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </form>

        <div className="flex justify-center">
          <Link
            to="/quiz"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200"
            onClick={startQuiz}
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
