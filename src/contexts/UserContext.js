import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance, END_POINTS } from "../services/api";

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false); // Flag to track loading completion

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // If token exists, fetch user data
      fetchUserData(token);
    } else {
      // If no token, mark loading as complete
      setIsUserLoaded(true);
    }
  }, []);

  // Function to fetch user data and set user state
  const fetchUserData = async (token) => {
    try {
      const response = await axiosInstance.get(END_POINTS.FETCH_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { _id, fullName, email, role } = response.data;
      setUser({ _id, fullName, email, role });
      // Store user data in localStorage for future use
      localStorage.setItem(
        "user",
        JSON.stringify({ _id, fullName, email, role })
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken"); // Remove token only on unauthorized
      }
    } finally {
      setIsUserLoaded(true); // Mark loading complete regardless of fetch success
    }
  };

  // Function to refetch user data on demand
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
    const { _id, fullName, role } = response.data;
    setUser({ _id, fullName, email, role }); // Update user state after signup
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ _id, fullName, email, role })
    );
    return response;
  }

  function Logout() {
    setUser(null); // Clear user state
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider
      value={{
        user,
        Login,
        Signup,
        Logout,
        refetchUser,
        setUser,
        isUserLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
