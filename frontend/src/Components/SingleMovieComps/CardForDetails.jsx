import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

function CardForDetails({ item, index }) {
  const [state, setState] = useState(false);

  return (
    <GridItem
      w={{ base: "150px", md: "200px" }}
      h={{ base: "250px", md: "auto" }}
      key={index}
      cursor={"pointer"}
      position={"relative"}
      borderRadius={"lg"}
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
      _hover={{
        transform: "scale(1)",
      }}
    >
      <Box>
        <Image
          src={item.poster}
          alt={item.title}
          borderRadius="lg"
          h="300px"
          w="100%"
        />
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
            // transform: "scale(2.05)",
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
          border="8px solid whitesmoke"
        >
          <VStack
            pt={2}
            align={"left"}
            w={"100%"}
            bg={"whitesmoke"}
            color={"gray"}
            wrap={"wrap"}
            fontSize={"sm"}
            lineHeight="13px"
          >
            <Text ml={2} color={"gray"} fontSize={"12"} fontWeight="500">
              ● {item.title}
            </Text>
            <Text pl={2} color={"gray"} fontSize={"11px"} fontWeight="500">
              ● {item.runtime}
            </Text>
            <SimpleGrid columns={{ base: 2, md: 3 }} pl={2}>
              {item.genre.map((el) => {
                return (
                  <Text
                    key={el}
                    color={"gray"}
                    fontSize={"11px"}
                    fontWeight="500"
                  >
                    {el}
                  </Text>
                );
              })}
            </SimpleGrid>
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
                <AiOutlineShareAlt size={18}></AiOutlineShareAlt>
                Share
              </Flex>
            </Flex>
          </VStack>
        </VStack>
      )}
    </GridItem>
  );
}

export default CardForDetails;
