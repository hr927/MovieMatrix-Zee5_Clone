import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../Styles/SingleMovie.css";
import axios from "axios";
import CardForDetails from "./CardForDetails";
import { responsive } from "./responsive";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const TagsRecommended = ({ singleMovieData }) => {
  const tagsRecommendation = singleMovieData.tags[0];
  const currentMovieId = singleMovieData._id;

  const [recommendedData, setRecommendedData] = useState([]);

  const getdata = (query) => {
    axios
      .get(`https://bronze-salamander-cuff.cyclic.app/media?tags=${query}`)
      .then((res) => {
        const data = res.data.filter((el) => {
          if (el._id !== currentMovieId) {
            return el;
          }
        });
        setRecommendedData(data);
      });
  };

  useEffect(() => {
    getdata(tagsRecommendation);
  }, [currentMovieId]);

  return (
    <div>
      <Box mt={1} textAlign="left">
        <Text color={"white"} fontSize="xl" fontWeight="500" my={7}>
          Recommended {singleMovieData.mediaType}s
        </Text>

        <Carousel
          swipeable={true}
          infinite={true}
          keyBoardControl={true}
          autoPlaySpeed={4000}
          autoPlay={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
        >
          {recommendedData?.map((item, index) => (
            <Link key={index} to={`/details/${item._id}`}>
              <CardForDetails item={item} index={index} />
            </Link>
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default TagsRecommended;
