// AlertContext.js
import React, { createContext, useState, useContext } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    type: "info",
    message: "",
    visible: false,
  });

  const showAlert = (message, type = "info") => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert({ message: "", type: "info", visible: false });
    }, 3000); // Alert will disappear after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
