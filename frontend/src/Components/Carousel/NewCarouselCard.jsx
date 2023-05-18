import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Loader from "../Loader";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/body.css";
import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
export default function SimpleSlider({ data }) {
  const navigate = useNavigate();

  var settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };
  return (
    <div>
      {!data ? <Loader/> :<Slider {...settings}>
        {data?.map((item, index) => (
          <Box
            key={index}
            // height={"xl"}
            position="relative"
            backgroundImage={`url(${item.bg_poster})`}
            backgroundSize="95% 100%"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            w="100%"
            h="400px"
          >
            {/* <Box position="absolute" top={0} left={0} bottom={0} right={0} bg="rgba(255, 255, 255, 0.5)" filter="blur(10px)" zIndex="-1"></Box> */}
            <Container height="600px" position="relative">
              <Stack
                spacing={2}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="50%"
                right="60%"
                transform="translate(0, -50%)"
              >
                <Text fontSize={{ base: "2xl", md: "3xl", lg: "3xl" }}>
                  {item.title}
                </Text>
                <Link to={`../details/${item._id}`}>
                  <Button colorScheme="purple">Details</Button>
                </Link>
              </Stack>
            </Container>
            {/* <img
              style={{
                width: "80%",
                display: "block",
                overflow: "hidden",
                margin: "auto",
              }}
              onClick={() => navigate(`../details/${item._id}`)}
              src={item.poster}
              alt={item.title}
            /> */}
          </Box>
        ))}
      </Slider>}
      
    </div>
  );
}
