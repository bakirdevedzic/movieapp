import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
  if (status === "loading") return <div>Loading</div>;

  return <div>{movie?.original_title}</div>;
}

export default Movie;
