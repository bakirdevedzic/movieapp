import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieSkeleton from "../components/MovieSkeleton";
import Header from "../ui/Header";
import Banner from "../components/Banner";
import PlotCard from "../components/PlotCard";
import ActorsComponent from "../components/ActorsComponent";
import RecommendedMovies from "../components/Recommended";
import NavigationButtons from "../components/NavigationButtons";
import { useFetchMovieData } from "../hooks/useFetchMovieData";
import { useEffect, useMemo, useState } from "react";
import PageNotFound from "./PageNotFound";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import ButtonFull from "../ui/ButtonFull";
import {
  deleteMovie,
  isMovieInStorage,
  saveMovie,
} from "../utils/localStorageHelper";

function Movie() {
  let { id } = useParams();
  if (!id) id = "";
  const { loading, idError } = useFetchMovieData(id);

  const error = useSelector<any, any>((state) => state.movie.error);

  const movie = useSelector<any, any>((state) => state.movie.currentMovie);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (movie) {
      const isMovieSaved = isMovieInStorage(movie.id);
      setSaved(isMovieSaved);
    }
  }, [movie]);

  function handleSave() {
    saveMovie(movie);
    setSaved(true);
  }
  function handleDeleteSave() {
    deleteMovie(movie.id);
    setSaved(false);
  }

  if (error || idError) return <PageNotFound />;
  if (loading) return <MovieSkeleton />;
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="flex flex-row  w-[100%] us:flex-col us:gap-2">
          <NavigationButtons />
          {saved ? (
            <ButtonFull onClick={handleDeleteSave} text="Remove from saved!" />
          ) : (
            <ButtonFull onClick={handleSave} text="Save movie" />
          )}
        </div>

        <Banner object={movie} />
        <div className="w-[100%] mt-8 text-2xl font-outfit font-semibold whitespace-break-spaces text-primary-black">
          {movie?.title ? movie.title : "No data"}
        </div>

        <PlotCard object={movie} />
        <ActorsComponent object={movie} />

        <RecommendedMovies object={movie} type="movie" />
      </div>
    </div>
  );
}

export default Movie;
