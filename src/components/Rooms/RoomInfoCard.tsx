import { Room } from "@/types/types";
import { square, guest } from "@/store/exportsIcons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { InViewWrapper } from "@/components/utils/InViewWrapper";
import cn from "classnames";
import { useIsEnglish } from "@/hooks/useIsEnglish";
type RoomInfoCard = {
  room: Room;
  length: number;
  index: number;
};

export const RoomInfoCard = ({ room, length, index }: RoomInfoCard) => {
  const isFirstInRow = index % 3 === 0;
  const isLastInRow = (index + 1) % 3 === 0;
  const { t } = useTranslation();
  const isEng = useIsEnglish();

  return (
    <div
      key={room.type}
      className={cn(`lg:border lg:border-s-0 border-[#C7C7C7]  border-x
        ${isFirstInRow ? "lg:ps-[20px] p-4 pb-0" : "p-4 pb-0"}  
        ${isLastInRow ? "lg:pe-[20px] lg:border-e-0 border-t" : "border-t"} 
        ${index < length - 3 ? "lg:border-b-0 border-t" : ""} 
        ${index % 2 === 0 ? " border-e" : ""}
        ${index === length - 1
          ? "md:col-span-2 md:border-e-0 lg:col-span-1 "
          : ""
        }
        lg:p-[15px] lg:pb-0`)}
    >
      <div className="">
        <div className="items-center flex justify-center">
          <InViewWrapper>
            <img
              src={room.header.previewImage}
              alt={room.title}
              className="2xl:w-[28.13vw] 2xl:h-[21.67vw] xl:w-[40.5vw] xl:h-[25vw] lg:w-[420px] lg:h-[250px] md:w-[360px]
               md:h-[280px] w-full  h-[232px]  object-cover"
            />
          </InViewWrapper>
        </div>
        <div
          className="flex justify-between mx-auto 2xl:pt-[19px] xl:pt-[17px] lg:pt-[15px] md:pt-[12px] pt-[10.5px] 2xl:px-6.75
         xl:px-5 lg:px-0 md:px-3   items-center"
        >
          <div className="flex items-center">
            <img
              src={square}
              alt="square"
              className="lg:w-3  w-4 xl:w-[1.25vw] xl:h-[1.25vw]  2xl:w-[0.94vw] 2xl:h-[0.94vw]"
            />
            <p className="font-cofo uppercase 2xl:text-[0.83vw] xl:text-[1.09vw] lg:text-[12px] md:text-[13px] text-[12px] 2xl:ps-[11.62px] ps-[11.12px] text-[#252526]">
              {t("rooms.about.area")}: {room.area}M²
            </p>
          </div>
          <div className="flex items-center">
            <img
              src={guest}
              alt="square"
              className="lg:w-3  w-4 xl:w-[1.25vw] xl:h-[1.25vw]  2xl:w-[0.94vw] 2xl:h-[0.94vw]"
            />
            <p className="font-cofo uppercase 2xl:text-[0.83vw] xl:text-[1.09vw] sm:ps-[11.62px] lg:text-[12px] md:text-[13px] text-[12px] 2xl:ps-[11.62px] ps-[11.12px] text-[#252526]">
              {t("rooms.about.guests")}: {room.guests}
            </p>
          </div>
        </div>

        <div className="2xl:h-[12.47vw] xl:h-[14.19vw] lg:h-[180px] md:h-[220px] pt-[6.67vw] lg:pt-0 flex flex-col justify-center items-center mb-[24px]">
          <div className="flex justify-center items-center  h-full 2xl:h-[10.5vw] xl:h-[12.06vw]">
            <div className="flex flex-col text-center items-center justify-between h-full w-full ">
              <div className="flex-1 flex flex-col justify-center items-center w-full">
                <h1
                  className={`font-cofo uppercase 2xl:text-[2.08vw] xl:text-[2.34vw] lg:text-[2.15vw] md:text-[28px] text-[6.4vw] leading-[85%] tracking-[-0.03em]  font-cofo-medium whitespace-pre-line text-[#252526] 
                
                ${isEng
                      ? "2xl:w-[70%] xl:w-[80%] w-[85%]  "
                      : "2xl:w-[85%] xl:w-[99%] w-[95%] "
                    }
                    ${!isEng ? "w-[75%]! " : ""}
                    ${!isEng && (index == 3 || index === 4) ? "w-[95%]! " : ""}
                    ${!isEng && index >= 7 ? "w-[95%]! " : ""}
                ${isEng && index == 2 ? " xl:w-[50%]! w-[50%]!" : ""}`}
                >
                  {t(room.title)}
                </h1>
                <p
                  className={`uppercase 2xl:text-[0.94vw] xl:text-[0.93vw] lg:text-[0.98vw] md:text-[13px] text-[3.2vw] 
                leading-[120%]
                ${isEng && (index === 4 || index === 6)
                      ? "lg:w-auto w-[89%]  "
                      : " "
                    }
               
                mt-[15px] 2xl:mt-[0.78vw] tracking-[-0.04em] text-[#6B6B6B] `}
                >
                  {t(room.description)}
                </p>
              </div>

              <Link
                to={`/rooms/${room.type}`}
                className="uppercase 2xl:py-[10px] flex flex-col w-[165px] h-[40px]
                justify-center items-center mt-[7.2vw] lg:mt-auto 2xl:text-[0.83vw] 2xl:w-[11.35vw] 2xl:h-[2.4vw] xl:py-[9px] lg:py-[8px] py-[8px] 5 lg:px-[16px]  2xl:mt-[1.41vw]  xl:text-[16px] lg:text-[14px] lg:w-[218px] text-[12px] border rounded-full 
                text-[#A47762] hover:bg-[#A47762] hover:text-white font-cofo font-cofo-medium transition-colors"
              >
                {t("buttons.viewRoom")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
