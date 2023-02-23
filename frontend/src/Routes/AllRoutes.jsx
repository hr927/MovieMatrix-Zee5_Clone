import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Sighup from "../Components/Sighup";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/sighup" element={<Sighup></Sighup>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
