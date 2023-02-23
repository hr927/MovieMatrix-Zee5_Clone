import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Sighup from "../Components/Sighup";
import Admin from "../Components/Admin/Admin";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/sighup" element={<Sighup></Sighup>} />
        <Route path="/login" element={<Login />} />
         <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

