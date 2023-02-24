import { Box, Button, Container, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link,useNavigate } from "react-router-dom";

const CarouselCard = ({item,index}) => {
  const navigate = useNavigate();
// console.log(item._id)
  return (
    <div>
      <Box
    key={index}
    height={"6xl"}
    position="relative"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
    backgroundSize="cover"
    backgroundImage={`url(${item.poster})`}
  >
    <Container height="600px" position="relative">
      <Stack
        spacing={6}
        w={"full"}
        maxW={"lg"}
        position="absolute"
        top="50%"
        transform="translate(0, -50%)"
      >
        <Button color={"black"}>Watch</Button>

        <Text fontSize={{ base: "2xl", md: "3xl", lg: "3xl" }}>
          {item.title}
        </Text>
        <Text onClick={()=>console.log(index)} color="white" fontSize={{ base: "2xl", md: "3xl", lg: "3xl" }}>
          {item._id}
        </Text>
        <Link to={`/details/${item._id}`}><Button color="black">Watch</Button></Link>
        
      </Stack>
    </Container>
  </Box>
    </div>
    
  )
}

export default CarouselCard