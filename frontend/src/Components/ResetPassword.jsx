import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  useToast,
  Spinner,
  position,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [buffer, setBuffer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "Please enter a password with at least 4 characters, at least one letter, and at least one digit."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleResetPassword = () => {
    if (clickCount > 0) {
      alert("Please wait, the form is already being submitted.");
      return;
    } else {
      if (token === "" || password === "") {
        toast({
          title: `"Please Enter All Details"`,
          status: "info",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.log("CLicked on SUbmit");
        if (passwordError) {
          setFormError("Please fix the errors below.");
        } else {
          let newPass = {
            password,
          };

          axios
            .post(`https://bronze-salamander-cuff.cyclic.app/user/reset-password/${token}`, newPass)
            .then((res) => {
              toast({
                title: `${res.data.message}`,
                status: "success",
                duration: 4000,
                isClosable: true,
                navigate: navigate("/login"),
              });
              console.log(res);
            });
          setBuffer(true);
          setClickCount(clickCount + 1);
        }
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
          Enter New password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Enter Token</FormLabel>
          <Input
            placeholder="Enter Token From Your Google Mailbox"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              value={password}
              onChange={handlePasswordChange}
            />

            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {passwordError && <Text>{passwordError}</Text>}
        <Stack spacing={6}>
          <Button
            bg={"#f7cb93"}
            color={"white"}
            _hover={{
              bg: "rgb(193 152 227)",
            }}
            onClick={handleResetPassword}
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
              "Submit"
            )}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
