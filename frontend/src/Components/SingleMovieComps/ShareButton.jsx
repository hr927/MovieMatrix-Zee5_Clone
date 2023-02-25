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
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2Y4OTI3M2U1NDk5NDczMDI3Y2MyMjQiLCJpYXQiOjE2NzcyNDEyOTR9.7WKJKtw8c8ASpMptbfMo1PgXQqiQUdzLJQ_5MPbX0do",
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/watchList/add",
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
