import express from "express";
import {
  getTrendingTV,
  getTVTrailers,
  getTVDetails,
  getSimilarTV,
  getTVByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV); //trending tv route
router.get("/:id/trailers", getTVTrailers); //trailer route
router.get("/:id/details", getTVDetails); //tv details route
router.get("/:id/similar", getSimilarTV); //similar tv route
router.get("/:category", getTVByCategory); //tv by category route

export default router;
