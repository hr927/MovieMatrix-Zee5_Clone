import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import "../../Styles/SingleMovie.css";

const ShareButton = () => {
  return (
    <Flex align={"center"} className="buttonBody">
      <Stack className="btnSize">
        <RiShareForwardLine cursor="pointer" fontSize="25px" color="white" />
        <Text className="btnText">Share</Text>
      </Stack>
      <Stack className="btnSize">
        <MdPlaylistAdd cursor="pointer" fontSize="25px" color="white" />
        <Text className="btnText">Watchlist</Text>
      </Stack>
    </Flex>
  );
};

export default ShareButton;
