import express from "express";

import authRoutes from "./routes/auth.route.js";
import { protectedRoute } from "./middleware/protectedRoute.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //this is used to parse the body of the request
app.use(cookieParser()); //this is used to parse the cookies of the request

app.use("/api/v1/auth", authRoutes); //authentication route
app.use("/api/v1/movie", protectedRoute, movieRoutes); //movie route
app.use("/api/v1/tv", protectedRoute, tvRoutes); //tv route

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
