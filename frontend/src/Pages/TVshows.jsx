import React from 'react'
import Footer from '../Components/Footer/Footer'
import CaptionCarousel from '../Components/HomeCarousel/Carousel'
import DramaTvSeries from '../Components/TVshows_mid_section/Drama_TV_Series'
import PopularTvSeries from '../Components/TVshows_mid_section/Popular_TV_Series'
import TrendingTvSeries from '../Components/TVshows_mid_section/Trending_TV_Series'
import UserNavabr from "../Components/UserNavbar/UserNavbar"
import TVSeriesCarousel from '../Components/HomeCarousel/TVSeriesCarousel'
import "../Styles/body.css"


const TVShows = () => {
  return (
    <div className="body">
        <UserNavabr/>
       <TVSeriesCarousel/>
        <TrendingTvSeries/>
        <PopularTvSeries/>
        <DramaTvSeries/>
        <Footer/>
    </div>
  )
}

export default TVShows