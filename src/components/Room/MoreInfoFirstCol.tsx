import { parking } from "@/store/exportsIcons";
import { coffeeRoom } from "@/store/exportsImg";
import { useTranslation } from "react-i18next";
import { BookLink } from "@/components/Buttons/BookLink";
import { buildLocalizedPath } from "@/utils/localeRouting";

export const MoreInfoFirstCol = ({
  isShowOtherInfo,
  amenities,
}: {
  isShowOtherInfo: boolean;
  amenities: { src: string; text: string }[];
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col lg:py-20 2xl:py-[4.17vw] xl:py-[6.25vw] pt-[54px] pb-[28px] md:py-10 2xl:px-[1.09vw_0.89vw] xl:px-[14px_10px] lg:px-[1.09vw_0.78vw]  md:px-[10px_8px] h-full">
      {isShowOtherInfo ? (
        <h1
          className={`text-white 2xl:text-[2.5vw] xl:text-[2.8vw] px-[2.67vw] lg:px-0 tracking-[-0.07em] 
        text-[8.53vw]  leading-[104%] uppercase font-cofo md:pb-[15px] xl:pb-[2.98vw] lg:pb-[20px]  2xl:pb-[2.71vw] lg:text-[32px]
        ${isShowOtherInfo ? "2xl:w-[75%] w-[95%] " : ""}
        `}
        >
          {t("room.moreInfo.title2")}
        </h1>
      ) : (
        <h1 className="text-white text-[8.53vw] lg:text-[32px] tracking-[-0.07em] 2xl:text-[2.5vw] xl:text-[3.28vw]  leading-[104%] uppercase font-cofo xl:pb-[2.98vw] pb-[20px] hidden md:block">
          {t("room.moreInfo.title")}
        </h1>
      )}
      {isShowOtherInfo ? (
        <div>
          <ul className="flex flex-col  gap-[2px] gap-y-[1.33vw] lg:gap-y-0 w-full pt-10 md:pt-0 ps-[2.67vw] lg:ps-0 ">
            {amenities.map((item) => (
              <li
                key={item.src}
                className="text-white text-[3.73vw] md:text-[14px] lg:text-[14px]
                 xl:text-[1.09vw] 2xl:text-[1.05vw] uppercase gap-x-[0.8vw] items-center  flex"
              >
                <img
                  src={item.src}
                  alt={t(item.text)}
                  className="2xl:w-[1.88vw] 2xl:h-[1.88vw] lg:w-7 lg:h-7 md:w-6 md:h-6 w-6 h-6"
                />
                {t(item.text)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <img
          src={coffeeRoom}
          alt="dog"
          className="w-full 2xl:h-[26.67vw] xl:h-[28.98vw] lg:h-[300px] md:h-[250px] h-[69.87vw] px-[2.93vw_2.13vw] md:px-0  object-cover md:object-bottom object-[20%_80%]  "
        />
      )}
      <p
        className={`text-white text-[3.73vw]  2xl:text-[1.05vw] xl:text-[1.09vw] md:text-[14px] gap-[1.07vw] px-[2.67vw_1.6vw] lg:text-[14px] uppercase mt-[32px]  
       md:px-0 flex md:hidden xl:ps-5
         ${isShowOtherInfo ? "xl:ps-0 " : "w-[95%] lg:w-auto"}`}
      >
        <img src={parking} alt="parking" className="w-6 h-6" />
        {t("room.moreInfo.parking")}
      </p>
      {isShowOtherInfo && (
        <BookLink
          to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
          className=" 
        bg-[#EDE8E5] text-[#A47762] hover:bg-white transition-colors  text-center   xl:mt-auto
        lg:mt-9
        md:mt-4
        mt-10
        xl:text-[0.94vw]
         2xl:text-[0.73vw] lg:px-0 xl:w-[15.28vw] lg:w-[204px] 2xl:w-[10.63vw] 2xl:h-[2.29vw]
        md:block hidden w-fit
        mb-[0.42vw]
        "
        >
          {t("buttons.bookRoom")}
        </BookLink>
      )}
    </div>
  );
};
