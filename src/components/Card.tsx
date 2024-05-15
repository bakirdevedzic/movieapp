import { useNavigate } from "react-router-dom";
import { Movie, Show } from "../types/types";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changeSearch } from "../redux/searchSlice";
import { AppDispatch } from "../store";

type State = {
  search: string;
  tab: string;
};

type MovieType = {
  movie: Movie;
  typeOfCard: "movie";
  state: State;
};

type ShowType = {
  show: Show;
  typeOfCard: "show";
  state: State;
};

type CardProps = MovieType | ShowType;

function Card(props: CardProps) {
  const typeOfCard = props.typeOfCard;
  let movie, show;

  const navigate = useNavigate();

  if (props.typeOfCard === "movie") {
    movie = props.movie;
  } else show = props.show;

  const id = typeOfCard === "movie" ? movie?.id : show?.id;

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

  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    navigate(`/${typeOfCard}/${id}`);

    dispatch(
      changeSearch({ search: props.state.search, tab: props.state.tab })
    );
  };

  return (
    <div
      className="group w-[280px] relative flex flex-col min-h-[350px] border-2 rounded-3xl bg-primary-white-2 shadow-md  hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute left-[27%] top-[45%] opacity-0 group-hover:opacity-100 text-2xl font-bold text-black">
        See details!
      </div>
      <div className="">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            width="350"
            className="rounded-t-3xl justify-center grid h-64 object-cover group-hover:opacity-20 group-hover:blur-[2px]"
            alt="poster"
          />
        ) : (
          <div className="h-[256px] flex justify-center items-center font-outfit text-xl text-gray-900 font-bold bg-slate-500 group-hover:opacity-20 group-hover:blur-[2px] rounded-t-3xl ">
            No poster available!
          </div>
        )}
      </div>

      <div className="flex flex-col p-3 group-hover:opacity-10 group-hover:blur-[2px]">
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
