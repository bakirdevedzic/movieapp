import { Movie, Show } from "../types/types";
import RecommendedMovie from "./RecommendedMovie";

type RecommendedMovies = {
  object: Movie | Show;
  type: "movie" | "show";
};

function Recommended({ object, type }: RecommendedMovies) {
  return (
    <div className="w-[100%] mt-3">
      <p className="text-2xl font-outfit font-semibold">Recommended</p>
      <div className="flex flex-row w-[100%] justify-between sm:grid sm:grid-cols-3 us:grid-cols-2 mt-2">
        {object?.recommended &&
          object.recommended.map((object: Movie | Show) => (
            <RecommendedMovie object={object} type={type} key={object.id} />
          ))}
      </div>
    </div>
  );
}

export default Recommended;
