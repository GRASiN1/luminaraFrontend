import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Address from "../components/address/address";
import { useNavigate } from "react-router-dom";
import AddAddress from "../components/address/addAddress";

export default function Checkout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  function handlePayClick() {
    navigate("/payment");
  }

  return (
    <div id="main-container">
      <Navbar />
      <div
        id="content"
        className=" w-full min-h-screen flex flex-col justify-center items-center bg-pink-50"
      >
        <div className="flex flex-col justify-center items-center w-full h-full px-10  gap-5">
          <button
            className="w-full h-10  border-caputMortuum border-2 rounded-md text-center bg-pink-50 text-caputMortuum"
            onClick={toggleModal}
          >
            +
          </button>
          <Address />
          <button
            className="w-full h-10 rounded-md text-center bg-black text-white hover:bg-salmonPink hover:text-caputMortuum"
            onClick={handlePayClick}
          >
            Pay
          </button>
        </div>
      </div>
      <AddAddress isOpen={isOpen} toggleModal={toggleModal} />
      <Footer />
    </div>
  );
}
