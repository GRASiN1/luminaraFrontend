import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const navigate = useNavigate();

  function trimToLength(str, wordLimit) {
    const words = str.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return str;
  }

  return (
    <div
      className="w-60 h-max rounded-lg mx-2 mt-0 bg-transparent flex justify-center items-center flex-col  font-mono text-redwood cursor-pointer border-1 bg-white"
      onClick={() => {
        navigate(`/products/productDetail/${props.product._id}`, {
          state: { product: props.product },
        });
      }}
    >
      <div className="h-full w-full">
        <img
          src={
            props.product.image
              ? props.product.image
              : "/images/productImage.JPEG"
          }
          alt="product"
          className="h-full w-full rounded-3xl p-2 hover:p-1 hover:rounded-xl"
        />
      </div>
      <div className="flex justify-center items-center flex-col w-full h-full px-3 py-1 border-b-1 border-gray-300">
        <h3 className="text-xl font-bold">{props.product.name}</h3>
        <p className="text-sm text-center">
          {trimToLength(props.product.description, 6)}
        </p>
      </div>
      <button className="h-full w-full flex justify-center items-center p-2 border-t-2 border-transparent transition-border-color duration-500 ease-in-out hover:border-pink-300 ">
        Buy
      </button>
    </div>
  );
}
