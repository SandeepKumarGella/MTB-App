import { Routes, Route } from "react-router-dom";

import Movies from "../pages/Movies";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyTickets from "../pages/MyTickets";
import BookTicket from "../pages/BookTicket";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import AdminDashboard from "../pages/AdminDashboard";

const AppRoutes = () => {

  return (
      <Routes>

        <Route path="/" element={<Movies />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/my-tickets" element={<MyTickets />} />

        <Route path="/book/:id" element={<BookTicket />} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
  );
};

export default AppRoutes;