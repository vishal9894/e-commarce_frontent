import { Routes, Route } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import HomePage from "./pages/HomePage";
import Login from "./auth/Login";
import SignupPage from "./auth/SignupPage";
import ProtectedRoute from "./context/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
      </Route>

      {/* Public Routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
