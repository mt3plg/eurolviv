import { useTranslation } from "react-i18next";
import { BookLink } from "@/components/Buttons/BookLink";
import { HeaderActionsProps } from "@/types/headerTypes";
import { buildLocalizedPath } from "@/utils/localeRouting";

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  showBookButton,
  showOrderButton,
  showConferenceMenuButton,
  customButton,
  onOrderClick,
}) => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === "en" ? "en" : "uk";
  
  return (
    <div className="flex flex-col items-center  gap-1.75">
      {showBookButton && (
        <BookLink className="lg:px-[34.5px] 2xl:text-[0.73vw]  2xl:w-[10.63vw] 2xl:py-[13.5px] px-[19px] 2xl:mt-[43px] text-center py-[11px] w-[171px] text-[#252526] mt-[30px] bg-[#EDE8E5] lg:w-[204px]" to={buildLocalizedPath("/booking", locale)}>

          {t("buttons.book")}
        </BookLink>
      )}

      {showOrderButton && (
        <button
          onClick={onOrderClick}
          className="uppercase mt-[30px] w-[157px] lg:mt-[43px] bg-[#EDE8E5] lg:text-[14px] hover:text-[#EDE8E5] hover:bg-[#252526] text-[#252526]  md:px-[34.5px] md:py-[13.5px]
           px-[19px] py-[11px] rounded-full font-cofo-medium text-[12px] hover:cursor-pointer lg:w-[204px] "
        >
          {t("buttons.order")}
        </button>
      )}

      {showConferenceMenuButton && (
        <a href="#menuMobile" className="uppercase w-[157px] scroll-smooth hover:bg-[#EDE8E5] hover:text-[#252526] text-[#EDE8E5] border-[#EDE8E5] border md:px-[30.5px] md:py-[12.5px] lg:px-[25.5px] lg:py-[13.5px] px-[15px] py-[10px] rounded-full font-cofo-medium text-[12px] lg:hidden hover:cursor-pointer">
          {t("buttons.conferenceMenu")}
        </a>
      )}

      {customButton}
    </div>
  );
}; 