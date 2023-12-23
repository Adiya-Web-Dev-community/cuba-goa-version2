import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const token = JSON.parse(localStorage.getItem("user"));
  console.log(token);
  if (token?.authorization) {
    return <Outlet />;
  } else {
    return <Navigate to="/landing-page" />;
  }
}
export default PrivateRoute;
