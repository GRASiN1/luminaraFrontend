import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance, END_POINTS } from "../services/api";

// Create UserContext
const UserContext = createContext();

// UserProvider component to manage user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Check for token in localStorage and fetch user data on mount

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axiosInstance
        .get(END_POINTS.FETCH_USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    }
  }, []); // Login function

  async function Login(email, password) {
    const response = await axiosInstance.post(END_POINTS.LOGIN, {
      email: email,
      password: password,
    });
    setUser(response.data.user); // Update user state after login
    localStorage.setItem("authToken", response.data.token);
    return response;
  } // Signup function

  async function Signup(name, email, password) {
    const response = await axiosInstance.post(END_POINTS.SIGNUP, {
      fullName: name,
      email: email,
      password: password,
    });
    setUser(response.data.user); // Update user state after signup
    localStorage.setItem("authToken", response.data.token);
    return response;
  } // Logout function

  function Logout() {
    setUser(null); // Clear user state
    localStorage.removeItem("authToken");
  } // Provide user state and actions to the context

  return (
    <UserContext.Provider value={{ user, Login, Signup, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
