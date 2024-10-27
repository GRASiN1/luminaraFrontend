import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CartCard from "../components/cartcard/cartcard";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const navigate = useNavigate();

  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className="mt-18 w-full h-full flex flex-col justify-center items-center bg-pink-50"
      >
        <button
          className="w-full md:w-auto py-1 px-3 text-white rounded bg-redwood mt-5"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Checkout
        </button>
        <div className="w-full flex justify-center items-start min-h-screen">
          <div className="w-full h-full m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center justify-items-center">
            {cartItems.map((item, index) => {
              return <CartCard key={index} product={item} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
