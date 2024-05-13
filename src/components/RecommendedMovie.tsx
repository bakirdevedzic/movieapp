import { useNavigate } from "react-router-dom";
import { Movie, Show } from "../types/types";

type RecommendedMovieProps = {
  object: Movie | Show;
  type: "movie" | "show";
};

function RecommendedMovie({ object, type }: RecommendedMovieProps) {
  const released = object?.release_date;
  const year = typeof released === "string" ? released.slice(0, 4) : "";
  const navigate = useNavigate();

  const truncatedName =
    object?.title?.length && object?.title?.length > 30
      ? object?.title?.slice(0, 30) + "..."
      : object?.title;

  return (
    <div
      className="max-w-[170px] grid grid-rows-[80%_20%] rounded-xl hover:scale-105 hover:cursor-pointer"
      onClick={() => navigate(`/${type}/${object?.id}`)}
    >
      <div className="w-[100%] h-[100%]">
        <img
          src={`https://image.tmdb.org/t/p/w500${object?.poster_path}`}
          className="object-cover w-[100%] h-[100%] rounded-xl"
        />
      </div>
      <div className="text-normal font-outfit font-light p-1 whitespace-normal">
        <p>{object?.title}</p>
        <p>{year}</p>
      </div>
    </div>
  );
}

export default RecommendedMovie;
