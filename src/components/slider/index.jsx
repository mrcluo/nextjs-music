"use client";

import React, { useEffect, useState } from "react";
import { SliderContainer } from "./style";
import "swiper/css";
import "swiper/css/bundle";
import Swiper, { Navigation, Pagination } from "swiper";
function Slider(props) {
  const { bannerList } = props;
  const [swiperDOM, setSwiperDOM] = useState(null);

  useEffect(() => {
    if (bannerList.length && !swiperDOM) {
      Swiper.use([Navigation, Pagination]);
      const swiperDOM = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
        },
      });
      setSwiperDOM(swiperDOM);
    }
  }, [bannerList.length]);
  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider) => {
            return (
              <div className="swiper-slide" key={slider.imageUrl}>
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider);
