import LoginPage from "./components/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashBoardLayout from "./layout/DashboardLayout";
import DashboardHome from "./components/DashboardHome";
import { useAuthStore } from "./stores/auth_store";

function App() {
  const { token } = useAuthStore.getState();

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={<DashBoardLayout children={<DashboardHome />} />}
          />
        }
      />

      <Route
        path="/users/:id"
        element={
          <ProtectedRoute
            element={<h2>User Profile for authenticated users</h2>}
          />
        }
      />

      {/* Catch all unknown routes */}
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
