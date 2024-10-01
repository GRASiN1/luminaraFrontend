import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CategoryItem from "../components/categoryItems/categoryItems";
import Intro from "../components/intro/intro";
import Gallery from "../components/gallery/gallery";

export default function HomePage() {
  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className="mt-18 w-full h-full flex flex-col justify-center items-center"
      >
        <Gallery />
        <Intro />
        <CategoryItem />
      </div>
      <Footer />
    </div>
  );
}
