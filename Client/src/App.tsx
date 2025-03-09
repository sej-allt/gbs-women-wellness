import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/DashboardHealth";
import LoginForm from "./components/LoginForm";
import GoogleFitLogin from "./components/pages/GoogleFitLogin";
import LandingPage from "./components/pages/LandingPage";
import Quiz from "./components/Quiz";
import SignupForm from "./components/SignupForm";
import { RootState } from "./types/store"; // Import RootState type

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
            path="/landing"
            element={!logged_in ? <LandingPage /> : <Navigate to="/dash" />}
          />
          <Route
            path="/signup"
            element={!logged_in ? <SignupForm /> : <Navigate to="/dash" />}
          />
          <Route
            path="/dash"
            element={logged_in ? <Dashboard /> : <Navigate to="/landing" />}
          />
          <Route path="/gg" element={<GoogleFitLogin />} />
          <Route
            path="/"
            element={<Navigate to={logged_in ? "/dash" : "/landing"} />}
          />
          <Route
            path="/tell-us-more"
            element={logged_in ? <Quiz/> : <Navigate to="/landing" />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
//check 2