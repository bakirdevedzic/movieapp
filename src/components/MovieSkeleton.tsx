import React from "react";

export default function MovieSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <div className="text-2xl font-outfit font-bold mb-6 py-2 bg-primary-orange text-white w-[100%] text-center shadow-md">
        Movie App
      </div>
      <div className="max-w-[1300px] w-[100%] flex flex-col gap-3  p-4 items-center min-h-screen ">
        <div className="flex flex-row gap-2 w-[100%] animate-pulse">
          <div className="border-gray-200 bg-gray-200 rounded-lg p-3 w-[100px] h-[50px]"></div>
          <div className="border-gray-200 bg-gray-200 rounded-lg p-3 w-[100px] h-[50px]"></div>
        </div>
        <div className="h-80 w-full rounded-md mt-1 mb-2.5 animate-pulse bg-neutral-300 dark:bg-neutral-700"></div>
        <div className="h-20 w-full rounded-md mt-1 mb-2.5 animate-pulse bg-neutral-300 dark:bg-neutral-700"></div>
        <div className="h-60 w-full rounded-md mt-1 mb-2.5 animate-pulse bg-neutral-300 dark:bg-neutral-700"></div>
        <div className="flex w-[100%] items-start flex-col">
          <div className="h-12 w-24 rounded-md mt-1 mb-2.5 animate-pulse bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="h-36 w-full rounded-md animate-pulse bg-neutral-300 dark:bg-neutral-700"></div>
        </div>
        <div className="flex w-[100%] items-start flex-col">
          <div className="h-12 w-24 rounded-md mt-1 mb-2.5 animate-pulse bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="h-36 w-full rounded-md animate-pulse bg-neutral-300 dark:bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
}
