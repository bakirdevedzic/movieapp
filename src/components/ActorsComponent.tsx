import { Cast, Movie, Show } from "../types/types";
import ActorCard from "./ActorCard";

type ActorsComponentProps = {
  object: Movie | Show;
};

function ActorsComponent({ object }: ActorsComponentProps) {
  return (
    <div className="w-[100%] mt-3 mb-3">
      <p className="text-2xl font-outfit font-semibold">Cast</p>
      <div className="flex flex-row w-[100%]  sm:grid sm:grid-cols-3 us:grid-cols-2">
        {object?.cast &&
          object.cast.map((cast: Cast) => <ActorCard actor={cast} />)}
      </div>
    </div>
  );
}

export default ActorsComponent;
