import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const user = {
  name: "GRASiN",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar user={user} />
      </div>
    ),
  },
]);

export default router;
