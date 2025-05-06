import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const ProtectedRoute = ({ roles: allowedRoles }) => {
  const userToken = localStorage.getItem("userToken"); // Retrieve token from localStorage

  if (!userToken) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  try {
    const decodedToken = jwtDecode(userToken); // Decode the token
    const userRole = decodedToken.role; // Extract user role
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    if (decodedToken.exp < currentTime) {
      console.warn("Token expired, logging out...");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      return <Navigate to="/login" replace />; // Redirect if token is expired
    }

    // Check if the user's role is authorized
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />; // Redirect if unauthorized
    }

    return <Outlet />; // Render the protected component
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo"); // Clear invalid token
    return <Navigate to="/login" replace />; // Redirect to login
  }
};

export default ProtectedRoute;
