import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth_store";
import React from "react";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return element;
};

export default ProtectedRoute;
