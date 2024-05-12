import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovieAsync } from "../redux/movieSlice";

function Movie() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<any, any>((state) => state.movie.status);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        dispatch(fetchMovieAsync(numericId));
      } else {
      }
    }
  }, []);
  const movie = useSelector<any, any>((state) => state.movie.currentMovie);
  const search = useSelector<any, any>((state) => state.search.search);
  const tab = useSelector<any, any>((state) => state.search.tab);
  console.log(search, "----", tab);
  const navigate = useNavigate();

  if (status === "loading") return <div>Loading</div>;

  return (
    <div>
      {movie?.title}
      <button
        onClick={() => navigate("/")}
        className="text-red-500 rounded-xl shadow-md p-2"
      >
        Go back!
      </button>
    </div>
  );
}

export default Movie;
