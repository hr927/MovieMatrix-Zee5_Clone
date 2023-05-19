import React from "react";
import Footer from "../Components/Footer/Footer";

import SimpleSlider from "../Components/Carousel/NewCarouselCard";
import "../Styles/body.css";

import UserNavabr from "../Components/UserNavbar/UserNavbar";
import { getdata, getgenredata } from "../Components/SliderArea/api";
import SliderCard from "../Components/SliderArea/SliderCard";
const Home = () => {
  const [trending, setTrending] = React.useState(null);
  const [action, setAction] = React.useState(null);
  const [popular, setPopular] = React.useState(null);

  React.useEffect(() => {
    getdata("Trending")
      .then((res) => {
        setTrending(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));

    getgenredata("Action")
      .then((res) => {
        setAction(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));

    getdata("Popular")
      .then((res) => {
        setPopular(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="body">
      <UserNavabr />
      <SimpleSlider data={trending} />
      <SliderCard data={trending} heading="Trending Near You" />
      <SliderCard data={action} heading="Action For You" />
      <SliderCard data={popular} heading="Popular Near You" />
      <Footer />
    </div>
  );
};

export default Home;
