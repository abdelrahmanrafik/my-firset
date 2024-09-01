import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "./CatSlider.css"

export default function CatSlider() {

    async function getCat() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    const {data} = useQuery("catSilder", getCat)
    
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
  return (
      <div className="pb-3">
            <Slider {...settings}>
              {data?.data.data.map(function (item, idx) {
                  return <div key={idx}>
                      <img src={item.image} alt="" className="w-100 slidCat" />
                      <h6 className="text-center">{item.name}</h6>
                    </div>
                })}
            </Slider>
        </div>
  );
}