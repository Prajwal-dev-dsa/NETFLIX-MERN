import express from "express";
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovies,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovies); //trending movie route
router.get("/:id/trailers", getMovieTrailers); //trailer route
router.get("/:id/details", getMovieDetails); //movie details route
router.get("/:id/similar", getSimilarMovies); //similar movies route
router.get("/:category", getMoviesByCategory); //movies by category route

export default router;
