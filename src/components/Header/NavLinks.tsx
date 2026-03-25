import { Link } from "react-router-dom";
import { useCallback, } from "react";
import cn from "classnames";
import { IoIosArrowDown } from "react-icons/io";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import { renderDropdownMenu } from "@/components/utils/renderDropdownMenu";
import { useTranslation } from "react-i18next";
import { roomsLinksToRender, restaurantLinks } from "@/Constants/Header";
import { buildLocalizedPath, stripLocalePrefix } from "@/utils/localeRouting";

type NavLinksProps = {
  navLinks: Array<{ path: string; label: string }>;
  isActiveLink: (path: string) => string;
  handleMouseEnterRooms: () => void;
  handleMouseLeaveRooms: () => void;
  isShowRooms: boolean;
  setMenuOpen: (value: boolean) => void;
  handleMouseEnterRestaurant?: () => void;
  handleMouseLeaveRestaurant?: () => void;
  isShowRestaurant?: boolean;
  isMobile?: boolean;
  scrolled: boolean;
};



export const NavLinks = ({
  navLinks,
  isActiveLink,
  handleMouseEnterRooms,
  handleMouseLeaveRooms,
  isShowRooms,
  scrolled,
  setMenuOpen,
  handleMouseEnterRestaurant,
  handleMouseLeaveRestaurant,
  isShowRestaurant = false,
  isMobile = false,
}: NavLinksProps) => {
  const { t, i18n } = useTranslation();
  



  const { toggleHandle } = useDropdownMenu({
    isShowRooms,
    isShowRestaurant,
    handleMouseEnterRooms,
    handleMouseLeaveRooms,
    handleMouseEnterRestaurant,
    handleMouseLeaveRestaurant,
  });

  const getHeaderHeight = useCallback((): number => {
    const width = window.innerWidth;
    
    if (width >= 1536) { 
      return width * 0.0693; 
    } else if (width >= 1024) { 
      return width * 0.0908; 
    } else {
      return width * 0.2533; 
    }
  }, []);

  const handleSmoothScroll = useCallback((path: string) => {
    if (path.includes('#')) {
      const [pathPart, hashPart] = path.split('#');
      
      if (stripLocalePrefix(window.location.pathname) === pathPart || pathPart === '') {
        const element = document.getElementById(hashPart);
        if (element) {
          const headerHeight = getHeaderHeight();
          const offset = 20;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementPosition - headerHeight - offset,
            behavior: 'smooth'
          });
          
          return true;
        }
      }
    }
    return false;
  }, [getHeaderHeight]);

  const renderNavLinks = useCallback(() => {
    return navLinks.map(({ path, label }) => {
  

      const isDropdown = path === "/rooms" || path === "/restaurant";
      const localizedPath = buildLocalizedPath(path, i18n.language === "en" ? "en" : "uk");

      return (
        <div
          key={path}
          className="relative"
          onMouseEnter={
            !isMobile && path === "/rooms"
              ? handleMouseEnterRooms
              : !isMobile && path === "/restaurant"
              ? handleMouseEnterRestaurant
              : undefined
          }
          onMouseLeave={
            !isMobile && path === "/rooms"
              ? handleMouseLeaveRooms
              : !isMobile && path === "/restaurant"
              ? handleMouseLeaveRestaurant
              : undefined
          }
        >
          <div className="flex items-center">
            <Link
              to={localizedPath}
              className={cn(
                "uppercase 2xl:text-[0.83vw] xl:text-[0.94vw] smooth-scroll lg:text-[1.17vw] text-[14px] transition-colors md:font-cofo-medium whitespace-nowrap",
                !isMobile && isActiveLink(path),
                isMobile && "xl:text-inherit text-[#252526]"
              )}
              onClick={(e) => {
                if (handleSmoothScroll(path)) {
                  e.preventDefault();
                }
                setMenuOpen(false);
                if (!isDropdown) {
                  setMenuOpen(false);
                }
              }}
            >
              {t(label)}
            </Link>
            {isMobile && isDropdown && (
              <button onClick={() => toggleHandle(path)} className="ml-2">
                <IoIosArrowDown
                  color="black"
                  className={cn(
                    "transition-transform",
                    (path === "/rooms" && isShowRooms) ||
                      (path === "/restaurant" && isShowRestaurant)
                      ? "rotate-180"
                      : ""
                  )}
                />
              </button>
            )}
          </div>

          {path === "/rooms" &&
            renderDropdownMenu({
              items: roomsLinksToRender,
              isVisible: isShowRooms,
              isMobile,
              isScrolled: scrolled,
              setMenuOpen,
              onItemClick: handleSmoothScroll
            })}
          {path === "/restaurant" &&
            renderDropdownMenu({
              items: restaurantLinks,
              isVisible: isShowRestaurant,
              isMobile,
              setMenuOpen,
              isScrolled: scrolled,
              onItemClick: handleSmoothScroll
            })}
        </div>
      );
    });
  }, [t, i18n.language, navLinks, isMobile, handleMouseEnterRooms, handleMouseEnterRestaurant, handleMouseLeaveRooms, handleMouseLeaveRestaurant, isActiveLink, isShowRooms, isShowRestaurant, scrolled, setMenuOpen, toggleHandle, handleSmoothScroll]);

  return <>{renderNavLinks()}</>;
};
