import React from "react";
import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authUser";

function HomePage() {
  const { user } = useAuthStore(); //this is the user that we are using to check if the user is authenticated or not
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>; 
}

export default HomePage;
