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

function Show() {
  let { id } = useParams();
  if (!id) id = "";
  const { loading } = useFetchShowData(id);

  const show = useSelector<any, any>((state) => state.show.currentShow);

  if (loading) return <MovieSkeleton />;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Header />
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <NavigationButtons />
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
