import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage";

// eslint-disable-next-line
const user = {
  name: "GRASiN",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default router;
