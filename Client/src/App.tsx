// src/App.tsx
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import GoogleFitLogin from "./components/pages/GoogleFitLogin";

const App =  () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const CLIENT_ID = "109171068082-8afa8tbvj5jboj5u3qtceeu2gals5n2p.apps.googleusercontent.com"

  return (
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!currentUser ? <LoginForm /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!currentUser ? <SignupForm /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/gg" element={<GoogleFitLogin/>} />
          <Route
            path="/"
            element={<Navigate to={currentUser ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </Router>
    </div>
  </GoogleOAuthProvider>
);

};

export default App;
