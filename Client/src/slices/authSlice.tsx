import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}") // Ensuring a valid JSON string
      : null, // Use null instead of an empty string if there's no user data
    logged_in : localStorage.getItem("user")?true:false
    };


  

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setUser(state, value){
            state.user = value.payload;
        },
        setloggedin(state, value){
            state.logged_in = value.payload
        }
    }
});

export const {  setUser, setloggedin } =
  authSlice.actions;
export default authSlice.reducer;