import { concepts } from "@/store/InitialPagesInfoStore";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { useTranslation } from "react-i18next";
import { DetailsLink } from "@/components/Buttons/DetailsLink";
import cn from "classnames";
import { useCustomWidth } from "@/hooks/useCustomWidth";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { buildLocalizedPath } from "@/utils/localeRouting";
export const ConceptCasd = ({
  title,
  img,
  alt,
  text,
  index,
  to,
}: {
  title: string[];
  img: string;
  alt: string;
  text: string[];
  index: number;
  to: string;
}) => {
  const { t, i18n } = useTranslation();
  const isSpecialWidth = useCustomWidth(1500, 1700);
  const isMobileWidth = useCustomWidth(389, 420);
  const isSpecialMobileWidth = useCustomWidth(421, 450);
  const isUltraHD = useCustomWidth(2000, 3000);
  const isEng = useIsEnglish();

  return (
    <div
      className={cn(`border  border-[#C7C7C7]
          ${
            index === concepts.length - 2
              ? "md:border-e-0 xl:border-e md:border-b"
              : ""
          }
          ${
            index === 0
              ? "xl:border-l md:border-e-0 md:border-b-0 xl:border-r xl:border-b"
              : "xl:border-l-0 xl:border-t border-t-0 md:border-t md:border-b-0 xl:border-b "
          } ${index === concepts.length - 1 ? "border-b-0 md:border-b" : ""}`)}
    >
      <div
        className={`text-center flex flex-col items-center  px-[29px]  lg:h-[600px] xl:px-[0] py-[41px_28px] lg:py-[47px_38px]  ${
          isUltraHD ? "2xl:h-[26.156vw]" : "2xl:h-[30.5vw]"
        }
          ${isSpecialMobileWidth ? " h-[122.667vw]" : "h-[124.667vw]"}
         ${isSpecialWidth ? "xl:h-[520px]" : "xl:h-[460px]"}`}
      >
        <div
          className={`
          ${index === 2 ? "*:inline lg:*:block w-[50%]" : ""}
          ${!isEng && index === 2 ? "*:inline lg:*:block w-[90%]" : ""}`}
        >
          <h1
            className={`uppercase text-[5.333vw] 2xl:text-[1.563vw] leading-[101%] lg:text-[32px] tracking-[-0.07em] font-cofo-medium ${
              isSpecialWidth ? "xl:text-[28px] " : "xl:text-[24px]"
            }`}
          >
            {t(title[0])}
          </h1>
          <h1
            className={`uppercase text-[5.333vw] 2xl:text-[1.563vw] leading-[101%] lg:text-[32px] tracking-[-0.07em] font-cofo-medium ${
              isSpecialWidth ? "xl:text-[28px]" : "xl:text-[24px]"
            }`}
          >
            {t(title[1])}
          </h1>
        </div>
        <InViewWrapper>
          <img
            src={img}
            alt={alt}
            className="w-[53.33vw] h-[50.93vw] lg:w-[300px] lg:h-[280px] xl:w-[12vw] xl:h-[12vw] 2xl:w-[10.417vw] 2xl:h-[9.948vw] object-cover 2xl:mt-[22px] 2xl:mb-[25px] my-4"
          />
        </InViewWrapper>
        <p
          className={`text-[3.733vw]  leading-[101%]   2xl:text-[0.938vw] 2xl:w-[19.271vw] lg:text-[16px] ${
            isMobileWidth && index === 1 ? "w-[99%]" : ""
          } ${index === 3 ? "" : ""} ${
            isSpecialWidth
              ? "xl:text-[16px]"
              : "xl:text-[14px] tracking-[-0.02em]"
          }
          ${isEng && index === 0 ? "w-[95%] lg:w-auto" : ""}
          ${isEng && index === 2 ? "2xl:w-[84%] xl:w-[90%]  " : ""}
          ${isEng && index === 3 ? "2xl:w-[75%] xl:w-[90%]  w-[95%]" : ""}
          `}
        >
          {text.map((textItem, i) => {
            const translatedText = t(textItem);
            return (
              <div
                className={`mx-auto   ${
                  index === 3 && !isEng ? "inline xl:block" : ""
                }
                ${index === 2 || (index === 3 && isEng) ? "xl:inline " : ""}

                ${
                  !isSpecialMobileWidth && index === 1
                    ? "w-[95.5%] lg:w-full"
                    : ""
                } ${isSpecialMobileWidth && index === 1 ? "w-[93%]" : ""}
                ${
                  isEng && index === 0
                    ? "2xl:w-[87%] xl:w-[89%] w inline lg:block"
                    : ""
                }
                ${isEng && index === 1 ? "2xl:w-[93%] xl:w-[95%] " : ""}
                ${
                  isEng && index === 2
                    ? "2xl:w-[95%] xl:w-[90%] inline xl:block"
                    : ""
                }
                ${isEng && index === 3 ? "inline xl:block" : ""}
                
                `}
                key={i}
              >
                {translatedText}
              </div>
            );
          })}
        </p>
        <div className="mt-auto">
          <DetailsLink
            to={`${buildLocalizedPath(to.split("#")[0], i18n.language === "en" ? "en" : "uk")}${
              to.includes("#") ? `#${to.split("#")[1]}` : ""
            }`}
            className={`2xl:text-[0.833vw] 2xl:h-[46px] 2xl:w-[170px]  w-[141px] h-[40px] flex 2xl:px-0! items-center justify-center ${
              isSpecialWidth ? "xl:text-[.9vw]" : "xl:text-[0.9vw]"
            }`}
          >
            {t("buttons.seeMore")}
          </DetailsLink>
        </div>
      </div>
    </div>
  );
};
