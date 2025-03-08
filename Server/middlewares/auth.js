import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
//auths
export const auth = async (request, response, next) => {
  try {
    console.log(hello);
    //exttract token from the body or cookie
    const token = request.cookies.token;
    if (!token) {
      return response.status(500).json({
        success: false,
        message: "Access denied. user not logged in",
      });
    }
    //verify token
    try {
      //if its a valid token
      console.log(token);
      console.log(process.env.JWT_SECRET);
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      // const decode = jwt.decode(token);
      //deconstruct krke daal diya.
      request.user = decode;

      console.log("its is ", request.user);
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: "Access denied. invalid token ",
        data: error.message,
        error,
      });
    }
    next();
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "error occured while authorising",
    });
  }
};
