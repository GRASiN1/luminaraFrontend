import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage";
import ProductPage from "../pages/productPage";

// eslint-disable-next-line
const user = {
  name: "GRASiN",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
]);

export default router;
