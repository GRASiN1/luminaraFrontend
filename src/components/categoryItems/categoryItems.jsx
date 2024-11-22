import React from "react";
import Card from "../../components/card/card";
import styles from "./categoryItems.module.css";
// import { useEffect, useState } from "react";
// import { axiosInstance, END_POINTS } from "../../services/api";

export default function CategoryItems() {
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   async function handleLoad() {
  //     const result = await axiosInstance.get(END_POINTS.GET_CATEGORIES);
  //     setCategories(result.data);
  //   }
  //   handleLoad();
  // }, []);

  const categories = [
    {
      title: "Apparel",
      description: "These are jewelry item made out of wool",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLG-vq9RueF-dT59_mCiQ7WZstV6Fgx7Nb8A&s",
    },
    {
      title: "Baby & Kids",
      description: "These are soft toys made out of wool and cotton",
      image:
        "https://rukminim2.flixcart.com/image/850/1000/l52sivk0/stuffed-toy/n/q/1/amigurumi-handmade-crochet-soft-toy-for-babies-gifting-baby-original-imagftvvrkapc3gq.jpeg?q=90&crop=false",
    },
    {
      title: "Home Decor",
      description:
        "These are home decor items made out of wool, cotton and cardboard",
      image:
        "https://i.etsystatic.com/30746888/r/il/28b893/4642027745/il_570xN.4642027745_shic.jpg",
    },
  ];

  return (
    <div
      id="categories"
      className={`${styles.categories} w-full flex flex-col justify-center items-center min-h-screen overflow-auto py-28`}
    >
      <div className="flex flex-col justify-center items-start px-6 md:px-24 w-full text-white gap-4 pb-1 my-10">
        <h3 className="text-4xl md:text-7xl font-bold shadow-sm">
          Explore Categories!
        </h3>
        <p className="text-xl md:text-2xl font-semibold font-mono">
          We offer a wide range of categories to choose from.
        </p>
      </div>
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center justify-items-center">
        {categories.map((category, index) => {
          return (
            <Card
              key={index}
              title={category.title}
              description={category.description}
              image={category.image}
            />
          );
        })}
      </div>
    </div>
  );
}
