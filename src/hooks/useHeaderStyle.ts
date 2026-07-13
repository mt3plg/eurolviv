import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { stripLocalePrefix } from "@/utils/localeRouting";

import ruffLogo from "@/assets/ruffLogo.svg";
import defaultLogo from "@/assets/logo.svg";
import terraseLogo from "@/assets/terraseLogo.svg";

const useNavbarStyles = () => {
  const location = useLocation();
  const normalizedPathname = stripLocalePrefix(location.pathname);
  const isSpecialOfferLanding = /^\/special-offers\/[^/]+$/.test(
    normalizedPathname
  );
  const isBlogPage =
    normalizedPathname === "/blog" ||
    /^\/blog\/[^/]+$/.test(normalizedPathname);
  const [scrolled, setScrolled] = useState(false);
  const [isShowRooms, setIsShowRooms] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeaderScrolled = scrolled || isSpecialOfferLanding || isBlogPage;

  function isActiveLink(path: string) {
    const isActive = normalizedPathname === path;

    if (normalizedPathname === "/contacts") {
      return isActive
        ? "text-[#252526] "
        : "text-[#252526]/62 hover:text-[#252526]";
    }

    if (isActive) {
      return isHeaderScrolled ? "text-[#252526]" : "text-[#FFFFFF]";
    }

    return isHeaderScrolled
      ? "text-[#252526]/62 hover:text-[#252526]"
      : "text-[#FFFFFF]/62 hover:text-[#FFFFFF]";
  }

  const { styles, iconLogoStyle, rightMenu, logo } = useMemo(() => {
    let logo = defaultLogo;
    let iconLogoStyle = isHeaderScrolled ? "filter invert" : "";
    let rightMenu = isHeaderScrolled
      ? "text-[#252526]"
      : "text-[#FFFFFF]/62 hover:text-[#FFFFFF]";
    let styles = isHeaderScrolled
      ? "bg-[#252526] text-white"
      : "bg-white text-[#8C331B]";

    if (
      normalizedPathname === "/restaurant" ||
      normalizedPathname === "/terrace"
    ) {
      if (normalizedPathname === "/terrace") {
        logo = terraseLogo;
      } else {
        logo = ruffLogo;
      }
      styles = isHeaderScrolled
        ? "bg-[#252526] text-white"
        : "bg-white text-[#8C331B]";
      iconLogoStyle = isHeaderScrolled ? "" : "invert";
      rightMenu = isHeaderScrolled ? "text-[#252526]/62" : "text-[#FFFFFF]";
    } else if (normalizedPathname === "/contacts") {
      styles = isHeaderScrolled
        ? "bg-[#252526] text-white"
        : "bg-[#8C331B] text-white";
      iconLogoStyle = "filter invert";
      rightMenu = isHeaderScrolled ? "text-[#252526]/62" : "text-[#252526]";
    }

    return { styles, iconLogoStyle, rightMenu, logo };
  }, [normalizedPathname, isHeaderScrolled]);

  return {
    styles,
    iconLogoStyle,
    logo,
    rightMenu,
    scrolled: isHeaderScrolled,
    isShowRooms,
    setIsShowRooms,
    isActiveLink,
    pathname: normalizedPathname,
  };
};

export default useNavbarStyles;
