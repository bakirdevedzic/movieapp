import React from "react";

function LoadingMovies() {
  const arr = new Array(10).fill(0);

  return (
    <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 us:grid-cols-1 gap-3 gap-y-7 w-[100%] justify-items-center mt-4">
      {arr.map(() => (
        <div>
          <div className="group w-[280px] h-[456px] relative flex flex-col min-h-88 border-2 rounded-3xl bg-primary-white-2 shadow-md animate-pulse">
            <div className="">
              <div className="h-64 rounded-t-3xl bg-gray-400"></div>
            </div>
            <div className="flex flex-col p-3 ">
              <div className="h-[60px] bg-gray-400 rounded"></div>
              <div className="h-[75px] mt-2 bg-gray-400 rounded "></div>
              <div className="flex flex-row justify-between mt-2">
                <div className="h-6 w-12 bg-gray-400 rounded"></div>
                <div className="flex flex-row items-center gap-1">
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingMovies;
