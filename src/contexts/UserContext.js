import React, { createContext, useState, useContext } from "react";
import { axiosInstance, END_POINTS } from "../services/api";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function Login(email, password) {
    // TODO: implement login logic here
    const response = await axiosInstance.post(END_POINTS.LOGIN, {
      email,
      password,
    });
    setUser(response.data.user);
    localStorage.setItem("authToken", response.data.token);
    return response;
  }
  async function Signup(name, email, password) {
    // TODO: implement login logic here
    const response = await axiosInstance.post(END_POINTS.SIGNUP, {
      name,
      email,
      password,
    });
    setUser(response.data.user);
    localStorage.setItem("authToken", response.data.token);
    return response;
  }
  function Logout() {
    // TODO: implement login logic here
    setUser(null);
    localStorage.removeItem("authToken");
  }

  return (
    <UserContext.Provider value={{ user, Login, Signup, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
