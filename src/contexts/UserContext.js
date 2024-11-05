import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance, END_POINTS } from "../services/api";

// Create UserContext
const UserContext = createContext();

// UserProvider component to manage user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token) {
      // Set user state from localStorage if it exists
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // If user data is not in localStorage, fetch user data
        fetchUserData(token);
      }
    }
  }, []); // Function to fetch user data and set user state

  const fetchUserData = async (token) => {
    try {
      const response = await axiosInstance.get(END_POINTS.FETCH_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { _id, fullName, email, role } = response.data.user;
      setUser({ _id, fullName, email, role }); // Store user data in localStorage for future use
      localStorage.setItem(
        "user",
        JSON.stringify({ _id, fullName, email, role })
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken"); // Remove token only on unauthorized
      }
    }
  }; // Function to refetch user data on demand

  const refetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      await fetchUserData(token);
    }
  };

  async function Login(email, password) {
    const response = await axiosInstance.post(END_POINTS.LOGIN, {
      email: email,
      password: password,
    });
    const { _id, fullName, role } = response.data;
    setUser({ _id, fullName, email, role });
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ _id, fullName, email, role })
    );
    return response;
  }

  async function Signup(name, email, password) {
    const response = await axiosInstance.post(END_POINTS.SIGNUP, {
      fullName: name,
      email: email,
      password: password,
    });
    const { _id, fullName, role } = response.data.user;
    setUser({ _id, fullName, email, role }); // Update user state after signup
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ _id, fullName, email, role })
    );
    return response;
  } // Logout function

  function Logout() {
    setUser(null); // Clear user state
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  } // Provide user state and actions to the context

  return (
    <UserContext.Provider
      value={{ user, Login, Signup, Logout, refetchUser, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
