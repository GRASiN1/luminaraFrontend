import React from "react";
import styles from "./intro.module.css";

export default function Gallery() {
  return (
    <div
      className={`${styles.gallery} w-full h-screen border-b-1 border-gray-200`}
    >
      <div className="flex flex-col justify-center items-start px-24 w-full h-full text-white pb-1">
        <h3 className="text-7xl font-bold shadow-sm">Welcome to</h3>
        <h3 className="text-7xl font-bold shadow-sm">Luminara Attelier</h3>
        <p className="text-xl font-thin mt-2">
          Discover our exquisite collection of handmade
        </p>
        <p className="text-xl font-thin">
          crochets items, from delicate decor to cozy apparels.
        </p>
      </div>
    </div>
  );
}
