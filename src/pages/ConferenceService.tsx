import { About } from "@/components/ConferesceService/About";
import { ConferenceMenu } from "@/components/ConferesceService/ConferenceMenu";
import { ConferenceMenuContent } from "@/components/ConferesceService/ConferenceMenuContent";
import { Equipment } from "@/components/ConferesceService/Equipment";
import { Header } from "@/components/ConferesceService/Header";
import { RoomSliderContainer } from "@/components/ConferesceService/RoomSliderContainer";
import { UpdateNotificationBanner } from "@/components/ConferesceService/UpdateNotificationBanner";
import { useLockScroll } from "../hooks/useLockScroll";
import { useRoomStore } from "@/store/useRoomsStore";
import cn from "classnames";

export const ConferenceService = () => {
  useLockScroll(document.body, true);
  const { halls } = useRoomStore();
  const anchorId = ["big-hall", "small-hall", "launge-hall"];
  const isBannerVisible = true;

  const sections = halls.flatMap((el, index) => [
    <About key={cn(`about-${index}`)} item={el} isOnTop={index === 0} index={index} anchorId={anchorId[index]} />,
    <Equipment
      key={cn(`equipment-${index}`)}
      icons={el.icons}
      price={el.price}
    />,
    <RoomSliderContainer
      key={cn(`slider-${index}`)}
      images={el.showcaseSwiperImages}
      viewShowcaseSwiperImages={el.viewShowcaseSwiperImages}
    />,
  ]);

  sections.push(
    <ConferenceMenu key="menu" />,
    <ConferenceMenuContent key="content" />
  );

  return (
    <div className="overflow-y-hidden">
      <UpdateNotificationBanner isVisible={isBannerVisible} />
      <Header />
      {sections.map((Component, index) => (
        <div key={index} id={`section-${index}`}>
          {Component}
        </div>
      ))}
    </div>
  );
};
