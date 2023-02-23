import "./App.css";
import SingleMovie from "./Pages/SingleMovie";
import Footer from "./Components/Footer/Footer";
import CaptionCarousel from "./Components/HomeCarousel/Carousel";
import TrendingNearYou from "./Components/Home_mid_Section/TrendingNearYou";
import UserNavbar from "./Components/UserNavbar/UserNavbar";

function App() {
  return (
    <div className="App">
      <SingleMovie />
      <UserNavbar />
      <CaptionCarousel/>
      <TrendingNearYou/>
      <Footer/>


    </div>
  );
}

export default App;
