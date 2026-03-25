import "@/components/About/Advantages.css";

import { advantages } from "@/store/exportsImg";
import { useTranslation } from "react-i18next";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { usePagesInfoStore } from "@/store/usePagesInfoStore";
import { BookLink } from "@/components/Buttons/BookLink";
import { useCustomWidth } from "@/hooks/useCustomWidth";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { buildLocalizedPath } from "@/utils/localeRouting";
export const Advantages = () => {
  const { t, i18n } = useTranslation();
  const { hotelInfo, services } = usePagesInfoStore();
  const isCustomWidth = useCustomWidth(1500, 1700);
  const isEng = useIsEnglish();

  return (
    <section className="flex justify-center items-center bg-[#A47762]">
      <div
        className={`container mx-auto border-x border-[#C29986] grid grid-cols-1 lg:grid-cols-[33.43%_28.72%_37.85%]  items-center 2xl:h-[35.625vw]  lg:h-[430px] max-w-[89.58%] gap-0 ${
          isCustomWidth ? "xl:h-[584px]" : "xl:h-[500px]"
        }`}
      >
        <div className="h-full  flex md:justify-start sm:justify-center">
          <div className="flex flex-col xl:ps-[21px] ps-[16px] sm:items-center  lg:items-start lg:text-start">
            <h1
              className={`uppercase text-[8.533vw] md:text-[24px] 2xl:text-[2.5vw] tracking-[0.02em] lg:tracking-[-0.05em] leading-[100%] md:w-2/3 text-[#FFFFFF] pt-[34px] 2xl:pt-[4.479vw] xl:pt-[60px] ${
                isCustomWidth ? "xl:text-[40px]" : "xl:text-[32px]"
              }`}
            >
              {t("about.advantages.title")}
            </h1>
            <ul
              className={`uppercase pt-[29px] 2xl:pt-[2.708vw] xl:pt-[40px] md:text-[14px] text-[#E1E1E1] text-[3.733vw] 2xl:text-[1.042vw] xl:gap-y-1 gap-y-[2px] gap-[6px] 2xl:gap-[9px] ${
                isCustomWidth ? "xl:text-[18px]" : "xl:text-[15px]"
              }`}
            >
              {hotelInfo.map(({ icon, text }, index) => (
                <li
                  key={index}
                  className={`flex   gap-1.5 lg:self-end ${
                    isEng ? "w-[60vw] md:w-auto 2xl:w-[20vw] xl:w-[20vw]" : ""
                  }`}
                >
                  <InViewWrapper>
                    <img
                      className={`2xl:w-[1.875vw] 2xl:h-[1.875vw]  w-[5.333vw] h-[5.333vw] md:w-[22px] md:h-[22px] ${
                        isCustomWidth
                          ? "xl:w-[30px] xl:h-[30px]"
                          : "xl:w-[26px] xl:h-[26px]"
                      }`}
                      src={icon}
                      alt={text}
                    />
                  </InViewWrapper>

                  {t(text)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:hidden flex justify-center py-[32px_73px]  px-[16px_14px] w-full">
          <InViewWrapper>
            <img
              src={advantages}
              alt="advantages"
              className=" h-[311px] w-[81.067vw]"
            />
          </InViewWrapper>
        </div>

        <div className="h-full  w-full lg:border-x  pb-[47px] lg:pb-0 border-[#C29986]">
          <div className="flex flex-col ps-[4.27vw] 2xl:ps-[2.34vw] xl:ps-[2.115625vw] sm:items-center md:items-start">
            <h1
              className={`uppercase text-[8.533vw]  md:text-[24px]  2xl:text-[2.5vw] tracking-[-0.02em] lg:tracking-[-0.05em]
                 leading-[100%]  md:w-2/3 text-[#FFFFFF] md:pt-[34px] 2xl:pt-[4.479vw] xl:pt-[60px] xl:text-left ${
                   isCustomWidth ? "xl:text-[40px]" : "xl:text-[32px]"
                 }`}
            >
              <span className={`${isEng ? "hidden" : ""}`}>
                {t("about.advantages.title2").split(" ")[0]}
                <br className="lg:hidden" />{" "}
                {t("about.advantages.title2").split(" ").slice(1).join(" ")}
              </span>
              <span className={`${isEng ? "" : "hidden"}`}>
                {t("about.advantages.title2")}
              </span>
            </h1>
            <ul
              className={`uppercase pt-[30px] 2xl:pt-[2.708vw] xl:pt-[40px] md:text-[14px] text-[#E1E1E1]
                 text-[3.733vw] 2xl:text-[1.042vw]  xl:gap-y-1 gap-y-[2px] ${
                   isCustomWidth ? "xl:text-[18px]" : "xl:text-[15px]"
                 }`}
            >
              {services.map(({ icon, text }, index) => (
                <li
                  key={index}
                  className="flex items-center  gap-x-[6px] lg:gap-[9px]"
                >
                  <InViewWrapper>
                    <img
                      className={`2xl:w-[1.875vw] 2xl:h-[1.875vw]  w-[5.333vw] h-[5.333vw] md:w-[22px]  md:h-[22px] 
                         ${
                           isCustomWidth
                             ? "xl:w-[30px] xl:h-[30px]"
                             : "xl:w-[26px] xl:h-[26px]"
                         }
                         ${index === 3 ? "scale-120" : ""}`}
                      src={icon}
                      alt={text}
                    />
                  </InViewWrapper>
                  {t(text)}
                </li>
              ))}
            </ul>
            <BookLink
              className={`hidden lg:w-[204px] lg:px-0 2xl:w-[204px] 2xl:h-[44px] items-center xl:p-0 justify-center lg:flex uppercase 
               bg-[#EDE8E5] text-[#A47762] hover:bg-[#A47762] hover:text-[#EDE8E5]  border border-[#EDE8E5] lg:mt-[25px] 2xl:mt-[1.302vw]
               2xl:text-[0.729vw]!
               ${isCustomWidth ? "xl:w-[204px]" : "xl:w-[14vw] xl:text-[12px]!"}
               `}
              to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
            >
              {t("buttons.bookRoom")}
            </BookLink>
          </div>
        </div>

        <div className="hidden lg:flex  h-full justify-center items-center p-4">
          <InViewWrapper>
            <img
              src={advantages}
              alt="advantages"
              className={`w-[95%] 2xl:w-[25.833vw] 2xl:max-w-none  2xl:h-[26.51vw] h-auto max-w-[400px] xl:max-h-none  max-h-[400px]  object-contain ${
                isCustomWidth
                  ? "xl:w-[496px] xl:h-[509px]"
                  : "xl:w-[350px] xl:h-[350px]"
              }`}
            />
          </InViewWrapper>
        </div>
      </div>
    </section>
  );
};
