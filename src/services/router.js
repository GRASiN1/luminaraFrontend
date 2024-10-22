import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage";
import ProductPage from "../pages/productPage";
import ProductDetail from "../components/productdetail/productdetail";
import Products from "../components/products/products";
import Checkout from "../pages/checkout";

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
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "productDetail/:productId",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

export default router;
