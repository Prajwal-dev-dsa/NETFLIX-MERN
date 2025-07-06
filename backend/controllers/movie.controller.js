import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovies = async (req, res) => {
  try {
    //fetching the trending movies from the TMDB API
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day" //this is the url of the trending movies
    );
    //selecting a random movie from the multiple trending movies which we got in the data variable
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: randomMovie }); //sending the random movie to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params; //getting the id of the movie from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos` //this is the url of the trailer of the movie
    );
    res.json({ success: true, trailers: data.results }); //sending the trailers to the client
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null); //if the movie is not found, send a 404 error
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params; //getting the id of the movie from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}` //this is the url of the details of the movie
    );
    res.json({ success: true, details: data }); //sending the details to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params; //getting the id of the movie from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar` //this is the url of the similar movies
    );
    res.json({ success: true, similar: data }); //sending the similar movies to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params; //getting the category from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}` //this is the url of the movies by category
    );
    res.json({ success: true, content: data }); //sending the content to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
