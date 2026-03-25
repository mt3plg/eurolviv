import cn from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { suggestion } from "@/Constants/RoofService";
import { buildLocalizedPath } from "@/utils/localeRouting";

export const RoofServiceMobile = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en" : "uk";

  return (
    <div className="w-full  justify-center flex lg:hidden">
      <div className="grid w-full grid-cols-2 ">
        {suggestion.map((item, index) => (
          <div key={index} className="relative">
            <div className="relative w-full h-full">
              <div
                className={`absolute inset-0  bg-gradient-to-b from-[#252526] to-transparent`}
              ></div>
              <img
                src={item.img}
                className="w-full lg:h-[650px] h-[362px] object-cover object-center"
              />
            </div>

            <div
              className={cn(
                `absolute inset-0 flex flex-col items-center text-center translate-y-1/4 text-white z-10`
              )}
            >
              <div className="flex flex-col items-center ">
                <Link to={buildLocalizedPath(item.to, locale)}>
                  <h1
                    className={
                      "text-[6.4vw] md:text-[32px] lg:text-[48px] underline-offset-2  xl:text-[64px] text-center uppercase leading-[104%] tracking-[-0.1em] xl:mt-[29px] lg:mt-[19px] w-full underline   "
                    }
                    style={{ textDecorationThickness: "1px" }}
                  >
                    {t(item.title)
                      .split(" ")
                      .map((word, index) => (
                        <span key={index} className="block">
                          {word}
                        </span>
                      ))}
                  </h1>
                </Link>
              </div>

              <div
                className={cn(`flex flex-col items-center space-y-[40px]`)}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
