import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  allowedRole
}) => {

  const user =
    JSON.parse(
      localStorage.getItem("userinfo")
    );

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/" />;
  }

  // ROLE CHECK
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    return <Navigate to="/" />;
  }

  return children;
};