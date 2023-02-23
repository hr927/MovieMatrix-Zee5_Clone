import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Settings } from "./Settings.js";
import SingleCard from "./Card";
import { getdata } from "./api";
const Popular = () => {
  const [popular, setpopular] = React.useState(null);
  React.useEffect(() => {
    getdata("Popular")
      .then((res) => {
        setpopular(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box mx={5} mt={1} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold" my={7} className="z-0">
          Popular Near You
        </Text>
        <Slider {...Settings}>
          {popular?.map((item, index) => (
            <SingleCard key={index} item={item} index={index} />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Popular;
