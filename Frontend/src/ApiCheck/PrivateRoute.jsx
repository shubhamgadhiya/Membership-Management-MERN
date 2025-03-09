import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Components/Header";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.Auth);

  return auth?.isAuth ? <>
  <Header/><Outlet /></> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
