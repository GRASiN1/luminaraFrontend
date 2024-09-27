import React, { useState } from "react";
import { axiosInstance, END_POINTS } from "../services/api";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

export default function Authentication({ isOpen, toggleModal }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    if (!isLogin && formData.name.trim() === "") {
      setErrorMessage("Name is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axiosInstance.post(
        isLogin ? END_POINTS.LOGIN : END_POINTS.SIGNUP,
        formData
      );
      console.log("API response:", response.data);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("authToken", response.data.token);
        setErrorMessage(""); // Clear any previous error messages
        toggleModal(); // Close the modal
        // Reset the form data after success
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("API error:", error);
      setErrorMessage("An error occurred, please try again.");
    }
  };

  return ReactDOM.createPortal(
    <div className="flex items-center justify-center min-h-screen fixed">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-black bg-opacity-90 p-8 rounded-xl shadow-lg relative max-w-4xl w-full flex flex-row items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div id="intro" className="w-3/5 mx-1"></div>
            <div
              id="authentication"
              className="w-2/5 bg-white px-8 py-4 mx-1 rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center border-b-1 border-gray-300 pb-3">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 h-60 flex flex-col justify-center"
              >
                {!isLogin && (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none shadow-md shadow-gray-300"
                      placeholder="Name"
                      required={!isLogin}
                    />
                  </div>
                )}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none shadow-md shadow-gray-300"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none shadow-md shadow-gray-300"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-yellow-400 hover:text-black transition"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
              {errorMessage && (
                <p className="text-red-500 text-center mt-2">{errorMessage}</p>
              )}
              <p
                className="text-center text-gray-500 mt-1 cursor-pointer"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrorMessage(""); // Reset error when toggling forms
                }}
              >
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.querySelector("#authenticationModal")
  );
}
