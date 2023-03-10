import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Settings } from "./Settings.js";
import SingleCard from "./Card";
import { getdata } from "./api";
const TrendingNearYou = () => {
  const [trending, settrending] = React.useState(null);
  React.useEffect(() => {
    getdata("Trending")
      .then((res) => {
        settrending(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box mx={5} mt={1} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold" my={7} className="z-0">
          Trending Near You
        </Text>
        <Slider {...Settings}>
          {trending?.map((item, index) => (
            <SingleCard key={index} item={item} index={index} />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default TrendingNearYou;
