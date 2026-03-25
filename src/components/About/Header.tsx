import { useTranslation } from "react-i18next";
import { headerAbout } from "@/store/exportsImg";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { BookLink } from "@/components/Buttons/BookLink";
import { buildLocalizedPath } from "@/utils/localeRouting";

export const AboutHeader = () => {
  const { t, i18n } = useTranslation();

  const isEng = i18n.language === "en";

  return (
    <div className="relative w-full lg:h-[1186px] h-[821px] flex items-center justify-center flex-col">
      <div
        className="absolute inset-0 z-5 "
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
                 linear-gradient(180deg, #252526 0%, rgba(37, 37, 38, 0) 50.36%, #252526 100%)`,
        }}
      ></div>
      <InViewWrapper>
        <img
          src={headerAbout}
          alt="headerImg"
          className="absolute inset-0 w-full h-full object-cover object-[20%_40%] "
        />
      </InViewWrapper>

      <h4 className="font-cofo text-[#FFFFFF] z-10  uppercase leading-[22.68px] font-cofo-medium lg:text-[18px] underline text-[10px] decoration-transparent items-center xl:mb-5.25">
        {t("global.createdFor")}
        <span className="font-blessed  normal-case block text-center text-[13px] xl:text-[32px] xl:inline ">
          {t("global.whereTo")}
        </span>
      </h4>

      <h1 className="uppercase  xl:text-[198px]  text-[64px] z-10 text-[#FFFFFF] pt-[5px] lg:pt-0 leading-[81%] tracking-[-0.1em] text-center underline decoration-transparent ">
        {t("global.eurohotel")}
      </h1>
      <h4
        className={`font-cofo 2xl:text-[0.94vw] xl:text-[1.25vw] md:text-[18px] inline text-[3.73vw] uppercase w-[70%] lg:w-auto z-10
       ${isEng ? "2xl:w-[34%] xl:w-[45%]" : ""}
        text-white  text-center underline-offset-[from-font] xl:mt-[33px] mt-7.5`}
      >
        <span className={`${isEng ? "lg:inline" : ""}`}>
          {t("about.header.desc.0")}
        </span>
        <span
          className={`${
            isEng ? "lg:inline" : " font-cofo-medium lg:block"
          }  xl:text-[1.25vw]  text-[18px] 2xl:text-[0.94vw] uppercase  text-center underline-offset-[from-font] decoration-none hidden`}
        >
          {t("about.header.desc.1")}
        </span>
      </h4>
      <BookLink
        className="text-[#252526] mt-7.5 xl:mt-[33px] text-[12px] xl:text-[14px] bg-[#EDE8E5] xl:px-[47px] w-[171px] text-center lg:w-[204px]"
        to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
      >
        {t("buttons.book")}
      </BookLink>
    </div>
  );
};
