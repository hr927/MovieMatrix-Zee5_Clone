import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer/Footer";
import MyReviewComp from "../Components/MyReviews/MyReviewComp";
import UserNavabr from "../Components/UserNavbar/UserNavbar";
import axios from "axios";
import { Stack, Text } from "@chakra-ui/react";
import "../Styles/SingleMovie.css";
const AuthorizationToken = localStorage.getItem("token");

const MyReviews = () => {
  const [totalReviews, setTotalReviews] = useState([]);
  const [refreshReviews, setRefreshReviews] = useState(false);

  const config = {
    headers: {
      Authorization: AuthorizationToken,
    },
  };

  function getReviews() {
    axios.get(`http://localhost:8080/review/myreviews`, config).then((res) => {
      setTotalReviews(res.data);
    });
  }

  totalReviews.reverse();

  useEffect(() => {
    getReviews();
  }, [refreshReviews]);

  return (
    <>
      <UserNavabr />
      <Stack p={"30px"} className="entireBody">
        <MyReviewComp
          setRefreshReviews={setRefreshReviews}
          refreshReviews={refreshReviews}
          totalReviews={totalReviews}
        />
      </Stack>
      <Footer />
    </>
  );
};

export default MyReviews;
