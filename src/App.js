import React from "react";
import router from "./services/router";
import { RouterProvider } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </AlertProvider>
    </UserProvider>
  );
}

export default App;
