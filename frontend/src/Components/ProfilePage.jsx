import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
  Text,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const user = useSelector((store) => store.authReducer.user);
  //   console.log("user: ", user);
  //   let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  //   console.log("userDetails: ", userDetails);

  const toast = useToast();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    img: user?.img || null,
  });

  //Create a function component and set a state variable to store the image

  const [image, setImage] = useState(null);

  //Create a function to handle the image upload
  const handleImageUpload = (event) => {
    if (event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userDetails"));
    if (data) {
      setUserData(data);
    }
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("clicked");
    try {
      let newDetails = {
        name: userData.name,
        email: userData.email,
        bio: userData.bio,
        skills: userData.skills,
        img: image,
      };
      const res = await axios.put(
        "http://localhost:8080/user/profile",
        newDetails
      );
      console.log("res: ", res);
      toast({
        title: `Save Changes Sucessfully`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setUserData(res.data);
      localStorage.setItem("userDetails", JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
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
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              {/* {image ?
              <Avatar size="xl" src={image} alt="Uploaded Image"> : */}
              <Avatar
                size="xl"
                src={
                  "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
                }
                alt="Uploaded Image"
              >
                {/* } */}

                {/* <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                /> */}
              </Avatar>
            </Center>
            <Center w="full">
              {/* <Input type="file" name="Uploade" onChange={handleImageUpload} /> */}
              <Button w="full">{userData.name}</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="bio">
          <FormLabel>Bio</FormLabel>
          <Input
            type="text"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="skills">
          <FormLabel>Preference</FormLabel>
          <Input
            type="text"
            name="skills"
            value={userData.skills && userData.skills.join(", ")}
            onChange={(e) =>
              setUserData({
                ...userData,
                skills: e.target.value.split(", "),
              })
            }
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            <Link to={"/"}> Cancel</Link>
          </Button>
          <Button
            bg={"#f7cb93"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
