import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { Settings } from "./Settings.js";
import SingleCard from "./Card";
import { getgenredata } from "./api";
const Action = () => {
  const [action, setaction] = React.useState(null);
  React.useEffect(() => {
    getgenredata("Action")
      .then((res) => {
        setaction(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box mx={5} mt={1} textAlign="left">
        <Text fontSize="2xl" fontWeight="bold" my={7} className="z-0">
          Action For You
        </Text>
        <Slider {...Settings}>
          {action?.map((item, index) => (
            <SingleCard key={index} item={item} index={index} />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Action;
