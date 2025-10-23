import { useTranslation } from "react-i18next";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { headerRestaurant } from "@/store/exportsImg";
import { HeaderButtons } from "@/components/Buttons/Ruff/HeaderButtons";
export const RestaurantHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full lg:h-[1157px] h-[808px] flex items-center justify-center flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-[#252526] via-transparent to-[#25252600] z-[-9]"></div>
      <div className="absolute inset-0 bg-[#25252659] z-[-9]"></div>
      <InViewWrapper>
        <img
          src={headerRestaurant}
          alt="headerImg"
          className="lg:h-[1157px] absolute inset-0 w-full h-full object-cover  z-[-10]"
        />
      </InViewWrapper>
      <div className="flex flex-col items-center relative">
        <h4 className="absolute text-[#FFFFFF] md:-translate-y-10 -translate-y-7 leading-[22.68px] font-semibold underline text-sm decoration-transparent items-center xl:mb-4 lg:mb-6 md:mb-1">
          <span className="font-blessed  block text-center text-[13px] lg:text-[28px] xl:text-[36px] lg:text-2xl md:text-xl ml-2 xl:inline ">
            {t("restaurant.header.title")}
          </span>
        </h4>

        <h1 className="uppercase xl:text-[357px] lg:text-[238px] md:text-[208px]  text-[96px]  font-normal text-[#FFFFFF] xl:leading-[80%] md:leading-[60%] leading-[70%] tracking-[-0.1em] text-center underline decoration-transparent">
        ROOF
        </h1>

        <h4 className="text-[14px] xl:text-[18px] lg:text-[16px] leading-[104%]  w-fit text-white  text-center uppercase md:mt-7  xl:mt-4 mt-3">
          {t("restaurant.header.desc")}
        </h4>
        <HeaderButtons />
      </div>
    </div>
  );
};
