import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { previewImg } from "@/store/exportsImg";
import cn from "classnames";
import "@/components/Home/roomsSlider.css";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { buildLocalizedPath } from "@/utils/localeRouting";

export const AboutHome = () => {
  const { t, i18n } = useTranslation();
  const isEng = useIsEnglish();

  return (
    <div className="flex flex-col  xl:items-start xl:justify-start  justify-center items-center overflow-x-hidden overflow-y-hidden ">
      <div className="grid md:grid-cols-[24.2%_34.7%_25.8%_15.3%] grid-cols-[89.07%]  justify-center md:justify-stretch   mx-0 w-full">
        <div className="md:flex hidden border-[#C7C7C7]  border-b"></div>
        <div className="md:border-x flex flex-col border-x  xl:flex-row 2xl:ps-[27px]  items-center space-y-2 2xl:space-y-0 xl:space-y-0 border-[#C7C7C7]   lg:border-b">
          <div className="w-full justify-between 2xl:pe-[3.1vw]  md:flex hidden *: flex-col md:flex-row lg:h-[15.7vw] 2xl:h-[8.7vw] xl:h-[8vw] items-center  px-2   ">
            <p
              className={` uppercase  
            text-[3.2vw] 
              md:text-[1.17vw]
              lg:text-[0.97vw] 
              
              lg:w-[15.8vw]
              2xl:w-[13.3vw]
                              md:p-4
                              lg:p-0
              xl:ps-[20px]
              2xl:ps-0
              xl:text-[0.83vw] 2xl:text-[.83vw]
               font-cofo-medium 
               ${isEng ? "" : " xl:w-[13.2vw]"}
               `}
            >
              {t("home.about.aboutRooms.0")}
            </p>
            <p
              className={` 
              text-[3.2vw] 
              md:text-[1.17vw]
              md:p-4
              lg:p-0
              lg:text-[0.97vw] 
              
              xl:pe-[20px] 
              2xl:pe-0
              xl:text-[0.83vw] 2xl:text-[.83vw] 
              uppercase   font-cofo-medium
              ${
                !isEng
                  ? "xl:w-[13vw] lg:w-[14.8vw] 2xl:w-[11.9vw]"
                  : "2xl:w-[11.5vw] xl:w-[13vw] lg:w-[14.8vw] "
              }`}
            >
              {t("home.about.aboutRooms.1")}
            </p>
          </div>

          <div className={` py-[20px]  flex  md:hidden  px-[3.73vw]`}>
            <div className="">
              <p
                className={`md:text-[14px] uppercase font-cofo-medium text-[2.67vw] pe-[2px] ${
                  isEng ? "w-[92%]" : "w-[90%]"
                }
                `}
              >
                {t("home.about.aboutRooms.0")}
              </p>
            </div>
            <div>
              <p
                className={`md:text-[14px] uppercase font-cofo-medium text-[2.67vw] ps-[5px] pe-[16px] 
                ${isEng ? "w-[107%]!" : ""}
              
                `}
              >
                {t("home.about.aboutRooms.1")}
              </p>
            </div>
            <div className="flex justify-end">
              <p
                className={`md:text-[14px] uppercase font-cofo-medium text-[2.67vw]  
               
                ${isEng ? "w-[25.07vw]!" : ""}`}
              >
                {t("home.about.aboutRooms.2")}
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex hidden  border-[#C7C7C7] md:border-e  border-x md:border-x-0 md:border-s-0 xl:justify-start   lg:items-center  2xl:ps-0 xl:ps-[2vw]  border-b">
          <div className=" md:w-[80%] lg:w-[0%] lg:mb-2 ">
            <p
              className={`uppercase font-cofo-medium 
              text-[3.2vw] 
              md:text-[1.17vw]
              lg:text-[0.97vw] 
              xl:text-[0.83vw] 2xl:text-[.83vw] 
             
                            md:p-4

              p-[0.53vw]
                2xl:ms-[2.29vw]
                xl:p-0
               lg:ps-4
               lg:p-0
               ${
                 isEng
                   ? "xl:w-[13vw] lg:w-[12vw] 2xl:w-[12vw]"
                   : " xl:w-[11.42vw] lg:w-[12vw] 2xl:w-[11vw]"
               }
               `}
            >
              {t("home.about.aboutRooms.2")}
            </p>
          </div>
        </div>

        <div className="border-b border-[#C7C7C7] md:flex hidden"></div>

        <div className="relative lg:hidden">
          <hr className="w-[1000px] absolute -translate-x-1/2  border-[#C7C7C7]" />
        </div>

        <div className="border-[#C7C7C7]  md:border-e-0 border-x md:border-x-0  pt-[4vw]  2xl:border-e-0 xl:border-e-0 lg:border-b 2xl:border-b-0 xl:border-b-0 lg:block 2xl:py-0 xl:py-0 flex flex-col lg:items-center ">
          <p className=" md:text-[2vw] lg:text-[1.2vw]  md:font-cofo-medium  uppercase 2xl:text-[1.25vw] xl:text-[1.5vw] sm:text-[3vw] text-[12px] tracking-[-0.05em] font-cofo-medium 2xl:ps-[3.75vw] xl:ps-[4.2vw] lg:ps-[2.8vw] 2xl:pt-[4.7vw] xl:pt-[5.9vw] ps-[3vw]">
            {t("home.about.title")}
          </p>
        </div>

        <div
          className={`border-x   border-[#C7C7C7] ps-[3vw] lg:ps-[1.8vw]   flex flex-col xl:pb-[2.3vw] 2xl:pt-0 xl:pt-0 md:pt-[5.2vw] pt-[2.2vw]
            ${
              isEng
                ? " 2xl:ps-[1.24vw] xl:ps-[1.1vw]"
                : "2xl:ps-[1.64vw] xl:ps-[2.1vw]"
            }
            `}
        >
          <div className="2xl:mt-[4.7vw] xl:mt-[5.9vw] pb-5 xl:pb-0">
            <h1
              className={cn(
                "text-[8.53vw] w-[89.58vw] leading-[90%] xl:space-y-[11px] sm:text-[3.65vw] lg:leading-[81%] md:text-[3.52vw] lg:text-[5.33vw] xl:text-[5.3vw] 2xl:text-[5.21vw] uppercase stroke-[#252526] text-[#242425] 1024:font-cofo-medium tracking-[-0.07em]"
              )}
            >
              <div className="tracking-[-0.07em] inline">
                {t("home.about.heading.0")}
                <br className={`${isEng ? "block md:hidden" : "hidden "}`} />
              </div>
              <div className={`xl:tracking-[-0.1em] 2xl:ps-4 inline`}>
                {t("home.about.heading.1")}
              </div>
              <br className="hidden md:block" />
              <div className="md:whitespace-nowrap xl:pt-[13px]">
                {t("home.about.heading.2")}
              </div>
            </h1>
          </div>
        </div>
        <div className="md:flex hidden -z-1 flex-col relative border-s md:border-s-0  2xl:border-s-0 xl:border-s-0 items-center lg:items-start 2xl:items-start xl:items-start border-e border-[#C7C7C7] "></div>

        <div
          className="border-[#C7C7C7] md:col-span-2 md:border-e border-x  md:border-b-0 about-home-image-container px-[10px] pb-[10px] lg:px-0
          h-full
          md:h-[39.06vw]
          lg:h-[30.56vw] lg:pe-[1.67vw]
          xl:h-[31.77vw] xl:pe-[1.67vw]
          2xl:h-[37.5vw] 2xl:pe-[2.71vw]"
        >
          <img src={previewImg} alt="" className="z-1" />
        </div>
        <div className="relavive md:hidden">
          <hr className="w-screen absolute left-0 border-[#C7C7C7]  text-black bg-black lg:hidden" />
        </div>

        <div className="flex flex-row md:flex-col  justify-center md:justify-start border-x md:border-x-0 md:border-e border-[#C7C7C7] ">
          <div className="    flex flex-col md:flex-col items-center">
            <div className="flex flex-col 2xl:px-[1.56vw_1vw] 2xl:space-y-[1vw] xl:space-y-[1.1vw] xl:px-[1.2vw_1.5vw] lg:px-[2vw_2vw] md:space-y-2 space-y-3 md:order-none order-2 px-[3.8vw_2.8vw] pt-[6.7vw] md:pt-0 ">
              <p
                className={cn(
                  `uppercase font-cofo tracking-[-0.04em] font-normal text-[#444444]
                  text-[3.2vw]
                  sm:text-[2.08vw]
                  md:text-[1.17vw]
                  lg:text-[0.97vw]
                  xl:text-[1.04vw] xl:leading-[1.15vw]
                  2xl:text-[1.04vw] 2xl:leading-[1.25vw] 2xl:p-0 xl:p-0
                  ${isEng ? "w-[90%]" : ""}
                  `
                )}
              >
                {t("home.about.desc.0")}
              </p>
              <p
                className="uppercase font-cofo tracking-[-0.04em] font-normal text-[#8C331B]
                text-[3.2vw]
                w-[93%] 
                lg:w-auto
                sm:text-[2.08vw]
                md:text-[1.17vw]
                lg:text-[0.97vw]
                xl:text-[1.04vw] xl:leading-[1.15vw]
                2xl:text-[1.04vw] 2xl:leading-[1.25vw] 2xl:p-0 xl:p-0"
              >
                {t("home.about.desc.1")}
              </p>
              <p
                className={`uppercase font-cofo tracking-[-0.04em] font-normal text-[#444444]
                text-[3.2vw]
                sm:text-[2.08vw]
                md:text-[1.17vw]
                lg:text-[0.97vw]
                xl:text-[1.04vw] xl:leading-[1.15vw]
                2xl:text-[1.04vw] 2xl:leading-[1.25vw] 2xl:p-0 xl:p-0
                ${isEng ? "xl:w-[90%] 2xl:w-auto" : ""}
                `}
              >
                {t("home.about.desc.2")}
              </p>
              <Link
                to={buildLocalizedPath("/about", i18n.language === "en" ? "en" : "uk")}
                className="border  border-[#8C331B] text-center hover:text-[#8C331B] w-[141px] h-[40px]  hover:bg-[#8C331B] uppercase   font-cofo-medium items-center justify-center flex xl:w-[146px] xl:h-[36px] 2xl:w-[167px] 2xl:h-[46px] mt-[4vw] md:mt-0
                  xl:text-[14px] lg:text-[12px] md:text-[1.3vw] text-[12px] rounded-full text-[#8C331B] mb-[13vw] md:mb-0 
                 2xl:mt-[0.5vw] xl:mt-[0.9vw]"
              >
                {t("buttons.details")}
              </Link>
            </div>

            <div className="relative flex  md:w-full  justify-start self-start  md:order-none order-1 ">
              <div className="md:absolute top-0 left-0  pt-[5.4vw]  xl:pt-[2.6vw] xl:ps-[1vw] w-full md:w-fit   px-[3.8vw_2.2vw]">
                <h1
                  className={cn(
                    "md:whitespace-nowrap md:font-cofo-medium  uppercase leading-[84%] tracking-[-0.07em] lg:tracking-[-0.1em] text-[#242425] text-[8.53vw] inline sm:text-[4.17vw] md:text-[3.12vw] md:block lg:text-[4vw] xl:text-[5.4vw] 2xl:text-[5.21vw]",
                    {}
                  )}
                >
                  {t("home.about.quality.0")}
                </h1>
                <h1
                  className={cn(
                    "md:whitespace-nowrap uppercase md:font-cofo-medium leading-[84%] tracking-[-0.07em] lg:tracking-[-0.1em] text-[#242425] text-[8.53vw] inline sm:text-[4.17vw] md:text-[3.12vw] md:block lg:text-[4vw] xl:text-[5.4vw] 2xl:text-[5.21vw]"
                  )}
                >
                  {t("home.about.quality.1")}
                </h1>
                <h1
                  className={cn(
                    "md:whitespace-nowrap uppercase lg:translate-x-[6.8vw] md:font-cofo-medium leading-[84%] tracking-[-0.07em] lg:tracking-[-0.1em] h-fit text-[8.53vw] inline sm:text-[4.17vw] md:text-[3.12vw] md:block lg:text-[4vw] xl:text-[5.4vw] xl:translate-x-[9vw] 2xl:text-[5.21vw] 2xl:translate-x-[8.75vw]",
                    {
                      "2xl:translate-x-[16.25vw]!": isEng,
                      "xl:translate-x-[17vw]": isEng,
                    }
                  )}
                >
                  {t("home.about.quality.2")}
                </h1>
                <h1
                  className={cn(
                    "md:whitespace-nowrap uppercase md:font-cofo-medium leading-[84%] tracking-[-0.07em] lg:tracking-[-0.1em] text-[#242425] text-[8.53vw] inline sm:text-[4.17vw] md:text-[3.12vw] md:block lg:text-[4vw] xl:text-[5.4vw] 2xl:text-[5.21vw]"
                  )}
                >
                  {t("home.about.quality.3")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="-z-1 border-[#C7C7C7] flex-1 lg:ms-[4.7vw] xl:ms-[7vw] h-[11.2vw] lg:h-[11.7vw] xl:h-[12.5vw] 2xl:h-[6.5vw] md:flex hidden"></div>
        <div className="-z-1 border-x border-[#C7C7C7] lg:h-[11.7vw] flex-1  h-[11.2vw] md:flex hidden  2xl:h-[6.5vw]"></div>
        <div className="-z-1 border-e border-[#C7C7C7] lg:h-[11.7vw] flex-1 lg:pe-[4.7vw] p-5 h-[11.2vw] md:flex hidden 2xl:h-[6.5vw]"></div>
        <div className="-z-1 border-e border-[#C7C7C7] lg:h-[11.7vw] h-[11.2vw] md:flex hidden 2xl:h-[6.5vw]"></div>
      </div>

      <div className="md:grid md:grid-cols-[24.2%_34.7%_25.8%_15.3%]  hidden"></div>
    </div>
  );
};
