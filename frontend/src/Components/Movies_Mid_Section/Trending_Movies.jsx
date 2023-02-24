import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Settings } from "../Home_mid_Section/Settings";
import SingleCard from "../Home_mid_Section/Card";
import { getTagsMediaTypedata } from "../Home_mid_Section/api";
const TrendingMovies = () => {
  const [TrendingMovies, SetTrendingMovies] = React.useState(null);
  React.useEffect(() => {
    getTagsMediaTypedata("Trending","Movie")
      .then((res) => {
        SetTrendingMovies(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box mx={5} mt={1} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold" my={7} className="z-0">
          Trending Movies
        </Text>
        <Slider {...Settings}>
          {TrendingMovies?.map((item, index) => (
            <SingleCard key={index} item={item} index={index} />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default TrendingMovies;
