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

function Movie() {
  let { id } = useParams();
  const movie = useSelector<any, any>((state) => state.movie.currentMovie);

  if (!id) id = "";
  const { loading } = useFetchMovieData(id);

  console.log(movie);

  if (loading) return <MovieSkeleton />;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <NavigationButtons />
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
