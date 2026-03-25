import { useTranslation } from "react-i18next";
import { SliderAbout } from "@/components/Room/SliderAbout";
import { RoomAbout } from "@/types/types";
import { memo } from "react";
import { guestBrown, houseBrown, squareBrown } from "@/store/exportsIcons";
import { AboutRoomTitle } from "@/components/Room/AboutRoomTitle";
import { BookLink } from "@/components/Buttons/BookLink";
import { buildLocalizedPath } from "@/utils/localeRouting";

type RoomAboutToProps = {
  about?: RoomAbout;
  area?: number;
  guests?: string;
  title?: string;
  size?: string | undefined;
  swiperImagesStyle?: string;
  nameRoom?: string;
  type?: string;
};

export const About = memo(
  ({
    about,
    area,
    guests,
    swiperImagesStyle,
    nameRoom,
    type,
  }: RoomAboutToProps) => {
    const { pOne, pTwo, swiperImages, rooms } = about || {};
    const { t, i18n } = useTranslation();
    const isSemiLux = type?.includes("semi-lux") || false;
    console.log(type);
    if (
      !about ||
      !swiperImages ||
      swiperImages.length === 0 ||
      !pOne ||
      !pTwo ||
      !nameRoom
    )
      return null;

    const istandartbigbed = type === "standart-big-bed" || false;
    const isLuxImperial = type === "lux-imperial" || false;
    const isLuxElegant = type === "lux-elegant" || false;
    const isLuxTwoRoom = type === "lux-two-rooms" || false;
    const isStandartSingle = type === "standart-single" || false;
    const isStandartTwoBeds = type === "standart-two-bed" || false;
    const isStandartBigBedBalcony =
      type === "standart-big-bed-balcony" || false;
    const isStandartTwoBedBalcony =
      type === "standart-two-bed-balcony" || false;
    return (
      <div>
        <div className="grid md:grid-cols-[20.47%_42.66%_36.88%]   grid-cols-[9.67%_80.67%_9.67%] items-center justify-center 2xl:items-start 2xl:justify-normal  md:max-w-full mx-auto md:mx-0">
          <div className="2xl:h-[109px] xl:h-[109px] lg:h-[109px] border-x md:border-x-0 border-b md:border-b-0 md:border-e  w-full h-[29.07vw] border-[#C7C7C7] order-1 md:order-none" />
          <div className="2xl:h-[109px] xl:h-[109px] lg:h-[109px] border-x md:border-x-0 border-b md:border-b-0  md:border-e  w-full md:min-h-auto min-h-[29.07vw] border-[#C7C7C7] order-3 md:order-none" />
          <div className="2xl:h-[109px] xl:h-[109px] lg:h-[109px] border-x md:hidden md:border-x-0 md:border-e w-full h-full border-[#C7C7C7] order-5 md:order-none" />
          <div className="2xl:h-[109px] xl:h-[109px] lg:h-[109px] border-x md:border-x-0 md:border-e  w-full h-full border-[#C7C7C7] order-6 md:order-none " />

          <div
            className=" h-full border-t 2xl:h-[12.57vw] xl:h-[12.5vw]  md:border-e border-b md:border-b-0 border-[#C7C7C7] 
            flex flex-col justify-end md:justify-center  p-2.5 pb-[16px] 2xl:p-0
          lg:items-center order-2 md:order-none "
          >
            <div className="  text-[#8C331B] ">
              <div className="2xl:space-y-[0.31vw] 2xl:pb-[2.5vw] lg:pb-[1.4rem] xl:pb-[1.72vw]  items-center   ">
                <p className="flex uppercase 2xl:text-[1.04vw] lg:text-[12px] xl:text-[1.09vw]  text-[3.2vw] items-center    ">
                  <img
                    src={houseBrown}
                    alt="houseicon"
                    className="pe-2.5 lg:w-[20px] lg:h-[20px] xl:w-[24px] xl:h-[24px] 2xl:w-[26px] 2xl:h-[26px] "
                  />
                  {t("room.about.area")}:
                  <span className="font-cofo-medium">&nbsp;{area} М²</span>
                </p>
                <p className="flex uppercase 2xl:text-[1.04vw] lg:text-[12px] xl:text-[1.09vw] text-[12px] items-center ">
                  <img
                    src={squareBrown}
                    alt="houseicon"
                    className="pe-2.5 lg:w-[20px] lg:h-[20px] xl:w-[24px] xl:h-[24px] 2xl:w-[26px] 2xl:h-[26px] "
                  />
                  {t("room.about.count")}:
                  <span className="font-cofo-medium">&nbsp;{rooms}</span>
                </p>
                <p className="flex uppercase 2xl:text-[1.04vw] lg:text-[12px] xl:text-[1.09vw] text-[12px] items-center">
                  <img
                    src={guestBrown}
                    alt="houseicon"
                    className="pe-2.5 lg:w-[20px] lg:h-[20px] xl:w-[24px] xl:h-[24px] 2xl:w-[26px] 2xl:h-[26px] "
                  />
                  {t("room.about.guests")}:
                  <span className="font-cofo-medium">&nbsp;{guests}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex order-5 md:order-none min-h-[29.07vw] lg:min-h-auto lg:h-full xl:h-full w-full ">
            <AboutRoomTitle nameRoom={nameRoom} />
          </div>

          <div className=" md:border-t border-x md:border-x-0 h-full border-[#C7C7C7] order-8 hidden md:block"></div>
        </div>

        <div
          className="grid  
 md:max-w-full mx-auto md:mx-0
        grid-cols-1  md:grid-cols-[63.13%_36.88%]

        h-auto"
        >
          <div className="md:w-full border-[#C7C7C7] md:border-t w-screen  ">
            <SliderAbout
              imageSlider={swiperImages}
              swiperImagesStyle={swiperImagesStyle}
            />
          </div>

          <div
            className="flex flex-col xl:items-center justify-center 
          md:border-t  border-[#C7C7C7]  border-e md:border-e border-x md:border-x-0  
          pt-9 md:py-0 md:max-w-full
                   max-w-[81.9%] mx-auto md:mx-0
          "
          >
            <div
              className="flex flex-col 
            gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-[1.88vw] 2xl:gap-[1.25vw]
            px-4 sm:px-6 md:px-4 lg:pe-[40px] lg:ps-[20px] 2xl:ps-[2.29vw] 2xl:pe-[6.25vw] xl:ps-8 xl:pe-[4.9vw]"
            >
              <p
                className={`text-[3.2vw] sm:text-[12px] md:text-[12px] lg:text-[14px] xl:text-[1.09vw] 2xl:text-[1.04vw]
                tracking-[-0.04em] leading-[120%]
                ${isLuxImperial ? "xl:w-[100%]! " : ""}
                ${isLuxElegant ? "xl:w-[100%]! " : ""}
                ${isLuxTwoRoom ? "xl:w-[100%]! " : ""}
                ${istandartbigbed ? "w-[95%]! xl:w-[100%]!" : ""}
                ${isStandartSingle ? "xl:w-[100%]! w-[95%]!" : ""}
                ${isStandartBigBedBalcony ? "w-[95%]! xl:w-[100%]!" : ""}
                ${isStandartTwoBeds ? "w-[97%]!" : ""}
                ${isStandartTwoBedBalcony ? "w-[95%]! xl:w-[100%]!" : ""}
              ${isSemiLux ? "w-[97%]! xl:w-[100%]!" : ""}

              text-[#8C331B] uppercase 2xl:w-[102%] w-[93%]`}
              >
                {t(pOne)}
              </p>

              <p
                className={`text-[3.2vw] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[1.09vw] 2xl:text-[1.04vw]
             leading-[120%]
              tracking-[-0.04em]
              ${istandartbigbed ? "w-[90%]! xl:w-[105%]!" : ""}
              ${isStandartTwoBeds ? "w-[90%]! xl:w-[105%]!" : ""}
              ${isLuxElegant ? "xl:w-[100%]! " : ""}
              ${isLuxTwoRoom ? "xl:w-[100%]! " : ""}
              ${isStandartSingle ? "xl:w-[100%]!" : ""}
              ${isStandartBigBedBalcony ? "xl:w-[100%]!   w-[90%]!" : ""}
              ${isStandartTwoBedBalcony ? "w-[90%]! xl:w-[105%]!" : ""}
              ${isLuxImperial ? "xl:w-[102%]! " : ""}
              ${
                isSemiLux
                  ? "2xl:w-[102%] w-[90%] xl:w-[102%]!"
                  : "2xl:w-[102%] w-[90%]"
              }
              text-[#444444] uppercase`}
              >
                {t(pTwo)}
              </p>

              <BookLink
                to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
                className="uppercase 2xl:text-[0.73vw] bg-[#8C331B] text-white s 2xl:mt-[3.65vw] xl:mt-[3.91vw] w-[40.27vw]
                2xl:w-[10.73vw] 2xl:h-[2.29vw] xl:w-[16vw] xl:h-[2.6vw] flex items-center justify-center lg:w-[200px]  mt-[69px] lg:mt-[10px] mb-[28px] md:mb-0
            "
              >
                {t("buttons.bookRoomArr.0")} &#8202;
                <span className="hidden md:inline">
                  {t("buttons.bookRoomArr.1")}
                </span>
              </BookLink>
            </div>
          </div>
        </div>
        <div className="flex flex-col ps-[7.45%]">
          <div
            className="md:grid w-full  max-w-[90.83%]
          grid-cols-1 
          md:grid-cols-[35.58%_30.61%_33.76%]
          border-s border-[#C7C7C7]
          hidden 
          "
          >
            <div className="h-[84px]  w-full  border-[#C7C7C7]"></div>
            <div className="h-[84px] border-x w-full   border-[#C7C7C7]"></div>
            <div className="h-[84px]    border-[#C7C7C7] w-full   "></div>
          </div>
        </div>
      </div>
    );
  }
);
