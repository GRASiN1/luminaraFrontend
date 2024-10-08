import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();
  return (
    <div
      className="w-60 h-max rounded-lg mx-2 mt-0 bg-transparent flex justify-center items-center flex-col  font-mono text-white cursor-pointer"
      onClick={() => {
        navigate("/products", { state: { category: props.title } });
      }}
    >
      <div className="h-full w-full">
        <img
          src={props.image ? props.image : "/images/productImage.JPEG"}
          alt="product"
          className="h-full w-full rounded-3xl p-2 hover:p-1 hover:rounded-xl"
        />
      </div>
      <div className="flex justify-center items-center flex-col w-full h-full px-3 py-1 border-b-1 border-gray-300">
        <h3 className="text-xl font-bold">{props.title}</h3>
      </div>
      <button className="h-full w-full flex justify-center items-center p-2 border-t-2 border-transparent transition-border-color duration-500 ease-in-out hover:border-pink-300 ">
        Check More From This
      </button>
    </div>
  );
}
