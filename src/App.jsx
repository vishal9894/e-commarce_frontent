import { Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import HomePage from "./pages/HomePage";
import Login from "./auth/Login";
import SignupPage from "./auth/SignupPage";
import ProtectedRoute from "./context/ProtectedRoute";
import PersonalInfo from "./pages/PresnalInfo";
import OrderedProduct from "./pages/OrderdProduct";
import WishListCard from "./components/WishListCard";
import AddCard from "./pages/AddCard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* Toaster must be outside Routes */}
      <Toaster position="top-center" reverseOrder={false} />

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
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/precnal_info" element={<PersonalInfo />} />
          <Route path="/order_details" element={<OrderedProduct />} />
          <Route path="/wish_list" element={<WishListCard />} />
          <Route path="/card_items" element={<AddCard />} />
        </Route>

        {/* Public Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
