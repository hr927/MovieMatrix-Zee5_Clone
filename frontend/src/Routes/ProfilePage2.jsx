import { useState } from "react";
import { Flex, Box, Avatar, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

function ProfilePage2() {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageUpload = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
  };

  return (
    <Flex alignItems="center" flexDirection="column">
      <Box position="relative" width="200px" height="200px">
        <Avatar
          size="2xl"
          name="User Name"
          src={profilePic}
          backgroundColor="gray.200"
          _hover={{ cursor: "pointer" }}
        />
        {profilePic && (
          <IconButton
            position="absolute"
            top="5px"
            right="5px"
            size="sm"
            colorScheme="red"
            aria-label="remove Image"
            icon={<CloseIcon />}
            onClick={handleRemoveImage}
          />
        )}
        {!profilePic && (
          <IconButton
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            size="md"
            colorScheme="blue"
            aria-label="add Image"
            icon={<AddIcon />}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </IconButton>
        )}
      </Box>
    </Flex>
  );
}

export default ProfilePage2;
