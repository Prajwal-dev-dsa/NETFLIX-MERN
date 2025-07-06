import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("Connected to MongoDB " + connection.connection.host);
  } catch (error) {
    console.log("error connecting to MongoDB " + error.message);
    process.exit(1); //1 means there was an error, 0 means success!
  }
};
