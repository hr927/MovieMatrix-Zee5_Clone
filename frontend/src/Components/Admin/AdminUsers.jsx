import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import { Heading, useToast } from "@chakra-ui/react";
import AdminNav from "./AdminNav";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    // console.log("in");
    try {
      const response = await axios.get(
        "https://uninterested-gray-spacesuit.cyclic.app/user",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2Y0OTYwNDJjOWRhZTNmODNlNWZmZGYiLCJpYXQiOjE2NzY5NzQxODB9.8LlUUFyybQj-moWisIi1o2fLGLxAAeP5TGFB0sLYxeQ",
          },
        }
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/delete/${id}`,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2Y0OTYwNDJjOWRhZTNmODNlNWZmZGYiLCJpYXQiOjE2NzY5NzQxODB9.8LlUUFyybQj-moWisIi1o2fLGLxAAeP5TGFB0sLYxeQ",
          },
        }
      );
      console.log(response);
      toast({
        title: "User Deleted.",
        description: "The User has been deleted!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNav />
      <div style={{ padding: "20px", paddingTop: "120px" }}>
        <Heading>All Users</Heading>
        <div>
          <UserTable users={users} onDeleteUser={handleDeleteUser} />
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
