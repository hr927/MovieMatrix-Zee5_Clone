import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import "../../Styles/SingleMovie.css";

const Recommended = ({ singleMovieData }) => {
  const recommendation = singleMovieData.genre[0];

  return (
    <Stack className="recommendedBody">
      <Text className="contextType">Related Videos</Text>
    </Stack>
  );
};

export default Recommended;
