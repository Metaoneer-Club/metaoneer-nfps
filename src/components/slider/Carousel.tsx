import { FC } from "react";
import Slider from "react-slick";
import { AutoImage } from "utils";

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
      <div className="bg-dark">
        <div className="relative max-w-[1200px] mx-auto h-96 after:edge-blur-2">
          <AutoImage
            src="/dummy/discord.png"
            className="object-cover"
            alt="discord_bot"
          />
          <p className="absolute text-3xl bg-black p-2 text-white font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Discord Bot connected to On-chain
          </p>
        </div>
      </div>
      <div className="bg-dark">
        <div className="relative max-w-[1200px] mx-auto h-96 after:edge-blur-2">
          <AutoImage
            src="/dummy/imco.png"
            className="object-cover"
            alt="imco"
          />
          <p className="absolute text-3xl bg-black p-2 text-white font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            IMC solutions designed to help market On-chain projects
          </p>
        </div>
      </div>
      <div className="bg-white">
        <div className="relative max-w-[1200px] mx-auto h-96 after:edge-blur-1">
          <AutoImage
            src="/dummy/cc2e.png"
            className="object-cover"
            alt="cc2e"
          />
          <p className="absolute text-3xl bg-black p-2 text-white font-bold top-2/3 right-0 transform -translate-x-1/2 -translate-y-1/2">
            A community that provides valuable talk-nomics<br></br> to users and
            advertising users
          </p>
        </div>
      </div>
    </Slider>
  );
};

export { Carousel };
