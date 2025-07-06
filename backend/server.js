import express from "express";
import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //this is used to parse the body of the request

app.use("/api/v1/auth", authRoutes); //authentication route

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
