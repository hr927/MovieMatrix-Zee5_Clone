import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [buffer, setBuffer] = useState(false);

  const [clickCount, setClickCount] = useState(0);

  const handleReset = () => {
    if (clickCount > 0) {
      alert("Please wait, the form is already being submitted.");
      return;
    } else {
      if (email === "") {
        // alert("Please Enter Email");
        toast({
          title: `"Please Enter Email"`,
          status: "info",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.log(email);
        let newEmail = {
          email,
        };
        axios
          .post("http://localhost:8080/user/reset-password", newEmail)
          .then((res) => {
            toast({
              title: `${res.data.message}`,
              status: "success",
              duration: 2000,
              isClosable: true,
              navigate: navigate("/reset-password"),
            });
            // console.log(res.data.message);
          });
        setBuffer(true);
        setClickCount(clickCount + 1);
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("rgb(15 6 23)", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a token
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"#f7cb93"}
            color={"white"}
            _hover={{
              bg: "rgb(193 152 227)",
            }}
            onClick={handleReset}
          >
            {buffer ? (
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#f7cb93"
                size="lg"
              />
            ) : (
              "Request Reset"
            )}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
