// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";

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
