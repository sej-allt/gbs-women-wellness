import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage"; // Landing page component
import LoginForm from "./components/LoginForm"; // Login form component
import SignupForm from "./components/SignupForm"; // Signup form component
import Dashboard from "./components/Dashboard"; // Dashboard component

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route
          path="/"
          element={<Navigate to={currentUser ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
