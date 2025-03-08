import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

const GoogleFitLogin = () => {
  const [steps, setSteps] = useState(null);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/fitness.activity.read",
    onSuccess: async (tokenResponse) => {
      console.log("Google Token:", tokenResponse.access_token);
      
      const { data } = await axios.post("http://localhost:4000/api/v1/fit/steps", {
        token: tokenResponse.access_token,
      });

      setSteps(data.steps);
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <div>
      <button onClick={() => login()}>Connect Google Fit</button>
      {steps && <p>Today's Steps: {steps}</p>}
    </div>
  );
};

export default GoogleFitLogin;
