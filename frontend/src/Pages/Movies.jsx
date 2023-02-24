import React from "react";
import Footer from "../Components/Footer/Footer";
import MoviesCarousel from "../Components/HomeCarousel/MoviesCarousel";
import "../Styles/body.css"

import PopularMovies from "../Components/Movies_Mid_Section/Popular_Movies";
import TrendingMovies from "../Components/Movies_Mid_Section/Trending_Movies";

import UserNavabr from "../Components/UserNavbar/UserNavbar";
const Movies = () => {
  return (
    <div className="body">
      <UserNavabr />

      <MoviesCarousel />
      <TrendingMovies />
      <PopularMovies />
      <Footer />
    </div>
  );
};

export default Movies;
