import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  return Boolean(user) ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
