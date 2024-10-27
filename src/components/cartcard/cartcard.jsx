import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartCard(props) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(props.product.quantity || 1);

  function trimToLength(str, wordLimit) {
    const words = str.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return str;
  }

  function updateCart(newQuantity) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const productIndex = cartItems.findIndex(
      (item) => item.productId === props.product.productId
    );

    if (productIndex !== -1) {
      cartItems[productIndex].quantity = newQuantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }

  function handleIncrease() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  }

  function handleDecrease() {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
  }

  // Calculate the total price based on the quantity
  const calculatedPrice = props.product.productPrice * quantity;

  return (
    <div className="w-60 h-max rounded-lg mx-2 mt-0 bg-transparent flex justify-center items-center flex-col font-mono text-redwood cursor-pointer border-1 bg-white">
      <div className="h-full w-full">
        <img
          onClick={() => {
            navigate(`/products/productDetail/${props.product._id}`, {
              state: { product: props.product },
            });
          }}
          src={
            props.product.productImage
              ? props.product.productImage
              : "/images/productImage.JPEG"
          }
          alt="product"
          className="h-full w-full rounded-3xl p-2 hover:p-1 hover:rounded-xl"
        />
      </div>
      <div className="flex justify-center items-center flex-col w-full h-full px-3 py-1 border-b-1 border-gray-300">
        <h3 className="text-xl font-bold">{props.product.productName}</h3>
        <p className="text-sm text-center">
          {trimToLength(props.product.productDescription, 6)}
        </p>
      </div>
      <div className="flex justify-center items-center flex-col w-full h-full px-3 py-1">
        <p className="text-sm font-bold">Price: ₹{calculatedPrice}</p>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDecrease();
            }}
            className="text-lg font-bold px-2 border rounded"
          >
            -
          </button>
          <p className="text-sm font-bold mx-2">Quantity: {quantity}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleIncrease();
            }}
            className="text-lg font-bold px-2 border rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
