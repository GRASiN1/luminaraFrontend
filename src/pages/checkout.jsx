import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Address from "../components/address/address";
import { useNavigate } from "react-router-dom";
import AddAddress from "../components/address/addAddress";
import { axiosInstance, END_POINTS } from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  function handlePayClick() {
    navigate("/payment");
  }

  async function fetchAddresses() {
    setLoading(true);
    let hasError = false;
    try {
      const response = await axiosInstance.get(END_POINTS.GET_ALL_ADDRESSES);
      console.log(response.data);
      setAddresses(response.data);
    } catch (error) {
      hasError = true;
    } finally {
      if (!hasError) setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

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
          <Address loading={loading} addresses={addresses} />
          <button
            className="w-full h-10 rounded-md text-center bg-black text-white hover:bg-salmonPink hover:text-caputMortuum"
            onClick={handlePayClick}
          >
            Order
          </button>
        </div>
      </div>
      <AddAddress
        isOpen={isOpen}
        toggleModal={toggleModal}
        fetchAddresses={fetchAddresses}
      />
      <Footer />
    </div>
  );
}
