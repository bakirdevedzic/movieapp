import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { fetchShowAsync } from "../redux/showSlice";

function Show() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<any, any>((state) => state.show.status);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        dispatch(fetchShowAsync(numericId));
      } else {
      }
    }
  }, []);
  const show = useSelector<any, any>((state) => state.show.currentShow);
  const navigate = useNavigate();
  if (status === "loading") return <div>Loading</div>;

  return (
    <div>
      {show?.name}
      <button
        onClick={() => navigate("/")}
        className="text-red-500 rounded-xl shadow-md p-2"
      >
        Go back!
      </button>
    </div>
  );
}

export default Show;
