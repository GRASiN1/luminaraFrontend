import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useUser } from "../contexts/UserContext";
import { useAlert } from "../contexts/AlertContext";

export default function Authentication({ isOpen, toggleModal }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { Login, Signup } = useUser();
  const { showAlert } = useAlert();

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
      const response = isLogin
        ? await Login(formData.email, formData.password)
        : await Signup(formData.name, formData.email, formData.password);

      if (response.status === 200 || response.status === 201) {
        setErrorMessage("");
        toggleModal();
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        showAlert(
          isLogin ? "Login successful" : "Signup successful, you can now login",
          "success"
        );
        navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred, please try again.";
      showAlert(message, "error");
      setErrorMessage(message);
    }
  };

  return ReactDOM.createPortal(
    <div className="flex items-center justify-center min-h-screen fixed">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-redwood bg-opacity-90 p-8 rounded-xl shadow-lg relative max-w-4xl w-full flex flex-row items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              id="intro"
              className="w-3/5 mx-1 flex justify-center items-center"
            >
              <object
                type="image/svg+xml"
                data={`/images/${
                  isLogin ? "login-animate.svg" : "sign-up-animate.svg"
                }`}
                width={400}
              >
                Your browser does not support SVG
              </object>
            </div>
            <div
              id="authentication"
              className="w-2/5 bg-mistyRose px-8 py-4 mx-1 rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center text-blackBean border-b-1 border-salmonPink pb-3">
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
                      className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                      placeholder="Name"
                      aria-label="Name"
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
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="Email"
                    aria-label="Email"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-salmonPink rounded-md focus:outline-none shadow-md shadow-salmonPink"
                    placeholder="Password"
                    aria-label="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-salmonPink hover:text-black transition"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
              {errorMessage && (
                <p className="text-red-500 text-center mt-2">{errorMessage}</p>
              )}
              <p
                className="text-center text-redwood mt-1 cursor-pointer"
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
