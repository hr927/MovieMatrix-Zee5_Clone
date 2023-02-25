import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Sighup from "../Components/Sighup";
import Admin from "../Components/Admin/Admin";
import ForgetPassword from "../Components/ForgetPassword";
import ResetPassword from "../Components/ResetPassword";
import AdminLogin from "../Components/AdminLogin";
import ProfilePage from "../Components/ProfilePage";

import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import SingleMovie from "../Pages/SingleMovie";
import TVShows from "../Pages/TVshows";
import MyReviews from "../Pages/MyReviews";

import AdminMedia from "../Components/Admin/AdminMedia";
import AdminUsers from "../Components/Admin/AdminUsers";
import CreateMedia from "../Components/Admin/CreateMedia";
import UpdateMedia from "../Components/Admin/UpdateMedia";

import Watchlist from "../Components/WatchList";

// import ProfilePage2 from "./ProfilePage2";


export default function AllRoutes() {
  return (
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/profile-page" element={<ProfilePage />} />

        <Route path="/sighup" element={<Sighup></Sighup>} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/admin-login" element={<AdminLogin />} />
      
      <Route path="/tvshows" element={<TVShows />}></Route>
      <Route path="/movies" element={<Movies />}></Route>
      <Route path="/details/:id" element={<SingleMovie />}></Route>
      <Route path="/admin/createmedia" element={<CreateMedia />}></Route>
      <Route path="/admin/users" element={<AdminUsers />}></Route>
      <Route path="/admin/media" element={<AdminMedia />}></Route>
      <Route path="/admin/updatemedia/:id" element={<UpdateMedia />}></Route>

      <Route path="/sighup" element={<Sighup></Sighup>} />

      <Route path="/login" element={<Login />} />
      <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>}></Route>
  
      <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}></Route>

      <Route path="/myreviews" element={<MyReviews />} />
  </Routes>
  );
}
