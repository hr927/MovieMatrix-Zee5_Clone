import React from 'react'
import Footer from '../Components/Footer/Footer'
import CaptionCarousel from '../Components/HomeCarousel/Carousel'
import PopularMovies from '../Components/Movies_Mid_Section/Popular_Movies'
import TrendingMovies from '../Components/Movies_Mid_Section/Trending_Movies'

import UserNavabr from "../Components/UserNavbar/UserNavbar"
const Movies = () => {
  return (
    <div>
        <UserNavabr/>
        <CaptionCarousel/>
        <TrendingMovies/>
        <PopularMovies/>
        <Footer/>
    </div>
  )
}

export default Movies