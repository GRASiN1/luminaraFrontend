import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage";
import Authentication from "../pages/authentication";

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
    path: "/authenticate",
    element: <Authentication />,
  },
]);

export default router;
