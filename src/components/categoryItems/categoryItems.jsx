import React from "react";
import Card from "../../components/card/card";
import styles from "./categoryItems.module.css";

export default function CategoryItems() {
  return (
    <div
      id="categories"
      className={`${styles.categories} w-full flex flex-col justify-center items-center h-screen`}
    >
      <div className="flex flex-col justify-center items-start px-24 w-full h-full text-white gap-4 pb-1">
        <h3 className="text-7xl font-bold shadow-sm">Explore Categories!</h3>
        <p className="text-2xl font-semibold font-mono">
          We offer a wide range of categories to choose from.
        </p>
      </div>
      <div className="flex flex-wrap gap-5 flex-row justify-center items-end w-full h-full pb-12">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
