import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { roomAlert } from "@/store/exportsImg";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { useTranslation } from "react-i18next";
import { buildLocalizedPath } from "@/utils/localeRouting";

interface BookDirectAlertProps {
  delay?: number;
  image?: string;
}

const defaultImage = roomAlert;

export const BookDirectAlert = ({
  delay = 5000,
  image,
}: BookDirectAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isEng = useIsEnglish();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-[998] animate-slideIn ${
        isEng ? " 2xl:w-[25.26vw] xl:w-[28.26vw] w-[calc(100vw-23.33vw)]" : " 2xl:w-[29.69vw] xl:w-[32.26vw] w-[calc(100vw-30px)]"
      }`}
    >
      <div className="relative bg-white flex flex-row overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-[#8C331B] hover:text-gray-700 cursor-pointer z-10"
          title="close"
        >
          <IoClose size={24} />
        </button>

        <div className="flex justify-center items-center 2xl:p-3 xl:p-3 xl:pe-0 2xl:pe-0 p-2 pe-0">
          <img
            src={image || defaultImage}
            alt="Room"
            className={`w-full h-full 2xl:w-[9.95vw] 2xl:h-[9.01vw] xl:h-[10.01vw] object-cover ${isEng ? " xl:w-[11.09vw]" : " xl:w-[20.09vw]"} `}
          />
        </div>

        <div
          className={` xl:p-4 p-3 flex flex-col 2xl:ps-[25px] ${
            isEng ? "2xl:w-[14.69vw] xl:w-[16.33vw]" : "2xl:w-[18.33vw] "
          }`}
        >
          <h2 className="text-[#8C331B] uppercase text-[14px] 2xl:text-[0.94vw] xl:text-[1.25vw] font-cofo-medium tracking-[-0.02em] leading-[104.7%] mb-3 2xl:pt-[11px]">
            {t("bookDirectAlert.title")}
            <br />
            {t("bookDirectAlert.subtitle")}
          </h2>

          <p className="text-gray-800 text-[2.67vw]  2xl:text-[0.83vw] xl:text-[0.94vw] leading-[104.7%]">
            {t("bookDirectAlert.description")}
          </p>

          <div>
            <Link
              to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
              className={`uppercase bg-[#8C331B] text-white py-2.5  rounded-full 2xl:text-[12px] 2xl:mt-[22px] text-[10px] mt-3  xl:text-[0.78vw] xl:mt-[14px]
                hover:bg-[#9e3a1e] transition-colors font-cofo-medium text-center flex justify-center items-center ${
                  isEng
                    ? "2xl:w-[112px] xl:w-[100px] w-[90px]"
                    : " 2xl:w-[170px] 2xl:h-[38px] xl:w-[170px] xl:h-[34px] w-[150px]"
                }`}
            >
              {t("bookDirectAlert.button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
