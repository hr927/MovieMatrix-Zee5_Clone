import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import "../../Styles/SingleMovie.css";
import axios from "axios";

const ShareButton = ({ media }) => {
  const toast = useToast();
  const handleAddToWatch = async (media) => {
    const payload = {
      mediaId: media._id,
      mediaName: media.title,
      mediaPoster: media.poster,
    };
    const headers = {
      "Content-type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    };
    try {
      const response = await axios.post(
        "https://bronze-salamander-cuff.cyclic.app/watchList/add",
        payload,
        {
          headers: headers,
        }
      );
      console.log(response);
      toast({
        title: "Added to WatchList",
        description: "The Media has been added to WatchList!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex align={"center"} className="buttonBody">
      <Stack className="btnSize">
        <RiShareForwardLine cursor="pointer" fontSize="25px" color="white" />
        <Text className="btnText">Share</Text>
      </Stack>
      <Stack className="btnSize">
        <MdPlaylistAdd cursor="pointer" fontSize="25px" color="white" />
        <Text onClick={() => handleAddToWatch(media)} className="btnText">
          Watchlist
        </Text>
      </Stack>
    </Flex>
  );
};

export default ShareButton;
