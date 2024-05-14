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

import Banner from "../components/Banner";
import PlotCard from "../components/PlotCard";
import ActorsComponent from "../components/ActorsComponent";

import RecommendedMovies from "../components/Recommended";
import NavigationButtons from "../components/NavigationButtons";
import { useFetchShowData } from "../hooks/useFetchShowData";
import PageNotFound from "./PageNotFound";
import {
  deleteShow,
  isShowInStorage,
  saveShow,
} from "../utils/localStorageHelper";
import ButtonFull from "../ui/ButtonFull";

function Show() {
  let { id } = useParams();
  if (!id) id = "";
  const { loading, idError } = useFetchShowData(id);

  const show = useSelector<any, any>((state) => state.show.currentShow);
  const error = useSelector<any, any>((state) => state.show.error);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (show) {
      const isMovieSaved = isShowInStorage(show.id);
      setSaved(isMovieSaved);
    }
  }, [show]);

  function handleSave() {
    saveShow(show);
    setSaved(true);
  }
  function handleDeleteSave() {
    deleteShow(show.id);
    setSaved(false);
  }

  if (error || idError) return <PageNotFound />;
  if (loading) return <MovieSkeleton />;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="flex flex-row  w-[100%] us:flex-col us:gap-2">
          <NavigationButtons />
          {saved ? (
            <ButtonFull onClick={handleDeleteSave} text="Remove from saved!" />
          ) : (
            <ButtonFull onClick={handleSave} text="Save show" />
          )}
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
