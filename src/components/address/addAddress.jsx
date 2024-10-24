import React, { useState } from "react";
// import { axiosInstance, END_POINTS } from "../services/api";
import ReactDOM from "react-dom";
import { useAlert } from "../../contexts/AlertContext";
import { axiosInstance, END_POINTS } from "../../services/api";

export default function AddAddress({ isOpen, toggleModal }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pin_code: "",
    city: "",
    state: "",
    contact_number: "",
    email: "",
  });
  const { showAlert } = useAlert();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    if (formData.name.trim() === "") {
      return false;
    }
    if (formData.address.trim() === "") {
      return false;
    }
    if (!/^\d{6}$/.test(formData.pin_code)) {
      return false;
    }
    if (formData.city.trim() === "") {
      return false;
    }
    if (formData.state.trim() === "") {
      return false;
    }
    if (!/^\+?\d{10,13}$/.test(formData.contact_number)) {
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axiosInstance.post(
        END_POINTS.ADD_ADDRESS,
        formData
      );
      console.log("API response:", response.data);

      if (response.status === 200 || response.status === 201) {
        toggleModal();
        setFormData({
          name: "",
          address: "",
          pin_code: "",
          city: "",
          state: "",
          contact_number: "",
          email: "",
        });
        showAlert("Address added successfully", "success");
      }
    } catch (error) {
      console.error("API error:", error);
      showAlert(error.message, "error");
    }
  };

  return ReactDOM.createPortal(
    <div className="flex items-center justify-center min-h-screen fixed">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 mt-18"
          onClick={toggleModal}
        >
          <div
            className="bg-redwood bg-opacity-90 p-6 rounded-xl shadow-lg relative max-w-4xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              id="address"
              className="w-full bg-mistyRose px-8 py-4 mx-1 rounded-lg"
            >
              <h2 className="text-3xl font-bold text-redwood mb-2">
                Enter your details
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-6  flex flex-col justify-center"
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="Aisha Khan"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="123 Maple Street, Apartment 4B"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pin_code}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="226010"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="Lucknow"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="Uttat Pradesh"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="+91 9123456789"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="aisha.khan@example.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-salmonPink hover:text-black transition"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.querySelector("#addressModal")
  );
}
