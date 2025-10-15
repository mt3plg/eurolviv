import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { Room } from "@/types/types";
import { Logo } from "@/components/Header/Logo";
import {
  MobileMenuButton,
  MobileBookingButton,
} from "@/components/Header/MobileMenu";
import { DesktopNavigation } from "@/components/Header/DesktopNavigation";
import { MobileNavigation } from "@/components/Header/MobileNavigation";
import { navLinks, navLinksMobile } from "@/Constants/Header";

type HeaderNavProps = {
  scrolled: boolean;
  logo: string;
  iconLogoStyle: string;
  pathname: string;
  isActiveLink: (path: string) => string;
  setIsShowRooms: Dispatch<SetStateAction<boolean>>;
  rightMenu: string;
  changeLanguage: () => void;
  rooms: Room[];
  isShowRooms: boolean;
};

export const HeaderNav = memo(
  ({
    scrolled,
    pathname,
    logo,
    iconLogoStyle,
    setIsShowRooms,
    isActiveLink,
    changeLanguage,
    rooms,
    isShowRooms,
  }: HeaderNavProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isShowRestaurant, setIsShowRestaurant] = useState(false);
    const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

    const handleMouseEnterRooms = useCallback(() => {
      setIsShowRooms(true);
      setIsShowRestaurant(false);
    }, [setIsShowRooms]);

    const handleMouseLeaveRooms = useCallback(() => {
      setIsShowRooms(false);
    }, [setIsShowRooms]);

    const handleMouseEnterRestaurant = useCallback(() => {
      setIsShowRestaurant(true);
      setIsShowRooms(false);
    }, [setIsShowRooms]);

    const handleMouseLeaveRestaurant = useCallback(() => {
      setIsShowRestaurant(false);
    }, []);

    return (
      <div className="flex relative justify-between  me-0 h-full w-full lg:w-auto">
        <div className="flex lg:justify-between justify-center w-full  ">
          <MobileMenuButton
            toggleMenu={toggleMenu}
            scrolled={scrolled}
            pathname={pathname}
            isActiveLink={isActiveLink}
          />

          <Logo logo={logo} iconLogoStyle={iconLogoStyle} pathname={pathname} />

          <MobileBookingButton
            scrolled={scrolled}
            pathname={pathname}
            changeLanguage={changeLanguage}
          />

          <DesktopNavigation
            navLinks={navLinks}
            isActiveLink={isActiveLink}
            handleMouseEnterRooms={handleMouseEnterRooms}
            handleMouseLeaveRooms={handleMouseLeaveRooms}
            isShowRooms={isShowRooms}
            setMenuOpen={setMenuOpen}
            scrolled={scrolled}
            setIsShowRooms={setIsShowRooms}
            handleMouseEnterRestaurant={handleMouseEnterRestaurant}
            handleMouseLeaveRestaurant={handleMouseLeaveRestaurant}
            isShowRestaurant={isShowRestaurant}
            setIsShowRestaurant={setIsShowRestaurant}
          />
        </div>

        <MobileNavigation
          menuOpen={menuOpen}
          scrolled={scrolled}
          navLinks={navLinksMobile}
          isActiveLink={isActiveLink}
          handleMouseEnterRooms={handleMouseEnterRooms}
          handleMouseLeaveRooms={handleMouseLeaveRooms}
          isShowRooms={isShowRooms}
          rooms={rooms}
          setMenuOpen={setMenuOpen}
          changeLanguage={changeLanguage}
          handleMouseEnterRestaurant={handleMouseEnterRestaurant}
          handleMouseLeaveRestaurant={handleMouseLeaveRestaurant}
          isShowRestaurant={isShowRestaurant}
          pathname={pathname}
        />
      </div>
    );
  }
);
