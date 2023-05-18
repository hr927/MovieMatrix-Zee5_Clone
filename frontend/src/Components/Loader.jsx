import React from "react";
import { Skeleton} from "@chakra-ui/react";

const Loader = () => {
  return <Skeleton height={{ base: "100px", lg: "100px" }}></Skeleton>;
};

export default Loader;
