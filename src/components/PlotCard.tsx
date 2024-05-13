import { Movie, Show } from "../types/types";

type PlotCardProps = {
  object: Movie | Show;
};

function PlotCard({ object }: PlotCardProps) {
  const released = object?.release_date;
  const year = typeof released === "string" ? released.slice(0, 4) : "";

  return (
    <div className="w-[100%] h-auto grid grid-cols-[250px_1fr] bg-white rounded-xl  border-2 mt-5 items-center sm:flex sm:flex-col">
      <div className="">
        {object?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${object.poster_path}`}
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

          {object?.overview ? (
            object.overview
          ) : (
            <div className="text-gray-600 font-bold font-outfit"> No data </div>
          )}
        </div>
        <div className="h-[auto] flex flex-row gap-2 font-semibold font-outfit">
          <p>{year ? year : "No data"} • </p>
          <p>{object?.runtime ? object.runtime + " min" : "No data"} • </p>
          <p>
            {object?.genres?.[0]?.name ? object?.genres?.[0].name : "No data"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlotCard;
