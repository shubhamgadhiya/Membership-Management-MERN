import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.Auth);

  return !auth?.isAuth ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PrivateRoute;
