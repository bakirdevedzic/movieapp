import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMovieAsync,
  fetchMovieCreditsAsync,
  fetchRecommendedMovies,
  fetchTrailerKeyAsync,
} from "../redux/movieSlice";
import { AppDispatch } from "../store";

export const useFetchMovieData = (id: string) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const [idError, setIdError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const numericId = parseInt(id, 10);
        if (!isNaN(numericId)) {
          try {
            setLoading(true);

            await dispatch(fetchMovieAsync(numericId));
            await dispatch(fetchTrailerKeyAsync(numericId));
            await dispatch(fetchMovieCreditsAsync(numericId));
            await dispatch(fetchRecommendedMovies(numericId));
          } catch (error) {
            return;
          } finally {
            setLoading(false);
          }
        } else {
          setIdError(true);
        }
      }
    };

    fetchData();
  }, [
    id,
    dispatch,
    fetchMovieAsync,
    fetchTrailerKeyAsync,
    fetchMovieCreditsAsync,
    fetchRecommendedMovies,
  ]);

  return { loading, idError };
};
