import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/SearchHistoryPage";

function App() {
  //this is the authStore hook that will be used to check if the user is authenticated or not
  //if user is authenticated then its data will be available in the user variable
  //isCheckingAuth is just for good UI.
  //authCheck will do the job of checking if the user is authenticated or not and will set the user data in the authStore
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    //whenever the app is loaded, the authCheck will be called to check if the user is authenticated or not
    authCheck();
  }, [authCheck]); //this will run only once when the authCheck is called

  if (isCheckingAuth) {
    //this will show the loading state for fraction of seconds when the useAuthStore is checking by authCheck if user is authenticated or not. Its basicially just for good UI
    return (
      <div className="flex items-center justify-center bg-black h-screen">
        <div className="animate-spin rounded-full text-red-600 h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* HomePage */}
        {/* if user is verified and available at authStore with the help of authCheck in useEffect then it will navigate straightaway based on the below logics */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
