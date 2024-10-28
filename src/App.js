import React from "react";
import router from "./services/router";
import { RouterProvider } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <ProductProvider>
          <CartProvider>
            <div className="App">
              <RouterProvider router={router} />
            </div>
          </CartProvider>
        </ProductProvider>
      </AlertProvider>
    </UserProvider>
  );
}

export default App;
