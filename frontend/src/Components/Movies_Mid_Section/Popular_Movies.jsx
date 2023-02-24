import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Settings } from "../Home_mid_Section/Settings";
import SingleCard from "../Home_mid_Section/Card";
import { getTagsMediaTypedata } from "../Home_mid_Section/api";
const PopularMovies = () => {
  const [PopularMovies, SetPopularMovies] = React.useState(null);
  React.useEffect(() => {
    getTagsMediaTypedata("Popular","Movie")
      .then((res) => {
        SetPopularMovies(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box mx={5} mt={1} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold" my={7} className="z-0">
          Popular Movies
        </Text>
        <Slider {...Settings}>
          {PopularMovies?.map((item, index) => (
            <SingleCard key={index} item={item} index={index} />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default PopularMovies;
