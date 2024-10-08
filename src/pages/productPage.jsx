import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Products from "../components/products/products";

export default function ProductPage() {
  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className="mt-18 w-full h-full flex flex-col justify-center items-center"
      >
        <Products />
      </div>
      <Footer />
    </div>
  );
}
