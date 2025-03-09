import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/DashboardHealth";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import GoogleFitLogin from "./components/pages/GoogleFitLogin";
import { RootState } from "./store"; // Import RootState type

const App: React.FC = () => {
  const logged_in = useSelector((state: RootState) => state.auth.logged_in);

  const CLIENT_ID = "109171068082-8afa8tbvj5jboj5u3qtceeu2gals5n2p.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!logged_in ? <LoginForm /> : <Navigate to="/dash" />}
          />
          <Route
            path="/signup"
            element={!logged_in ? <SignupForm /> : <Navigate to="/dash" />}
          />
          <Route
            path="/dash"
            element={logged_in ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/gg" element={<GoogleFitLogin />} />
          <Route
            path="/"
            element={<Navigate to={logged_in ? "/dash" : "/login"} />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
