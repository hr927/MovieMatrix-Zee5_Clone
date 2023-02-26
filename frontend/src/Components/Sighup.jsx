import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../Redux/Authentication/action";

export default function Sighup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [fillData, setFillData] = useState(false);
  const toast = useToast();
  const inputEl = useRef(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  }

  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "Please enter a password with at least 4 characters, at least one letter, and at least one digit."
      );
    } else {
      setPasswordError("");
    }
  }

  function validateConfirmPassword(confirmPassword) {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }

  const handleSubmit = () => {
    // Check if there are any errors
    if (emailError || passwordError || confirmPasswordError) {
      setFormError("Please fix the errors below.");
    } else {
      let userDetails = {
        name,
        email,
        password,
      };
      console.log("userDetails: ", userDetails);

      dispatch(register(userDetails)).then((res) => {
        console.log("res: ", res);
        // if(res.data.msg){
        // alert(res.data.msg);
        toast({
          title: `${res.msg}`,
          status: "success",
          duration: 4000,
          isClosable: true,
          //   navigate: navigate("/login"),
        });
        setname("");
        setEmail("");
        setPassword("");

        // }
      });

      if (name === "" || email === "" || password === "") {
        inputEl.current.focus();
      }
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setFormError("");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("rgb(15 6 23)", "rgb(15 6 23)")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Create a new account
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Create an account to continue enjoying uninterrupted video and
              personalised experience
            </Text>
          </Stack>
          <Stack spacing={4} mt={"1%"}>
            {/* <HStack> */}
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  isRequired={true}
                  placeholder="Create Your Username"
                  ref={inputEl}
                />
              </FormControl>
            </Box>
            {/* </HStack> */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                placeholder="create-email@example.com"
                isRequired={true}
                ref={inputEl}
              />
              <Text className="error">{emailError}</Text>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => validatePassword(password)}
                  placeholder="Create Password"
                  isRequired={true}
                  ref={inputEl}
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Text className="error">{passwordError}</Text>
            <Stack spacing={10} pt={2}>
              <Button
                // loadingText="Submitting"
                size="lg"
                bg={"#f7cb93"}
                color={"white"}
                onClick={handleSubmit}
                _hover={{
                  bg:"rgb(193 152 227)"
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to={"/login"}>
                  <span style={{ color: "rgb(193 152 227)" }}>Login</span>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
