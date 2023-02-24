import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "../../Styles/SingleMovie.css";
import { AiFillStar } from "react-icons/ai";
import AddReview from "./AddReview";
import axios from "axios";
import { useParams } from "react-router-dom";
const AuthorizationToken = localStorage.getItem("token");

function Rating({ name, title, description, stars }) {
  let arr = [];
  for (let i = 0; i < +stars; i++) {
    arr.push(<AiFillStar />);
  }

  return (
    <Stack pt={"20px"}>
      <Flex gap="10px" align={"center"} className="reviewerInfo">
        <Image
          w={"25px"}
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        />
        <Text fontSize={"15px"} fontWeight={"500"}>
          {name}
        </Text>
      </Flex>
      <Stack className="review">
        <Flex color={"yellow.600"}>
          {arr.map((el) => {
            return el;
          })}
        </Flex>
        <Text fontWeight={"700"}>{title}</Text>
        <Text className="reviewText">{description}</Text>
      </Stack>
    </Stack>
  );
}

const ReviewSection = ({ singleMovieData }) => {
  const params = useParams();
  const id = params.id;
  let starArr = [];
  let totalRating = 0;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  function getReviewData(id) {
    axios.get(`http://localhost:8080/review?showId=${id}`).then((res) => {
      setReviewData(res.data);
    });
  }
  reviewData.reverse();

  useEffect(() => {
    getReviewData(id);
  }, [refreshReviews, id]);

  reviewData.forEach((el) => {
    totalRating += el.stars;
  });

  let totalStarsReview = Math.round(totalRating / reviewData.length);
  for (let i = 0; i < totalStarsReview; i++) {
    starArr.push(<AiFillStar />);
  }

  return (
    <Stack pb={"70px"} color={"white"}>
      <Text fontSize="xl" fontWeight="500" my={7}>
        Reviews
      </Text>
      <Stack
        w={{ base: "100%", lg: "90%" }}
        border="2px solid #2a25306d"
        p={"20px"}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
        >
          <Flex
            justify={{ base: "space-between", md: "start" }}
            w={{ base: "100%", md: "70%" }}
            align={"center"}
            gap="50px"
          >
            <Text fontWeight="500">TOTAL RATING:</Text>
            <Flex
              align={"center"}
              fontSize={"32px"}
              color={"yellow.600"}
              h="100%"
              justify={{ base: "end", md: "start" }}
              w={{ base: "40%", md: "60%" }}
            >
              {starArr.map((el) => {
                return el;
              })}
              <Text color={"gray"} fontSize="14px">
                ({reviewData.length})
              </Text>
            </Flex>
          </Flex>

          {AuthorizationToken ? (
            <Button
              w={{ base: "40%", sm: "35%", md: "20%", lg: "18%" }}
              onClick={onOpen}
              colorScheme={"purple"}
            >
              ⭐ Add Review
            </Button>
          ) : (
            <Text fontWeight={"500"} p={"5px"} borderBottom={"1px solid grey"}>
              Login To Add Review
            </Text>
          )}
        </Stack>
        <AddReview
          setRefreshReviews={setRefreshReviews}
          refreshReviews={refreshReviews}
          singleMovieData={singleMovieData}
          onClose={onClose}
          isOpen={isOpen}
          onOpen={onOpen}
        />
        <Stack className="reviewBody">
          {reviewData.length > 0 ? (
            reviewData.map((el, i) => {
              return (
                <Rating
                  key={i}
                  name={el.userName}
                  title={el.heading}
                  description={el.body}
                  stars={el.stars}
                />
              );
            })
          ) : (
            <Text color={"white"} fontSize="md" fontWeight={"500"}>
              Currently No Reviews Available, be the first to review.
            </Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ReviewSection;
