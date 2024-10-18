import React from "react";
import router from "./services/router";
import { RouterProvider } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  return (
    <AlertProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AlertProvider>
  );
}

export default App;
