import React from "react";
import Bike from "../img/bike.png";
import HeroBg from "../img/herobg.jpg";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div
        className="py-2 flex-1 flex flex-col items-start
  justify-center gap-6"
      >
        <div
          className="flex items-center gap-2 justify-center bg-yellow-100 
    px-4 py-1 rounded-full"
        >
          <p className="text-base text-yellow-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Bike}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>
        <p
          className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide 
    text-headingColor"
        >
          The safest delivery in
          <span className="text-yellow-500 text-[3rem] lg:text-[5rem]">
            {" "}
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[85%]">
          Experience seamless, safe deliveries with real-time tracking. Say
          goodbye to delivery hassles and hello to seamless convenience. Ready
          to deliver happiness? Try us today!
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-full
    md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out
    duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className="ml-auto h-420 w-full lg:w-auto lg:h-650 opacity-20"
          alt="hero-bg"
        />

        <div
          className="w-full h-full absolute flex top-0 left-0 items-center justify-center lg:px-32
        py-4 gap-4 flex-wrap"
        >
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col
                items-center justify-center drop-shadow-lg"
              >
                <img
                  src={n.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                  alt="fresh"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">{n.cta}</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
