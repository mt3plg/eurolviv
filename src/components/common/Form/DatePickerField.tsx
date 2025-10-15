import DatePicker, { registerLocale } from "react-datepicker";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { calendarBooking } from "@/store/exportsIcons";
import { DatePickerFieldProps } from "@/types/headerTypes";
import { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FormData } from "@/types/headerTypes";
import "@/components/common/Form/datePickerStyles.css";
import { uk, enUS } from "date-fns/locale";

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  control,
  errors,
  label,
  placeholderKey,
  classNameCalendar,
}) => {
  const { t, i18n } = useTranslation();
  const width = window.innerWidth;
  const getInputText = () => {
    if (width < 1024) {
      return t(label);
    }
    return t(placeholderKey);
  };
  const [startDate, setStartDate] = useState<Date | string | null>(null);

  if (i18n.language === "uk") {
    registerLocale("uk", uk);
  } else {
    registerLocale("en", enUS);
  }

  const datePickerRef = useRef<DatePicker | null>(null);

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className="w-full ">
      <p className="text-white uppercase mb-3 2xl:text-[0.83vw] xl:text-[1.09vw] lg:text-[14px] md:flex hidden">
        {t(label)}
      </p>
      <Controller
        name={name as keyof FormData}
        control={control}
        render={({ field }) => (
          <div className="relative w-full">
            <div className="relative w-full controller-wrapper">
              <DatePicker
                ref={datePickerRef}
                disabledKeyboardNavigation={true}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                onInputClick={() => {
                  handleIconClick();
                }}
                locale={i18n.language}
                calendarClassName={classNameCalendar}
                onChange={(date) => {
                  setStartDate(date);
                  field.onChange(date);
                }}
                selected={typeof field.value === "string" ? null : field.value}
                startDate={typeof startDate === "string" ? null : startDate}
                minDate={new Date()}
                className={cn(
                  "w-full ps-[26px] lg:ps-[40px] py-[7.5px] 2xl:py-[0.52vw] 2xl:ps-[2.08vw] lg:text-[14px] xl:ps-[3vw] xl:py-[0.67vw] rounded-xl bg-white/20 text-white placeholder-white/70 outline-none text-[10px] 2xl:text-[0.83vw]",
                  errors[name as keyof FormData] && "border-red-500 border"
                )}
                placeholderText={getInputText()}
              />
              <img
                src={calendarBooking}
                alt="calendar"
                className="absolute lg:left-3 left-2 top-1/2 transform -translate-y-1/2 2xl:w-[1vw] 2xl:h-[1vw] lg:w-[19px] lg:h-[19px] w-[3.2vw] h-[3.2vw] cursor-pointer"
                onClick={handleIconClick}
              />
              <span
                className="bg-white rounded-full lg:p-[7px] p-[2px] absolute lg:right-2 right-1.25 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleIconClick}
              >
                <FiChevronDown
                  className="2xl:w-[0.94vw] 2xl:h-[0.94vw] xl:w-[0.69vw] xl:h-[0.69vw] lg:w-[12px] lg:h-[12px] w-[4.27vw] h-[4.27vw]"
                  color="#3D3D3D"
                />
              </span>
            </div>
            {errors[name as keyof FormData] && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors[name as keyof FormData]?.message as string)}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
