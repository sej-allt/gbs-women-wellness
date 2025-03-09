const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
console.log(BASE_URL);
export const endpoints = {
    LOGIN_API: BASE_URL + "auth/login",
    SIGNUP_API : BASE_URL + "auth/signup",
    SEND_OTP : BASE_URL + "auth/sendotp",

    GET_TRACK_WATER : BASE_URL + "fit/getTrackWater",
    TRACK_WATER : BASE_URL + "fit/trackWater",

    GETSLEEPSCHEDULE : BASE_URL + "fit/getSchedule",
    MARK_SLEEP : BASE_URL + "fit/markslept",
    SET_SLEEP_TIME : BASE_URL + "fit/setsleepgoal",
    GET_SLEEP_DATA : BASE_URL + "fit/getsleepdata",
    TRACK_MENSTRUAL_CYCLE : BASE_URL + "fit/trackmens",
    GET_MENSTRUAL_CYCLE : BASE_URL + "fit/getmens",
    ADD_VIDEO : BASE_URL + "auth/addvideo",
    GET_ALL_VIDEOS: BASE_URL + "auth/getvideos",
     MARK_VIDEO_COMPLETED :BASE_URL + "auth/markcomplete",
     SET_GOAL : BASE_URL + "auth/setgoal"
}