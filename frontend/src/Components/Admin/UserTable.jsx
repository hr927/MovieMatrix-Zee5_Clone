import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialog,
  Flex,
  Box,
  Stack,
} from "@chakra-ui/react";

const UserTable = ({ users, onDeleteUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [userId, setUserId] = useState("");
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDeleteUser(userId);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box overflowX="auto">
        <Box display={["none", "block"]}>
          <Table>
            <Thead>
              <Tr>
                <Th>Serial No.</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={user.id}>
                  <Td display={["none", "table-cell"]}>{index + 1}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        onOpen();
                        setUserId(user._id);
                      }}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box display={["block", "none"]}>
          <Flex justify="center">
            <Stack direction={"column"} mt="4" spacing="4">
              {users.map((user, index) => (
                <Box key={user.id}>
                  <Flex justify="space-between" align="center">
                    <Box fontWeight="bold" mr="2">
                      Name:
                    </Box>
                    <Box>{user.name}</Box>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Box fontWeight="bold" mr="2">
                      Email:
                    </Box>
                    <Box>{user.email}</Box>
                  </Flex>
                  <Flex justify="flex-end" mt="2">
                    <Button
                      onClick={() => {
                        onOpen();
                        setUserId(user._id);
                      }}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default UserTable;
