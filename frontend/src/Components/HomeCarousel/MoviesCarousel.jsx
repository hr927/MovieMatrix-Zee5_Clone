import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlay } from "react-icons/fa";
import React from "react";
import { getTagsMediaTypedata } from "../Home_mid_Section/api";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/body.css";
import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
export default function TVSeriesCarousel() {
  const navigate = useNavigate();

  const [trending, settrending] = React.useState(null);
  React.useEffect(() => {
    getTagsMediaTypedata("Trending", "Movie")
      .then((res) => {
        settrending(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(trending);
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
      <Slider {...settings}>
        {trending?.map((item, index) => (
          <Box
            key={index}
            // height={"xl"}
            position="relative"
            backgroundImage={`url(${item.poster})`}
            backgroundSize="75% 100%"
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
                right="40%"
                transform="translate(0, -50%)"
              >
                

                <Text fontSize={{ base: "2xl", md: "3xl", lg: "3xl" }}>
                  {item.title}
                </Text>
                <Link to={`../details/${item._id}`}>
                  <Button colorScheme='purple'>Details</Button>
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
      </Slider>
    </div>
  );
}
