import React from 'react'
import Footer from '../Components/Footer/Footer'
import CaptionCarousel from '../Components/HomeCarousel/Carousel'
import Action from '../Components/Home_mid_Section/Action'
import Popular from '../Components/Home_mid_Section/Popular'
import TrendingNearYou from '../Components/Home_mid_Section/TrendingNearYou'
import UserNavabr from "../Components/UserNavbar/UserNavbar"
const Home = () => {
  return (
    <div>
        <UserNavabr/>
        <CaptionCarousel/>
        <TrendingNearYou/>
        <Popular/>
        <Action/>
        <Footer/>
    </div>
  )
}

export default Home