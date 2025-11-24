import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth_store"; // Adjust the path as necessary
import React from "react";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

/**
 * A wrapper component that checks for user authentication.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
    
  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
