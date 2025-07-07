import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

//this function is used to fetch data from TMDB
export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json", //this is the content type of the response
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY, //this is the authorization header
    },
  };
  try {
    const response = await axios.get(url, options); //this is the axios request to the TMDB API
    if (response.status !== 200) {
      throw new Error("Failed to fetch from TMDB");
    }
    console.log("TMDB API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("TMDB API error:", error.message);
    throw new Error("TMDB API request failed");
  }
};
