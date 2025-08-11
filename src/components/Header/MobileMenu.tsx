import { useTranslation } from "react-i18next";
import cn from "classnames";
import burgerMenu from "@/assets/icons/burgerMenu.svg";
import { Link } from "react-router-dom";
import { ChangeLangButton } from "@/components/Header/ChangeLangButton";
import { links } from "@/Constants/Links";
  
type MobileMenuButtonProps = {
  toggleMenu: () => void;
  scrolled: boolean;
  pathname: string;
  isActiveLink: (path: string) => string;
};

export const MobileMenuButton = ({
  toggleMenu,
  scrolled,
  pathname,
  isActiveLink,
}: MobileMenuButtonProps) => {
  const { t } = useTranslation();

  return (
    <div className="lg:hidden w-[33vw] items-center justify-center flex">
      <button
        className={cn(
          ` text-white text-2xl flex items-center gap-2 w-full ms-[6.4vw]`
        )}
        onClick={toggleMenu}
      >
        <img
          src={burgerMenu}
          alt="menu"
          className={cn(
            pathname === "/contacts" || scrolled ? "filter-invert-gray" : ""
          )}
        />
        <span
          className={cn(`uppercase text-[12px] ${isActiveLink("/contacts")}`)}
        >
          {t("header.menu")}
        </span>
      </button>
    </div>
  );
};

type MobileBookingButtonProps = {
  scrolled: boolean;
  pathname: string;
  changeLanguage: () => void;
};

export const MobileBookingButton = ({
  scrolled,
  pathname,
  changeLanguage,
}: MobileBookingButtonProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-[33vw] lg:fit items-center justify-end lg:hidden flex pe-[5.4vw]">
      {pathname === "/" ? (
        <ChangeLangButton
          changeLanguage={changeLanguage}
          isMobile={false}
          scrolled={scrolled}
        />
      ) : (
        <Link
          to={pathname === "/terrace" || pathname === "/restaurant" ? links.bookTable : "/booking"}
          className={cn(
            ` bg-[#a33d2e] text-white px-2 py-1 lg:hidden uppercase rounded-3xl flex items-center justify-center hover:bg-[#922b1f] self-center
          font-cofo-medium text-[10px]  w-[107px] text-center h-[30px]`,
            {
              "text-white": !scrolled,
              "text-black": scrolled,
              "pointer-events-none lg:pointer-events-auto opacity-0 lg:opacity-100":
                !scrolled,
            }
          )}
          aria-disabled={!scrolled}
        >
          {t("buttons.bookRoomArr.0")}
          <span className="hidden lg:inline">{t("buttons.bookRoomArr.1")}</span>
        </Link>
      )}
    </div>
  );
};
