import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Sighup from "../Components/Sighup";
import Admin from "../Components/Admin/Admin";

import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import SingleMovie from "../Pages/SingleMovie";
import TVShows from "../Pages/TVshows";

import AdminMedia from "../Components/Admin/AdminMedia";
import AdminUsers from "../Components/Admin/AdminUsers";
import CreateMedia from "../Components/Admin/CreateMedia";
import UpdateMedia from "../Components/Admin/UpdateMedia";


export default function AllRoutes() {
  return (

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/tvshows" element={<TVShows/>}></Route>
      <Route path="/movies" element={<Movies/>}></Route>
      <Route path="/details/:id" element={<SingleMovie/>}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/admin/createmedia" element={<CreateMedia />}></Route>
      <Route path="/admin/users" element={<AdminUsers />}></Route>
      <Route path="/admin/media" element={<AdminMedia />}></Route>
      <Route path="/admin/updatemedia/:id" element={<UpdateMedia />}></Route>
      <Route path="/sighup" element={<Sighup></Sighup>} />
        <Route path="/login" element={<Login />} />
         <Route path="/admin" element={<Admin />}></Route>
    </Routes>

   
       
      

  );
}

