import { useDispatch } from "react-redux";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import YouTube from "react-youtube";
import ActorCard from "../components/ActorCard";
import { Cast } from "../types/types";
import RecommendedMovie from "../components/RecommendedMovie";
import MovieSkeleton from "../components/MovieSkeleton";
import {
  fetchRecommendedShowsAsync,
  fetchShowAsync,
  fetchShowCreditsAsync,
  fetchTrailerKeyAsync,
} from "../redux/showSlice";
import Header from "../ui/Header";

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

  console.log(show);
  if (loading) return <MovieSkeleton />;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="flex flex-row gap-2 w-[100%]">
          <button
            className="border-primary-orange rounded-lg text-primary-orange p-3 border w-[100px] hover:bg-primary-orange hover:text-white hover:border-primary-orange font-outfit font-bold text-sm"
            onClick={() => navigate(-1)}
          >
            Go back!
          </button>
          <button
            className="border-primary-orange rounded-lg text-primary-orange p-3 border w-[100px] hover:bg-primary-orange hover:text-white hover:border-primary-orange font-outfit font-bold text-sm"
            onClick={() => navigate(`/`)}
          >
            Home!
          </button>
        </div>
        <div className="w-[100%]">
          {show?.trailer && show.trailer !== "" && (
            <YouTube
              videoId={show.trailer}
              opts={{
                width: "100%",
                playerVars: { autoplay: 0 },
              }}
              iframeClassName="rounded-lg"
            />
          )}
          {show?.backdrop_path &&
            show.backdrop_path !== "" &&
            show.trailer === "" && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`}
                alt={show.name}
                className="min-w-[100%] object-fit rounded-xl shadow-lg"
              />
            )}
          {show?.backdrop_path &&
            show.backdrop_path === "" &&
            show.trailer === "" && (
              <div className="w-[100%] h-[400px] flex justify-center items-center font-bold font-outfit text-gray-600 rounded-xl shadow-lg">
                There is no trailer or poster!
              </div>
            )}
        </div>
        <div className="w-[100%] mt-8 text-2xl font-outfit font-semibold whitespace-break-spaces text-primary-black">
          {show?.name}
        </div>
        <div className="w-[100%] h-auto grid grid-cols-[250px_1fr] bg-white rounded-xl  border-2 mt-5 items-center sm:flex sm:flex-col">
          <div className="">
            {show?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
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

              {show?.overview}
            </div>
            <div className="h-[auto] flex flex-row gap-2 font-semibold font-outfit">
              <p>{year ? year : "No data"} • </p>
              <p>{show?.runtime ? show.runtime + " min" : "No data"} • </p>
              <p>
                {show?.genres?.[0].name ? show?.genres?.[0].name : "No data"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-3">
          <p className="text-2xl font-outfit font-semibold">Cast</p>
          <div className="flex flex-row w-[100%]  sm:grid sm:grid-cols-3 us:grid-cols-2">
            {show?.cast &&
              show.cast.map((cast: Cast) => <ActorCard actor={cast} />)}
          </div>
        </div>
        {/* <div className="w-[100%] mt-3">
          <p className="text-2xl font-outfit font-semibold">Recommended</p>
          <div className="flex flex-row w-[100%] justify-between sm:grid sm:grid-cols-3 us:grid-cols-2 mt-2">
            {show?.recommended &&
              show.recommended.map((movie: any) => (
                <RecommendedMovie movie={movie} />
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Show;
