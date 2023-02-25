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
        "https://bronze-salamander-cuff.cyclic.app/user",
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Admin_token")),
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
        `https://bronze-salamander-cuff.cyclic.app/user/delete/${id}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Admin_token")),
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
