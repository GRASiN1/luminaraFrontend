import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CardItem from "../components/card/card";

export default function HomePage() {
  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className="mt-18 w-full h-full flex flex-col justify-center items-center"
      >
        <div id="gallery">Scrolling Gallery Here</div>
        <div
          id="categories"
          className="w-full flex flex-wrap justify-center items-center mt-10 h-max"
        >
          <CardItem />
        </div>
      </div>
      <Footer />
    </div>
  );
}
