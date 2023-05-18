import React from "react";
import Footer from "../Components/Footer/Footer";


import SimpleSlider from "../Components/Carousel/NewCarouselCard";
import SliderCard from "../Components/SliderArea/SliderCard";

import UserNavabr from "../Components/UserNavbar/UserNavbar";

import "../Styles/body.css";
import { getTagsMediaTypedata, getgenreMediaTypedata } from "../Components/Home_mid_Section/api";

const TVShows = () => {
  const [trending, settrending] = React.useState(null);
  const [PopularTvSeries, SetPopularTvSeries] = React.useState(null);
  const [DramaTvSeries, SetDramaTvSeries] = React.useState(null);
  React.useEffect(() => {
    getTagsMediaTypedata("Trending", "Show")
      .then((res) => {
        settrending(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));

      getTagsMediaTypedata("Popular","Show")
      .then((res) => {
        SetPopularTvSeries(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));

      getgenreMediaTypedata("Drama","Show")
      .then((res) => {
        SetDramaTvSeries(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="body">
      <UserNavabr />
      <SimpleSlider data={trending} />
      <SliderCard data={trending} heading="Trending Near You" />
      <SliderCard data={DramaTvSeries} heading="Drama TV Series"/>
      <SliderCard data={PopularTvSeries} heading="Popular TV Series"/>
      <Footer />
    </div>
  );
};

export default TVShows;
