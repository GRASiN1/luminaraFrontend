import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

export default function HomePage() {
  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className="mt-18 w-full h-full flex flex-col justify-center items-center"
      >
        <div id="gallery">Scrolling Gallery Here</div>
        <div id="categories">All Categories Here</div>
      </div>
      <Footer />
    </div>
  );
}
