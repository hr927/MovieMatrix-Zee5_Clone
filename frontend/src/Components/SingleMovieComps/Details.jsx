import { Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import ShareButton from "./ShareButton";

const Details = ({ singleMovieData }) => {
  return (
    <Stack lineHeight={"34px"} className="detailsBody">
      <Text
        fontSize={"22px"}
        color={"white"}
        fontWeight="600"
        mt={"10px"}
        mb={"5px"}
      >
        {singleMovieData.title}
      </Text>

      <Flex align={"center"} gap="10px">
        <Text className="hoverEffect">{singleMovieData.mediaType}</Text>
        <GoPrimitiveDot color="#4d4c4c" opacity="40%" />
        <Text className="hoverEffect">{singleMovieData.year}</Text>
      </Flex>

      <Flex align={{ base: "start", lg: "center" }} gap="10px">
        <Text className="simpleText">{singleMovieData.runtime}</Text>
        <SimpleGrid columns={{ base: "2", sm: "3", lg: "7" }}>
          {singleMovieData &&
            singleMovieData.genre.map((el) => {
              return (
                <Flex key={el} align={"center"} gap="10px">
                  {" "}
                  <GoPrimitiveDot color="#4d4c4c" opacity="40%" />
                  <Text mr={"10px"} className="hoverEffect">
                    {el}
                  </Text>
                </Flex>
              );
            })}
        </SimpleGrid>
      </Flex>

      <ShareButton media={singleMovieData} />
      <Flex align={"center"} gap="10px">
        <Text className="contextType">Audio Languages:</Text>
        <Text className="hoverEffect">{singleMovieData.language}</Text>
      </Flex>

      <Flex align={"center"} gap="10px">
        <Text className="contextType">Subtitles:</Text>
        <Text className="simpleText">English</Text>
      </Flex>

      <Flex align={"start"} gap="10px">
        <Text mt={"-7px"} className="contextType">
          Overview:
        </Text>
        <Text className="plotText">{singleMovieData.plot}</Text>
      </Flex>
    </Stack>
  );
};

export default Details;
