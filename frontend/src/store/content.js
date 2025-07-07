import { create } from "zustand";

//this store will be used to set the content type to check whether the user is watching movie or tv show
export const useContentStore = create((set) => ({
  contentType: "movie", //default content type is movie
  setContentType: (type) => set({ contentType: type }), //this will set the content type to the type passed to it
}));
