import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const product = JSON.parse(localStorage.getItem("product"));

  const [count, setCount] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          navigate("/products");
          clearInterval(interval);
          return prevCount;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className="mt-18 w-full h-full flex flex-col justify-center items-center"
      >
        <div className="min-h-screen w-full p-10">
          <div className="m-1 border-1 w-full rounded-lg border-mistyRose p-5">
            <h1 className="text-2xl w-full border-b-1 border-mistyRose font-bold">
              Order Successful
            </h1>
            <div className="flex flex-col mt-1 border-b-1 border-mistyRose">
              <h3 className="text-xl font-semibold">Delivery address</h3>
              <h4 className="text-lg">{address.fullName}</h4>
              <p>{address.fullAddress}</p>
              <p>
                {address.city}, {address.state} - {address.pinCode}
              </p>
              <p>
                {address.phoneNumber} - {address.email}
              </p>
            </div>
            <div className="flex flex-col mt-1">
              <h3 className="text-xl font-semibold">Product Ordered</h3>
              <h4 className="text-lg">{product.productName}</h4>
              <p>₹{product.productPrice}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          </div>
          <div className="m-1 border-1 w-full rounded-lg border-mistyRose p-5 flex justify-center items-center">
            <h3>You will be redirected to product page in {count} sec</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
