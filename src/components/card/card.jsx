import React from "react";

export default function CardItem() {
  return (
    <div className="w-1/6 h-1/6 rounded-lg m-2 bg-white flex justify-center items-center flex-col border-1 font-mono">
      <img
        src="/images/productImage.jpg"
        alt="product"
        className="h-full w-full rounded-xl p-2"
      />
      <div className="flex justify-center items-start flex-col px-3 py-1">
        <h4>Lorem, ipsum dolor.</h4>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </div>
  );
}
