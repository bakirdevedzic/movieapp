import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchMoviesBySearchAsync } from "../redux/movieSlice";
import { fetchShowsBySearchAsync } from "../redux/showSlice";
import { useNavigate } from "react-router-dom";
import { changeSearch } from "../redux/searchSlice";
import Tab from "../ui/Tab";
import Search from "../components/Search";

function Home() {
  const searchState = useSelector<any, any>((state) => state.search.search);
  const tabState = useSelector<any, any>((state) => state.search.tab);
  const [search, setSearch] = useState(searchState ? searchState : "");
  const [tab, setTab] = useState(tabState ? tabState : "show");
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
        dispatch(changeSearch({ search, tab }));
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
    <div className="flex flex-col justify-center items-center bg-gray-50 pt-24">
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3">
        <div className="flex flex-row gap-0">
          <Tab
            onClick={() => setTab("movie")}
            text={"Movies"}
            active={tab === "movie" ? true : false}
          />
          <Tab
            onClick={() => setTab("show")}
            text={"TV Shows"}
            active={tab === "show" ? true : false}
          />
        </div>

        <Search onChange={(e) => setSearch(e.target.value)} value={search} />
        <div className="grid grid-cols-3 justify-space-between">
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
              <div
                className="bg-red-400 h-[100px] w-[500px] flex justify-center items-center"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
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
              <div
                className="bg-red-400 h-[100px] w-[500px] flex justify-center items-center"
                onClick={() => navigate(`/show/${show.id}`)}
              >
                {show.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
