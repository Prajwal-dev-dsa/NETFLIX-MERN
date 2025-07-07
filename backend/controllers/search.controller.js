import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params; //query will be in params
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      //if no results found
      return res.status(404).json(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      //update user search history, we using req.user._id because we were pushing the data of user to req.user once it is verified so that we can use it anywhere we want!
      $push: {
        searchHistory: {
          id: response.results[0].id,
          name: response.results[0].name,
          image: response.results[0].profile_path,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          title: response.results[0].title,
          image: response.results[0].poster_path,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          title: response.results[0].name,
          image: response.results[0].poster_path,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory }); //no need to fetch from database because we are pushing the data of user to req.user once it is verified, so that we can use it anywhere we want!
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params; //id of the item to delete
    id = parseInt(id); //converting the id to a number because in the database the id of the item is a number
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id, //searching for the id of the item to delete and then deleting it
        },
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Item deleted from search history" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
