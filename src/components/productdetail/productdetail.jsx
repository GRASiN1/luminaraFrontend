import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";

export default function ProductDetail() {
  const location = useLocation();
  const { product } = location.state;
  const [cartItems, setCartItems] = useState([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  function handleAddToCart() {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      // If the product doesn't exist, add it to the cart
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newItem])
      );
    }
    showAlert("Product added to cart", "Success");
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-row bg-pink-50">
      <div className="w-full h-full flex flex-row justify-around items-center p-10">
        <div className="w-1/2 flex justify-center items-center p-2">
          <img
            src={product.image}
            alt={product.name}
            width={450}
            className="rounded-md"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-start items-start">
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3">
            <h3 className="text-4xl font-bold">{product.name}</h3>
            <p className="text-xl">{product.description}</p>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3 my-2">
            <p className="text-xl">₹ {product.price}</p>
            <div className="w-full flex flex-row justify-start items-center gap-5 my-3">
              <Link
                to="/cart"
                className="bg-black px-3 py-1 text-white rounded-md hover:bg-salmonPink hover:text-black"
              >
                Buy
              </Link>
              <button
                onClick={handleAddToCart}
                className="bg-black px-3 py-1 text-white rounded-md hover:bg-salmonPink hover:text-black"
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3">
            <h3 className="text-xl font-semibold">Product Details</h3>
            {Object.entries(product.details).map(([key, value]) => {
              return (
                <p key={key} className="text-lg">
                  {key} : {value}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
