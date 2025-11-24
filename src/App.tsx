import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
// Note: We no longer need to import useAuthStore here if ProtectedRoute handles it

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />

      <Route
        path="/users/:id"
        element={
          <ProtectedRoute
            element={<h2>User Profile for authenticated users</h2>}
          />
        }
      />
    </Routes>
  );
}

export default App;
