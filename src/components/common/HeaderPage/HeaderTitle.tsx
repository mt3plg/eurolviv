import { HeaderTitleProps } from "@/types/headerTypes";
import cn from "classnames";
import { useLocation } from "react-router-dom";

export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  textColor = "white",
}) => {
  const location = useLocation();
  const isBiggerText = location.pathname === "/contacts" || location.pathname === "/rooms";
  const isConferencePage =
    title.toLowerCase().includes("conference") ||
    title.toLowerCase().includes("конференц");
  const titleParts = title.split("-");

  const baseClasses = `uppercase z-20 text-center underline decoration-transparent ${
    textColor === "white" ? "text-white" : "text-black"
  }`;

  if (isConferencePage && titleParts.length > 1) {
    return (
      <h1
        className={
          `${baseClasses} 2xl:text-[10.31vw] xl:text-[11.72vw] lg:text-[100px] md:text-[80px] flex flex-col text-[48px]  xl:leading-[154.83px] leading-[80%] 2xl:leading-[80%] tracking-[-0.1em] pt-[12px] gap-0 `
        }
      >
        <span className="block ">{titleParts[0]}-</span>
        <span className="block ">{titleParts.slice(1).join(" ")}</span>
      </h1>
    );
  }

  return (
    <h1
      className={cn(`${baseClasses} 2xl:text-[10.31vw] xl:text-[11.72vw] lg:text-[120px] md:text-[100px] sm:text-[80px]  [font-display:swap] 2xl:pt-[1.09vw]  
        ${isBiggerText ? "text-[17.07vw]" : "text-[48px]"} 
        [text-wrap:balance] w-[90%] leading-[77%] tracking-[-0.1em]`)}
    >
      {title}
    </h1>
  );
};
