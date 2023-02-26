import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import UserNavabr from "./UserNavbar/UserNavbar";
import Footer from "./Footer/Footer";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [watchId, setWatchId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const getWatchList = async () => {
    // console.log("in");
    try {
      const response = await axios.get(
        `https://bronze-salamander-cuff.cyclic.app/watchList/`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(response.data);
      setWatchlist(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  const handleRemoveFromWatchlist = async (id) => {
    setWatchlist(watchlist.filter((item) => item._id !== id));
    try {
      const response = await axios.delete(
        `https://bronze-salamander-cuff.cyclic.app/watchlist/delete/${id}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(response);
      toast({
        title: "Media Deleted.",
        description: "The media has been deleted from WatchList!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getWatchList();
    } catch (err) {
      console.log(err);
    }
  };

  const numCols = watchlist.length < 4 ? watchlist.length : 4;
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    sm: `repeat(${numCols <= 2 ? numCols : 2}, 1fr)`,
    md: `repeat(${numCols <= 3 ? numCols : 3}, 1fr)`,
    lg: `repeat(${numCols <= 4 ? numCols : 4}, 1fr)`,
  });

  return (
    <>
      <UserNavabr />
      <div style={{ backgroundColor: "#0f0617", paddingBottom: "20px" }}>
        <div
          style={{
            width: "80%",
            margin: "auto",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
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
                      handleRemoveFromWatchlist(watchId);
                    }}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          {watchlist && watchlist.length > 0 ? (
            <Box>
              <Text fontSize="25px" color={"white"} fontWeight="bold" mb={10}>
                My Watchlist
              </Text>
              <Grid templateColumns={gridTemplateColumns} gap={4}>
                {watchlist.map((item) => (
                  <Box
                    maxW="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    _hover={{ border: "2px", borderColor: "#4296cb" }}
                  >
                    <Box position="relative" pb="150%">
                      <Image
                        src={item.mediaPoster}
                        alt={item.mediaName}
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
                      <Text
                        fontSize="lg"
                        color={"white"}
                        fontWeight="semibold"
                        mb="4"
                      >
                        {item.mediaName}
                      </Text>

                      <Flex justify="space-between">
                        <Button
                          onClick={() => {
                            onOpen();
                            setWatchId(item._id);
                          }}
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>
          ) : (
            <Heading color={"white"}>Nothing Here</Heading>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Watchlist;
