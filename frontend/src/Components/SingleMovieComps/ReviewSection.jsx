import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "../../Styles/SingleMovie.css";
import { AiFillStar } from "react-icons/ai";
import AddReview from "./AddReview";

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

const ReviewSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disableBtn, setDisableBtn] = useState(false);

  return (
    <Stack>
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
              <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
              <Text color={"gray"} fontSize="14px">
                (5)
              </Text>
            </Flex>
          </Flex>

          {disableBtn ? (
            <Button
              border={"2px solid #2a25306d"}
              bg={"401a4c"}
              _hover={{
                bg: "401a4c",
              }}
              variant={"solid"}
            >
              Rated
            </Button>
          ) : (
            <Button onClick={onOpen} colorScheme={"purple"}>
              ⭐ Add Review
            </Button>
          )}
        </Stack>
        <AddReview
          setDisableBtn={setDisableBtn}
          onClose={onClose}
          isOpen={isOpen}
          onOpen={onOpen}
        />
        <Stack className="reviewBody">
          <Rating
            name="Avneesh Grover"
            title="Awesome Movie"
            description={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta possimus nulla ipsum molestias harum voluptate? Rerum laborum sapiente eaque quaerat quod ducimus, mollitia sit nesciunt, accusantium delectus a explicabo illo?"
            }
            stars={"1"}
          />

          <Rating
            name="Soumalya"
            title="Great Movie"
            description={
              "Lorem, ipharum voluptate? Rerum laborum sapiente eaque quaerat quod ducimus, mollitia sit nesciunt, accusantium delectus a explicabo illo?"
            }
            stars={"5"}
          />

          <Rating
            name="Himanshu"
            title="Nice Movie"
            description={"Lorem, ipharumccusantium delectus a explicabo illo?"}
            stars={"4"}
          />
          <Rating
            name="Rahul"
            title="Fantastic Movie"
            description={
              "Lorem, ipharumccusantium delectus a explicabo illo? rem, ipharumccusantium delectus a explicabo illo?"
            }
            stars={"5"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ReviewSection;
