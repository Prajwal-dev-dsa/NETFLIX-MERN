import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingTV = async (req, res) => {
  try {
    //fetching the trending tv shows from the TMDB API
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US" //this is the url of the trending tv shows
    );
    //selecting a random tv from the multiple trending tv shows which we got in the data variable
    const randomTV =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: randomTV }); //sending the random tv to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTVTrailers = async (req, res) => {
  try {
    const { id } = req.params; //getting the id of the tv show from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US` //this is the url of the trailer of the tv show
    );
    res.json({ success: true, trailers: data.results }); //sending the trailers to the client
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null); //if the tv show is not found, send a 404 error
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTVDetails = async (req, res) => {
  try {
    const { id } = req.params; //getting the id of the tv show from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US` //this is the url of the details of the tv show
    );
    res.json({ success: true, details: data }); //sending the details to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSimilarTV = async (req, res) => {
  try {
    const { id } = req.params; //getting the id of the tv show from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1` //this is the url of the similar tv shows
    );
    res.json({ success: true, similar: data }); //sending the similar tv shows to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTVByCategory = async (req, res) => {
  try {
    const { category } = req.params; //getting the category from the request params
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1` //this is the url of the tv shows by category
    );
    res.json({ success: true, content: data }); //sending the content to the client
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
