import { FC } from "react";
import Slider from "react-slick";

const Carousel: FC = () => {
  const settings = {
    centerPadding: "40px",
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autuplaySpeed: 1000,
  };

  return (
    <Slider {...settings}>
      <div className="bg-yellow-600 text-center text-white py-40">1</div>
      <div className="bg-indigo-600 text-center text-white py-40">2</div>
      <div className="bg-purple-600 text-center text-white py-40">3</div>
    </Slider>
  );
};
export { Carousel };
