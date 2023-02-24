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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminlogin } from "../Redux/Authentication/Admin/action";
// import { AdminLogin } from "../Redux/Authentication/action";

export default function AdminLogin() {
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
      dispatch(adminlogin(userDetails)).then((res) => {
        console.log("res: ", res);
        if (res.token) {
          toast({
            title: `${res.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
            navigate: navigate("/admin"),
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
                  Login From <span style={{ color: "#e2c1a2" }}>ADMIN</span>{" "}
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Welcome Back, Administrator.
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
                <Button
                  mt={"6"}
                  bg={"#f7cb93"}
                  color={"white"}
                  onClick={handleLogin}
                  _hover={{
                    bg: "rgb(193 152 227)",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      {/* <button onClick={hadleLogout}>logout</button> */}
    </>
  );
}
