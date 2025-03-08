const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
  SENDOTP_API: `${BASE_URL}auth/sendotp`,
  SIGNUP_API: `${BASE_URL}auth/signup`,
  LOGIN_API: `${BASE_URL}auth/login`,
  RESETPASSTOKEN_API: `${BASE_URL}auth/resettoken`,
  RESETPASSWORD_API: `${BASE_URL}auth/resetpassword`,
};
