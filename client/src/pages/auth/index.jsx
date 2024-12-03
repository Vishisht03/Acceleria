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

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-600 animate-gradient-move"></div>

      {/* Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center z-20 relative">
        <Link
          to={"/"}
          className="flex items-center justify-center hover:opacity-90 transition-opacity duration-300"
        >
          <GraduationCap className="h-8 w-8 mr-4 text-white animate-pulse" />
          <span className="font-extrabold text-xl text-white hover:text-indigo-200 transition-colors duration-300">
            ACCELERIA
          </span>
        </Link>
      </header>

      {/* Authentication Section */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1 rounded-xl backdrop-blur">
            <TabsTrigger
              value="signin"
              className="transition-all duration-300 hover:scale-105 focus:ring focus:ring-indigo-300"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="transition-all duration-300 hover:scale-105 focus:ring focus:ring-indigo-300"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            {activeTab === "signin" && (
              <Card className="p-6 space-y-4 bg-white/80 backdrop-blur-lg animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-indigo-600">
                    Sign In To Your Account
                  </CardTitle>
                  <CardDescription>
                    Enter your email and password to sign in to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signInFormControls}
                    buttonText={"Sign In"}
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
              <Card className="p-6 space-y-4 bg-white/80 backdrop-blur-lg animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-indigo-600">
                    Create a New Account
                  </CardTitle>
                  <CardDescription>
                    Enter your details to get started.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signUpFormControls}
                    buttonText={"Sign Up"}
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
