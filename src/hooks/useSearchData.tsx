import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMoviesBySearchAsync,
  fetchTopMoviesAsync,
} from "../redux/movieSlice";
import {
  fetchShowsBySearchAsync,
  fetchTopShowsAsync,
} from "../redux/showSlice";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";

function useSearchData() {
  const searchState = useSelector<any, any>((state) => state.search.search);

  const [search, setSearch] = useState(searchState ? searchState : "");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (search.length > 2 && searchState !== search) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      setLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        dispatch(fetchMoviesBySearchAsync(search));
        dispatch(fetchShowsBySearchAsync(search));
        setLoading(false);
      }, 1000);
    } else {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
        setLoading(false);
      }
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  return { search, setSearch, loading };
}

export default useSearchData;
