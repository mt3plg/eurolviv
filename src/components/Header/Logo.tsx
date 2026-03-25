import { Link } from "react-router-dom";
import cn from "classnames";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import { RoofWordmark } from "@/components/common/RoofWordmark";
import { buildLocalizedPath } from "@/utils/localeRouting";
import { useTranslation } from "react-i18next";
type LogoProps = {
  logo: string;
  iconLogoStyle: string;
  className?: string;
  isMobile?: boolean;
  iconClassName?: string;
  onClick?: () => void;
  pathname: string;
};

export const Logo = ({
  logo,
  iconLogoStyle,
  className,
  iconClassName,
  isMobile,
  onClick,
  pathname,
}: LogoProps) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en" : "uk";
  const isRestaurant = pathname === "/terrace" || pathname === "/restaurant";
  const isRoofRestaurant = pathname === "/restaurant";
  return (
    <Link
      to={buildLocalizedPath("/", locale)}
      className={cn(
        " items-center justify-center flex w-[33vw] h-full  2xl:w-fit xl:w-[110px] lg:w-[80px]   lg:ms-0",
        className,
        {
          " xl:me-[3vw] 2xl:me-[3.02vw]": isRestaurant,
          "2xl:me-[1.93vw] xl:me-[2vw] lg:me-[1.17vw]": !isRestaurant,
        }
      )}
      onClick={onClick}
    >
      <InViewWrapper>
        {isRoofRestaurant ? (
          <RoofWordmark
            className={cn(
              "text-[#252526]",
              iconLogoStyle,
              "text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]"
            )}
          />
        ) : (
          <img
            src={logo}
            alt="logo"
            className={cn(
              "duration-300",
              {
                [`${iconLogoStyle} w-[18.13vw] h-[10.67vw] xl:w-[7.81vw] 2xl:h-[4.3vw] 2xl:w-[8vw]  xl:h-[5.47vw] lg:w-[100px] lg:h-[60px] md:w-[80px] md:h-[48px]`]:
                  !isMobile,
                "w-[99px] h-[54px] filter invert": isMobile,
                "2xl:h-[91px]": pathname === "/terrace",
              },
              iconClassName
            )}
          />
        )}
      </InViewWrapper>
    </Link>
  );
};
