import React, { useState } from "react";

export default function Authentication({ isOpen, toggleModal }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen">
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
              {isLogin ? (
                <form
                  id="loginForm"
                  className="space-y-6 h-60 flex flex-col justify-center"
                >
                  <div>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none shadow-md shadow-gray-300"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
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
              ) : (
                <form
                  id="signupForm"
                  className="space-y-6 h-60 flex flex-col justify-center"
                >
                  <div>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none shadow-md shadow-gray-300"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none shadow-md shadow-gray-300"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
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
              )}
              <p
                className="text-center text-gray-500 mt-1 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
