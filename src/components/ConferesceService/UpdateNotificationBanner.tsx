import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

interface UpdateNotificationBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const UpdateNotificationBanner: React.FC<UpdateNotificationBannerProps> = ({
  isVisible,
  onClose,
}) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#F5F1ED] rounded-lg shadow-2xl max-w-4xl w-full relative p-8 md:p-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8B5A3C] hover:text-[#6B4A2C] transition-colors"
          aria-label="Закрити"
        >
          <IoClose className="w-8 h-8" />
        </button>

                <div className=" space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#8B5A3C]">
                        {t("conferenceService.updateNotificationBanner.title")}
                    </h2>

                    <p className="text-[#6B4A2C] text-base md:text-lg leading-relaxed">
                        {t("conferenceService.updateNotificationBanner.desc.0")} <br className="hidden lg:block" />
                        {t("conferenceService.updateNotificationBanner.desc.1")} <br className="hidden lg:block" />
                        {t("conferenceService.updateNotificationBanner.desc.2")}

                    </p>

                    <div className="border-t border-[#8B5A3C]/30 pt-6 mt-6">
                        <h3 className="text-xl font-semibold text-[#8B5A3C] mb-4">
                            {t("conferenceService.updateNotificationBanner.contact")}
                        </h3>
                        <div className="space-y-2 text-[#6B4A2C]">
                            <a
                                href="tel:+380932423160"
                                className="block text-lg hover:text-[#8B5A3C] transition-colors"
                            >
                                {t("conferenceService.updateNotificationBanner.phone1")}
                            </a>
                            <a
                                href="tel:+380933483112"
                                className="block text-lg hover:text-[#8B5A3C] transition-colors"
                            >
                                {t("conferenceService.updateNotificationBanner.phone2")}
                            </a>
                            <a
                                href="mailto:info@eurohotel.lviv.ua"
                                className="block text-xl hover:text-[#8B5A3C] transition-colors mt-8 underline font-semibold "
                            >
                                {t("conferenceService.updateNotificationBanner.email")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

