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

  function handleAddToWishList() {}

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
            props.product.productImage
              ? props.product.productImage
              : "/images/productImage.JPEG"
          }
          alt="product"
          className="h-full w-full rounded-3xl p-2 hover:p-1 hover:rounded-xl"
        />
      </div>
      <div className="flex justify-center items-center flex-col w-full h-full px-3 py-1 border-b-1 border-gray-300">
        <h3 className="text-xl font-bold">{props.product.productName}</h3>
        <p className="text-sm text-center">
          {trimToLength(props.product.productDescription, 6)}
        </p>
      </div>
      <div className="h-full w-full flex flex-row justify-around items-center p-2 border-t-2 border-transparent transition-border-color duration-500 ease-in-out hover:border-pink-300 ">
        <button className="text-center border-r-2 w-full hover:text-lg text-sm h-full py-2 hover:py-1">
          Check
        </button>
        <svg
          onClick={handleAddToWishList}
          xmlns="http://www.w3.org/2000/svg"
          height="25px"
          viewBox="0 -960 960 960"
          width="25px"
          fill="#000000"
          className="cursor-pointer mx-7 hover:fill-salmonPink fill-redwood"
        >
          <path d="m479-91-56-50q-106.77-99.12-177.38-170.56Q175-383 133-441T74.5-546.5Q58-594 58-642.1q0-99.24 66.86-166.57Q191.73-876 289-876q56.29 0 104.64 24.5Q442-827 479-780q42-49 88.53-72.5Q614.07-876 669-876q98.97 0 165.99 67.36Q902-741.28 902-642q0 47.97-17 94.99Q868-500 826.5-442 785-384 714.52-311.95 644.03-239.9 536-141l-57 50Zm-.5-120q100.74-92 165.12-157Q708-433 745-481t51.5-86.78q14.5-38.79 14.5-74.31Q811-703 770.64-744t-100.93-41q-49.01 0-91.36 32.5T508-664h-58q-26.75-56-70.43-88.5-43.68-32.5-90.63-32.5-60.21 0-99.58 40.07Q150-704.86 150-641.68q0 36.77 14.94 75.84t52 87.46Q254-430 317-365t161.5 154Zm2.5-288Z" />
        </svg>
      </div>
    </div>
  );
}
