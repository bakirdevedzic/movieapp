import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchMoviesBySearchAsync } from "../redux/movieSlice";
import { fetchShowsBySearchAsync } from "../redux/showSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("show");
  const dispatch = useDispatch<AppDispatch>();
  const topMovies = useSelector<any, any>((state) => state.movie.topMovies);
  const topShows = useSelector<any, any>((state) => state.show.topShows);

  const moviesStatus = useSelector<any, any>((state) => state.movie.status);
  const showsStatus = useSelector<any, any>((state) => state.show.status);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (search.length > 2) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        if (tab === "movie") dispatch(fetchMoviesBySearchAsync(search));
        else dispatch(fetchShowsBySearchAsync(search));
      }, 1000);
    } else {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, tab]);

  const fetchedMovies = useSelector<any, any>(
    (state) => state.movie.fetchedMovies
  );
  const fetchedShows = useSelector<any, any>(
    (state) => state.show.fetchedShows
  );
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-[1700px] w-[100%] flex flex-col justify-center items-center gap-3">
        <button
          onClick={() => setTab("movie")}
          className="bg-blue-300 rounded text-center w-[100px] h-[50px]"
        >
          Movie
        </button>
        <button
          onClick={() => setTab("show")}
          className="bg-blue-300 rounded text-center w-[100px] h-[50px]"
        >
          Show
        </button>
        <input
          type="text"
          className="border-2"
          onChange={(e) => setSearch(e.target.value)}
        />
        {topMovies &&
          search.length < 3 &&
          tab === "movie" &&
          topMovies.map((movie: any) => (
            <div
              className="bg-red-400 h-[100px] w-[500px] flex justify-center items-center"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {movie.title}
            </div>
          ))}
        {fetchedMovies &&
          search.length > 2 &&
          tab === "movie" &&
          fetchedMovies.map((movie: any) => (
            <div className="bg-red-400 h-[100px] w-[500px] flex justify-center items-center">
              {movie.title}
            </div>
          ))}
        {topShows &&
          search.length < 3 &&
          tab === "show" &&
          topShows.map((show: any) => (
            <div
              className="bg-red-400 h-[100px] w-[500px] flex justify-center items-center"
              onClick={() => navigate(`/show/${show.id}`)}
            >
              {show.name}
            </div>
          ))}
        {fetchedShows &&
          search.length > 2 &&
          tab === "show" &&
          fetchedShows.map((show: any) => (
            <div className="bg-red-400 h-[100px] w-[500px] flex justify-center items-center">
              {show.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
