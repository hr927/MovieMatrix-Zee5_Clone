import { Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/SingleMovie.css";
import Trailer from "../Components/SingleMovieComps/Trailer";
import Details from "../Components/SingleMovieComps/Details";
import Recommended from "../Components/SingleMovieComps/Recommended";
import Cast from "../Components/SingleMovieComps/Cast";
import { useParams } from "react-router-dom";
import LoadingComp from "../Components/SingleMovieComps/LoadingComp";
import TagsRecommended from "../Components/SingleMovieComps/TagsRecommendation";
import ReviewSection from "./../Components/SingleMovieComps/ReviewSection";
import Footer from "../Components/Footer/Footer";
import UserNavabr from "./../Components/UserNavbar/UserNavbar";

const SingleMovie = () => {
  const params = useParams();
  const id = params.id;
  const [singleMovieData, setSingleMovieData] = useState([]);
  const [loader, setLoader] = useState(true);

  function getData(id) {
    axios
      .get(`https://bronze-salamander-cuff.cyclic.app/media/details/${id}`)
      .then((res) => {
        console.log(res.data);
        setSingleMovieData(res.data[0]);
        setLoader(() => false);
      });
  }

  useEffect(() => {
    getData(id);
  }, [id]);
console.log(singleMovieData);
  return (
    <>
      <UserNavabr />
      <Stack
        p={{ base: "10px 10px 0px 10px", md: "5px 10px 0px 30px" }}
        className="entireBody"
      >
        {loader ? (
          <LoadingComp />
        ) : (
          <>
            <Trailer singleMovieData={singleMovieData} />
            <Details singleMovieData={singleMovieData} />
            <Cast singleMovieData={singleMovieData} />
            <TagsRecommended singleMovieData={singleMovieData} />
            <Recommended singleMovieData={singleMovieData} />
            <ReviewSection singleMovieData={singleMovieData} />
          </>
        )}
      </Stack>
      <Footer />
    </>
  );
};

export default SingleMovie;
