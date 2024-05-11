import React, { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import { useDispatch } from "react-redux";
import { fetchTopMoviesAsync } from "./redux/movieSlice";
import { AppDispatch } from "./store";
import { fetchTopShowsAsync } from "./redux/showSlice";
import Movie from "./pages/Movie";
import Show from "./pages/Show";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTopMoviesAsync());
    dispatch(fetchTopShowsAsync());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/show/:id" element={<Show />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
