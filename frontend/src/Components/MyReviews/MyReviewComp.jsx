import React from "react";
import { Flex, Stack, Text, Image } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import "../../Styles/SingleMovie.css";
import { Link } from "react-router-dom";
import axios from "axios";
const AuthorizationToken = JSON.parse(localStorage.getItem("token")) || false;

function Rating({
  id,
  body,
  heading,
  showName,
  stars,
  reviewId,
  setRefreshReviews,
  refreshReviews,
}) {
  let arr = [];
  for (let i = 0; i < +stars; i++) {
    arr.push(<AiFillStar />);
  }
  const config = {
    headers: {
      Authorization: AuthorizationToken,
    },
  };
  const handleDelete = async (reviewId) => {
    await axios
      .delete(
        `https://bronze-salamander-cuff.cyclic.app/review/delete/${reviewId}`,
        config
      )
      .then((res) => {
        setRefreshReviews(!refreshReviews);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <Stack
      w={{ base: "100%", md: "50%" }}
      border={"2px solid #2a25306d"}
      p={"20px"}
    >
      <Flex
        className="reviewerInfo"
        justify={"space-between"}
        gap="10px"
        align={"center"}
      >
        <Link to={`/details/${id}`}>
          <Text fontSize={"20px"} fontWeight={"700"}>
            {showName}
          </Text>
        </Link>
        <Text
          _hover={{
            cursor: "pointer",
            border: "1px solid grey",
            p: "2px",
            borderRadius: "4px",
          }}
          transition="300ms"
          onClick={() => handleDelete(reviewId)}
          fontSize={"21px"}
          fontWeight={"500"}
        >
          🗑️
        </Text>
      </Flex>
      <Flex fontSize={"20px"} color={"yellow.600"}>
        {arr.map((el) => {
          return el;
        })}
      </Flex>

      {heading !== "" ? (
        <Stack w={{ base: "100%", md: "50%" }} p={"10px"}>
          <Text fontSize={"17px"} color={"whiteAlpha.800"} fontWeight={"600"}>
            {heading}
          </Text>
          <Text
            fontSize={"15px"}
            color={"whiteAlpha.700"}
            className="reviewText"
          >
            {body}
          </Text>
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
}

const MyReviewComp = ({ totalReviews, setRefreshReviews, refreshReviews }) => {
  return (
    <Stack p={"20px"} w={{ base: "96%", md: "100%" }} color={"white"}>
      <Flex
        w={{ base: "100%", sm: "70%", md: "40%", lg: "50%" }}
        m="auto"
        justify={"center"}
        p={"5px "}
        mb="20px"
        border={"2px solid #2a25306d"}
        align="center"
        gap={"10px"}
      >
        <Text fontSize={"25px"} fontWeight="500">
          Total Reviews Given :{" "}
        </Text>
        <Text fontSize={"25px"} fontWeight="500">
          {totalReviews.length}{" "}
        </Text>
      </Flex>

      {totalReviews.length > 0 ? (
        totalReviews.map((el, i) => {
          return (
            <Rating
              setRefreshReviews={setRefreshReviews}
              refreshReviews={refreshReviews}
              key={i}
              reviewId={el._id}
              id={el.showId}
              stars={el.stars}
              heading={el.heading}
              body={el.body}
              showName={el.showName}
            />
          );
        })
      ) : (
        <Stack p={"35px"}>
          <Text color={"white"} fontSize="40px" fontWeight={"500"}>
            You've Reviewed 0 Movies.
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

export default MyReviewComp;
