import React from "react";
import SliderModule from "react-slick";

const Slider = SliderModule?.default || SliderModule;

const PropertiesSliders = (props) => {
  const { images, className } = props;
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div
          key={index}
          className='px-6'
        >
          <img
            src={image}
            alt='property image'
            className={className}
          />
        </div>
      ))}
    </Slider>
  );
};

export default PropertiesSliders;
