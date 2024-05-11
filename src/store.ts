import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./redux/movieSlice";
import showSlice from "./redux/showSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    show: showSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
