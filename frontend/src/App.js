import "./App.css";
import Footer from "./Components/Footer/Footer";
import CaptionCarousel from "./Components/HomeCarousel/Carousel";
import UserNavbar from "./Components/UserNavbar/UserNavbar";

function App() {
  return (
    <div className="App">
      <UserNavbar />
      <CaptionCarousel/>
      <Footer/>
    </div>
  );
}

export default App;
