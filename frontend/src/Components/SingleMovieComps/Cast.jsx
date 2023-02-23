import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Cast = ({ singleMovieData }) => {
  return (
    <Stack className="CastBody">
      <Text className="heading">
        Details about {singleMovieData.title} {singleMovieData.mediaType} :
      </Text>
      <Stack gap={"10px"} className="contentBody">
        <Flex
          justify={{ base: "space-between", sm: "left" }}
          w={"100%"}
          align={"center"}
        >
          <Text className="question">Movie Released Date</Text>
          <Text className="answer">{singleMovieData.year}</Text>
        </Flex>

        <Flex
          justify={{ base: "space-between", sm: "left" }}
          w={"100%"}
          align={{ base: "start", md: "center" }}
        >
          <Text className="question">Genres</Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            gap="10px"
          >
            {singleMovieData &&
              singleMovieData.genre.map((el) => {
                return (
                  <Text key={el} className="answer">
                    {el}
                  </Text>
                );
              })}
          </Stack>
        </Flex>

        <Flex
          justify={{ base: "space-between", sm: "left" }}
          w={"100%"}
          align={{ base: "start", md: "center" }}
        >
          <Text className="question">Cast</Text>
          <Stack
            textAlign="center"
            direction={{ base: "column", md: "row" }}
            gap="10px"
          >
            {singleMovieData &&
              singleMovieData.cast.map((el) => {
                return (
                  <Text key={el} className="answer">
                    {el}
                  </Text>
                );
              })}
          </Stack>
        </Flex>
        <Flex
          justify={{ base: "space-between", sm: "left" }}
          w={"100%"}
          align={"center"}
        >
          <Text className="question">Director</Text>
          <Text className="answer">{singleMovieData.director}</Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Cast;
