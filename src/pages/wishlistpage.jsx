import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

export default function WishlistPage() {
  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className="mt-18 w-full min-h-screen flex flex-col justify-center items-center bg-purple-50"
      >
        working on wishlist part
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
