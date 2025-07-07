import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: "false", message: "All fields are required" });
    }

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: "false", message: "Invalid email address" });
    }

    //password validation
    if (password.length < 3) {
      return res.status(400).json({
        success: "false",
        message: "Password must be at least 3 characters long",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: "false", message: "User already exists" });
    }

    //check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: "false", message: "Email already exists" });
    }

    //add image to user
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const randomIndex = Math.floor(Math.random() * PROFILE_PICS.length);
    const image = PROFILE_PICS[randomIndex];

    //hash password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user in database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      image,
    });

    //time to generate token and send it to the client
    generateTokenAndSetCookie(user._id, res);
    await user.save();

    //remove password from response and send the user data to the client
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Error creating user",
      error: error.message,
    });
    console.log("Error in signup controller ", error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: "false", message: "All fields are required" });
    }

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: "false", message: "Invalid email address" });
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "User not found" });
    }

    //password validation
    if (password.length < 3) {
      return res.status(400).json({
        success: "false",
        message: "Password must be at least 3 characters long",
      });
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: "false", message: "Invalid password" });
    }

    //generate token and send it to the client
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      //removed password from response and send the user data to the client
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (err) {
    res.status(500).json({
      success: "false",
      message: "Error logging in",
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    //clearing the cookie
    res.clearCookie("jwt-netflix");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: "false",
      message: "Error logging out",
      error: err.message,
    });
  }
};

export const authCheck = async (req, res) => {
  //req.user will be available because of the protectedRoute middleware and this function will be called only if the user is authenticated which will be checked by the protectedRoute middleware
  try {
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: req.user, //sending the logged in user's data to the frontend
    });
  } catch (err) {
    res.status(500).json({
      success: "false",
      message: "Error checking authentication",
      error: err.message,
    });
  }
};
