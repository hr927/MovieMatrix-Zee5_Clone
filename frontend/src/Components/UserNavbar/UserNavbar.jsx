import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import "./UserNavbar.css";

import { FaBars, FaCrown, FaRegUser } from "react-icons/fa";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, Link as RouterLink } from "react-router-dom";
import logo from "../../Images/logo.png";
const Links = [
  { path: "/", text: "Home" },
  { path: "/tvshows", text: "TV Shows" },
  { path: "/movies", text: "Movies" },
];

// const NavLink = () => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {Links.map((el)=>{return(el)})}
//   </Link>
// );

export default function UserNavabr() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultStyle = { color: "#CBD5E0", textDecoration: "none" };
  const activeStyle = {
    color: "white",
    textDecoration: "none",
    borderBottom: "2px solid white",
  };
  return (
    <>
      <Box
        bg={"#0f0617"}
        px={4}
        style={{ position: "sticky", top: "0px", zIndex: 100 }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={12} alignItems={"center"} width="80%">
            <RouterLink to="/">
              <Img className="Navbar-Icon" height="50px" src={logo} />
            </RouterLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              //   border="5px solid yellow"
              width="90%"
            >
              {Links.map((link, i) => (
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : defaultStyle
                  }
                  key={i}
                  to={link.path}
                >
                  {link.text}
                </NavLink>
              ))}
              <Spacer />
              {isOpen ? null : (
                <Input
                  maxW={"50%"}
                  color="white"
                  focusBorderColor="purple.500"
                  borderColor="rgb(111, 111, 111)"
                  borderRadius="lg"
                  placeholder="🔍 Search for Movies, Shows, Channels etc. "
                />
              )}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Link to="/login">
              <Button
                _hover={{
                  color: "#0f0617",
                  bg: "white",
                  textDecoration: "none",
                }}
                color="white"
                variant="outline"
              >
                LOGIN
              </Button>
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} color="white" display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, i) => (
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : defaultStyle
                  }
                  key={i}
                  to={link.path}
                >
                  {link.text}
                </NavLink>
              ))}
            </Stack>
            <Input
              maxW={"70%"}
              color="white"
              focusBorderColor="purple.500"
              borderColor="rgb(111, 111, 111)"
              borderRadius="lg"
              placeholder="🔍 Search for Movies, Shows, Channels etc. "
            />
          </Box>
        ) : null}
      </Box>

      
    </>
  );
}
