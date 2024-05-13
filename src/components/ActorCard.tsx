import { Cast } from "../types/types";

type ActorCardProps = {
  actor: Cast;
};

function ActorCard({ actor }: ActorCardProps) {
  const name =
    actor?.name?.length > 18 ? actor?.name.slice(0, 18) + "..." : actor?.name;
  const character =
    actor?.character?.length > 30
      ? actor?.character.slice(0, 30) + "..."
      : actor?.character;
  console.log(actor?.profile_path);
  return (
    <div className=" flex w-[170px] flex-col  items-center justify-between align-middle p-3 hover:scale-105 ">
      {actor?.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
          className="rounded-full h-[100px] w-[100px] shadow-lg  object-cover"
          alt="actor"
        />
      ) : (
        <div className="rounded-full h-[100px] w-[100px] shadow-lg  object-cover flex justify-center align-middle items-center border">
          No photo!
        </div>
      )}

      <div className="text-xl h-[auto] font-bold font-outfit text-center break-normal mt-2">
        {name}
      </div>
      <div className="text-sm h-[auto] font-light font-outfit text-center break-normal">
        {character}
      </div>
    </div>
  );
}

export default ActorCard;
