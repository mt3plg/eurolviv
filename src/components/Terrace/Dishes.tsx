import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperSlider } from "@/components/Terrace/Swiper";
import cn from "classnames";
import { Link } from "react-router-dom";
import { links } from "@/Constants/Links";
import { MENU_DOCUMENTS } from "@/Constants/MenuDocuments";
import { useIsEnglish } from "@/hooks/useIsEnglish";
export const Dishes = ({
  slides,
  content,
  sliderId,
}: {
  slides: string[];
  sliderId?: string;
  content: {  
    title: string;
    titleTwo?: string;
    desc: string;
    heading: string;
    button: string;
    isMenu?: boolean;
  };
}) => {
  const { t } = useTranslation();
  const isEng = useIsEnglish();

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden h-fit">
      <div
        className={`relative mx-auto w-[89.7%] lg:w-[93.23%] 2xl:w-[94%] border-x md:border-x-0 border-[#B3B3B3] ${
          content.isMenu ? "" : "lg:pb-[149px] pb-[59px]"
        }`}
      >
        <div
          className={`md:border-x border-[#B3B3B3] ${
            content.isMenu
              ? "xl:pt-[173px] lg:pt-[100px] pt-[94px]"
              : "xl:pt-[180px] lg:pt-[100px] pt-[56px]"
          }`}
        >
          <h4 className="font-cofo-medium text-[#252526] leading-[22.68px] justify-center flex  xl:mb-3 mb-1.75">
            <span className="font-blessed  text-center text-[16px] 2xl:text-[36px] xl:text-[28px]  lg:text-[20px] xl:inline xl:pt-4">
              {t(content.heading)}
            </span>
          </h4>
          <h2
            className={`text-center  uppercase leading-[81%]   tracking-[-0.09em] xl:text-[160px] 2xl:text-[233px] lg:text-[100px] ${
              content.isMenu ? "text-[17.07vw]" : "text-[8.53vw]"
            }`}
          >
            {t(content.title)}
          </h2>
          {content.titleTwo && (
            <h3
              className={`text-center  uppercase leading-[81%] xl:text-[48px]   tracking-[-0.09em] lg:text-[36px] text-[32px] lg:pt-[29px] lg:pb-[19px]`}
            >
              {t(content.titleTwo)}
            </h3>
          )}
          <p
            className={`text-center leading-[120%] uppercase  xl:text-[1.25vw] 2xl:text-[1.04vw] lg:text-[14px]
          text-[3.20vw] lg:pt-[18px] 2xl:pt-[0.94vw] pt-[22px] lg:pb-[30px] 2xl:pb-[1.56vw] pb-[22px]  mx-auto
          
          ${
            !isEng && content.isMenu
              ? " lg:w-[35%] 2xl:w-[30%] w-8/9 "
              : " "
          }
          ${
            !isEng && !content.isMenu
              ? "  lg:w-[45%] xl:w-[30%] 2xl:w-[25%] w-8/9 "
              : " "
          }
          ${
            isEng && content.isMenu
              ? "2xl:w-[35%]! xl:w-[40%]! w-[85%]! lg:w-[35%] "
              : ""
          }
          ${
            isEng && !content.isMenu
              ? "lg:w-[35%] 2xl:w-[25%]! xl:w-[30%]!  w-[65%]!"
              : ""
          }
          `}
          >
            {t(content.desc)}
          </p>
        </div>

        <div className="md:border-x border-[#B3B3B3]">
          <div
            className={cn(
              `flex justify-center ${
                content.isMenu
                  ? "2xl:pb-[10px] xl:pb-[10px] lg:pb-[30px]"
                  : " pb-[48px] lg:pb-[37px] 2xl:pb-[10px]"
              }`
            )}
          >
            {sliderId !== "celebration" ? (
              <Link
                to={links.menu}
                target="_blank"
                className={cn(
                  `uppercase  xl:text-[14px] 2xl:text-[0.73vw] text-center
          rounded-full lg:py-[10px] font-cofo-medium text-[12px] hover:cursor-pointer ${
            content.isMenu
              ? "xl:px-[0px] lg:w-[122px] 2xl:w-[6.35vw] xl:py-[10.5px] px-[32px] py-[10px] bg-[#8C331B]  text-[#FFFFFF] hover:bg-[white] hover:text-[#8C331B] border border-[#8C331B]"
              : "border-[#8C331B] hover:text-white border text-[#8C331B] px-[32px] py-[10px] xl:px-[25px] xl:py-[10.5px] hover:bg-[#8C331B] "
          },`,
                  {
                    "2xl:w-[175px]": isEng && content.isMenu,
                    "2xl:w-[122px]": !isEng && content.isMenu,
                  }
                )}
              >
                {t(content.button)}
              </Link>
            ) : (
              <button
                onClick={() => window.open(MENU_DOCUMENTS.banquet, "_blank")}
                className={`uppercase border-[#8C331B] hover:text-white border text-[#8C331B] 2xl:text-[0.73vw] w-[171px] h-[40px] rounded-full lg:py-[10px] font-cofo-medium text-[12px] hover:cursor-pointer 
                    ${isEng && content.isMenu ? "2xl:w-[122px] xl:w-[122px]" : "2xl:w-[175px] xl:w-[175px] "}`}
              >
                {t(content.button)}
              </button>
            )}
          </div>
        </div>

        <div className="absolute w-full h-[1000px] md:border-x overflow-y-hidden  border-[#B3B3B3] "></div>

        <SwiperSlider slides={slides} id={sliderId} />
      </div>
    </div>
  );
};
