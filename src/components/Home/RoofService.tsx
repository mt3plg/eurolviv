import { Link } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { RoofWordmark } from "@/components/common/RoofWordmark";
import { usePagesInfoStore } from "@/store/usePagesInfoStore";
import { links } from "@/Constants/Links";
import { buildLocalizedPath } from "@/utils/localeRouting";
export const RoofService = () => {
  const { t, i18n } = useTranslation();
  const { suggestion } = usePagesInfoStore();
  const locale = i18n.language === "en" ? "en" : "uk";

  return (
    <div className="w-full  justify-center hidden md:flex">
      <div className="grid w-full lg:grid-cols-2 grid-cols-1">
        {suggestion.map((item, index) => (
          <div
            key={index}
            className={cn(
              `relative flex flex-col w-full items-center bg-[#252526] ${
                index === 2
                  ? "lg:col-span-2 2xl:h-[80.33vw] xl:h-[84.38vw] h-[873px]"
                  : "md:h-[1173px] h-[873px]"
              }`
            )}
          >
            <div className={`relative w-full h-full overflow-hidden`}>
              <div
                className={`${
                  index === 2 ? " " : ""
                } absolute inset-0 bg-gradient-to-b
                 ${
                   index === 2
                     ? "from-[#252526] to-[#25252659] bg-[#000000]/10"
                     : "from-[#25252620] to-[#25252659] bg-[#000000]/5"
                 }`}
              ></div>
              <img
                src={item.img}
                alt={item.url}
                className={`w-full overflow-hidden h-full object-cover ${
                  index === 1 ? " 2xl:scale-108" : ""
                }`}
              />
            </div>

            {index === 2 && (
              <div className="absolute left-1/2 transform  -translate-x-1/2 top-0 h-full w-[91%] border-x border-[#AEAEAE3D] pointer-events-none z-1"></div>
            )}

            <div
              className={cn(
                `absolute inset-0 flex flex-col items-center text-center mt-[123px]  text-white z-2  ${
                  index === 2
                    ? "2xl:mt-[15.79vw] xl:mt-[15.63vw] lg:mt-[123px]"
                    : "justify-between"
                }`
              )}
            >
              <div className="flex flex-col items-center ">
                <div>
                  <div className="flex justify-center w-full">
                    <InViewWrapper>
                      <RoofWordmark className="text-white text-[22px] lg:text-[24px] 2xl:text-[26px]" />
                    </InViewWrapper>
                  </div>
                  <h1
                    className={cn(`${
                      index === 2
                        ? "2xl:text-[10.31vw] xl:text-[13.31vw] text-[20.27vw] md:text-[100px] sm:text-[80px] 2xl:w-[70%] mx-auto"
                        : "2xl:text-[5.21vw]  max-w-[37.6vw] text-[17.6vw] md:text-[70px] sm:text-[50px] xl:h-[172px] lg:h-[162px]"
                    } 
                  text-center uppercase leading-[104%] tracking-[-0.05em] xl:mt-[29px] lg:mt-[19px]
                  w-full lg:leading-[81%]`)}
                  >
                    {t(item.title)}
                  </h1>

                  <p
                    className={`uppercase font-cofo-medium lg:text-[20px] text-[14px]  ${
                      index === 2 ? "mt-[61px]" : "mt-[29px]"
                    }`}
                  >
                    {t(item.titleDesc)}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  `flex flex-col items-center    ${
                    index === 2
                      ? ""
                      : " 2xl:pb-[3.91vw] xl:pb-[7.74vw] lg:pb-[10.74vw]"
                  }`
                )}
              >
                {item.desc.map((desc, index) => (
                  <p
                    key={index}
                    className={`uppercase lg:text-[18px] text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[0.94vw] xl:text-[1.25vw]   ${
                      index === 0 ? "2xl:mt-[1.67vw] xl:mt-[1.25vw]" : ""
                    }`}
                  >
                    {t(desc)}
                    <br />
                  </p>
                ))}
                <div
                  className={`flex h-fit justify-center mt-[40px] ${
                    index === 2 ? "gap-x-[16px] " : ""
                  }`}
                >
                  <Link
                    to={links.bookTable}
                    target="_blank"
                    className={`uppercase bg-[#8C331B] lg:py-[11px]   rounded-full font-cofo-medium  text-[#FFFFFF] hover:bg-[#252526] hover:text-[#FFFFFF] lg:w-[226px]  lg:text-[16px] text-[12px] py-[12px] px-[17px] ${
                      index === 2 ? "" : "hidden"
                    }`}
                  >
                    {t("buttons.bookTable")}
                  </Link>
                  <Link
                    to={`${buildLocalizedPath(item.url.split("#")[0], locale)}${
                      item.url.includes("#") ? `#${item.url.split("#")[1]}` : ""
                    }`}
                    className={cn(
                      `uppercase  rounded-full  font-cofo-medium text-[#252526] bg-[#FFFFFF] hover:bg-[#252526] hover:text-[#FFFFFF] lg:text-[16px] px-[10px] text-[12px] `,
                      {
                        "md:py-[11px]  lg:w-[171px] ": index !== 2,
                        "lg:w-[226px] md:py-[11px]  ": index === 2,
                      }
                    )}
                  >
                    {t("buttons.details")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
