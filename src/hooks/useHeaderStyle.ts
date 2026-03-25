import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { stripLocalePrefix } from "@/utils/localeRouting";

import ruffLogo from "@/assets/ruffLogo.svg";
import defaultLogo from "@/assets/logo.svg";
import terraseLogo from "@/assets/terraseLogo.svg";

const useNavbarStyles = () => {
  const location = useLocation();
  const normalizedPathname = stripLocalePrefix(location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [isShowRooms, setIsShowRooms] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function isActiveLink(path: string) {
    const isActive = normalizedPathname === path;

    if (normalizedPathname === "/contacts") {
      return isActive
        ? "text-[#252526] "
        : "text-[#252526]/62 hover:text-[#252526]";
    }

    if (isActive) {
      return scrolled ? "text-[#252526]" : "text-[#FFFFFF]";
    } else {
      return scrolled
        ? "text-[#252526]/62 hover:text-[#252526]"
        : "text-[#FFFFFF]/62 hover:text-[#FFFFFF]";
    }
  }

  const { styles, iconLogoStyle, rightMenu, logo } = useMemo(() => {
    let logo = defaultLogo;
    let iconLogoStyle = scrolled ? "filter invert" : "";
    let rightMenu = scrolled
      ? "text-[#252526]"
      : "text-[#FFFFFF]/62 hover:text-[#FFFFFF]";
    let styles = scrolled
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
      styles = scrolled ? "bg-[#252526] text-white" : "bg-white text-[#8C331B]";
      iconLogoStyle = scrolled ? "" : "invert";
      rightMenu = scrolled ? "text-[#252526]/62" : "text-[#FFFFFF]";
    } else if (normalizedPathname === "/contacts") {
      styles = scrolled ? "bg-[#252526] text-white" : "bg-[#8C331B] text-white";
      iconLogoStyle = "filter invert";
      rightMenu = scrolled ? "text-[#252526]/62" : "text-[#252526]";
    }

    return { styles, iconLogoStyle, rightMenu, logo };
  }, [normalizedPathname, scrolled]);

  return {
    styles,
    iconLogoStyle,
    logo,
    rightMenu,
    scrolled,
    isShowRooms,
    setIsShowRooms,
    isActiveLink,
    pathname: normalizedPathname,
  };
};

export default useNavbarStyles;
