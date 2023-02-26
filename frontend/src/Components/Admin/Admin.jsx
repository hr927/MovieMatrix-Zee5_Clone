import { Box, Flex, Heading } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";

const data = [
  { name: "Jan", visits: 50 },
  { name: "Feb", visits: 80 },
  { name: "Mar", visits: 120 },
  { name: "Apr", visits: 100 },
  { name: "May", visits: 180 },
  { name: "Jun", visits: 220 },
  { name: "Jul", visits: 220 },
  { name: "Aug", visits: 240 },
  { name: "Sep", visits: 260 },
  { name: "Oct", visits: 300 },
  { name: "Nov", visits: 300 },
  { name: "Dec", visits: 320 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffcc99",
];

const Admin = () => {
  const [mediaData, setMediaData] = useState([]);

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
      setMediaData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMedia();
  }, []);
  const getGenreCounts = () => {
    const genreCounts = {};
    mediaData.forEach((media) => {
      media.genre.forEach((genre) => {
        genreCounts[genre] = genreCounts[genre] ? genreCounts[genre] + 1 : 1;
      });
    });
    return genreCounts;
  };

  const genreCounts = getGenreCounts();
  const dataPie = Object.keys(genreCounts).map((genre) => ({
    name: genre,
    value: genreCounts[genre],
  }));
  return (
    <>
      <AdminNav />
      <div style={{ width: "80%", margin: "auto", paddingTop: "100px" }}>
        <Box p={4} textAlign="center">
          <Heading as="h2" size="lg" mb={4}>
            Admin DashBoard
          </Heading>
          <Box borderWidth="1px" borderRadius="lg" p={10} mb={4}>
            <Flex>
              <Heading fontSize={"25px"} mt="auto" mb={"auto"} width={"20%"}>
                {" "}
                Website Analytics
              </Heading>
              <LineChart width={800} height={400} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </Flex>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" p={10}>
            <Flex gap={"20"} p={2}>
              <PieChart width={600} height={400}>
                <Pie
                  data={dataPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {dataPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
              <Heading fontSize={"25px"} mt="auto" mb={"auto"}>
                Media Statistics on the basis of Genre
              </Heading>
            </Flex>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Admin;
