import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Sighup from "../Components/Sighup";
import Admin from "../Components/Admin/Admin";
import ForgetPassword from "../Components/ForgetPassword";
import ResetPassword from "../Components/ResetPassword";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/sighup" element={<Sighup></Sighup>} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}
