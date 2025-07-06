import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  //we are using userId as payload to generate token, this will be used to check if this user is present in the database or not
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "30d" });
  res.cookie("jwt-netflix", token, {
    httpOnly: true, //this is to prevent the token from being accessed by the browser & xss attacks
    secure: ENV_VARS.NODE_ENV !== "development", //remain false in development mode
    maxAge: 30 * 24 * 60 * 60 * 1000, //this is to set the expiration time of the token
    sameSite: "strict", //crsf attacks cross site request forgery attacks
  });
  return token;
};
