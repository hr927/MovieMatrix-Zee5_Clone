import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const LoadingComp = () => {
  return (
    <Stack h={"100vh"}>
      <Skeleton height={{ base: "300px", lg: "400px" }}></Skeleton>
      <br />
      <SkeletonText
        width={{ base: "25%", lg: "15%" }}
        mt="20px"
        noOfLines={2}
        spacing="5"
        skeletonHeight="7"
      />
      <br />
      <SkeletonText
        width={{ base: "40%", lg: "25%" }}
        mt="20px"
        noOfLines={3}
        spacing="5"
        skeletonHeight="7"
      />
    </Stack>
  );
};

export default LoadingComp;
