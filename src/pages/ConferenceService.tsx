import { About } from "@/components/ConferesceService/About";
import { ConferenceMenu } from "@/components/ConferesceService/ConferenceMenu";
import { ConferenceMenuContent } from "@/components/ConferesceService/ConferenceMenuContent";
import { Equipment } from "@/components/ConferesceService/Equipment";
import { Header } from "@/components/ConferesceService/Header";
import { RoomSliderContainer } from "@/components/ConferesceService/RoomSliderContainer";
import { UpdateNotificationBanner } from "@/components/ConferesceService/UpdateNotificationBanner";
import { useRoomStore } from "@/store/useRoomsStore";
import cn from "classnames";
import { useState } from "react";

export const ConferenceService = () => {
  const { halls } = useRoomStore();
  const anchorId = ["big-hall", "small-hall", "launge-hall"];
  const [isBannerVisible, setIsBannerVisible] = useState(true);

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
    <div className="overflow-hidden">
      <UpdateNotificationBanner isVisible={isBannerVisible} onClose={() => {setIsBannerVisible(false)}} />
      <Header />
      {sections.map((Component, index) => (
        <div key={index} id={`section-${index}`}>
          {Component}
        </div>
      ))}
    </div>
  );
};
