import { useTranslation } from "react-i18next";
import { karaokeFst, karaokeScd } from "@/store/exportsImg";
import cn from "classnames";
import { useCustomWidth } from "@/hooks/useCustomWidth";
export const Karaoke = () => {
  const { t, i18n } = useTranslation();
  const isCustomWidth = useCustomWidth(1500, 1700);
  const isCustW = useCustomWidth(1800, 1899);
  const isEng = i18n.language === "en";
  return (
    <div className="flex flex-col items-center" id="karaoke">
      <div className="grid md:grid-cols-[35.7%_28.9%_35.1%] grid-cols-1 md:w-[93.16%] w-[89.067%] mx-auto border-x border-[#B3B3B3] border-t ">
        <div
          className={`flex flex-col 2xl:ps-[2.71vw]  xl:ps-[32px] md:ps-[24px]  justify-center md:justify-start 2xl:h-[29.01vw] lg:mt-[33px]  md:my-0 my-[8.6vw_5vw] ${
            isCustomWidth
              ? "xl:ps-[32px] xl:mt-[48px] 2xl:mt-0 "
              : "xl:ps-[24px] xl:mt-[32px] 2xl:mt-0 "
          }`}
        >
          <div className="flex items-center md:items-start  flex-col justify-center  text-center md:text-start 2xl:pt-[42px]">
            <p className="font-blessed xl:font-extrabold  text-[16px] 2xl:text-[36px] xl:text-[26px]  lg:w-[350px] lg:text-[26px] lg:leading-[25.2px]  xl:inline xl:w-[400px]">
            ROOF
            </p>
            <h1 className="uppercase 2xl:text-[5.208vw]  xl:text-[64px] text-[#252526] lg:text-[44px] md:text-[32px] text-[64px] leading-[81%] 2xl:max-w-[605px]  lg:max-w-[350px] xl:max-w-[400px] md:max-w-[250px] max-w-[299px] tracking-[-0.07em] pt-1.5 xl:pt-1.5 ">
              {t("restaurant.karaoke.title")}
            </h1>
            <div
              className={cn(
                ` h-full  2xl:mt-[1.771vw] xl:mt-[28px] 2xl:text-[1.04vw] flex flex-col 2xl:max-w-[555px] md:max-w-[250px] max-w-[80vw] lg:max-w-[350px] xl:max-w-none `,
                {
                  "2xl:space-y-5 xl:space-y-4 lg:space-y-3": !isEng,
                }
              )}
            >
              <p
                className={`inline uppercase text-[#252526]  leading-[120%]  2xl:text-[0.94vw] xl:text-[0.92vw] lg:text-[12px] text-[3.2vw] md:order-none order-3   ${
                  isCustomWidth ? "xl:text-[0.92vw] w-[93%]" : "xl:text-[1vw] "
                } ${isCustW ? "2xl:w-[95%]!" : ""} `}
              >
                <span className="lg:font-cofo-medium">
                  {t("restaurant.karaoke.desc.0")}
                </span>
                {t("restaurant.karaoke.desc.1")}
              </p>
              <p
                className={`inline uppercase text-[#252526]  leading-[120%]   2xl:text-[0.94vw] 
                lg:text-[12px] text-[3.2vw] md:order-none order-3 md:mt-0 mt-[19px]  ${
                  isCustomWidth
                    ? "2xl:w-[96%] xl:text-[0.92vw] lg:text-[12px]  w-[93%]"
                    : "2xl:w-[100%]  xl:text-[1vw] xl:w-[96%]"
                } ${isCustW ? "2xl:w-[95%]!" : ""} 
                lg:text-[12px] text-[3.2vw] md:order-none order-3 md:mt-0 mt-[19px]  ${
                  isCustomWidth
                    ? "2xl:w-[96%] xl:text-[0.92vw] lg:text-[12px]  w-[93%]"
                    : "2xl:w-[100%]  xl:text-[1vw] xl:w-[100%]"
                } ${isCustW ? "2xl:w-[95%]!" : ""} 
                `}
              >
                {t("restaurant.karaoke.desc.2")}
              </p>
              <p
                className={`uppercase font-cofo-medium text-[#252526] leading-[120%] 2xl:text-[0.94vw] 2xl:mt-[27px] lg:mt-[18px] text-[3.2vw] xl:text-[16px] lg:text-[12px] md:order-none order-1 mt-[33px] md:mb-0 mb-[19px] ${
                  isCustomWidth ? "xl:text-[1vw] mt-[15px]  " : ""
                }`}
              >
                {t("restaurant.karaoke.karaokeTime")}
              </p>
            </div>
          </div>
        </div>

        <div className="h-fit flex items-center justify-center md:border-x border-[#B3B3B3] border-y md:border-y-0  py-[19px_24px] px-[18px_17px] lg:h-full md:px-2 lg:px-4.5 xl:py-3.5 2xl:py-[19px_25px] 2xl:px-[19px_20px]">
          <img
            src={karaokeFst}
            alt="karaoke"
            className={`w-full h-full max-h-[325px] md:max-h-full  2xl:max-h-[26.93vw] object-cover ${
              isCustomWidth ? "xl:max-h-[418px]" : "xl:max-h-[378px]"
            }`}
          />
        </div>
        <div className="h-fit flex items-center justify-center md:my-auto border-[#B3B3B3] border-y md:border-y-0 border-t-0  py-[19px] px-[18px_16px]  lg:h-full md:px-2 lg:px-4.5 xl:py-3.5 2xl:py-[18px_25px]  2xl:px-[19px_25px]">
          <img
            src={karaokeScd}
            alt="karaoke"
            className={`w-full lg:h-full   max-h-[325px] md:h-full h-[325px]  2xl:max-h-[26.93vw] object-cover ${
              isCustomWidth ? "xl:max-h-[418px]" : "xl:max-h-[378px]"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
