import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Textarea,
  useToast,
  Input,
} from "@chakra-ui/react";
import Rating from "react-star-review";
import axios from "axios";
const userInfo = localStorage.getItem("userDetails") || {
  name: "Unknown user",
};
const AuthorizationToken = localStorage.getItem("token");

const AddReview = ({
  refreshReviews,
  setRefreshReviews,
  onClose,
  isOpen,
  singleMovieData,
}) => {
  const cancelRef = React.useRef();
  const toast = useToast();
  const [reviewBody, setreviewBody] = useState("");
  const [reviewHeading, setReviewHeading] = useState("");
  const [starsCount, setStarsCount] = useState(1);

  const reviewDataObj = {
    showId: singleMovieData._id,
    userName: userInfo.name,
    showName: singleMovieData.title,
    heading: reviewHeading,
    body: reviewBody,
    stars: starsCount,
  };

  const config = {
    headers: {
      Authorization: AuthorizationToken,
    },
  };
  const handleReview = () => {
    axios
      .post(`http://localhost:8080/review/create`, reviewDataObj, config)
      .then((res) => {
        setRefreshReviews(!refreshReviews);
      });

    onClose();
    toast({
      title: "Thanks For Rating.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Add Review </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Rating
              rating={1}
              interactive
              onRatingChanged={(r) => setStarsCount(r)}
            />
            <Input
              value={reviewHeading}
              onChange={(e) => setReviewHeading(e.target.value)}
              mt={"10px"}
              placeholder="Heading"
            />
            <Textarea
              value={reviewBody}
              onChange={(e) => setreviewBody(e.target.value)}
              placeholder="Body"
              mt="5px"
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleReview} colorScheme="purple" ml={3}>
              Submit Review
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddReview;
