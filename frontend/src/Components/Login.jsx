import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleLogin = () => {
    console.log("click");
    let userDetails = {
      email,
      password,
    };
    axios.post("http://localhost:8080/user/login", userDetails).then((res) => {
      toast({
        title: `${res.data.msg}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      console.log(res);
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("rgb(15 6 23)", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"} textAlign={"center"}>
                Login to <span style={{ color: "#e2c1a2" }}>MovieMatrix</span>{" "}
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Login to continue enjoying uninterrupted video and personalised
                experience.
              </Text>
            </Stack>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  //   type="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link style={{ color: "rgb(193 152 227)" }}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"rgb(193 152 227)"}
                color={"white"}
                onClick={handleLogin}
              >
                Sign in
              </Button>
              <Stack pt={6}>
                <Text align={"center"}>
                  New to MovieMatrix ?{" "}
                  <Link to={"/sighup"} color={"rgb(193 152 227)"}>
                    <span style={{ color: "rgb(193 152 227)" }}>
                      {" "}
                      Register{" "}
                    </span>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
