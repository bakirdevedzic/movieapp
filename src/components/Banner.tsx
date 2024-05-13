import YouTube from "react-youtube";
import { Movie, Show } from "../types/types";

type BannerProps = {
  object: Movie | Show;
};

function Banner({ object }: BannerProps) {
  return (
    <div className="w-[100%]">
      {object?.trailer && object.trailer !== "" && (
        <YouTube
          videoId={object.trailer}
          opts={{
            width: "100%",
            playerVars: { autoplay: 0 },
          }}
          iframeClassName="rounded-lg"
        />
      )}
      {object.backdrop_path !== null && object.trailer === "" && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${object.backdrop_path}`}
          alt={"Poster"}
          className="min-w-[100%] object-fit rounded-xl shadow-lg"
        />
      )}
      {object.backdrop_path === null && object.trailer === "" && (
        <div className="w-[100%] h-[400px] flex justify-center items-center font-bold font-outfit text-gray-600 rounded-xl shadow-lg border">
          There is no trailer or poster!
        </div>
      )}
    </div>
  );
}

export default Banner;
