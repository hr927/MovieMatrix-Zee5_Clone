import React from "react";
import Footer from "../Components/Footer/Footer";
// import CaptionCarousel from "../Components/HomeCarousel/Carousel";
import SimpleSlider from "../Components/HomeCarousel/NewCarouselCard";
import "../Styles/body.css"
// import NewCarousel from "../Components/HomeCarousel/NewCarouselCard";
import Action from "../Components/Home_mid_Section/Action";
import Popular from "../Components/Home_mid_Section/Popular";
import TrendingNearYou from "../Components/Home_mid_Section/TrendingNearYou";
import UserNavabr from "../Components/UserNavbar/UserNavbar";
const Home = () => {
  return (
    <div className="body">
      <UserNavabr/>
      <SimpleSlider/>
      <TrendingNearYou />
      <Popular />
      <Action />
      <Footer />
    </div>
  );
};

export default Home;
