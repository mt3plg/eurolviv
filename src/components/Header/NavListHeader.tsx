import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import { buildLocalizedPath, stripLocalePrefix } from "@/utils/localeRouting";


type NavListHeaderToProps = {
  path: string;
  title: string;
  setMenuOpen?: (value: boolean) => void;
  isScrolled?: boolean;
  onItemClick?: (path: string) => boolean;
};

export const NavListHeader = ({
  path,
  title,
  setMenuOpen,
  isScrolled,
  onItemClick,
}: NavListHeaderToProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const localizedPath = buildLocalizedPath(path, i18n.language === "en" ? "en" : "uk");


  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onItemClick && onItemClick(path)) {
      e.preventDefault();
    }
    
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <Link
      to={localizedPath}
      className={cn(
        "block md:px-[18px] text-[12px]  lg:py-3 py-0 text-[#6B6B6B] md:backdrop-blur-[54.5px] pe-[40px]  md:bg-white/26   md:text-white hover:bg-[#C7C7C7] lg:font-cofo-medium md:transition-colors md:whitespace-nowrap text-left",
        "border-b border-[#FFFFFF33] last:border-b-0",
        "text-[#6B6B6B] md:text-[#FFFFFF] md:hover:text-[#252526]",
        isScrolled || stripLocalePrefix(location.pathname) === '/contacts' && "text-black!"
      )}
      onClick={handleClick}
    >
      <span className=" uppercase lg:text-[16px] text-[12px] ">{t(title)}</span>
    </Link>
  );
};
