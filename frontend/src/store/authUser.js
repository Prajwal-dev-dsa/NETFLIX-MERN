import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

//this will check the authentication of the user by connecting frontend with backend
export const useAuthStore = create((set) => ({
  user: null, //this will store the user data, initially it will be null

  isSigningUp: false, //this will check if the user is signing up or not, initially it will be false, we will use it to show the loading state which will look good for the user

  isCheckingAuth: true, //this will check if the user is authenticated or not

  isLoggedOut: false, //this will check if the user is logged out or not, initially it will be false, we will use it to show the loading state which will look good for the user

  isLoggingIn: false,

  signup: async (credentials) => {
    //credentials will contain username, email, password, image which will be sent to the backend of signup route
    set({ isSigningUp: true }); //this will set the isSigningUp to true, which will show the loading state
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials); //this will straightaway hit to the backend where we have created our signup route
      set({ user: response.data.user, isSigningUp: false }); //this will set the user data and isSigningUp to false, which will hide the loading state
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      set({ isSigningUp: false, user: null }); //if error, back to reset the state
    }
  },
  login: async (credentials) => {
    //this function will login the user by hitting to the backend where we have created our login route
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials); //credentials will contain email and password which will be sent to the backend of login route
      set({ user: response.data.user, isLoggingIn: false }); //once logged in, the user data will be set in the user and isLoggingIn will be set to false
      toast.success("Logged in successfully");
    } catch (error) {
      set({ isLoggingIn: false, user: null }); //if error, back to reset the state
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
  logout: async () => {
    //this function will logout the user by hitting to the backend where we have created our logout route
    set({ isLoggedOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggedOut: true });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggedOut: false });
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
  authCheck: async () => {
    //this function will check if the user is authenticated or not
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck"); //this will hit to the backend where we have created our authCheck route
      set({ user: response.data.user, isCheckingAuth: false }); //this will set the user data and isCheckingAuth to false, which will hide the loading state
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
