import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { FormData } from "@/types/headerTypes";

interface GuestsSelectProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  fieldName: "adults" | "children";
  optionsPrefix: string;
  options: string[];
  isChild?: boolean;
}

export const GuestsSelect: React.FC<GuestsSelectProps> = ({
  control,
  errors,
  fieldName,
  options,
  isChild = false,
}) => {
  const { t } = useTranslation();

  

  return (
    <div className="w-full">
     
   
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <div>
            <select
              {...field}
              className={cn(
                "custom-select w-full 2xl:pb-[10px] xl:pb-[8px] pb-[7px] xl:text-[1.09vw] lg:text-[14px] text-white border-b uppercase border-[#969696] cursor-pointer text-[2.67vw] 2xl:text-[0.83vw]",
                errors[fieldName] && "border-red-500 border"
              )}
            >
              {options.map((el, index) => (
                <option
                  key={index + el}
                  className="text-black"
                  value={!isChild ? index + 1 : index}
                >
                  {t(`${el}`)}
                </option>
              ))}
            </select>
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[fieldName]?.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
