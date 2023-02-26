import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { store } from "../Redux/store";

export default function AdminPrivateRoute({ children }) {
  //   const isAuth = useSelector((store) => store..isAuth);
  //   console.log("isAuth: ", isAuth);
  //   const jsonToken=localStorage.getItem("token")
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  console.log("location: ", location);

  let adminToken = JSON.parse(localStorage.getItem("Admin_token"));
  console.log("adminToken: ", adminToken);

  if (!adminToken) {
    // toast({
    //   title: `Please login First`,
    //   status: "success",
    //   duration: 4000,
    //   isClosable: true,
    // });
    return <Navigate to={"/admin-login"} state={location.pathname} replace />;
  }

  return children;
}
