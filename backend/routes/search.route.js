import express from "express";
import {
  deleteItemFromSearchHistory,
  getSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson); //search for a person
router.get("/movie/:query", searchMovie); //search for a movie
router.get("/tv/:query", searchTv); //search for a tv show
router.get("/history", getSearchHistory); //get search history of everything (person, movie, tv) done by the user
router.delete("/history/:id", deleteItemFromSearchHistory); //delete search history

export default router;
