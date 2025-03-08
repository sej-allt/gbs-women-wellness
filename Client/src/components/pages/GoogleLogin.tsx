import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React from "react";

const GoogleAuth: React.FC = () => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    fetch("http://localhost:3000/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Backend Response:", data))
      .catch((err) => console.error("Error sending token:", err));
  };

  const handleFailure = () => {
    console.log("Google Login Failed");
  };
  console.log("in it")

  return (
    
      <div className="flex justify-center items-center h-screen">
        hello
      
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
  );
};

export default GoogleAuth;
