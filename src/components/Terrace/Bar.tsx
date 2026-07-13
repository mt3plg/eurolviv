import {
  barImg,
  cocktailImg,
  cocktailImgScnd,
  wineImg,
  wineImgScnd,
} from "@/store/exportsImg";
import { useTranslation } from "react-i18next";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { links } from "@/Constants/Links";
import { Link } from "react-router-dom";
import { useIsEnglish } from "@/hooks/useIsEnglish";
export const BarComponent = () => {
  const { t } = useTranslation();

  const isEng = useIsEnglish();

  return (
    <div className="mx-auto md:w-[93.23%] 2xl:w-[94%] w-[89.7%] border-x md:border-x-0 border-[#B3B3B3] ">
      <div className="md:border-x  border-[#B3B3B3] xl:pt-[149px]">
        <h4 className="font-cofo-medium text-[#252526] leading-[22.68px] justify-center flex xl:mb-4">
          <span className="font-blessed   text-center text-[16px] xl:text-[36px] lg:text-[26px]  xl:inline">
            {t("terrase.bar.title2")}
          </span>
        </h4>
        <h3 className="text-center  uppercase leading-[81%] 2xl:text-[233px] xl:text-[13.52vw] lg:text-[100px] text-[64px] tracking-[-0.09em]">
          <Link to={links.cocktailCard} target="_blank">
            {t("terrase.bar.title")}
          </Link>
        </h3>

        <p
          className={`text-center mt-2 leading-[120%]  uppercase 2xl:text-[1.04vw] xl:text-[1.41vw]  lg:text-[14px] text-[3.20vw]  pt-[22px] lg:pb-[28px]  mx-auto
          ${
            isEng
              ? "xl:w-[40%] 2xl:w-[50%] w-[80%]"
              : "xl:w-[40%] 2xl:w-[30%] md:w-1/3"
          }
          `}
        >
          {isEng ? (
            <>
              {" "}
              {t("terrase.bar.desc.0")} <br className="hidden lg:block" />{" "}
              {t("terrase.bar.desc.1")}{" "}
            </>
          ) : (
            t("terrase.bar.desc")
          )}
        </p>
      </div>
      <div className="flex flex-wrap pt-[36px] md:pt-0">
        <div className="w-full md:w-[53.51%] xl:pt-[17px] xl:px-[16px_17px]  2xl:pt-[1.35vw] 2xl:px-[1.56vw_1.88vw] border-y md:border-s border-[#B3B3B3] px-[10px_9px] pt-[10px]">
          <InViewWrapper>
            <img
              src={barImg}
              alt="bar"
              className="2xl:w-[46.99vw] 2xl:h-[42.24vw]  xl:w-[883px] xl:h-[46.09vw] lg:h-[495px] w-full h-[289px] object-cover"
              loading="eager"
            />
          </InViewWrapper>
          <h3 className="text-center text-[16px]  block underline underline-2 xl:py-[20px_27px] 2xl:py-[1.30vw_1.61vw] py-[17px_18px] uppercase text-[#8C331B] 2xl:text-[1.25vw]  xl:text-[1.72vw]  leading-[108%] tracking-[-0.05em] font-cofo-medium">
            <Link to={links.alcoholCard} target="_blank">
              {t("terrase.bar.alcoholCard")}
            </Link>
          </h3>
        </div>

        <div className="w-full md:w-[46.49%] border-t-0 md:border-t border-b border-[#B3B3B3] md:border-s md:border-e">
          <div className=" 2xl:pt-[1.35vw] xl:pt-[17px] pt-[10px] w-full md:w-fit grid grid-cols-2 ">
            <div className=" md:w-fit 2xl:px-[1.61vw_0.52vw]  xl:px-[17px_8px] px-[10px_3.5px]">
              <InViewWrapper>
                <img
                  src={cocktailImg}
                  alt="cocktail"
                  className=" md:w-[378px]  xl:h-[19.38vw] 2xl:w-[19.72vw]  2xl:h-[18.13vw] lg:h-[20.53vw] object-cover  "
                  loading="eager"
                />
              </InViewWrapper>
            </div>
            <div className=" md:w-fit xl:px-[8px_17px] px-[3.5px_7.5px]">
              <InViewWrapper>
                <img
                  src={cocktailImgScnd}
                  alt="cocktail"
                  className=" md:w-[378px] xl:h-[19.38vw] 2xl:w-[19.72vw]  2xl:h-[18.13vw] lg:h-[20.73vw] object-cover  "
                  loading="eager"
                />
              </InViewWrapper>
            </div>
          </div>
          <h3 className="text-center   text-[16px] underline underline-2 xl:py-[20px_27px] 2xl:py-[1.30vw_1.61vw] py-[17px_18px] uppercase text-[#8C331B] 2xl:text-[1.25vw]  xl:text-[1.72vw]  leading-[108%] tracking-[-0.05em] font-cofo-medium">
            <Link to={links.cocktailCard} target="_blank">
              {t("terrase.bar.cocktailCard")}
            </Link>
          </h3>

          <div className="grid grid-cols-2 2xl:pt-[1.35vw] xl:pt-[17px] pt-[10px] w-full md:w-fit border-t  border-[#B3B3B3]">
            <div className=" md:w-fit xl:px-[17px_8px] 2xl:px-[1.61vw_0.52vw] px-[10px_3.5px]">
              <InViewWrapper>
                <img
                  src={wineImg}
                  alt="cocktail"
                  className=" md:w-[378px]  xl:h-[19.58vw] 2xl:w-[19.72vw] lg:h-[20.73vw] 2xl:h-[18.13vw] object-cover  "
                  loading="eager"
                />
              </InViewWrapper>
            </div>
            <div className=" md:w-fit xl:px-[8px_17px] px-[3.5px_7.5px]">
              <InViewWrapper>
                <img
                  src={wineImgScnd}
                  alt="cocktail"
                  className=" md:w-[378px] xl:h-[19.58vw] 2xl:h-[18.13vw] 2xl:w-[19.72vw] object-cover  lg:h-[20.53vw]"
                  loading="eager"
                  />
              </InViewWrapper>
            </div>
          </div>
          <h3
            className="text-center 2xl:py-[1.49vw_1.61vw]   text-[16px] underline underline-2 xl:py-[20px_27px] py-[17px_18px]  xl:text-[1.72vw]
          uppercase text-[#8C331B] 2xl:text-[1.25vw] leading-[108%] tracking-[-0.05em] font-cofo-medium"
          >
            <Link to={links.wineCard} target="_blank">
              {t("terrase.bar.wineCard")}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
