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

const SingleMovie = () => {
  const [singleMovieData, setSingleMovieData] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();

  function getData(id) {
    axios.get(`http://localhost:8080/media/details/${id}`).then((res) => {
      setSingleMovieData(res.data[0]);
      setLoader(() => false);
    });
  }

  useEffect(() => {
    const id = params.id;
    // const id = "63f4cb53d9c7f36e3760a9d2";
    getData(id);
  }, []);

  return (
    <Stack
      p={{ base: "0px 10px 0px 10px", md: "0px 10px 0px 30px" }}
      className="entireBody"
    >
      {loader ? (
        <LoadingComp />
      ) : (
        <>
          <Trailer singleMovieData={singleMovieData} />
          <Details singleMovieData={singleMovieData} />
          <Cast singleMovieData={singleMovieData} />
          <Recommended singleMovieData={singleMovieData} />
        </>
      )}
    </Stack>
  );
};

export default SingleMovie;
