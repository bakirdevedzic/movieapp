import { useState } from "react";
import Header from "../ui/Header";
import { getSavedMovies, getSavedShows } from "../utils/localStorageHelper";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { Movie, Show } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button";

function Library() {
  let { type } = useParams();
  const search = useSelector<any, any>((state) => state.search.search);
  const tab = useSelector<any, any>((state) => state.search.tab);
  const [type2, setType2] = useState<any>(() => type || "all");
  const savedMovies = getSavedMovies();
  const savedShows = getSavedShows();
  const navigate = useNavigate();

  function onClick(e: any) {
    setType2(e.target.value);
    navigate(`/library/${e.target.value}`);
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="w-[100%]  flex justify-start gap-3">
          <select
            onChange={(e) => onClick(e)}
            className="p-2 rounded shadow-lg border"
            defaultValue={type2}
          >
            <option value="all">All</option>
            <option value="movies">Movies</option>
            <option value="shows">TV Shows</option>
          </select>
          <Button onClick={() => navigate("/")} text={"Home"} />
        </div>
        <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 us:grid-cols-1 gap-3 gap-y-7 w-[100%] justify-items-center mt-4">
          {(type === "movies" || type === "all") &&
            savedMovies.map((movie: Movie) => (
              <Card
                typeOfCard="movie"
                movie={movie}
                key={movie.id}
                state={{ search: search, tab: tab }}
              />
            ))}
          {(type === "shows" || type === "all") &&
            savedShows.map((show: Show) => (
              <Card
                typeOfCard="show"
                show={show}
                key={show.id}
                state={{ search: search, tab: tab }}
              />
            ))}
        </div>
        {savedMovies.length === 0 && savedShows.length === 0 && (
          <div className="w-[100%] h-[500px] flex justify-center font-bold text-3xl font-outfit text-gray-500 whitespace-nowrap">
            No saved movies/shows!
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
