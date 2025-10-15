import { Link } from "react-router-dom";
import { useRoomStore } from "@/store/useRoomsStore";
import { HallList } from "@/components/Home/HallList";
import { useTranslation } from "react-i18next";
import { ConferenceServiceSlider } from "@/components/Home/ConferenceServiceSlider";
import cn from "classnames";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { useState } from "react";
import { UpdateNotificationBanner } from "../ConferesceService/UpdateNotificationBanner";
export const ConferenceService = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const { t } = useTranslation();
  const { halls } = useRoomStore();
  const isEng = useIsEnglish();
  const hallsForList = [halls[1], halls[0], halls[2]]

  console.log(isEng)
  return (
    <div className="flex flex-col items-center relative  bg-[#EDE8E5]  w-full overflow-y-hidden overflow-x-hidden ">
      <div className="absolute grid grid-cols-[89.07%] h-full w-full justify-center md:grid-cols-[29.74%_30.3%_29.8%] z-0 overflow-y-hidden  ">
        <div className=" border-s border-[#B3B3B3]   2xl:h-[1102px] xl:h-[820px] lg:h-[750px] md:h-[600px]"></div>
        <div className=" border-s md:border-x border-[#B3B3B3]  h-[1500px]"></div>
        <div className=" border-e border-[#B3B3B3]  2xl:h-[1102px] xl:h-[850px] lg:h-[750px] md:h-[600px]"></div>
      </div>

      <div className="w-[89.7%]">
        <div className="grid grid-cols-1 md:grid-cols-[29.69%_33%_30.6%]   w-full justify-center">
          <div className=" "></div>
          <div className="text-center flex flex-col  items-center justify-center  2xl:mt-33 mt-[76px]">
            <p
              className="uppercase text-[12px] md:text-[14px] lg:text-[14px] xl:text-[1.25vw] 
            2xl:text-[1.25vw] text-[#252526] tracking-[-0.05em] font-cofo-medium"
            >
              {t("home.conferenceService.heading")}
            </p>
            <h1
              className={cn(
                `uppercase text-[12.8vw] md:text-[8.23vw] lg:text-[8.96vw]  text-center 
             text-[#252526] leading-[81%]  md:whitespace-nowrap md:mb-0 mt-[13px]  mb-[23px] z-1`,
                {
                  "2xl:text-[8.85vw] tracking-[-0.1em] xl:text-[8.87vw]": isEng,
                  "2xl:text-[9.6vw] tracking-[-0.07em] xl:text-[9.57vw]": !isEng,
                }
              )}
            >
              {t("home.conferenceService.title")}
            </h1>
            <p
              className={`   uppercase mb-[30px] xl:mb-6 text-[3.2vw] md:text-[16px] lg:text-[11px] xl:mt-[33px] lg:mt-[20px] w-[80%]  lg:w-full
                 xl:text-[1.05vw]  2xl:text-[1.05vw] text-[#252526] leading-[120%]
              z-2 2xl:mt-[62px] lg:whitespace-nowrap`}
            >
              {t("home.conferenceService.desc.0")}
              <br className="hidden md:block" />
              {t("home.conferenceService.desc.1")}
            </p>
            <div className=" text-center flex items-center justify-center xl:mb-[48px] lg:mb-[32px] md:mb-[24px]">
              <Link
                to="/conference-service"
                className={`  bg-[#8c331b] flex items-center  w-[160px] h-[40px] justify-center text-center text-[12px] xl:w-[165px] 2xl:w-[10.42vw] 2xl:h-[2.4vw] 2xl:text-[.73vw] xl:text-[14px] hover:bg-[white] text-white hover:text-[#8C331B] border-[#8C331B] border rounded-full uppercase z-1 font-cofo-medium ${isEng ? "lg:w-[165px]" : ""
                  }`}
              >
                {t("buttons.viewHalls")}
              </Link>
            </div>
          </div>
          <div className=""></div>
        </div>
        <div className="h-full hidden md:block">
          <HallList halls={hallsForList} isEng={isEng} setIsBannerVisible={setIsBannerVisible} />
        </div>
      </div>
      <div className="h-full block md:hidden max-w-screen mt-[46px] mb-[75px]">
        <ConferenceServiceSlider halls={halls} />
      </div>
      <UpdateNotificationBanner isVisible={isBannerVisible} onClose={() => setIsBannerVisible(false)} />
    </div>
  );
};
