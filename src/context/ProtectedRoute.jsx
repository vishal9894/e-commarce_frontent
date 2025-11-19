import React from "react";
import { Navigate } from "react-router-dom";
import { useApi } from "./ApiContext";

const ProtectedRoute = ({ children }) => {
  const isAuthonticated = localStorage.getItem("token")

  console.log(isAuthonticated , "check conext");
  

  if (!isAuthonticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
