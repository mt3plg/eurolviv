import { useTranslation } from "react-i18next";
import { weddingFst, weddingScd, weddingTrd } from "@/store/exportsImg";
import { ViewMenuButton } from "@/components/Buttons/ViewMenu";
import { useCustomWidth } from "@/hooks/useCustomWidth";
import { useIsEnglish } from "@/hooks/useIsEnglish";
export const Celebration = () => {
  const { t } = useTranslation();
  const isCustomWidth = useCustomWidth(1500, 1700);
  const isEng = useIsEnglish();
  return (
    <div className="flex flex-col items-center justify-center mx-auto md:w-[93.16%] w-[89.067%] border-[#B3B3B3] md:border-">
      <div className="grid md:grid-cols-[35.7%_28.9%_35.1%]  grid-cols-1 w-full border-x border-[#B3B3B3] md:border-t ">
        <div className="2xl:h-[32.08vw] xl:h-[540px]  hidden md:flex justify-end  "></div>

        <div className="2xl:h-[32.08vw] xl:h-[540px]  flex border-[#B3B3B3] md:border-x flex-col items-center lg:justify-end justify-end  lg:oy-0 py-[65px_57px] text-center lg:pb-[27px]">
          <span className="font-blessed  block text-center leading-[70%] text-[16px] xl:text-[36px]  xl:inline xl:pb-[22px] pb-[7px]">
          ROOF
          </span>
          <h1
            className={`uppercase lg:w-fit w-[217px] md:w-[317px] 2xl:text-[5.21vw] lg:text-[54px] md:text-[44px] text-[#242425]   md:leading-[81%] leading-[94%]  z-1 text-[32px] tracking-[-0.06em] lg:whitespace-nowrap  
            ${
              isCustomWidth
                ? "xl:text-[78px] pe-1.5 "
                : "xl:text-[66px] xl:pe-1 2xl:pe-0"
            } `}
          >
            {t("restaurant.celebration.title")}
          </h1>
          <div className="lg:space-y-4 space-y-4 lg:mt-[37px] mt-[24px] flex flex-col items-center">
            <p
              className={`text-[#252526] 2 md:text-[14px] 2xl:text-[0.94vw] xl:text-[1.25vw] uppercase  lg:text-[16px]
                    lg:leading-[120%] text-[3.2vw] 
                    ${
                      isEng
                        ? "2xl:w-[156%] xl:w-[210%] w-[96%]"
                        : "w-[95%] 2xl:w-[35.52vw] xl:w-[180%] lg:w-[520px] md:w-[420px]"
                    }
                    `}
            >
              {t("restaurant.celebration.desc.0")}
            </p>
            <p
              className={`text-[#252526]   md:text-[14px] 2xl:text-[0.94vw] uppercase xl:text-[1.25vw] lg:text-[16px]  lg:leading-[120%] text-[3.2vw]
                ${
                  isEng
                    ? "2xl:w-[156%] xl:w-[205%] w-[95%]"
                    : "2xl:w-[37.6vw] lg:w-[550px] xl:w-[180%] md:w-[420px] w-[90%]"
                }
              
            `}
            >
              {t("restaurant.celebration.desc.1")}
            </p>
          </div>
          <ViewMenuButton
            onClick={() => window.open("/documents/Banquet_Menu.pdf", "_blank")}
            className="uppercase cursor-pointer lg:text-[14px] lg:w-[175px] 2xl:w-[9.1vw] 2xl:h-[2.29vw] 2xl:text-[0.73vw]
             text-[12px] font-cofo-medium bg-[#8C331B] h-[40px]
             lg:text-white hover:bg-[#FFFFFF] w-[160px] lg:hover:text-[#8C331B] border border-[#8C331B]
              flex flex-col items-center justify-center lg:py-[13px] rounded-full lg:mt-[45px] mt-[26px]"
          >
            {t("buttons.celebrationMenu")}
          </ViewMenuButton>
        </div>
        <div className="md:flex hidden  border-[#B3B3B3]"></div>
      </div>
      <div className="grid md:grid-cols-[35.7%_28.9%_35.1%] grid-cols-1 border-x   border-y border-[#B3B3B3] w-full">
        <div
          className={`flex items-center justify-center lg:px-[14px_12px] md:px-[12px_10px] 2xl:px-[24px_20px]  md:py-3.25 2xl:py-[23px_26px] lg:py-3 py-[17px_22px] px-[18px_16px] ${
            isCustomWidth ? "xl:px-[20px_16px]" : "xl:px-[18px_14px]"
          }`}
        >
          <img
            src={weddingFst}
            alt=""
            className="w-full md:h-full   h-[310px]  2xl:max-h-[620px] xl:max-h-[510px] lg:max-h-[460px] object-cover"
          />
        </div>
        <div
          className={`flex items-center justify-center lg:px-[14px_14px] md:px-[12px_10px] 2xl:px-5 md:border-x border-y md:border-y-0 border-[#B3B3B3] px-[17px_17px] md:py-3.25 lg:py-3 2xl:py-[23px_26px] py-[20px_22px] ${
            isCustomWidth ? "xl:px-[16px_16px]" : "xl:px-[14px_14px]"
          } `}
        >
          <img
            src={weddingScd}
            alt=""
            className="w-full md:h-full    2xl:max-h-[620px]  xl:max-h-[520px] lg:max-h-[460px] h-[392px] object-cover"
          />
        </div>
        <div
          className={`flex items-center justify-center lg:px-[14px_12px] 2xl:px-[20px_14px] md:px-[12px_10px] 2xl:py-[23px_26px]  lg:py-3 md:py-3.25 py-[20px_22px] px-[18px_15px] ${
            isCustomWidth ? "xl:px-[18px_16px]" : "xl:px-[16px_12px]"
          }`}
        >
          <img
            src={weddingTrd}
            alt=""
            className="w-full md:h-full  2xl:max-h-[620px]  xl:max-h-[510px] lg:max-h-[460px] max-h-[316px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
