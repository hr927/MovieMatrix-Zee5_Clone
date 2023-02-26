import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer/Footer";
import MyReviewComp from "../Components/MyReviews/MyReviewComp";
import UserNavabr from "../Components/UserNavbar/UserNavbar";
import axios from "axios";
import { Stack } from "@chakra-ui/react";
import "../Styles/SingleMovie.css";
const AuthorizationToken = JSON.parse(localStorage.getItem("token")) || false;

const MyReviews = () => {
  const [totalReviews, setTotalReviews] = useState([]);
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [tokenState, setTokenState] = useState(
    JSON.parse(localStorage.getItem("token"))
  );

  
  const config = {
    headers: {
      Authorization: tokenState,
    },
  };

  function getReviews() {
    axios
      .get(`https://bronze-salamander-cuff.cyclic.app/review/myreviews`, config)
      .then((res) => {
        setTotalReviews(res.data);
      });
  }

  if (totalReviews.length > 0) {
    totalReviews.reverse();
  }

  useEffect(() => {
    const handleStorageChange = () => {
      const AuthorizationToken = JSON.parse(localStorage.getItem("token"));

      setTokenState(AuthorizationToken);
    };

    window.addEventListener("storage", handleStorageChange);
    getReviews();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [tokenState, refreshReviews]);

  return (
    <>
      <UserNavabr />
      <Stack className="entireBody" p={"30px"}>
        <Stack h={"80vh"} border={"2px solid #2a25306d"}>
          <MyReviewComp
            setRefreshReviews={setRefreshReviews}
            refreshReviews={refreshReviews}
            totalReviews={totalReviews}
          />
        </Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default MyReviews;
