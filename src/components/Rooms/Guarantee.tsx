import { useTranslation } from "react-i18next";
import { eurohotel } from "@/store/exportsImg";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { Link } from "react-router-dom";
import { buildLocalizedPath } from "@/utils/localeRouting";
export const Guarantee = () => {
  const { t, i18n } = useTranslation();
  const isEng = useIsEnglish();

  return (
    <div className="w-full flex flex-col items-center md:items-start relative">
      <div className="h-[1000px] md:border-s  -z-1 w-full mx-auto border-[#C7C7C7] border-t lg:border-t-0 absolute max-w-[89.58%] self-center"></div>

      <div className="md:max-w-[94.79%] max-w-[89.5%] md:border-e border-x md:border-x-0 border-[#C7C7C7] lg:w-full">
        <div className="grid   justify-center md:justify-start  grid-cols-[1fr]   border-[#C7C7C7] ">
          <div className="  lg:border-x-0 border-[#C7C7C7] ">
            <div
              className={`flex  flex-col xl:items-end md:items-center  2xl:pt-[4.22vw] xl:pt-[60px] lg:pt-[50px] pt-[49px] 2xl:pb-[48px] xl:pb-[40px] pb-[16px]  md:px-0 ${
                isEng ? "" : "ps-[12px]"
              }`}
            >
              <h1
                className={` text-[8.33vw] 2xl:block md:font-cofo-medium uppercase sm:text-[42px] 2xl:text-[5.21vw] xl:text-[5.47vw] tracking-[-0.07em] lg:leading-[91%] leading-[86%]  2xl:tracking-[-0.04em]
                ${
                  isEng
                    ? "2xl:w-[66vw] xl:w-[63.94vw] "
                    : "xl:w-[68.5vw] 2xl:w-[69.5vw] "
                }
                `}
              >
                <span className="hidden md:block">
                  {t("rooms.guarantee.heading.0")}
                </span>
                <span
                  className={`block md:hidden tracking-[-0.07em] ${
                    isEng ? " text-center " : " "
                  }`}
                >
                  {t("rooms.guarantee.headingMobile.0")}
                </span>
              </h1>

              <h1
                className={`font-cofo text-[8.33vw]  2xl:block sm:text-[42px] uppercase 2xl:text-[5.21vw]  md:font-cofo-medium lg:leading-[86%] 
               xl:text-[5.47vw]  tracking-[-0.07em]  2xl:tracking-[-0.04em] 2xl:text-center  2xl:self-start  
               ${
                 isEng
                   ? "2xl:w-[66.5vw] xl:w-[78.7vw] "
                   : "2xl:w-[59.9vw] xl:w-[85.94vw] "
               }
               `}
              >
                <span className="hidden md:block">
                  {t("rooms.guarantee.heading.1")}
                </span>
                <span
                  className={`block md:hidden leading-[91%] ${
                    isEng ? "text-center " : " "
                  }`}
                >
                  {t("rooms.guarantee.headingMobile.1")}
                </span>
              </h1>

              <h1
                className={`font-cofo leading-[91%] md:font-cofo-medium text-[8.33vw] block md:hidden sm:text-[42px] uppercase 2xl:text-[5.21vw] tracking-[-0.07em] 2xl:tracking-[-0.04em] 2xl:text-center 2xl:w-[59.9vw]   md:self-center ${
                  isEng ? "text-center " : " self-start"
                }`}
              >
                {t("rooms.guarantee.headingMobile.2")}
              </h1>
            </div>
          </div>
        </div>

        <div className="relative grid md:grid-cols-[56.88%_44.12%]   grid-cols-[1fr] 2xl:justify-normal xl:justify-center justify-center w-full ">
          <div className="  border-[#C7C7C7] 2xl:border-0 px-[14px] md:px-0">
            <img
              src={eurohotel}
              alt="eurohotel"
              className="w-full h-full object-cover 2xl:object-[90%_50%] "
            />
          </div>
          <div className=" 2xl:ps-[4.69vw] xl:ps-[3.75vw] lg:ps-[2.75vw] px-[14px] 2xl:border-x-0 border-[#C7C7C7] 2xl:mb-[5vw] xl:mb-[70px] mb-[0px] flex flex-col justify-center  h-full">
            <div className="flex flex-col 2xl:items-start xl:items-start items-start xl:w-[90%]   h-full ">
              <h1 className=" uppercase text-[#8C331B] font-cofo-medium 2xl:text-[1.67vw] xl:text-[1.88vw] mt-[45px] md:mt-[0px] lg:text-[20px] text-[4.27vw] leading-[110%]  w-[80%] md:w-full  order-2 md:order-1">
                {t("rooms.guarantee.imgHeading")}
              </h1>

              <ol
                className={`lg:mt-[29px] uppercase xl:space-y-5 lg:space-y-3 space-y-3 2xl:text-[1.04vw] xl:text-[1.09vw]
               text-[3.2vw] lg:text-[12px]  w-[96%] 2xl:p-0 lg:pt-0 pt-[24px] order-3 md:order-2
               ${
                 isEng
                   ? "2xl:w-[26.67vw] xl:w-[29.38vw] lg:w-[38.38vw] tracking-[-0.04em] "
                   : "2xl:w-[31.67vw] xl:w-[32.38vw] lg:w-[38.38vw] tracking-[-0.04em] "
               }
               `}
              >
                <li className="flex ">
                  <p>1.&nbsp; </p>
                  {t("rooms.guarantee.list.0")}
                </li>
                <li className="flex">
                  <p>2.&nbsp; </p>
                  {t("rooms.guarantee.list.1")}
                </li>
                <li className="flex">
                  <p>3.&nbsp; </p>
                  {t("rooms.guarantee.list.2")}
                </li>
              </ol>

              <Link
                to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
                className="uppercase bg-[#8C331B] text-[#FFFFFF] lg:mt-[32px] lg:w-[234px] 2xl:w-[12.19vw] flex items-center justify-center 2xl:h-[2.4vw] self-start 2xl:px-0 xl:px-4 px-[23px] 2xl:py-3 xl:py-2.5 py-[11px] rounded-3xl 
                font-cofo-medium 2xl:text-[0.83vw] xl:text-sm text-[12px]  mt-[24px]  hover:cursor-pointer order-3  "
              >
                {t("buttons.bookRoomArr.0")}
                <span className="xl:inline hidden font-cofo-medium">
                  {t("buttons.bookRoomArr.1")}
                </span>
              </Link>

              <div className="order-1 md:order-4  md:mt-auto mt-[15px] w-full">
                <h1
                  className={`uppercase text-[#242425] 2xl:text-[5.21vw] xl:text-[70px] text-[8.53vw] 2xl:leading-[94%] 
                   lg:text-[5.27vw] leading-[91%] 2xl:tracking-[-0.04em] tracking-[-0.07em] 2xl:w-[35.47vw] xl:w-[500px] md:font-cofo-medium
                   ${
                     isEng
                       ? "mx-auto text-center md:text-left 2xl:mb-[1.56vw] xl:mb-[1vw]"
                       : " "
                   }`}
                >
                  {t("rooms.guarantee.onOurSite")}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" grid 2xl:grid-cols-[1718px] xl:grid-cols-[1200px] lg:grid-cols-[900px] grid-cols-[332px]  justify-center items-center 2xl:h-[196px] xl:h-[120px] h-[64px]"></div>
      </div>
    </div>
  );
};
