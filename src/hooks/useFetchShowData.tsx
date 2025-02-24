import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  fetchRecommendedShowsAsync,
  fetchShowAsync,
  fetchShowCreditsAsync,
  fetchTrailerKeyAsync,
} from "../redux/showSlice";

export const useFetchShowData = (id: string) => {
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
            await dispatch(fetchShowAsync(numericId));
            await dispatch(fetchTrailerKeyAsync(numericId));
            await dispatch(fetchShowCreditsAsync(numericId));
            await dispatch(fetchRecommendedShowsAsync(numericId));
          } catch (error) {
            throw error;
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
    fetchShowAsync,
    fetchTrailerKeyAsync,
    fetchShowCreditsAsync,
    fetchRecommendedShowsAsync,
  ]);

  return { loading, idError };
};
