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
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  VStack,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import "./UserNavbar.css";

import { FaBars, FaCrown, FaRegUser } from "react-icons/fa";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  NavLink,
  Link as RouterLink,
  Link,
  useNavigate,
} from "react-router-dom";
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logoutFun } from "../../Redux/Authentication/action";

import { debounce } from "lodash";
import axios from "axios";
const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: "1994",
    synopsis:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    synopsis:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: "2008",
    synopsis:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
];

const Links = [
  { path: "/", text: "Home" },
  { path: "/tvshows", text: "TV Shows" },
  { path: "/movies", text: "Movies" },
  { path: "/myreviews", text: "My Reviews" },
  { path: "/watchlist", text: "Watchlist" },
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();
  // const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movie, setMovie] = useState(null);

  const [movieId, setMovieId] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const getdata = () => {
    axios
      .get(`http://localhost:8080/media/search?name=${searchValue}`)
      .then((res) => {
        console.log("search: ", res.data);
        setSearchResults(res.data);
        setMovieId(res.data._id);
        // console.log("movieId: ", movieId);

        // console.log(res)
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setIsLoggedIn(true);

      setProfile(true);
      setUser(JSON.parse(localStorage.getItem("userDetails")));
    }

    // getdata()
  }, []);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLoggedIn(false);

    dispatch(logoutFun());
    navigate("/");
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Use debounce to reduce the number of API calls
    debounceSearch(value);
  };

  const debounceSearch = debounce((value) => {
    if (value) {
      getdata();
      const results = searchResults.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setSelectedMovie(null);
    } else {
      setSearchResults([]);
      setSelectedMovie(null);
    }
  }, 1000);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setSearchValue("");
    setSearchResults([]);
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
                {searchResults.map((movie) => (
                  <Box
                    key={movie.id}
                    p={2}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius={4}
                    _hover={{ cursor: "pointer", bg: "gray.50" }}
                    onClick={() => handleMovieClick(movie)}
                  >
                    <Text fontSize="xl" fontWeight="bold">
                      {movie.title}
                    </Text>
                    <Text>{movie.year}</Text>
                  </Box>
                ))}
              </VStack>
              {searchResults.map((movie) => (
                <Link to={`/details/${movie._id}`}>
                  <Box
                    key={movie.id}
                    p={2}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius={4}
                    _hover={{ cursor: "pointer", bg: "gray.50" }}
                    onClick={() => handleMovieClick(movie)}
                    className="mx-[%]"
                  >
                    <Text fontSize="xl" fontWeight="bold">
                      {movie.title}
                    </Text>
                    <Text>{movie.year}</Text>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>

      {searchResults.slice(0, 4).map((movie) => (
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
            onClick={() => handleMovieClick(movie)}
            // className="mx-[50%]"
            // style={{    margin:"0px 20% 0px 44%",display:"hidden"}}
          >
            <Text fontSize="xl" fontWeight="bold">
              {movie.title}
            </Text>
            <Text>{movie.year}</Text>
          </Box>
        </Link>
      ))}
    </>
  );
}
