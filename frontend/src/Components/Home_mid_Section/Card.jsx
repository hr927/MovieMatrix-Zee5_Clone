import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaCrown, FaPlay } from "react-icons/fa";

function SingleCard({ item, index }) {
  const [state, setState] = useState(false);


  return (
    <GridItem
      w={"200px"}
      key={index}
      cursor={"pointer"}
      position={"relative"}
      borderRadius={"lg"}
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
      paddingBottom="20px"
    //   _hover={{
        
    //     transform: "scale(1)"
    //   }}
    >
      <Box>
        <Image src={item.poster} alt={item.title} borderRadius="lg" h="300px" w="100%" />
        {
          <Box
            p={1}
            pos={"absolute"}
            top={3}
            left={3}
            bg={"whitesmoke"}
            color={"red"}
            borderRadius={50}
          >
            <FaCrown />
          </Box>
        }
      </Box>
      {state && (
        <Flex
          h={51}
          w={51}
          zIndex={2}
          align={"center"}
          justify={"center"}
          pos={"absolute"}
          top={"37%"}
          left={"37%"}
          fontSize={"xl"}
          bg={"rgba(37, 37, 37, 0.377)"}
          color={"whitesmoke"}
          borderRadius={50}
          _hover={{
            color: "rgb(47, 47, 47)",
            bg: "whitesmoke",
            // transform: "scale(2.05)"
          }}
        >
          <FaPlay style={{ marginLeft: "5px" }} />
        </Flex>
      )}
      {state && (
        <VStack
          h={"100%"}
          w={"100%"}
          pos={"absolute"}
          zIndex={0}
          bottom={0}
          borderRadius={"lg"}
          flexFlow={"column-reverse"}
          border="4px solid whitesmoke"
        >
          <VStack
            py={0}
            align={"left"}
            w={"100%"}
            bg={"whitesmoke"}
            color={"gray"}
            wrap={"wrap"}
            fontSize={"sm"}
          >
            <Text ml={2} color={"gray"} fontSize={"sm"} fontWeight="600">
              ● {item.title}
            </Text>
            <Flex alignItems={"center"} gap={2}>
              <Button size="xs" colorScheme="black" variant="outline" ml={2}>
                Watch
              </Button>
              <Flex
                alignItems={"center"}
                color={"gray"}
                fontSize={"md"}
                fontWeight="600"
              >
                <AiOutlineShareAlt size={26}></AiOutlineShareAlt>
                Share
              </Flex>
            </Flex>
          </VStack>
        </VStack>
      )}
    </GridItem>
  );
}

export default SingleCard;
