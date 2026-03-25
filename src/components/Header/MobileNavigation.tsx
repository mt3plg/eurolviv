import cn from "classnames";
import { NavLinks } from "@/components/Header/NavLinks";
import { ChangeLangButton } from "@/components/Header/ChangeLangButton";
import { Room } from "@/types/types";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/Header/Logo";
import { IoClose } from "react-icons/io5";
import { BookLink } from "@/components/Buttons/BookLink";
import { SocialIcons } from "@/components/Header/SocialIcons";
import { useEffect } from "react";
import logoSideBar from "@/assets/logo.svg";
import { buildLocalizedPath } from "@/utils/localeRouting";


type MobileNavigationProps = {
  menuOpen: boolean;
  scrolled: boolean;
  navLinks: Array<{ path: string; label: string }>;
  isActiveLink: (path: string) => string;
  handleMouseEnterRooms: () => void;
  handleMouseLeaveRooms: () => void;
  isShowRooms: boolean;
  rooms: Room[];
  setMenuOpen: (value: boolean) => void;
  changeLanguage: () => void;
  handleMouseEnterRestaurant: () => void;
  handleMouseLeaveRestaurant: () => void;
  isShowRestaurant: boolean;
  pathname: string;
};

export const MobileNavigation = ({
  menuOpen,
  scrolled,
  navLinks,
  isActiveLink,
  handleMouseEnterRooms,
  handleMouseLeaveRooms,
  isShowRooms,
  setMenuOpen,
  changeLanguage,
  handleMouseEnterRestaurant,
  handleMouseLeaveRestaurant,
  isShowRestaurant,
  pathname
}: MobileNavigationProps) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={cn(
        `fixed top-0 left-0 h-full bg-white flex flex-col z-50 xl:hidden overflow-y-scroll  
         w-[77.867vw] sm:w-[320px] transition-transform duration-300 ease-in-out`,
        menuOpen ? "transform-none" : "transform -translate-x-full"
      )}
    >
      <div className="w-full flex flex-col  px-[21px_27px] justify-between mt-[51px] h-full">
        <div>
          <div className="mb-[30px] flex items-center justify-between ">
            <Logo
              logo={logoSideBar}
              iconLogoStyle={''}
              className="w-full self-start justify-start "
              iconClassName="w-[99px] h-[54px]"
              isMobile={true}
              onClick={() => setMenuOpen(false)}
              pathname={pathname}
            />
            <IoClose
              size={32}
              color="#C7C7C7"
              onClick={() => setMenuOpen(false)}

              className="cursor-pointer"
            />
          </div>

          <div className="mb-[33px]">
            <ChangeLangButton
              scrolled={scrolled}
              changeLanguage={changeLanguage}
              isMobile={true}
            />
          </div>

          <div className="w-full flex flex-col items-start gap-[8px] ">
            <NavLinks
              scrolled={scrolled}
              navLinks={navLinks}
              isActiveLink={isActiveLink}
              handleMouseEnterRooms={handleMouseEnterRooms}
              handleMouseLeaveRooms={handleMouseLeaveRooms}
              isShowRooms={isShowRooms}
              setMenuOpen={setMenuOpen}
              handleMouseEnterRestaurant={handleMouseEnterRestaurant}
              handleMouseLeaveRestaurant={handleMouseLeaveRestaurant}
              isShowRestaurant={isShowRestaurant}
              isMobile={true}
            />

            <BookLink
              to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
              className="w-[107px] text-center  bg-[#A47762] text-white uppercase font-cofo-medium text-[10px]! h-[30px] flex items-center justify-center px-[6.25px] py-[6px] mt-[22px] "
              onClick={() => setMenuOpen(false)}
            >
              {t("buttons.book")}
            </BookLink>
          </div>
        </div>

        <div className="mt-[30px]">
          <div className="w-full flex flex-col items-start space-y-7">
            <div>
              <h4 className="text-[12px]  font-cofo-medium text-[#252526] uppercase ">
                {t("footer.reception")}
              </h4>
              <a href="tel:+380732424002" className="text-[12px] text-[#8F8F8F] uppercase mt-1 mb-[14px]">
                {t("contacts.info.receptionPhone")}
              </a>
              <p className="text-[#252526] text-sm underline underline-offset-4 " style={{textDecorationThickness: '1px'}}>+38 (073) 242 40 02</p>
            </div>

              <SocialIcons type="hotel"  />
          </div>

          <div className="mb-[40px]">
            <div className="space-y-[10px]">
              <h4 className="text-[12px]  font-cofo-medium text-[#252526] uppercase mt-[44px]">
                {t("home.roofService.restaurant.title")}/{t("terrase.header.title2")}
              </h4>
             
              <a href="tel:+380933483114" className="text-[#252526] text-sm underline underline-offset-4 " style={{textDecorationThickness: '1px'}}>+38 (093) 348 31 14</a>
            </div>

            <SocialIcons type="restaurant" className="mt-[30px]" isBottomColor={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};
