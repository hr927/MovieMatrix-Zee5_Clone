import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Settings } from "./Settings.js";
import SingleCard from "./Card.jsx";
import Loader from "../Loader.jsx";
const SliderCard = ({data,heading}) => {
 
  return (
    <div>
      {!data ? <Loader/> : <Box mx={5} mt={1} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold" my={7} className="z-0">
          {heading}
        </Text>
        <Slider {...Settings}>
          {data?.map((item, index) => (
            <SingleCard key={index} item={item} index={index} />
          ))}
        </Slider>
      </Box>}
      
    </div>
  );
};

export default SliderCard;
