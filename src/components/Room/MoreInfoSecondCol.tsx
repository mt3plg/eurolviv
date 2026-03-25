import { useTranslation } from "react-i18next";
import { parking } from "@/store/exportsIcons";
import { dogRoom } from "@/store/exportsImg";
import { BookLink } from "@/components/Buttons/BookLink";
import cn from "classnames";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { buildLocalizedPath } from "@/utils/localeRouting";
export const MoreInfoSecondCol = ({
  availableService,
  isShowOtherInfo,
}: {
  availableService: { src: string; text: string }[];
  isShowOtherInfo: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const isEng = useIsEnglish();
  return (
    <div
      className={cn(
        `flex flex-col  md:py-10 items-center ${
          isShowOtherInfo
            ? "justify-start pb-[41px] lg:py-20 2xl:py-[4.17vw] "
            : "lg:pt-42 xl:pt-[16.13vw] 2xl:pt-[12.9vw] md:pt-32"
        } h-full`
      )}
    >
      <div
        className={cn(
          `flex flex-col md:items-center justify-between   w-full 2xl:ps-[1.93vw]  md:h-full  xl:ps-[1.33vw] md:ps-[10px] ${
            isShowOtherInfo
              ? "2xl:h-[26.57vw] lg:h-[300px] xl:h-[28.98vw] "
              : "ps-[10px] 2xl:h-[26vw] lg:h-[300px] xl:h-[28.88vw] md:h-[250px] "
          }`
        )}
      >
        <h1
          className={cn(
            ` text-white text-[8.53vw] lg:text-[32px] tracking-[-0.07em] xl:text-[2.8vw] 2xl:text-[2.52vw] leading-[104%] uppercase `,
            {
              "block md:hidden xl:pb-[2.98vw] lg:pb-[20px] md:pb-[15px] pt-[54px] 2xl:pb-[2.71vw]":
                !isShowOtherInfo,
              "md:block hidden xl:pb-[2.98vw] lg:pb-[20px] md:pb-[15px]  2xl:pb-[2.71vw]":
                isShowOtherInfo,
            }
          )}
        >
          {t("room.moreInfo.title")}
        </h1>

        {isShowOtherInfo && (
          <img
            src={dogRoom}
            alt="imageOverlay"
            className="w-full  object-cover px-[2.67vw_1.6vw] md:hidden h-[69.87vw] "
          />
        )}

        {isShowOtherInfo && (
          <h1
            className="text-white text-[8.53vw]  tracking-[-0.07em] xl:text-[3.75vw] 2xl:text-[2.5vw] w-[88%] lg:text-[32px]
           leading-[104%] uppercase  md:hidden block px-[2.67vw] lg:px-5 mt-[42px]"
          >
            {t("room.moreInfo.title")}
          </h1>
        )}

        <ul
          className={cn(
            `flex flex-col 2xl:gap-x-[0.47vw] gap-x-0.5 pt-[44px] gap-y-[1.33vw] lg:gap-y-0 md:pt-0  w-full ${
              isShowOtherInfo ? "md:px-0 px-[2.67vw] " : ""
            }`
          )}
        >
          {availableService.map((item) => (
            <li
              key={item.src}
              className={cn(
                `text-white text-[3.73vw] md:text-[14px] lg:text-[14px] 2xl:text-[1.05vw] uppercase xl:text-[1.09vw]   items-center gap-0.75 flex`
              )}
            >
              <img
                src={item.src}
                alt={t(item.text)}
                className="2xl:w-[1.88vw] 2xl:h-[1.88vw] xl:w-[2.2vw] xl:h-[2.2vw] lg:w-6 lg:h-6 md:w-5 md:h-5 w-6 h-6"
              />
              {t(item.text)}
            </li>
          ))}
        </ul>

        {isShowOtherInfo && (
          <BookLink
            to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
            className=" 
        bg-[#EDE8E5] text-[#A47762] hover:bg-white transition-colors   xl:mt-[3.13vw] lg:w-[204px] text-center
        lg:mt-9
        md:mt-4
        mt-10
        md:hidden
        block w-fit
        mx-[11px]
        "
          >
            {t("buttons.bookRoom")}
          </BookLink>
        )}
        <div className="mt-auto">
          <p
            className={`text-white text-[4.27vw]  2xl:text-[1.05vw] 2xl:gap-[0.42vw]
          ${isEng ? "2xl:w-[95%]" : "w-[102%]"}
          xl:text-[1.09vw] md:text-[12px] lg:text-[12px] uppercase leading-[120%] md:flex hidden gap-1`}
          >
            <img
              src={parking}
              alt="parking"
              className="2xl:w-[1.88vw] 2xl:h-[1.88vw]  xl:w-[2.2vw] xl:h-[2.2vw] lg:w-6 lg:h-6 md:w-6 md:h-6 w-6 h-6"
            />
            {t("room.moreInfo.parking")}
          </p>
          {!isShowOtherInfo && (
            <BookLink
              to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
              className={cn(` 
        bg-[#EDE8E5] text-[#A47762] hover:bg-white transition-colors xl:text-[0.94vw]
         2xl:text-[0.73vw] lg:px-0 xl:w-[15.28vw] lg:w-[204px] 2xl:w-[10.63vw] 2xl:h-[2.29vw]
          text-center flex items-center justify-center  xl:mt-[3.13vw]
        lg:mt-9
        md:mt-4
        mt-10
        w-fit
        `)}
            >
              {t("buttons.bookRoom")}
            </BookLink>
          )}
        </div>
      </div>
    </div>
  );
};
