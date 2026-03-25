import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { eurohotelAlert } from "@/store/exportsImg";
import { useIsEnglish } from "@/hooks/useIsEnglish";
import { buildLocalizedPath } from "@/utils/localeRouting";
interface PromoAlertProps {
  delay?: number;
  image?: string;
}

const defaultImage = eurohotelAlert;

export const PromoAlert = ({ delay = 5000, image }: PromoAlertProps) => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const isEng = useIsEnglish()

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
    <div className="fixed bottom-4 right-4 z-[998] animate-slideIn 2xl:max-w-[48.18vw] xl:w-[60.5vw]    ">
      <div className="relative bg-white 2xl:p-5 xl:p-4 2xl:pe-0 flex md:flex-row flex-col overflow-hidden  shadow-xl">
        <div className=" ">
          <img
            src={image || defaultImage}
            alt="Promo"
            className="w-full h-full 2xl:w-[23.54vw] 2xl:h-[282px] xl:w-[31.25vw] md:max-h-none object-cover"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleClose}
              className="text-[#8C331B] hover:text-gray-700 p-1 absolute top-2 right-2 cursor-pointer"
              title="close"
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>

        <div className={`w-full p-4 md:p-5 xl:pe-0 2xl:ps-[2.34vw] xl:ps-[2.8vw]  flex flex-col ${isEng ? "2xl:w-[35%] xl:w-[35%] " : "2xl:w-[45%] xl:w-[45%] "}`}>
          <div className="flex  items-start mb-2">
            <h2 className="text-[#8C331B] uppercase text-xl md:text-2xl 2xl:text-[1.67vw] xl:text-[2.03vw] font-cofo-medium tracking-[-0.03em] leading-[92%] 2xl:pt-[10px] ">
              {t("promo.title")}
              {t("promo.subtitle")}
            </h2>
          </div>

          <p className={`mt-3 text-gray-800  text-sm md:text-base 2xl:text-[0.83vw] xl:text-[0.94vw] leading-[104%] ${isEng ? "2xl:w-[120%] xl:w-[140%] " : " "}`}>
            {t(
              "promo.description"
            )}
          </p>

          <div className="  md:pt-5.5 ">
            <Link
              to={buildLocalizedPath("/booking", i18n.language === "en" ? "en" : "uk")}
              className={`uppercase bg-[#8C331B] 2xl:text-[0.63vw] xl:w-[13.5vw]  flex justify-center items-center
                xl:text-[0.94vw] text-white 2xl:h-[38px] xl:h-[38px] py-2.5 rounded-full
                 hover:bg-[#9e3a1e] transition-colors font-cofo-medium text-center  md:w-auto w-full text-sm md:text-base
                 ${isEng ? "2xl:w-[112px] " : " 2xl:w-[170px] "}`}
            >
              {t("promo.button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
