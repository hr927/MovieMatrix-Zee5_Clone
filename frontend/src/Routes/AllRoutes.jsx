import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../Components/Admin/Admin";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
};

export default AllRoutes;
