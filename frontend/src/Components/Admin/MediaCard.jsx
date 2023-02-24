import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Image,
  Text,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

function MediaCard({ imageUrl, title, onDelete, onUpdate, showID }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showId, setShowId] = useState("");
  const cancelRef = React.useRef();
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDelete(showId);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box position="relative" pb="150%">
          <Image
            src={imageUrl}
            alt={title}
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            objectFit="cover"
            overflow={"auto"}
          />
        </Box>
        <Box p="4">
          <Text fontSize="lg" fontWeight="semibold" mb="4">
            {title}
          </Text>

          <Flex justify="space-between">
            <Button
              onClick={() => {
                onOpen();
                setShowId(showID);
              }}
              colorScheme="red"
            >
              Delete
            </Button>
            <Button onClick={onUpdate} colorScheme="teal">
              Update
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default MediaCard;
