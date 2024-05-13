import { Cast } from "../types/types";

type ActorCardProps = {
  actor: Cast;
};

function ActorCard({ actor }: ActorCardProps) {
  return (
    <div className=" flex flex-col  items-center justify-between align-middle p-3">
      <img
        src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
        className="rounded-full h-[100px] w-[100px] shadow-lg  object-cover"
        alt="actor"
      />

      <div className="text-xl font-bold font-outfit text-center">
        {actor?.name}
      </div>
      <div className="text-sm font-light font-outfit text-center">
        {actor?.character}
      </div>
    </div>
  );
}

export default ActorCard;
