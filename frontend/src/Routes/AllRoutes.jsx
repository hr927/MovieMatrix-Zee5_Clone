import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../Components/Admin/Admin";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import SingleMovie from "../Pages/SingleMovie";
import TVShows from "../Pages/TVshows";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/tvshows" element={<TVShows/>}></Route>
      <Route path="/movies" element={<Movies/>}></Route>
      <Route path="/details/:id" element={<SingleMovie/>}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
};

export default AllRoutes;
