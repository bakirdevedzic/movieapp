import { useNavigate } from "react-router-dom";
import { Movie } from "../types/types";

type RecommendedMovieProps = {
  movie: Movie;
};

function RecommendedMovie({ movie }: RecommendedMovieProps) {
  console.log(movie);
  const released = movie?.release_date;
  const year = typeof released === "string" ? released.slice(0, 4) : "";
  const navigate = useNavigate();

  const truncatedName =
    movie?.title.length > 30 ? movie?.title.slice(0, 30) + "..." : movie?.title;

  console.log(movie);
  return (
    <div
      className="max-w-[170px] grid grid-rows-[80%_20%] rounded-xl hover:scale-105 hover:cursor-pointer"
      onClick={() => navigate(`/movie/${movie?.id}`)}
    >
      <div className="w-[100%] h-[100%]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          className="object-cover w-[100%] h-[100%] rounded-xl"
        />
      </div>
      <div className="text-normal font-outfit font-light p-1 whitespace-normal">
        <p>{movie?.title}</p>
        <p>{year}</p>
      </div>
    </div>
  );
}

export default RecommendedMovie;
