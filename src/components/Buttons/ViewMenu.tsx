import cn from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildLocalizedPath } from "@/utils/localeRouting";

type ViewMenuButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const ViewMenuButton = ({className, children, onClick}: ViewMenuButtonProps) => {
  const { i18n } = useTranslation();
  const getHeaderHeight = (): number => {
    const width = window.innerWidth;
    
    if (width >= 1536) { 
      return width * 0.0693; 
    } else if (width >= 1024) { 
      return width * 0.0908; 
    } else {
      return width * 0.2533; 
    }
  };

  const handleScrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuElement = document.getElementById("menu");
    
    if (menuElement) {
      const headerHeight = getHeaderHeight();
      const offset = 20;
      const elementPosition = menuElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - headerHeight - offset,
        behavior: "smooth"
      });
    }
    
    if (onClick) onClick();
  };

  return (
    <Link 
      to={`${buildLocalizedPath("/conference-service", i18n.language === "en" ? "en" : "uk")}#menu`}
      onClick={handleScrollToMenu}
      className={cn("uppercase text-center font-cofo-medium text-[#EDE8E5] text-[12px] border flex items-center lg:py-[0px] lg:w-[204px] py-[8.5px] lg:text-[14px] border-[#EDE8E5] justify-center lg:text-[#8C331B] lg:border-[#8C331B] rounded-full font-cofo-medium hover:text-[white] hover:bg-[#8C331B] transition", className)}
    >
      {children}
    </Link>
  );
}