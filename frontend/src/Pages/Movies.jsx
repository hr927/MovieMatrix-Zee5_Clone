import React from "react";
import Footer from "../Components/Footer/Footer";

import "../Styles/body.css";

import SimpleSlider from "../Components/Carousel/NewCarouselCard";
import SliderCard from "../Components/SliderArea/SliderCard";
import UserNavabr from "../Components/UserNavbar/UserNavbar";
import { getTagsMediaTypedata } from "../Components/SliderArea/api";
const Movies = () => {
  const [trending, settrending] = React.useState(null);
  const [PopularMovies, SetPopularMovies] = React.useState(null);
  React.useEffect(() => {
    getTagsMediaTypedata("Trending", "Movie")
      .then((res) => {
        settrending(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
    getTagsMediaTypedata("Popular", "Movie")
      .then((res) => {
        SetPopularMovies(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(trending);
  return (
    <div className="body">
      <UserNavabr />
      <SimpleSlider data={trending} />
      <SliderCard data={trending} heading="Trending Movies" />
      <SliderCard data={PopularMovies} heading="Popular Movies" />
      <Footer />
    </div>
  );
};

export default Movies;
