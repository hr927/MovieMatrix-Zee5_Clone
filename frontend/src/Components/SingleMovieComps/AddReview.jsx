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
  Text,
} from "@chakra-ui/react";
import Rating from "react-star-review";
import axios from "axios";

const AddReview = ({
  tokenState,
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

  const [userState, setUserState] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || { name: "user16204A43" }
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const userInfo = JSON.parse(localStorage.getItem("userDetails"));

      setUserState(userInfo);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userState]);

  const reviewDataObj = {
    showId: singleMovieData._id,
    userName: userState.name,
    showName: singleMovieData.title,
    heading: reviewHeading,
    body: reviewBody,
    stars: starsCount,
  };

  const config = {
    headers: {
      Authorization: tokenState,
    },
  };
  const handleReview = async () => {
    await axios
      .post(
        `https://bronze-salamander-cuff.cyclic.app/review/create`,
        reviewDataObj,
        config
      )
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
          <AlertDialogHeader>Add Review</AlertDialogHeader>

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
