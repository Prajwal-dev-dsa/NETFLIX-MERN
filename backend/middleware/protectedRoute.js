import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"]; //this is the name of the cookie that we set in the frontend
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET); //this is the secret key that we set in the env file and we use it here to verify the token
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password"); //this is the user that we found in the database and we select the password field to not send it to the frontend
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User not found" });
    }
    req.user = user; //this is the user that we found in the database and we send it to the next middleware, by pushing the data of user to req.user we can use it anywhere we want!
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
