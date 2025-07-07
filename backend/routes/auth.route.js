import express from "express";
import {
  login,
  logout,
  signup,
  authCheck,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup); //signup route
router.post("/login", login); //login route
router.post("/logout", logout); //logout route
router.get("/authCheck", protectedRoute, authCheck); //authCheck route will check if the user is authenticated or not

export default router;
