import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Img,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import "./UserNavbar.css";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  NavLink,
  Link as RouterLink,
  Link,
  useNavigate,
} from "react-router-dom";
import logo from "../../Images/logo.png";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { logoutFun } from "../../Redux/Authentication/action";

import { debounce } from "lodash";
import axios from "axios";

const Links = [
  { path: "/", text: "Home" },
  { path: "/tvshows", text: "TV Shows" },
  { path: "/movies", text: "Movies" },
  { path: "/myreviews", text: "My Reviews" },
  { path: "/watchlist", text: "Watchlist" },
];

export default function UserNavabr() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultStyle = { color: "#CBD5E0", textDecoration: "none" };
  const activeStyle = {
    color: "white",
    textDecoration: "none",
    borderBottom: "2px solid white",
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // for search state
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // function for getting the Search data from backend
  const getdata = () => {
    axios
      .get(`http://localhost:8080/media/search?name=${searchValue}`)
      .then((res) => {
        console.log("search: ", res.data);
        setSearchResults(res.data);
      });
  };

  // display Search Data
  let listToDisplay = searchResults;

  // onChange apply on input
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Store the Search Data in Function and Call when search will happen
  const SearchData = () => {
    return listToDisplay.map((movie, i) => {
      return (
        <Link to={`/details/${movie._id}`}>
          <Box
            key={movie.id}
            p={2}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius={4}
            _hover={{ cursor: "pointer", bg: "gray.50", color: "black" }}
            mt={4}
            overflow="auto"
            maxHeight="20rem"
          >
            <Text fontSize="xl" fontWeight="bold">
              {movie.title}
            </Text>
            <Text>{movie.year}</Text>
          </Box>
        </Link>
      );
    });
  };

  // Filtering logic is apply on SearchResults
  if (searchValue !== "" || searchValue.trim() ) {
    listToDisplay = searchResults.filter((movie) => {
      // return fruit.includes(searchValue);
      return movie.title.toLowerCase().includes(searchValue);
    });
  }

  // Use Debounce for searching with useMemo
  const debouncedResults = useMemo(() => {
    return debounce(handleInputChange, 3000);
  }, []);

  // for unmounting search functionality (it means when backspace hit the search data will vanish)
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  // This is for authentication using local storage token and for calling the search data first time when component render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setIsLoggedIn(true);

      setUser(JSON.parse(localStorage.getItem("userDetails")));
    }
    getdata();
  }, []);

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLoggedIn(false);

    dispatch(logoutFun());
    navigate("/");
  };

  // Login Function
  const handleLogin = () => {
    setIsLoggedIn(true);
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
                  value={searchValue}
                  onChange={handleInputChange}
                />
              )}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Link to="/login">
              <Menu isLazy>
                <MenuList>
                  {/* MenuItems are not rendered unless Menu is open */}
                  <MenuItem
                    _hover={{
                      color: "white",
                      bg: "#8230c6",
                      textDecoration: "none",
                    }}
                    color="Black"
                    variant="outline"
                  >
                    User Login
                  </MenuItem>
                  <MenuItem
                    _hover={{
                      color: "white",
                      bg: "#8230c6",
                      textDecoration: "none",
                    }}
                    color="black"
                    variant="outline"
                  >
                    Admin Login
                  </MenuItem>
                </MenuList>
              </Menu>
            </Link>

            <Menu isLazy>
              {isLoggedIn ? (
                <Flex alignItems="center">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={
                        <Avatar
                          size="sm"
                          src={
                            "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
                          }
                        />
                      }
                      variant="ghost"
                      aria-label="User menu"
                      _hover={{ background: "transparent" }}
                      _active={{ background: "transparent" }}
                    />
                    <MenuList bg={"#0f0617"}>
                      <Link to={"/profile-page"}>
                        <MenuItem
                          bg={"#0f0617"}
                          color={"white"}
                          _hover={{ bg: "#a77b4d" }}
                        >
                          Profile
                        </MenuItem>
                      </Link>
                      <MenuItem
                        onClick={handleLogout}
                        bg={"#0f0617"}
                        color={"white"}
                        _hover={{ bg: "#a77b4d" }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <Link to={"/login"}>
                  <Button
                    onClick={handleLogin}
                    _hover={{
                      color: "#0f0617",
                      bg: "white",
                      textDecoration: "none",
                    }}
                    color="white"
                    variant="outline"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Menu>
            {/* </Link> */}
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
            <Box p={4}>
              <Input
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search movies"
              />
              <VStack mt={4} align="stretch" spacing={2}>
        {searchValue.trim().length>0 && SearchData()}
              </VStack>
           
            </Box>
          </Box>
        ) : null}
        {searchValue.trim().length>0 && SearchData()}
      </Box>
    </>
  );
}
