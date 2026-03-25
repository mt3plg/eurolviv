import { forwardRef, useState } from "react";
import Slider from "react-slick";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import "./roomsSlider.css";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import cn from "classnames";
import { useCustomWidth } from "@/hooks/useCustomWidth";
import { guestWhite } from "@/store/exportsIcons";
import { squareWhite } from "@/store/exportsIcons";
import { Link } from "react-router-dom";
import { buildLocalizedPath } from "@/utils/localeRouting";

type Room = {
  title: string;
  area: number;
  guests: string;
  type: string;
  src: string;
};

type RoomsSliderProps = {
  sliderProps: Room[];
};

const RoomsSlider = forwardRef<Slider, RoomsSliderProps>(
  ({ sliderProps }, ref) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const { t, i18n } = useTranslation();
    const isEng = useIsEnglish();
    const isWide = useCustomWidth(1024, 10000);
    const isCustomWidth = useCustomWidth(1500, 1700);
    const [isHover, setIsHover] = useState<number | null>(null);
    const settings = {
      infinite: true,
      centerMode: true,
      centerPadding: "8%",
      slidesToShow: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            centerPadding: "8%",
          },
        },
        {
          breakpoint: 1530,
          settings: {
            slidesToShow: 3,
            centerPadding: "8%",
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            centerPadding: "10%",
          },
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            variableWidth: false,
            slidesToShow: 1,
            centerPadding: "15%",
          },
        },
      ],
      speed: 500,
      beforeChange: (_: number, next: number) => setActiveSlide(next),
      className: "center-mode-slider",
    };

    return (
      <div className="relative w-full flex flex-col h-full ">
        <Slider
          {...settings}
          ref={ref}
          className={cn(
            `w-full flex items-center justify-center 2xl:h-[46vw]  `,
            {
              "img-rooms": isWide,
            }
          )}
        >
          {sliderProps.map((el, index) => {
            const totalSlides = sliderProps.length;
            const isActive = activeSlide === index;

            const normalizedDiff = Math.min(
              Math.abs(activeSlide - index),
              Math.abs(activeSlide - index + totalSlides),
              Math.abs(activeSlide - index - totalSlides)
            );

            const isSide = normalizedDiff === 1;
            const isEdge = normalizedDiff > 1;

            return (
              <div
                key={index}
                onMouseEnter={() => setIsHover(index)}
                onMouseLeave={() => setIsHover(null)}
                className={cn(
                  "rooms-slider-slide flex flex-col justify-center items-center h-full lg:ms-0 ms-[-30px] z-20 ",
                  {
                    "opacity-0 lg:opacity-100":
                      activeSlide === 0 && index === sliderProps.length - 1,
                  }
                )}
              >
                <div className="flex flex-col justify-center items-center h-full 2xl:h-[44vw] md:px-0 px-0 mx-1 z-20">
                  <InViewWrapper className="flex flex-col justify-center items-center h-full min-h-full w-full my-auto">
                    <div className="flex items-center justify-center">
                      <img
                        loading="eager"
                        src={el.src}
                        alt={`slide_${index}`}
                        className={cn(
                          `object-cover transition-all duration-500 lg:px-0 mx-auto room-img`,
                          {
                            "2xl:w-[26.563vw] 2xl:h-[27.896vw] lg:w-[350px] lg:h-[400px] md:h-[300px] md:w-auto w-[69.07vw] h-[45.33vw] z-10 lg:scale-[100%]":
                              isActive,
                            "2xl:w-[27.604vw] 2xl:h-[16.385vw] lg:w-[300px] lg:h-[213px] md:w-auto w-[69.07vw] h-[45.33vw] z-5":
                              isSide,
                            "2xl:w-[26.771vw] 2xl:h-[14.458vw] lg:w-[250px] lg:h-[194px] md:w-auto w-[69.07vw] h-[45.33vw]":
                              isEdge,
                            "xl:w-[40vw] xl:h-[500px]":
                              isActive && isCustomWidth,
                            "xl:w-[37vw] xl:h-[410px]":
                              isActive && !isCustomWidth,
                            "xl:w-[26.469vw] xl:h-[283px]":
                              isSide && isCustomWidth,
                            "xl:w-[26.469vw] xl:h-[253px]":
                              isSide && !isCustomWidth,
                            "xl:w-[27.469vw] xl:h-[246px]":
                              isEdge && isCustomWidth,
                            "xl:w-[27.469vw] xl:h-[216px]":
                              isEdge && !isCustomWidth,
                          }
                        )}
                      />
                    </div>
                  </InViewWrapper>

                  <div
                    className={cn(
                      "flex flex-col z-20 items-center text-white lg:gap-y-2 gap-y-[6px] transition-all duration-500 text-[12px] lg:text-[16px] 2xl:min-h-[8.59vw] xl:min-h-[10.39vw] lg:min-h-[16.39vw]",
                      {
                        "opacity-100": isActive,
                        "": !isActive,
                      }
                    )}
                  >
                    <div className="flex items-center justify-center 2xl:pt-[28px] xl:pt-[16px] lg:pt-[20px] md:pt-[16px] z-20">
                      <h4
                        className={cn(
                          "2xl:text-[1.667vw] lg:w-4/5 xl:text-[1.8vw] lg:text-[22px] md:text-[18px] text-[18px] leading-[104%] tracking-[-0.05em] mt-[13px] lg:mt-0 uppercase font-cofo-medium text-[#EDE8E5] text-center transition-all duration-500",
                          isEng
                            ? {
                                "2xl:w-[22vw] xl:w-[60%] w-[55%]":
                                  t(el.title).length > 15,
                                "2xl:w-[35vw]! xl:w-[17vw]! w-[65%]":
                                  t(el.title).length > 20 &&
                                  t(el.title).length < 20,
                                " xl:w-[55%] w-[75%]":
                                  t(el.title).length > 30 &&
                                  t(el.title).length < 40,
                                "!w-[50%] lg:w-fit!": index === 1,
                              }
                            : {
                                " xl:w-[95%] w-[75%]":
                                  t(el.title).length > 15 &&
                                  t(el.title).length < 20,
                                "2xl:w-[22vw]! xl:w-[26w]! w-[75%]":
                                  t(el.title).length > 20 &&
                                  t(el.title).length < 30,
                                "2xl:w-[22vw] xl:w-[90%] w-[95%]":
                                  t(el.title).length > 30 &&
                                  t(el.title).length < 40,
                                "!w-[80%] lg:w-fit!": index === 1,
                              }
                        )}
                      >
                        {t(el.title)}
                      </h4>
                    </div>
                    <div className="flex gap-[3px] lg:gap-2 items-center mt-[11px] lg:mt-[18px] z-20">
                      <img
                        src={squareWhite}
                        alt=""
                        className="object-cover w-[18px] h-[18px]"
                      />
                      <p className="uppercase text-[12px] lg:text-[14px] leading-[104%]">
                        {t("home.rooms.area")}: {el.area} M<sup>2</sup>
                      </p>
                    </div>
                    <div className="flex gap-[3px] lg:gap-2 items-center z-20">
                      <img
                        src={guestWhite}
                        alt=""
                        className="w-[18px] h-[18px]"
                      />
                      <p className="uppercase text-[12px] lg:text-[14px] leading-[104%]">
                        {t("home.rooms.guests")}: {el.guests}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "lg:mt-[34px] mt-[22px] flex justify-center transition-all duration-500 z-20",
                      {
                        "opacity-100": isActive,
                        "opacity-0 md:opacity-80 hover:opacity-100 transition-opacity duration-300":
                          !isActive,
                      }
                    )}
                  >
                    <Link
                      to={buildLocalizedPath(
                        `/rooms/${el.type}`,
                        i18n.language === "en" ? "en" : "uk"
                      )}
                      className={cn(
                        `border border-[#FFFFFF] uppercase text-[12px] z-20 xl:w-[150px] 2xl:w-[170px] 2xl:h-[46px] xl:h-[44px] flex items-center justify-center text-center xl:text-[16px] font-cofo-medium lg:w-[170px] w-[123px] h-[40px] rounded-full text-[#FFFFFF] hover:text-black hover:bg-[#FFFFFF] transition-all duration-300 transform`,
                        {
                          "xl:w-[170px] xl:h-[47px]": isCustomWidth,
                          "opacity-0 scale-95 transition-all duration-300":
                            !isActive && isHover !== index,
                          "opacity-100 scale-100 transition-all duration-300":
                            !isActive && isHover === index,
                        }
                      )}
                    >
                      {t("buttons.details")}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
);

export default RoomsSlider;
