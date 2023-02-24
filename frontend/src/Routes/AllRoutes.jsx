import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Sighup from "../Components/Sighup";
import Admin from "../Components/Admin/Admin";
import AdminMedia from "../Components/Admin/AdminMedia";
import AdminUsers from "../Components/Admin/AdminUsers";
import CreateMedia from "../Components/Admin/CreateMedia";
import UpdateMedia from "../Components/Admin/UpdateMedia";

export default function AllRoutes() {
  return (

    <Routes>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/admin/createmedia" element={<CreateMedia />}></Route>
      <Route path="/admin/users" element={<AdminUsers />}></Route>
      <Route path="/admin/media" element={<AdminMedia />}></Route>
      <Route path="/admin/updatemedia/:id" element={<UpdateMedia />}></Route>
    </Routes>

    <div>
      <Routes>
        <Route path="/sighup" element={<Sighup></Sighup>} />
        <Route path="/login" element={<Login />} />
         <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>

  );
}

