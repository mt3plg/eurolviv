import { useTranslation } from "react-i18next";
import {
  aboutImageFst,
  aboutImageScd,
  aboutImageTrd,
} from "@/store/exportsImg";
import { useIsEnglish } from "@/hooks/useIsEnglish";

export const AboutRestaurant = () => {
  const { t } = useTranslation();
  const isEng = useIsEnglish();
  return (
    <div className="flex flex-col  justify-center items-center md:w-[93.16%] w-[89.067%] mx-auto overflow-x-hidden">
      <div className="grid md:grid-cols-[41.82%_58.18%] w-full grid-cols-1 ">
        <div className="border-x border-b h-[33px] border-[#B3B3B3] lg:h-[53px]"></div>
        <div className="border-e md:border-b border-[#B3B3B3] lg:h-[53px]"></div>
        <div
          className="border-x md:border-b border-[#B3B3B3] flex flex-col items-center 2xl:pt-[54px]
         xl:pt-[38px] 2xl:pb-[3.125vw] xl:pb-[40px] lg:pt-[30px] md:text-start text-center"
        >
          <div
            className={`2xl:w-[33.07vw]  w-[299px] lg:w-[356px] xl:w-[34.07vw]`}
          >
            <p className="font-blessed  leading-[70%] 2xl:text-[1.875vw] xl:text-[28px] lg:text-[24px] md:text-[18px]  text-[#242425] text-[16px] lg:pt-0 pt-[33px]">
              {t("restaurant.about.title")}
            </p>
            <div className="md:flex md:items-center md:gap-2 pt-[8px] xl:pt-0 2xl:pt-[8px] ">
              <h1
                className={`uppercase tracking-[-0.07em] leading-[81%]  text-[#242425] text-[17.07vw] 2xl:text-[5.21vw] lg:text-[6.2vw]
                  xl:text-[6.719vw] xl:pt-2
                `}
              >
                ROOF
              </h1>
              <span
                className={`2xl:text-[3.33vw] lg:tracking-[-0.07em] justify-center pt-[4px] lg:pt-0 
                  xl:text-[64px] text-[32px] flex  mt-auto  md:justify-start 2xl:ps-1`}
              >
                {t("restaurant.about.title2")}
                <span className="md:inline-flex hidden">&nbsp;-</span>
              </span>
            </div>

            <div
              className={`2xl:space-y-5.5 space-y-3 2xl:pt-[42px]  pt-[22px] md:mb-0 mb-8 xl:pt-[22px] xl:leading-normal xl:space-y-5
                
              }`}
            >
              <p
                className={`leading-[120%] uppercase text-[#252526] 2xl:text-[0.9375vw] xl:text-[14px]  lg:text-[14px] md:text-[12px] text-[12px] 
              

                  ${isEng ? "xl:w-[100%]" : ""}
                   xl:leading-[120%]
                   xl:text-[0.977vw]
                `}
              >
                {t("restaurant.about.desc.first.0")}
                <span className="font-cofo-medium">
                  {t("restaurant.about.desc.first.1")}
                </span>
                {t("restaurant.about.desc.first.2")}
              </p>
              <p
                className={`leading-[120%] uppercase text-[#252526] 2xl:text-[0.9375vw]   xl:text-[14px] lg:text-[14px] md:text-[12px] text-[12px]
                  ${isEng ? "xl:w-[98%] 2xl:w-[97%]" : "w-[98%]"}
                  
                 tracking-[-0.02em] xl:leading-[120%]
                     xl:text-[0.977vw]
              `}
              >
                <span className=" lg:font-cofo-medium">
                  {t("restaurant.about.desc.second.0")}
                </span>
                {t("restaurant.about.desc.second.1")}
                <span className="font-cofo-medium">
                  {t("restaurant.about.desc.second.2")}
                </span>
                <span>{t("restaurant.about.desc.second.3")}</span>
                <span className={`${isEng ? "hidden" : "inline"}`}>
                  {t("restaurant.about.desc.second.4")}
                </span>
              </p>

              <p
                className={`leading-[120%] md:block hidden uppercase text-[#252526] 2xl:text-[0.9375vw]  lg:text-[14px] md:text-[12px] text-[12px] 
                  
                    xl:leading-[120%]
                    xl:text-[0.977vw] 
                `}
              >
                <span>{t("restaurant.about.desc.third.0")}</span>
                {t("restaurant.about.desc.third.1")}
              </p>

              <p
                className={`leading-[120%] md:block hidden uppercase text-[#252526] 2xl:text-[0.9375vw]  lg:text-[14px] md:text-[12px] text-[12px] 
                  
                    xl:leading-[120%]
                    xl:text-[0.977vw] 
                ${isEng ? "xl:w-[102%]" : ""}
                `}
              >
                <span className="font-cofo lg:font-cofo-medium">
                  {t("restaurant.about.desc.fourh.0")}
                </span>
                {t("restaurant.about.desc.fourh.1")}
                <span className="font-cofo-medium">
                  {t("restaurant.about.desc.fourh.2")}
                </span>
                {t("restaurant.about.desc.fourh.3")}
              </p>
            </div>
          </div>
        </div>

        <div className="md:border-e border-x md:border-x-0 border-t md:border-t-0 border-[#B3B3B3]  md:border-b ">
          <div className="flex items-center justify-center">
            <div
              className={`md:border-e border-[#B3B3B3] border-b 2xl:px-[20px] w-full flex items-center justify-center lg:py-[14px_19px] 2xl:py-[14px_19px]   pt-[10px] pb-[13px]  md:px-2 px-[10px_3px] 
                
                   xl:py-[14px_19px]
              }`}
            >
              <img
                src={aboutImageFst}
                alt=""
                className=" w-full h-full object-cover"
              />
            </div>
            <div
              className={` border-[#B3B3B3] border-b w-full 2xl:px-[20px]   flex items-center justify-center lg:pt-[14px] pt-[10px] pb-[13px] 2xl:py-[14px_19px] md:px-2 px-[3px_10px] 
                
                  lg:px-[10px] xl:py-[10px_14px]
              }`}
            >
              <img
                src={aboutImageScd}
                alt=""
                className=" w-full h-full object-cover"
              />
            </div>
          </div>
          <div
            className={`flex items-center 2xl:py-[20px_26px] 2xl:px-[20px] px-2.5  justify-center lg:pt-[12px] lg:pb-[26px] pt-[10px]  
                xl:py-[20px_25px] xl:px-[20px]  
            `}
          >
            <img
              src={aboutImageTrd}
              alt=""
              className={` w-full h-full  object-cover 2xl:h-[15.208vw] xl:h-[17.321vw] lg:h-[29vw]
                
              `}
            />
          </div>
        </div>

        <div className="border-x border-b border-[#B3B3B3] flex flex-col items-center justify-center py-[27px]   lg:mb-10 md:text-start text-center md:hidden  ">
          <div className="2xl:w-[635px] w-[299px] gap-y-4 flex flex-col">
            <p className="uppercase text-[#252526] 2xl:text-[0.9375vw] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[12px] ">
              <span className="">{t("restaurant.about.desc.third.0")}</span>
              {t("restaurant.about.desc.third.1")}
            </p>

            <p className="uppercase text-[#252526] 2xl:text-[0.9375vw] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[12px]  w-[100%] ">
              <span
                className={`${
                  isEng ? "font-cofo-medium" : "lg:font-cofo-medium"
                }`}
              >
                {t("restaurant.about.desc.fourh.0")}
              </span>
              <span className="">{t("restaurant.about.desc.fourh.1")}</span>
              <span className="font-cofo-medium">
                {t("restaurant.about.desc.fourh.2")}
              </span>
              {t("restaurant.about.desc.fourh.3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
