import React, { useState } from "react";
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

const AddReview = ({ setDisableBtn, onClose, isOpen, onOpen }) => {
  const cancelRef = React.useRef();
  const toast = useToast();
  const [reviewText, setReviewText] = useState("");
  const [reviewHeading, setReviewHeading] = useState("");
  const reviewObject = {
    reviewHeading,
    reviewText,
  };
  const handleReview = () => {
    setDisableBtn(true);
    console.log(reviewObject);

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
              onRatingChanged={(r) => console.log(r)}
            />
            <Input
              value={reviewHeading}
              onChange={(e) => setReviewHeading(e.target.value)}
              mt={"10px"}
              placeholder="Heading"
            />
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
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
