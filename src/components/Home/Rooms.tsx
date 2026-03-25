import { Link } from "react-router-dom";
import RoomsSlider from "@/components/Home/RoomsSlider";
import { useRef } from "react";
import type Slider from "react-slick";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { useRoomStore } from "@/store/useRoomsStore";
import cn from "classnames";
import { useCustomWidth } from "@/hooks/useCustomWidth";
import { buildLocalizedPath } from "@/utils/localeRouting";

export const RoomsHome = () => {
  const sliderRef = useRef<Slider | null>(null);
  const { t, i18n } = useTranslation();
  const isEng = i18n.language === "en";
  const { sliderProps } = useRoomStore();
  const isCustomWidth = useCustomWidth(1500, 1700);

  return (
    <div className="flex flex-col bg-[#A47762] relative items-center md:items-stretch overflow-x-hidden overflow-y-hidden 2xl:h-[72vw] xl:h-[80vw] lg:h-[95vw]">
      <div className="grid absolute md:grid-cols-[5.2%_19%_34.7%_25.8%] grid-cols-[89.07%]  lg:h-[1580px] md:h-[1000px] sm:h-[797px] h-[857px] md:items-start justify-center md:justify-start w-full  ">
        <div className="w-full h-full border-[#C29986] hidden md:block"></div>
        <div className="w-full h-full border-e border-x md:border-x-0 border-[#C29986] "></div>
        <div className="w-full h-full border-x border-[#C29986] hidden md:block"></div>
        <div className="w-full h-full border-e border-[#C29986] hidden md:block"></div>
      </div>

      <div className="w-full lg:h-[11.5vw] h-[70vw] md:h-[34.18vw] grid-cols-[89.07%] grid lg:flex flex-col justify-center 2xl:mt-[11.51vw] xl:mt-[13.38vw] lg:mt-[9.72vw]">
        <h1
          className="text-center lg:ps-[4.1vw] 2xl:ps-[3vw] flex-col lg:flex-row flex lg:justify-between justify-center
          items-center lg:items-start
            lg:w-[calc(100vw-14.3vw)] 
            2xl:w-[calc(100vw-14vw)] 
            w-full
            text-[12.8vw] sm:text-[10.42vw] md:text-[9.77vw] lg:text-[8.33vw] xl:text-[7.81vw] 2xl:text-[10.31vw]
            uppercase tracking-[-0.1em] 
            text-[#EDE8E5] md:text-center lg:text-start xl:text-start 
            leading-[81.5%] 
            2xl:gap-x-[2.6vw]
            gap-y-[8vw]
            lg:gap-y-0
            mt-[17.33vw] 
            lg:mt-0
            z-20"
        >
          <span className="tracking-[-0.09em] text-[12.8vw] sm:text-[10.42vw] md:text-[9.77vw] lg:text-[11vw] xl:text-[9.81vw] 2xl:text-[10.31vw]">
            {t("home.rooms.rooms")}
          </span>

          <span
            className="flex lg:flex-col text-[6.4vw] sm:text-[5.21vw] md:text-[4.88vw] 
           lg:text-[5vw] xl:text-[5.17vw] 2xl:text-[5.21vw] tracking-[-0.09em] gap-y-[0.36vw] leading-[81%] uppercase"
          >
            <span className="leading-[81%] w-auto">
              {t("home.rooms.forWhat.0")} &nbsp;
            </span>
            <span
              className={`leading-[81%]   w-auto ${
                isEng
                  ? " xl:ps-[13.8vw] 2xl:ps-[14.5vw] lg:ps-[11vw] xl:translate-x-[-3vw] 2xl:translate-x-[-3.5vw]"
                  : " xl:ps-[10.7vw] 2xl:ps-[11vw] lg:ps-[11vw]"
              }`}
            >
              {t("home.rooms.forWhat.1")}
            </span>
          </span>
        </h1>
        <div className="flex flex-col w-full h-full items-center lg:items-start lg:justify-center ">
          <div className="">
            <div className="flex md:flex-row lg:ps-[5.56vw] 2xl:ps-[4.15vw] md:ps-[5.86vw] flex-col text-start items-center md:items-start 2xl:items-start relative 2xl:h-[10.42vw] xl:h-[9.9vw] lg:h-[12.5vw] md:h-[14.65vw] sm:h-[16.93vw]">
              <div
                className={`md:absolute flex md:flex-row items-center flex-col pt-[4.27vw] md:pt-[3.42vw] xl:pt-[1.8vw]
                space-y-[8vw] md:space-y-0 text-center md:text-start  md:hidden lg:flex
                ${
                  isEng
                    ? "2xl:gap-x-[2.2vw] xl:gap-x-[1.9vw]"
                    : "md:gap-[1.95vw] 2xl:gap-x-[4.43vw]  xl:gap-x-[3.13vw]"
                }
                `}
              >
                <p
                  className="uppercase 2xl:w-[22vw] xl:w-[20.83vw] px-[6.4vw] lg:w-[22.92vw] md:w-[34.18vw] sm:w-[37.11vw] lg:px-0 
                  text-[3.2vw] sm:text-[2.08vw] md:text-[1.27vw] lg:text-[0.97vw] xl:text-[0.78vw] 2xl:text-[0.83vw]
                  text-[#E9E9E9]"
                >
                  {t("home.rooms.desc")}
                </p>
                <div className="flex justify-center items-center">
                  <Link
                    to={buildLocalizedPath("/rooms", i18n.language === "en" ? "en" : "uk")}
                    className={cn(
                      `uppercase text-center text-[#242425] font-cofo-medium hover:bg-black hover:text-[#EDE8E5]
                       bg-[#EDE8E5] whitespace-nowrap 
                       px-[3.87vw] py-[1.2vw]
                       md:w-[14.5vw]
                       md:h-[3.1vw]
                       w-[178px]
                       h-[42px]
                       lg:px-[1.39vw] lg:py-[0.83vw]
                       2xl:h-[2.4vw] 
                       xl:h-[2.7vw]
                       2xl:text-[0.83vw]
                       xl:text-[0.8vw]
                       text-[12px] 
                       rounded-full hover:cursor-pointer
                       flex items-center justify-center`,
                      {
                        "2xl:w-[8.85vw] xl:w-[9vw]": isEng,
                        "2xl:w-[12.25vw] xl:w-[12vw]": !isEng,
                      }
                    )}
                  >
                    {t("buttons.viewRooms")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex"></div>
      </div>

      <div
        className="max-w-screen relative z-30  md:mb-0 mt-[28vw] md:mt-[0] xl:mb-[1.56vw] w-full 2xl:h-[30vw] 2xl:mt-[0px] lg:mt-[2.56vw]
      xl:mt-[1.56vw]  lg:h-[600px] md:h-[500px] mb-[70px]  h-[357px] "
      >
        <RoomsSlider sliderProps={sliderProps} ref={sliderRef} />
      </div>
      <div className={`relative 2xl:translate-y-[7.8vw] z-50 ${isCustomWidth ? " xl:translate-y-[10vw]" : "xl:translate-y-[5vw]"}`}>
        <div className=" z-50 absolute 2xl:left-[4vw] xl:left-[2vw] lg:left-[1.5vw]">
          <button
            className="2xl:w-[3.23vw] 2xl:h-[3.23vw] xl:w-[3.02vw] xl:h-[3.02vw] lg:w-[3.75vw] lg:h-[3.75vw] md:w-[4.69vw] 
          md:h-[4.69vw] flex items-center justify-center hover:text-[#8C331B] border hover:border-[#8C331B] rounded-full 
          z-20 hover:bg-white text-white  2xl:me-[5.21vw] md:me-[5.86vw] xl:me-[4.69vw] lg:me-[5.56vw] 2xl:mb-[2.29vw]
          xl:mb-[2.08vw] lg:mb-[2.5vw]"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <HiArrowLongLeft className="2xl:w-[1.67vw] 2xl:h-[1.67vw] xl:w-[1.56vw] xl:h-[1.56vw] lg:w-[1.94vw] lg:h-[1.94vw]" />
          </button>
        </div>
        <div className=" z-50 absolute 2xl:right-[6vw] xl:right-[4vw] lg:right-[3.5vw]">
          <button
            className={`2xl:w-[3.23vw] 2xl:h-[3.23vw] xl:w-[3.02vw] xl:h-[3.02vw] lg:w-[3.75vw] lg:h-[3.75vw] md:w-[4.69vw] 
            md:h-[4.69vw] flex items-center justify-center hover:text-[#8C331B] border hover:border-[#8C331B] rounded-full 
            z-20 hover:bg-white text-white  2xl:ms-[3.8vw] md:ms-[5.86vw] lg:ms-[4.17vw] 2xl:mb-[2.29vw] xl:mb-[2.08vw]
            lg:mb-[2.5vw]`}
            onClick={() => sliderRef.current?.slickNext()}

          >
            <HiArrowLongRight className="2xl:w-[1.67vw] 2xl:h-[1.67vw] xl:w-[1.56vw] xl:h-[1.56vw] lg:w-[1.94vw] lg:h-[1.94vw]" />
          </button>
        </div>
      </div>
    </div>
  );
};
