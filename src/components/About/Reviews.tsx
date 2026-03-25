import { useRef } from "react";
import ReviewSlider from "@/components/About/ReviewSlider";
import Slider from "react-slick";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

import { useTranslation } from "react-i18next";
import { usePagesInfoStore } from "@/store/usePagesInfoStore";
import { Link } from "react-router-dom";
import cn from "classnames";
import { buildLocalizedPath } from "@/utils/localeRouting";
export const Rewies = () => {
  const sliderRef = useRef<Slider | null>(null);
  const { t, i18n } = useTranslation();
  const { reviews } = usePagesInfoStore();
  const isEng = i18n.language === "en";

  return (
    <section className="bg-[#A47762] flex-col   flex justify-center items-center  ">
      <div className="flex flex-col items-center border-x border-[#C7C7C7]  overflow-x-hidden xl:px-0 w-[89.68%] ">
        <div className="grid xl:grid-cols-2 grid-cols-1 overflow-hidden  w-full lg:pe-4">
          <div className="xl:col-span-1 pt-[58px] xl:pt-[109px] flex flex-col">
            <h1 className="text-center font-cofo    uppercase tracking-[-0.09em] text-[#EDE8E5]  leading-[81%] ">
              <span className="xl:hidden block text-[8.533vw] lg:text-[80px] leading-[100%] xl:leading-[96%]">
                {!isEng ? t("reviews.title") : t("reviews.review")}
                {!isEng && t("reviews.heading")}
              </span>
              <span className="hidden xl:block text-[8.533vw]  xl:text-[11.719vw] text-start md:ps-[25px] xl:ps-[1.5vw] 2xl:ps-[1.302vw] tracking-[-0.09em] leading-[91%] 2xl:text-[10.313vw]">
                {t("reviews.title")}
              </span>
              <span className="xl:hidden block lg:text-[80px] xl:translate-y-[-10px] text-[8.533vw] leading-[100%] xl:leading-[96%]">
                {t("reviews.heading2")}
              </span>
            </h1>
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-[24px]  text-start xl:translate-y-[-10px]  items-center xl:mt-[38px] mt-[15px] ">
              <p
                className={`uppercase  text-[3.2vw] sm:text-sm md:text-lg 2xl:text-[0.84vw] xl:text-[0.9vw] text-[#E9E9E9]  w-[78.133vw]
                   2xl:ps-[2.031vw] xl:ps-[2.302vw] text-center xl:text-left ${isEng ? "xl:w-[65%] 2xl:w-[55%]" : "2xl:w-[24.688vw] xl:w-[61%]"}`}
              >
                {t("reviews.desc")}
              </p>

              <Link
                to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
                className="uppercase text-[#A47762] lg:text-[14px] lg:w-[234px]  text-center  mt-[20px] lg:mt-0 xl:w-[234px]! xl:text-[1.094vw] 2xl:text-[0.833vw]
                font-cofo-medium whitespace-nowrap bg-[#EDE8E5] border-[#EDE8E5] border hover:bg-[#A47762] hover:text-[#EDE8E5] 
                w-[45.867vw]   xl:py-[10px] py-[10px]  rounded-full  hover:cursor-pointer text-[3.2vw] "
              >
                {t("buttons.bookRoom")}
              </Link>
            </div>
          </div>

          <div className="xl:col-span-1 xl:flex flex-col justify-center items-center hidden">
            <h2 className="uppercase text-5xl md:text-[80px] xl:text-[5.625vw] 2xl:text-[5.208vw]   xl:tracking-[-0.09em] text-[#EDE8E5] flex flex-col leading-[81%]">
              <span
                className={cn(
                  `relative left-[-30px] leading-[81%] md:left-[-70px] xl:left-[-2.344vw] 2xl:left-[-1.563vw]`,
                  {
                    hidden: isEng,
                  }
                )}
              >
                {t("reviews.heading")}
              </span>
              <span className={`relative left-[30px] leading-[81%]  md:left-[70px] xl:left-[10.547vw] 2xl:left-[10.156vw] ${isEng ? "2xl:translate-y-[1.56vw] xl:translate-y-[2.8vw]" : ""}`}>
                {t("reviews.reviewAbout")}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="relative w-full  flex flex-col items-center h-[133.333vw] md:h-[470px] xl:h-[25.9vw] 2xl:h-[24.3vw] lg:h-[400px]  overflow-x-hidden overflow-y-hidden">
        <div className="absolute  w-[89.68%] border-x border-[#C7C7C7] h-[700px] lg:h-[400px] xl:h-[700px]  overflow-y-hidden"></div>

        <div className="absolute inset-0 flex justify-center mt-[7.667vw] xl:mt-[4.271vw]">
          <div className="relative w-[80.79%] md:w-[85.79%] h-full ">
            <ReviewSlider reviews={reviews} ref={sliderRef} />
          </div>
        </div>
      </div>

      <div className="flex max-w-[89.7%] w-screen  border-x border-[#C7C7C7]  justify-between pt-5 2xl:pt-[1.04vw] z-10">
        <button
          className="lg:w-[48px] 2xl:w-[3.13vw] 2xl:h-[3.13vw] lg:h-[48px] w-[36px] h-[36px] md:ms-20 sm:ms-20 ms-5  flex items-center justify-center hover:text-[#8C331B] border
           hover:border-[#8C331B] rounded-full z-20 hover:bg-white text-white mt-[26px]  mb-[44px] lg:ms-[1.56vw] lg:mt-2 lg:mb-[72px]"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <CgArrowLeft className="lg:w-[32px] lg:h-[32px] w-[24px] h-[24px]" />
        </button>

        <button
          className="lg:w-[48px] 2xl:w-[3.13vw] 2xl:h-[3.13vw] lg:h-[48px] w-[36px] h-[36px] md:me-20 sm:me-20 me-5 flex items-center justify-center hover:text-[#8C331B] border 
          hover:border-[#8C331B] rounded-full z-20 bg-white text-[#A47762] mt-[26px]  mb-[44px] lg:mb-[72px] lg:mt-2 lg:me-[39px]"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <CgArrowRight className="lg:w-[32px] lg:h-[32px] w-[24px] h-[24px]" />
        </button>
      </div>
    </section>
  );
};
