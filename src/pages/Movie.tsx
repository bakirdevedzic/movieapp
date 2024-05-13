import { useDispatch } from "react-redux";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchMovieAsync,
  fetchMovieCreditsAsync,
  fetchRecommendedMovies,
  fetchTrailerKeyAsync,
} from "../redux/movieSlice";

import RecommendedMovie from "../components/RecommendedMovie";
import MovieSkeleton from "../components/MovieSkeleton";
import Header from "../ui/Header";
import Button from "../ui/Button";
import Banner from "../components/Banner";
import PlotCard from "../components/PlotCard";
import ActorsComponent from "../components/ActorsComponent";
import RecommendedMovies from "../components/RecommendedMovies";

function Movie() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<any, any>((state) => state.movie.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetching() {
      if (id) {
        const numericId = parseInt(id, 10);
        if (!isNaN(numericId)) {
          setLoading(true);
          await dispatch(fetchMovieAsync(numericId));
          await dispatch(fetchTrailerKeyAsync(numericId));
          await dispatch(fetchMovieCreditsAsync(numericId));
          await dispatch(fetchRecommendedMovies(numericId));
          setLoading(false);
        } else {
          navigate("/*");
        }
      }
    }
    fetching();
  }, [id]);

  const movie = useSelector<any, any>((state) => state.movie.currentMovie);
  const search = useSelector<any, any>((state) => state.search.search);
  const tab = useSelector<any, any>((state) => state.search.tab);

  const released = movie?.release_date;
  const year = typeof released === "string" ? released.slice(0, 4) : "";

  console.log(movie);
  if (loading) return <MovieSkeleton />;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="flex flex-row gap-2 w-[100%]">
          <div className="flex flex-row gap-2 w-[100%]">
            <Button onClick={() => navigate(-1)} text="Go back!" />
            <Button onClick={() => navigate(`/`)} text="Home!" />
          </div>
        </div>
        <Banner object={movie} />
        <div className="w-[100%] mt-8 text-2xl font-outfit font-semibold whitespace-break-spaces text-primary-black">
          {movie?.title ? movie.title : "No data"}
        </div>

        <PlotCard object={movie} />
        <ActorsComponent object={movie} />
        {/* <div className="w-[100%] mt-3">
          <p className="text-2xl font-outfit font-semibold">Recommended</p>
          <div className="flex flex-row w-[100%] justify-between sm:grid sm:grid-cols-3 us:grid-cols-2 mt-2">
            {movie?.recommended &&
              movie.recommended.map((movie: any) => (
                <RecommendedMovie movie={movie} />
              ))}
          </div>
        </div> */}
        <RecommendedMovies object={movie} type="movie" />
      </div>
    </div>
  );
}

export default Movie;
