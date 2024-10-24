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
        setUser(JSON.parse(userData)); // Parse user data from localStorage
      } else {
        // If user data is not in localStorage, fetch user data
        axiosInstance
          .get(END_POINTS.FETCH_USER, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data.user);
            // Store user data in localStorage for future use
            const { _id, fullName, email, role } = response.data.user;
            localStorage.setItem(
              "user",
              JSON.stringify({ _id, fullName, email, role })
            );
          })
          .catch((error) => {
            // Handle the error appropriately, do not remove the token here
            console.error("Error fetching user data:", error);
            // Optionally, you can handle specific error codes to log out
            if (error.response && error.response.status === 401) {
              localStorage.removeItem("authToken"); // Remove token only on unauthorized
            }
          });
      }
    }
  }, []);

  async function Login(email, password) {
    const response = await axiosInstance.post(END_POINTS.LOGIN, {
      email: email,
      password: password,
    });
    setUser(response.data.user);
    localStorage.setItem("authToken", response.data.token);
    const { _id, fullName, role } = response.data.user;
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
    setUser(response.data.user); // Update user state after signup
    localStorage.setItem("authToken", response.data.token);
    const { _id, fullName, role } = response.data.user;
    localStorage.setItem(
      "user",
      JSON.stringify({ _id, fullName, email, role })
    );
    return response;
  }

  // Logout function
  function Logout() {
    setUser(null); // Clear user state
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  // Provide user state and actions to the context
  return (
    <UserContext.Provider value={{ user, Login, Signup, Logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
