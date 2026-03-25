import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { guest, square } from "@/store/exportsIcons";
import { Link } from "react-router-dom";
import { buildLocalizedPath } from "@/utils/localeRouting";

type Hall = {
  previewImage: string;
  title: string;
  size: string;
  area: string;
  capacity: string;
};

type HallSliderProps = {
  halls: Hall[];
};

export const ConferenceServiceSlider = ({ halls }: HallSliderProps) => {
  const { t, i18n } = useTranslation();
  const mapArray = [halls[1], halls[0], halls[2]];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };

  const isEng = i18n.language === "en";
  const anchorId = ["small-hall", "big-hall", "launge-hall"];

  return (
    <div className="w-full ms-[8%] z-10">
      <Slider {...settings}>
        {mapArray.map((hall, index) => (
          <div key={index} className="pe-[13px]">
            <img
              src={hall.previewImage}
              alt={hall.title}
              className="w-[69vw] h-[46vw]"
            />
            <h4 className="text-center uppercase font-cofo-medium text-[18px] leading-[106.8%] tracking-[-0.05em] mt-[13px]">
              {t(hall.title)} {t(hall.size)}
            </h4>
            <div className="flex flex-col items-center justify-center mt-[11px] gap-y-[6px]">
              <p className="text-center uppercase flex items-center space-x-[3px] text-[12px] ">
                <img src={square} alt="" className="w-[14px] h-[14px]" />
                <span>
                  {t("home.conferenceService.area")}: {hall.area}
                </span>
              </p>
              <p className="text-center uppercase flex items-center space-x-[3px] text-[12px] ">
                <img src={guest} alt="" className="w-[14px] h-[14px]" />
                <span>
                  {t("home.conferenceService.capacity")}:{" "}
                  {isEng
                    ? t(hall.capacity)
                    : t(hall.capacity).slice(0, -2) + "."}
                </span>
              </p>
            </div>
            <div className="text-center flex items-center justify-center pt-[12px] lg:pt-[37px] relative">
              <Link
                to={`${buildLocalizedPath(
                  "/conference-service",
                  i18n.language === "en" ? "en" : "uk"
                )}#${anchorId[index]}`}
                className="w-fit font-cofo-medium px-5 py-2.5 text-[#8c331b] hover:bg-[#8c331b] hover:text-white border-[#8C331B] border rounded-full uppercase text-[12px]"
              >
                {t("buttons.details")}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
