import toast from "react-hot-toast";
import { setloggedin } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { LOGIN_API , SEND_OTP, SIGNUP_API, SET_GOAL} = endpoints;

export function login(
  email: string,
  password: string,
  navigate: (path: string) => void
) {
  return async (dispatch: (action: any) => void) => {
    const toast_id = toast.loading("Loading...");
    console.log("hello");
    console.log(email, password);
    console.log(LOGIN_API);

    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });

      console.log(response);
      if (!response.data?.success) {
        toast.error(response.data.message || "Login failed");
        toast.dismiss(toast_id);
        throw new Error(response.data.message);
      }

      toast.success("Login Successful!");
      console.log(response.data.user);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch( setloggedin(true))
      navigate("/dash");
    } catch (error: any) {

      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
    navigate('/login')
    toast.dismiss(toast_id);
  };
}

  export function sendotp(email: string, navigate: (path: string) => void) {
    return async (dispatch: (action: any) => void) => {
      const toastId = toast.loading("Loading...");
  
      try {
        const response = await apiConnector("POST", SEND_OTP, {
          email,
        });
  
        console.log("send otp response ......", response);
        console.log(response.data?.success);
  
        if (!response.data?.success) {
          throw new Error(response.data?.message || "OTP sending failed");
        }
  
        toast.success("OTP sent successfully");
        // navigate("/verifyemail");
      } catch (error: any) {
        console.error("Error in sendotp:", error);
        toast.error(error.response?.data?.message || "Could not send OTP");
      } finally {
        toast.dismiss(toastId);
      }
    };
}


  export function signup(
    name: string,
    email: string,
    password: string,
    confirm: string,
    otp: string,
    navigate: (path: string) => void
  ) {
    return async (dispatch: (action: any) => void) => {
      const toastId = toast.loading("Loading...");
      
      try {
        console.log("SIGNUP API:", SIGNUP_API);
        console.log("OTP:", otp);
  
        const response = await apiConnector("POST", SIGNUP_API, {
          name,
          email,
          password,
          confirm,
          otp,
        });
  
        console.log("SIGNUP API RESPONSE:", response);
  
        if (!response.data?.success) {
          console.error("Signup failed:", response.data?.message);
          throw new Error(response.data?.message || "Signup failed");
        }
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(setloggedin(true));
        toast.success("Signup Successful");
        navigate("/tell-us-more");
      } catch (error: any) {
        console.error("Error in signup:", error);
        toast.error(error.response?.data?.message || "Signup Failed");
        // navigate("/signup");
      } finally {
        toast.dismiss(toastId);
      }
    };
  }


export function determineGoal(user: {}, result: string[]) {
  return async (dispatch: (action: any) => void) => {
    try {
      console.log(user , result)
      const response = await apiConnector("POST", SET_GOAL, { user, answers:result });

      console.log("determineGoal response:", response);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to determine goal");
      }

      return response; // Returning data if needed in the calling component
    } catch (error: any) {
      console.error("Error in determineGoal:", error);
      toast.error(error.response?.data?.message || "Could not determine goal");
    }
  };
}
