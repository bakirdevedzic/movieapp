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
import YouTube from "react-youtube";
import ActorCard from "../components/ActorCard";
import { Cast } from "../types/types";
import RecommendedMovie from "../components/RecommendedMovie";
import MovieSkeleton from "../components/MovieSkeleton";

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

  if (loading) return <MovieSkeleton />;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <div className="text-2xl font-outfit font-bold mb-6 py-2 bg-primary-orange text-white w-[100%] text-center shadow-md">
        Movie App
      </div>
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="flex flex-row gap-2 w-[100%]">
          <button
            className="border-primary-orange rounded-lg text-primary-orange p-3 border w-[100px] hover:bg-primary-orange hover:text-white hover:border-primary-orange font-outfit font-bold text-sm"
            onClick={() => navigate(-1)}
          >
            Go back!
          </button>
          <button
            className="border-primary-orange rounded-lg text-primary-orange p-3 border w-[100px] hover:bg-primary-orange hover:text-white hover:border-primary-orange font-outfit font-bold text-sm"
            onClick={() => navigate(`/`)}
          >
            Home!
          </button>
        </div>
        <div className="w-[100%]">
          {movie?.trailer && movie.trailer !== "" && (
            <YouTube
              videoId={movie.trailer}
              opts={{
                width: "100%",
                playerVars: { autoplay: 0 },
              }}
              iframeClassName="rounded-lg"
            />
          )}
          {movie?.backdrop_path &&
            movie.backdrop_path !== "" &&
            movie.trailer === "" && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={movie.title}
                className="min-w-[100%] object-fit rounded-xl shadow-lg"
              />
            )}
          {movie?.backdrop_path &&
            movie.backdrop_path === "" &&
            movie.trailer === "" && (
              <div className="w-[100%] h-[400px] flex justify-center items-center font-bold font-outfit text-gray-600 rounded-xl shadow-lg">
                There is no trailer or poster!
              </div>
            )}
        </div>
        <div className="w-[100%] mt-8 text-2xl font-outfit font-semibold whitespace-break-spaces text-primary-black">
          {movie?.title}
        </div>
        <div className="w-[100%] h-auto grid grid-cols-[250px_1fr] bg-white rounded-xl  border-2 mt-5 items-center sm:flex sm:flex-col">
          <div className="">
            {movie?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="h-[300px] rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-[100%] h-[300px] flex justify-center items-center font-bold font-outfit text-gray-600 rounded-xl shadow-lg">
                No poster available!{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between h-[100%] p-3 min-h-[300px]">
            <div className="h-[auto] text-lg font-outfit font-light">
              <p className="mb-3 font-semibold">The plot</p>

              {movie?.overview}
            </div>
            <div className="h-[auto] flex flex-row gap-2 font-semibold font-outfit">
              <p>{year ? year : "No data"} • </p>
              <p>{movie?.runtime ? movie.runtime + " min" : "No data"} • </p>
              <p>
                {movie?.genres?.[0].name ? movie?.genres?.[0].name : "No data"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-3">
          <p className="text-2xl font-outfit font-semibold">Cast</p>
          <div className="flex flex-row w-[100%]  sm:grid sm:grid-cols-3 us:grid-cols-2">
            {movie?.cast &&
              movie.cast.map((cast: Cast) => <ActorCard actor={cast} />)}
          </div>
        </div>
        <div className="w-[100%] mt-3">
          <p className="text-2xl font-outfit font-semibold">Recommended</p>
          <div className="flex flex-row w-[100%] justify-between sm:grid sm:grid-cols-3 us:grid-cols-2 mt-2">
            {movie?.recommended &&
              movie.recommended.map((movie: any) => (
                <RecommendedMovie movie={movie} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
