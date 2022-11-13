import { FC } from "react";
import Slider from "react-slick";
import { AutoImage } from "~/utils";

const Carousel: FC = () => {
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autuplaySpeed: 1000,
  };

  return (
    <Slider {...settings}>
      <div className="bg-[#011E22]">
        <div className="relative max-w-[1200px] mx-auto h-80 after:edge-blur-1">
          <AutoImage
            src="/dummy/leave.png"
            className="object-cover"
            alt="leave"
          />
          <p className="absolute text-3xl bg-black p-2 text-white font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Fall into the green pattern.
          </p>
        </div>
      </div>
      <div className="bg-black">
        <div className="relative max-w-[1200px] mx-auto h-80 after:edge-blur-2">
          <AutoImage
            src="/dummy/forest.jpg"
            className="object-cover"
            alt="forest"
          />
          <p className="absolute text-3xl bg-black p-2 text-white font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Go on a trip to the exciting forest.
          </p>
        </div>
      </div>
      <div className="bg-[#F8C743]">
        <div className="relative max-w-[1200px] mx-auto h-80 after:edge-blur-3">
          <AutoImage
            src="/dummy/instrument.png"
            className="object-cover"
            alt="instrument"
          />
          <p className="absolute text-3xl bg-black p-2 text-white font-bold top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
            Would you like to indulge in<br></br> a beautiful performance?
          </p>
        </div>
      </div>
    </Slider>
  );
};

export { Carousel };
