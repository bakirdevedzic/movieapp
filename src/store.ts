import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./redux/movieSlice";
import showSlice from "./redux/showSlice";
import searchSlice from "./redux/searchSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    show: showSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
