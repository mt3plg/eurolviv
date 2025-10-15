import { HallCard } from "@/components/Home/HallCard";
import './HallList.css'
type HallListProps = {
    halls: {
        previewImage: string;
        title: string;
        size: string;
        area: string;
        capacity: string;
    }[];
    isEng: boolean;
    setIsBannerVisible: (isBannerVisible: boolean) => void;
};


export const HallList = ({ halls, isEng, setIsBannerVisible }: HallListProps) => (
    <div className="relative z-10 flex justify-center border-[#B3B3B3] pb-[20px] xl:pb-[0px]">
      <div className="grid grid-cols-1 md:grid-cols-[25.69%_38.6%_25.74%] items-center justify-center grid-conf w-full 2xl:gap-[20px] place-items-center">
        {halls.map((hall, index) => (
            <HallCard key={index} hall={hall} index={index} isEng={isEng} setIsBannerVisible={setIsBannerVisible} />
        ))}
      </div>
     
    </div>
  );
  