import React from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Flex,
  Heading,
} from "@chakra-ui/react";
import "../../Styles/body.css"
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import app_store_logo from "../../Images/app_store.png";
import play_store_logo from "../../Images/play_store.png";

const Footer = () => {
  return (
    <Box bg='#0f0617' color='white' >
      
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        bg='#0f0617'
        color='white'
      >
        <Container
          as={Stack}
          maxW={"7xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Box>
            <Flex gap={"1rem"}>
              <Box>Download apps</Box>
              <Box>
                <img src={play_store_logo} alt="google" />
              </Box>
              <Box>
                <img src={app_store_logo} alt="google" />
              </Box>
            </Flex>
          </Box>
          <Box>
            <Flex
              justifyContent={"space-evenly"}
              gap={"1rem"}
              paddingRight={"30px"}
            >
              <Box>Contact with us</Box>
              <Box>
                <AiFillFacebook size="20px" />
              </Box>
              <Box>
                <AiFillInstagram size="20px" />
              </Box>
              <Box>
                <AiOutlineTwitter size="20px" />
              </Box>
              <Box>
                <AiFillYoutube size="20px" />
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
      <Container as={Stack} maxW={"8xl"} py={10} >
        <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} spacing={8}>
          <Stack align={"flex-start"}>
            <Heading size={"xsm"}>Popular TV Shows</Heading>
            <Text fontSize='sm' color="grey">Kumkum Bhagya</Text >
            <Text fontSize='sm' color="grey">Kundali </Text >
            <Text fontSize='sm' color="grey">Bhagya Laxmi</Text>
            <Text fontSize='sm' color="grey">Tujhse Hai Rabba</Text >
            <Text fontSize='sm' color="grey">kyun Riston Mein katt</Text >
          </Stack>

          <Stack align={"flex-start"}>
            <Heading size={"xsm"}>Preminum Movies</Heading>
            {/* <Text fontSize='sm' color="grey">Kya Meri Sonam Gupta Bewfa Hai?</Text> */}
            <Text fontSize='sm' color="grey">Helmet</Text>
            <Text fontSize='sm' color="grey">200 Halla Ho</Text>
            <Text fontSize='sm' color="grey">14 Phere</Text>
            <Text fontSize='sm' color="grey">Dial 100</Text>
          </Stack>

          <Stack align={"flex-start"}>
            <Heading size={"xsm"}>Popular LIVE TV Channels</Heading>
            <Text fontSize='sm' color="grey">Aaj Tak</Text >
            <Text fontSize='sm' color="grey">Zee News</Text >
            <Text fontSize='sm' color="grey">Zee TV HD</Text >
            <Text fontSize='sm' color="grey">&TV HD</Text>
          </Stack>
          <Stack align={"flex-start"}>
            <Heading size={"xsm"}>Popular Web Series</Heading>
            <Text fontSize='sm' color="grey">Sunflower</Text >
            <Text fontSize='sm' color="grey">Jeet Ki Zid</Text>
            <Text fontSize='sm' color="grey">Bicchoo Ka Khel</Text >
            <Text fontSize='sm' color="grey">State of Siege:26/11</Text>
            <Text fontSize='sm' color="grey">Naxalbari</Text>
            <Text fontSize='sm' color="grey">Tripling</Text>
          </Stack>
          <Stack align={"flex-start"}>
            <Heading size={"xsm"}>Bollywood Top Celebrites</Heading>

            <Text fontSize='sm' color="grey">Sunny Leon</Text >
            <Text fontSize='sm' color="grey">Disha Patani</Text >
            <Text fontSize='sm' color="grey">Deepika Padukone</Text >
            <Text fontSize='sm' color="grey">Slamana Khan</Text >
            <Text fontSize='sm' color="grey">Nora Fatehi</Text >
          </Stack>
          <Stack align={"flex-start"}>
            <Heading size={"xsm"}>Games & News</Heading>
            <Text fontSize='sm' color="grey">play</Text >
            <Text fontSize='sm' color="grey">Stories</Text >
            <Text fontSize='sm' color="grey">Articles</Text >
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
