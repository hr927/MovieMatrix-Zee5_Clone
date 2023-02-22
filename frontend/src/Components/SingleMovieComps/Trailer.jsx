import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import "../../Styles/SingleMovie.css";
import { RiVipCrownFill } from "react-icons/ri";

const Trailer = ({ singleMovieData }) => {
  return (
    <Stack
      w="100%"
      h={{ base: "300px", sm: "370px", md: "430px", lg: "550px" }}
      className="trailerBody"
    >
      {/* <Text fontWeight={"700"} className="textOverlay">
        You're watching a trailer
      </Text> */}
      <iframe
        height="100%"
        width="100%"
        src={singleMovieData.trailer}
        allow="autoplay; encrypted-media"
        muted="1"
        allowFullScreen
        title="trailer"
      />
      <Stack
        justify={"space-between"}
        direction={"row"}
        className="discountBody"
      >
        <Text>Ad-Free with Premium now at 30%OFF : ₹ 600/year</Text>
        <Button
          _hover={{
            bg: "#8230C6",
          }}
          variant={"solid"}
          bg={"#8230C6"}
        >
          <RiVipCrownFill /> <Text ml={"5px"}>BUY PLAN</Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Trailer;
