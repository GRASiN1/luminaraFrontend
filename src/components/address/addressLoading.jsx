import React from "react";

export default function AddressLoading() {
  return (
    <div className="border-b-1 border-redwood p-2 cursor-pointer flex flex-col gap-2">
      <h3 className="w-2/6 h-5 bg-salmonPink rounded-sm animate-pulse"></h3>
      <p className="w-4/5 h-10 bg-salmonPink rounded-sm animate-pulse"></p>
      <div className="flex flex-row gap-5">
        <p className="w-1/4 h-5 bg-salmonPink rounded-sm animate-pulse"></p>
        <p className="w-1/4 h-5 bg-salmonPink rounded-sm animate-pulse"></p>
        <p className="w-1/4 h-5 bg-salmonPink rounded-sm animate-pulse"></p>
      </div>
      <div className="flex flex-row gap-5">
        <p className="w-1/3 h-5 bg-salmonPink rounded-sm animate-pulse"></p>
        <p className="w-1/3 h-5 bg-salmonPink rounded-sm animate-pulse"></p>
      </div>
    </div>
  );
}
