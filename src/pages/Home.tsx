import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  fetchMoviesBySearchAsync,
  fetchTopMoviesAsync,
} from "../redux/movieSlice";
import {
  fetchShowsBySearchAsync,
  fetchTopShowsAsync,
} from "../redux/showSlice";
import { useNavigate } from "react-router-dom";
import { changeSearch } from "../redux/searchSlice";
import Tab from "../ui/Tab";
import Search from "../components/Search";
import Card from "../components/Card";
import { Movie, Show } from "../types/types";
import LoadingMovies from "../components/LoadingMovies";
import Header from "../ui/Header";
import ButtonFull from "../ui/ButtonFull";

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
  useEffect(() => {
    dispatch(fetchTopMoviesAsync());
    dispatch(fetchTopShowsAsync());
  }, [dispatch]);

  const [loading, setLoading] = useState(false);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (search.length > 2) {
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

  const fetchedMovies = useSelector<any, any>(
    (state) => state.movie.fetchedMovies
  );
  const fetchedShows = useSelector<any, any>(
    (state) => state.show.fetchedShows
  );
  const navigate = useNavigate();
  function seeLibrary() {
    dispatch(changeSearch({ search: "", tab: "movie" }));
    navigate("/library/all");
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1400px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen">
        <div className="flex flex-row w-[100%] us:flex-col us:gap-2 justify-between">
          <div className="flex flex-row gap-0 us:justify-center ">
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
          <ButtonFull text="Your Library" onClick={seeLibrary} />
        </div>

        <Search onChange={(e) => setSearch(e.target.value)} value={search} />

        {loading || moviesStatus === "loading" || showsStatus === "loading" ? (
          <LoadingMovies />
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 us:grid-cols-1 gap-3 gap-y-7 w-[100%] justify-items-center mt-4">
            {topMovies &&
              search.length < 3 &&
              tab === "movie" &&
              topMovies.map((movie: Movie) => (
                <Card
                  typeOfCard="movie"
                  movie={movie}
                  key={movie.id}
                  state={{ search: search, tab: tab }}
                />
              ))}
            {fetchedMovies &&
              search.length > 2 &&
              tab === "movie" &&
              loading === false &&
              fetchedMovies.map((movie: Movie) => (
                <Card
                  typeOfCard="movie"
                  movie={movie}
                  key={movie.id}
                  state={{ search: search, tab: tab }}
                />
              ))}
            {topShows &&
              search.length < 3 &&
              tab === "show" &&
              topShows.map((show: Show) => (
                <Card
                  typeOfCard="show"
                  show={show}
                  key={show.id}
                  state={{ search: search, tab: tab }}
                />
              ))}
            {fetchedShows &&
              search.length > 2 &&
              tab === "show" &&
              fetchedShows.map((show: Show) => (
                <Card
                  typeOfCard="show"
                  show={show}
                  key={show.id}
                  state={{ search: search, tab: tab }}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
