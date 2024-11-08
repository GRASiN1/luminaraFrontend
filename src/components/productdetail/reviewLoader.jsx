import React from "react";

export default function ReviewLoader() {
  return (
    <div className="min-w-full h-full flex flex-col justify-start items-start border-mistyRose pb-3 my-2 gap-3">
      <div className="flex flex-row gap-3 justify-center items-center">
        <div className="rounded-2xl w-8 h-8 bg-salmonPink animate-pulse"></div>
        <h3 className="h-5 w-96 bg-salmonPink animate-pulse rounded-md"></h3>
        <p className="h-5 w-10 bg-salmonPink animate-pulse rounded-md"></p>
      </div>
      <p className="h-10 w-3/5 bg-salmonPink animate-pulse rounded-md"></p>
    </div>
  );
}
