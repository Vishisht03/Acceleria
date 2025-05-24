import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useState } from "react";

import CommonForm from "@/components/common-form";
import { signInFormControls, signUpFormControls } from "@/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }
  console.log(signUpFormData);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 animate-gradient-move"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <header className="px-6 lg:px-10 h-16 flex items-center z-20 relative">
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity duration-300">
          <GraduationCap className="h-10 w-10 mr-4 text-white animate-bounce" />
          <span className="font-extrabold text-2xl text-white hover:text-indigo-200 transition-colors duration-300">
            ACCELERIA
          </span>
        </Link>
      </header>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md bg-white/80 rounded-2xl p-6 shadow-2xl backdrop-blur-lg border border-white/20"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-indigo-400 to-purple-500 p-1 rounded-xl shadow-md">
            <TabsTrigger
              value="signin"
              className="transition-all duration-300 hover:scale-105 text-white font-semibold"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="transition-all duration-300 hover:scale-105 text-white font-semibold"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            {activeTab === "signin" && (
              <Card className="p-6 space-y-4 bg-white/90 rounded-xl shadow-lg animate-fade-in-up border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-indigo-600 text-lg font-bold">Sign In To Your Account</CardTitle>
                  <CardDescription className="text-gray-600">Enter your email and password to sign in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CommonForm
                    formControls={signInFormControls}
                    buttonText="Sign In"
                    formData={signInFormData}
                    setFormData={setSignInFormData}
                    isButtonDisabled={!checkIfSignInFormIsValid()}
                    handleSubmit={handleLoginUser}
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="signup">
            {activeTab === "signup" && (
              <Card className="p-6 space-y-4 bg-white/90 rounded-xl shadow-lg animate-fade-in-up border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-indigo-600 text-lg font-bold">Create a New Account</CardTitle>
                  <CardDescription className="text-gray-600">Enter your details to get started.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CommonForm
                    formControls={signUpFormControls}
                    buttonText="Sign Up"
                    formData={signUpFormData}
                    setFormData={setSignUpFormData}
                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                    handleSubmit={handleRegisterUser}
                  />
                  
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
