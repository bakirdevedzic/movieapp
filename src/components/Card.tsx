import { Movie, Show } from "../types/types";
import { MdOutlineStar } from "react-icons/md";

type MovieType = {
  movie: Movie;
  typeOfCard: "movie";
};

type ShowType = {
  show: Show;
  typeOfCard: "show";
};

type CardProps = MovieType | ShowType;

function Card(props: CardProps) {
  const typeOfCard = props.typeOfCard;
  let movie, show;

  if (props.typeOfCard === "movie") {
    movie = props.movie;
  } else show = props.show;

  const name = typeOfCard === "movie" ? movie?.title ?? "" : show?.name ?? "";
  const truncatedName = name.length > 48 ? name.slice(0, 48) + "..." : name;

  const released =
    typeOfCard === "movie" ? movie?.release_date : show?.first_air_date;
  const year = typeof released === "string" ? released.slice(0, 4) : "";

  const vote_average =
    typeOfCard === "movie" ? movie?.vote_average : show?.vote_average;
  const rating = typeof vote_average === "number" ? vote_average.toFixed(1) : 0;

  const poster_path =
    typeOfCard === "movie" ? movie?.poster_path : show?.poster_path;

  const overview = typeOfCard === "movie" ? movie?.overview : show?.overview;
  const truncated_overview =
    overview && overview?.length > 140
      ? overview?.slice(0, 140) + "..."
      : overview;

  return (
    <div className="w-[280px] flex flex-col min-h-[350px] border-2 rounded-3xl bg-primary-white-2 shadow-md">
      <div className="">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          width="350"
          height="150"
          className="rounded-t-3xl justify-center grid h-64 object-cover"
          alt="name"
        />
      </div>

      <div className="flex flex-col p-3">
        <div className="h-[60px] font-outfit font-normal text-xl">
          {truncatedName}
        </div>
        <div className="h-[90px] font-outfit font-light text-sm text-gray-400 italic">
          {truncated_overview}
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-outfit font-semibold ">{year}</div>
          <div className="flex flex-row align-middle items-center gap-1">
            <div className="text-primary-orange text-xl font-extrabold">
              <MdOutlineStar />
            </div>
            <div className="font-outfit font-bold">{rating}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
