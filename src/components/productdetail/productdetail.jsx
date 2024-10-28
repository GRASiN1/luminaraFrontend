import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAlert } from "../../contexts/AlertContext";

export default function ProductDetail() {
  const location = useLocation();
  const { product } = location.state;
  const { showAlert } = useAlert();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  function handleBuy() {
    const existingProductIndex = cartItems.find(
      (item) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      removeFromCart(product._id);
    }
    const newItem = { ...product, quantity: 1 };
    localStorage.setItem("product", JSON.stringify(newItem));
    navigate("/checkout");
  }

  function handleAddToCart() {
    addToCart(product);
    showAlert("Product added to cart", "Success");
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-row bg-pink-50">
      <div className="w-full h-full flex flex-row justify-around items-center p-10">
        <div className="w-1/2 flex justify-center items-center p-2">
          <img
            src={product.productImage}
            alt={product.productName}
            width={450}
            className="rounded-md"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-start items-start">
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3">
            <h3 className="text-4xl font-bold">{product.productName}</h3>
            <p className="text-xl">{product.productDescription}</p>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3 my-2">
            <p className="text-xl">₹ {product.productPrice}</p>
            <div className="w-full flex flex-row justify-start items-center gap-5 my-3">
              <button
                onClick={handleBuy}
                className="bg-black px-3 py-1 text-white rounded-md hover:bg-salmonPink hover:text-black"
              >
                Buy
              </button>
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
            {Object.entries(product.details).map(([key, value]) => (
              <p key={key} className="text-lg">
                {key} : {value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
