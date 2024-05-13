import { useDispatch } from "react-redux";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import MovieSkeleton from "../components/MovieSkeleton";
import {
  fetchRecommendedShowsAsync,
  fetchShowAsync,
  fetchShowCreditsAsync,
  fetchTrailerKeyAsync,
} from "../redux/showSlice";
import Header from "../ui/Header";
import Button from "../ui/Button";
import Banner from "../components/Banner";
import PlotCard from "../components/PlotCard";
import ActorsComponent from "../components/ActorsComponent";
import RecommendedMovie from "../components/RecommendedMovie";
import RecommendedMovies from "../components/RecommendedMovies";

function Show() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<any, any>((state) => state.show.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetching() {
      if (id) {
        const numericId = parseInt(id, 10);
        if (!isNaN(numericId)) {
          setLoading(true);
          await dispatch(fetchShowAsync(numericId));
          await dispatch(fetchTrailerKeyAsync(numericId));
          await dispatch(fetchShowCreditsAsync(numericId));
          await dispatch(fetchRecommendedShowsAsync(numericId));
          setLoading(false);
        } else {
          navigate("/*");
        }
      }
    }
    fetching();
  }, [id]);

  const show = useSelector<any, any>((state) => state.show.currentShow);
  const search = useSelector<any, any>((state) => state.search.search);
  const tab = useSelector<any, any>((state) => state.search.tab);

  const released = show?.first_air_date;
  const year = typeof released === "string" ? released.slice(0, 4) : "";

  if (loading) return <MovieSkeleton />;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="flex flex-row gap-2 w-[100%]">
          <Button onClick={() => navigate(-1)} text="Go back!" />
          <Button onClick={() => navigate(`/`)} text="Home!" />
        </div>
        <Banner object={show} />
        <div className="w-[100%] mt-8 text-2xl font-outfit font-semibold whitespace-break-spaces text-primary-black">
          {show?.name ? show?.name : "No name available!"}
        </div>

        <PlotCard object={show} />
        <ActorsComponent object={show} />
        <RecommendedMovies object={show} type="show" />
      </div>
    </div>
  );
}

export default Show;
