import React from "react";

export default function ProductCardLoader(props) {
  return (
    <div className="w-60 h-96 rounded-lg mx-2 mt-0 flex justify-center items-center flex-col  font-mono text-redwood cursor-pointer border-1 bg-salmonPink">
      <div className="h-full w-full p-2">
        <div className="h-48 w-full rounded-lg bg-pink-100 animate-pulse"></div>
      </div>
      <div className="flex justify-center items-center flex-col w-full h-full px-3 py-1 border-b-1 border-gray-300 gap-3">
        <div className="bg-pink-100 rounded-lg w-full h-10 animate-pulse"></div>
        <div className="bg-pink-100 rounded-lg w-full h-10 animate-pulse"></div>
      </div>
      <div className="bg-pink-100 rounded-md w-4/5 h-16 animate-pulse my-2"></div>
    </div>
  );
}
