import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaCard from "./MediaCard";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AdminNav from "./AdminNav";

const AdminMedia = () => {
  const [media, setMedia] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const getMedia = async () => {
    try {
      const response = await axios.get(
        `https://bronze-salamander-cuff.cyclic.app/media`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Admin_token")),
          },
        }
      );
      console.log(response.data);
      setMedia(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMedia();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://bronze-salamander-cuff.cyclic.app/delete/${id}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Admin_token")),
          },
        }
      );
      console.log(response);
      toast({
        title: "Media Deleted.",
        description: "The Media has been deleted!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getMedia();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMedia = async (mt) => {
    let query = "";
    if (mt === "Movie") {
      query = "Movie";
    } else if (mt === "Show") {
      query = "Show";
    }
    try {
      console.log("called");
      const response = await axios.get(
        `https://bronze-salamander-cuff.cyclic.app/media?mediaType=${query}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("Admin_token")),
          },
        }
      );
      console.log(response.data);
      setMedia(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNav />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          paddingTop: "100px",
          textAlign: "center",
        }}
      >
        <Heading>Media Control</Heading>
        <Button fontSize="20px" onClick={() => navigate("/admin/createmedia")}>
          Add Media
        </Button>
      </div>
      <div style={{ width: "80%", margin: "auto", marginTop: "30px" }}>
        <Tabs>
          <TabList>
            <Tab
              onClick={() => {
                getMedia();
              }}
              fontSize="20px"
            >
              All
            </Tab>
            <Tab
              onClick={() => {
                handleMedia("Movie");
              }}
              fontSize="20px"
            >
              Movies
            </Tab>
            <Tab
              onClick={() => {
                handleMedia("Show");
              }}
              fontSize="20px"
            >
              Shows
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box m={"auto"} mt="8" p={"10"} w={"80%"}>
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={6}
                >
                  {media.map((item) => (
                    <GridItem key={item.id}>
                      <MediaCard
                        imageUrl={item.poster}
                        title={item.title}
                        onDelete={handleDelete}
                        onUpdate={() =>
                          navigate(`/admin/updatemedia/${item._id}`)
                        }
                        showID={item._id}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box m={"auto"} mt="8" p={"10"} w={"80%"}>
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={6}
                >
                  {media.map((item) => (
                    <GridItem key={item.id}>
                      <MediaCard
                        imageUrl={item.poster}
                        title={item.title}
                        onDelete={handleDelete}
                        onUpdate={() =>
                          navigate(`/admin/updatemedia/${item._id}`)
                        }
                        showID={item._id}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box m={"auto"} mt="8" p={"10"} w={"80%"}>
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={6}
                >
                  {media.map((item) => (
                    <GridItem key={item.id}>
                      <MediaCard
                        imageUrl={item.poster}
                        title={item.title}
                        onDelete={handleDelete}
                        onUpdate={() =>
                          navigate(`/admin/updatemedia/${item._id}`)
                        }
                        showID={item._id}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default AdminMedia;
