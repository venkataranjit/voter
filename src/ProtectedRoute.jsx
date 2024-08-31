// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const user = useContext(AuthContext);
  // Check if the user is authenticated; if not, redirect to the login page
  if (!user.userName) {
    return <Navigate to="/login" />;
  }

  // Render the children component if the user is authenticated
  return children;
};

export default ProtectedRoute;
