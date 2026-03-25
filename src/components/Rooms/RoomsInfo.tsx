import { useRoomStore } from "@/store/useRoomsStore";
import { RoomInfoCard } from "@/components/Rooms/RoomInfoCard";
import { useTranslation } from "react-i18next";
import { BookLink } from "@/components/Buttons/BookLink";
import cn from "classnames";
import { buildLocalizedPath } from "@/utils/localeRouting";
export const RoomsInfo = () => {
  const { rooms } = useRoomStore();
  const { t, i18n } = useTranslation();

  const isEng = i18n.language === "en";

  return (
    <div className="w-full flex-col flex items-center ">
      <div className=" lg:border-x border-[#C7C7C7] mx-auto w-full max-w-[89.58%] box-border container-fluid  fluid-container">
        <div className="grid  grid-cols-1  ">
          <div className="space-y-[11px] px-2 2xl:px-[1.04vw] border-x lg:border-x-0 border-[#C7C7C7] ">
            <div className="lg:block hidden 2xl:mt-[5.94vw] xl:mt-[6.94vw] lg:mt-[6vw]">
              <h1 className="uppercase 2xl:text-[5.21vw] xl:text-[5vw] lg:text-[4.69vw] md:text-[80px] sm:text-[60px] leading-[81%] lg:leading-none tracking-[-0.04em]">
                <span className="text-[#8C331B]">
                  {t("rooms.about.heading.0")},
                </span>
                <span className="text-[#252526]">
                  {t("rooms.about.heading.1")}
                </span>
              </h1>
              <div
                className={cn(
                  "flex flex-col  ",
                  {
                    "items-center": isEng,
                  },
                  {
                    "": !isEng,
                  }
                )}
              >
                <div
                  className={`w-full 2xl:ms-[0.9vw] xl:ms-[.4vw] ${isEng ? "lg:ps-[9vw] 2xl:ps-[9.4vw] xl:ps-[9.25vw]" : "lg:ps-[9vw] 2xl:ps-[9vw] xl:ps-[9.1vw]"} `}
                >
                  <h1 className="uppercase 2xl:text-[5.21vw] xl:text-[5vw] lg:text-[4.69vw] md:text-[80px] sm:text-[60px] leading-[81%] tracking-[-0.04em] lg:leading-none text-[#252526]">
                    {t("rooms.about.heading.2")}
                  </h1>
                  <h1 className="mb-[24px]  xl:mb-[43px] uppercase font-cofo 2xl:text-[5.21vw] xl:text-[5vw] lg:text-[4.69vw] md:text-[80px] sm:text-[60px] leading-[81%] lg:leading-none tracking-[-0.04em] text-[#252526]">
                    {t("rooms.about.heading.3")}
                  </h1>
                  <div className="flex  items-center lg:gap-x-[30px]">
                    <p className="2xl:text-[0.83vw]  xl:text-[1.09vw] lg:text-[1.17vw] sm:text-[12px] leading-[20px] text-[#252526] uppercase xl:w-[27.46vw]  2xl:w-[21.46vw] lg:w-[27.46vw]">
                      {t("rooms.about.desc")}
                    </p>
                    <BookLink
                      className="text-[#FFFFFF] w-[141px] flex-col items-center  bg-[#8C331B] lg:px-[28px] lg:py-[13px] px-[19px] 2xl:w-[10.63vw] 2xl:h-[2.29vw] py-[11px] lg:w-[15.63vw] xl:w-[15.63vw]  2xl:text-[0.73vw] flex justify-center lg:h-[44px] h-[40px]"
                      to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
                    >
                      {t("buttons.book")}
                    </BookLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden flex flex-col items-center pb-[20px] ">
              <h1 className="text-[8.53vw] leading-[98%]  tracking-[-0.07em] uppercase text-[#242425] mt-[53px] text-center">
                <span className="text-[#8C331B]">
                  {t("rooms.about.heading.0")},
                </span>
                <span className="mt-[5px]">{t("rooms.about.heading.1")}</span>
                <span className="mt-[5px]">
                  {t("rooms.about.heading.2")}
                  <span className="mt-[5px]">
                    {!isEng && t("rooms.about.heading.4")}
                    {isEng && t("rooms.about.heading.3")}
                  </span>
                </span>
              </h1>
              <div className="flex flex-col text-center  items-center w-[95%] mt-[24px] md:mt-[0px]">
                <p className="text-[3.2vw] leading-[15px] text-[#252526] uppercase">
                  {t("rooms.about.desc")}
                </p>
                <BookLink
                  className="text-[#FFFFFF] bg-[#8C331B] mt-[24px] md:mt-[0px] h-[40px] flex justify-center w-[141px] items-center"
                  to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
                >
                    {t("buttons.book")}
                </BookLink>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  lg:pt-[33px] ">
            {rooms.map((room, index) => (
              <RoomInfoCard
                key={room.type}
                index={index}
                length={rooms.length}
                room={room}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
