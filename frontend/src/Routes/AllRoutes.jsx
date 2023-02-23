import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../Components/Admin/Admin";
import AdminMedia from "../Components/Admin/AdminMedia";
import AdminUsers from "../Components/Admin/AdminUsers";
import CreateMedia from "../Components/Admin/CreateMedia";
import UpdateMedia from "../Components/Admin/UpdateMedia";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/admin/createmedia" element={<CreateMedia />}></Route>
      <Route path="/admin/users" element={<AdminUsers />}></Route>
      <Route path="/admin/media" element={<AdminMedia />}></Route>
      <Route path="/admin/updatemedia/:id" element={<UpdateMedia />}></Route>
    </Routes>
  );
};

export default AllRoutes;
