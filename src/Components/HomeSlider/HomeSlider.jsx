import React from "react";
import Slider from "react-slick";
import slide1 from "./../../assets/images/slider-image-1.jpeg"
import slide2 from "./../../assets/images/slider-image-2.jpeg"
import slide3 from "./../../assets/images/slider-image-3.jpeg"
import blog1 from "./../../assets/images/blog-img-1.jpeg"
import blog2 from "./../../assets/images/blog-img-2.jpeg"
import "./HomeSlider.css"

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  };
  return (
      <>
        <div className=" pb-3 main">
            <div className="slider">
                <Slider {...settings}>
                    <div>
                        <img src={slide1} alt="" className="w-100 slides"/>
                    </div>
                    <div>
                        <img src={slide2} alt="" className="w-100 slides"/>
                    </div>
                    <div>
                        <img src={slide3} alt="" className="w-100 slides"/>
                    </div>
                </Slider>
              </div>
              
              <div className="blogSide">
                      <div>
                          <img src={blog1} alt="" className="w-100 blog" />
                      </div>
                      <div>
                          <img src={blog2} alt="" className="w-100 blog"/>
                    </div>
              </div> 
        </div>
      
      </>
  );
}