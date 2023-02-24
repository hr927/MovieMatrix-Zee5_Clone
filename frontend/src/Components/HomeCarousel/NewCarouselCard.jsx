import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import { getdata } from "../Home_mid_Section/api";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/body.css";
export default function SimpleSlider() {
  const navigate = useNavigate();

  const [trending, settrending] = React.useState(null);
  React.useEffect(() => {
    getdata("Trending")
      .then((res) => {
        settrending(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(trending);
  var settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };
  return (
    <div className="maxHight" >
      <Slider {...settings}>
        {trending?.map((item, index) => (
          <div >
            <img
            className="imghight"
            onClick={() => navigate(`details/${item._id}`)}
            src={item.poster}
            alt={item.title}
          />
          </div>
          
        ))}
      </Slider>
    </div>
  );
}




