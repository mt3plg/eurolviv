import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { useTranslation } from "react-i18next";
import { square, guest } from "@/store/exportsIcons";
import cn from "classnames";
import { useState } from "react";

type HallCardProps = {
  hall: {
    previewImage: string;
    title: string;
    size: string;
    area: string;
    capacity: string;
  };
  index: number;
  isEng: boolean;
  setIsBannerVisible: (isBannerVisible: boolean) => void;
};

export const HallCard = ({ hall, index, isEng, setIsBannerVisible }: HallCardProps) => {
  const { t } = useTranslation();
  const [onHover, setOnHover] = useState<number | null>(null);

  // const anchorId = ["small-hall", "big-hall", "launge-hall"];

  return (
    <div
      onMouseEnter={() => setOnHover(index)}
      onMouseLeave={() => setOnHover(null)}
      className={`flex flex-col items-center justify-center w-fit h-fit 
        ${
          onHover === index ? "scale-105" : "scale-100"
        } transition-all duration-300 ease-in-out
        ${index !== 1 ? "-translate-y-6" : "pb-20"} `}
    >
      <InViewWrapper>
        <img
          src={hall.previewImage}
          alt={hall.title}
          className={cn(
            index === 1
              ? "2xl:w-[36.7vw] 2xl:h-[23.2vw] xl:w-[31.4vw] xl:h-[23vw] lg:w-[34.3vw] lg:h-[23.2vw] md:w-[32.6vw] md:h-[18.1vw] w-[91.2vw] h-[60.9vw]"
              : "2xl:w-[19.9vw] 2xl:h-[13.3vw] xl:w-[22.7vw] xl:h-[15.4vw] lg:w-[20.3vw] lg:h-[15.4vw] md:w-[22.4vw] md:h-[12.9vw] w-[91.2vw] h-[60.9vw]"
          )}
        />
      </InViewWrapper>
      <h4
        className={`uppercase text-[18px] md:text-[22px] font-cofo-medium lg:text-[18px] 2xl:text-[24px] xl:text-[22px] leading-[28px] tracking-[-0.05em] text-center 
        ${
          index !== 1
            ? "2xl:mt-[20px] xl:mt-[14px]  px-2 xl:mb-[12px] lg:mb-[8px] lg:mt-[12px] mt-[10px] mb-[8px]"
            : "2xl:mt-[25px] xl:mt-[20px] mb-[10px]   px-2 xl:mb-[13px] mt-[10px]"
        } }`}
      >
        {t(hall.title)} {t(hall.size)}
      </h4>
      <div
        className={cn(
          `flex flex-col items-center justify-center ${
            index !== 1 ? "space-y-[3px]" : "space-y-[1px]"
          }`
        )}
      >
        <div className={`flex items-center space-x-1 justify-center `}>
          <img src={square} alt="areaico" className="w-4 h-4" />
          <p className="uppercase text-sm sm:text-xs md:text-[12px] lg:text-lg 2xl:text-[16px] xl:text-[14px] lg:text-[14px] text-[#252526]">
            {t("home.conferenceService.area")}: {hall.area}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <img src={guest} alt="guestico" className="w-4 h-4" />
          <p className="uppercase text-sm sm:text-xs md:text-[12px] lg:text-lg 2xl:text-[16px] xl:text-[14px] lg:text-[14px] text-[#252526]">
            {t("home.conferenceService.capacity")}:{" "}
            {isEng ? t(hall.capacity) : t(hall.capacity).slice(0, -2) + "."}
          </p>
        </div>
        {
          <div
            className={cn(
              `text-center items-center justify-center ${
                index === 1 ? "pt-[37px]" : "pt-[25px]"
              } relative transition-opacity duration-300 ease-in-out`,
              {
                "flex opacity-100": onHover === index,
                "opacity-0": onHover !== index && index !== 1,
              }
            )}
          >
            <button
              // to={`/conference-service#${anchorId[index]}`}
              onClick={() => setIsBannerVisible(true)}
              className={`w-fit xl:py-[10px] font-cofo-medium flex 
                justify-center items-center px-5 py-2 text-[#8c331b]
                border-[#8C331B] border rounded-full uppercase 2xl:w-[8.72vw] 2xl:h-[2.4vw] 2xl:text-[.84vw]
                ${isEng ? "2xl:w-[8.72vw]" : "xl:px-[30.5px]"}
                transition-all duration-300 hover:bg-[#8c331b] hover:text-white
                hover:shadow-lg hover:scale-105 hover:-translate-y-1`}
            >
              {t("buttons.details")}
            </button>
          </div>
        }
      </div>
    </div>
  );
};
