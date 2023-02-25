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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logoutFun } from "../Redux/Authentication/action";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // console.log("click");
    if (email === "" || password === "") {
      toast({
        title: `Please Fill All the Data`,
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      let userDetails = {
        email,
        password,
      };
      dispatch(login(userDetails)).then((res) => {
        console.log("res: ", res);
        if (res.token) {
          toast({
            title: `${res.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
            navigate: navigate("/"),
          });
          setEmail("");
          setPassword("");
        } else {
          toast({
            title: `${res.msg}`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        //   console.log(res);
      });
    }
  };

  //   const hadleLogout = () => {
  //     dispatch(logoutFun());
  //   };
  return (
    <>
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
                  Login to continue enjoying uninterrupted video and
                  personalised experience.
                </Text>
              </Stack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"

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
                    placeholder="Enter Password"

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
                  <Link
                    to={"/forget-password"}
                    style={{ color: "rgb(193 152 227)" }}
                  >
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  bg={"#f7cb93"}
                  color={"white"}
                  onClick={handleLogin}
                  _hover={{
                    bg: "rgb(193 152 227)",
                  }}
                >
                  Sign in
                </Button>
                <Stack pt={0}>
                <Text align={"center"}>
                    Login from {" "}
                    <Link to={"/admin-login"} color={"rgb(193 152 227)"}>
                      <span style={{ color: "rgb(193 152 227)" }}>
                        {" "}
                        Admin{" "}
                      </span>
                    </Link>
                  </Text>
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
      {/* <button onClick={hadleLogout}>logout</button> */}
    </>
  );
}
