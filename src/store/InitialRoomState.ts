import * as icons from "@/store/exportsIcons";
import * as imgs from "@/store/exportsImg";

import { RoomsState } from "@/types/types";

export const initialRoomsState: RoomsState = {
  rooms: [
    {
      type: "standart-single",
      title: "roomsState.standartSingle.title",
      description: "roomsState.standartSingle.desc",
      area: 15,
      guests: "1",
      isLux: false,
      header: {
        previewImage: imgs.standartSinglePreview,
        title: "roomsState.standartSingle.header.title",
        size: "roomsState.standartSingle.header.size",
        description: "roomsState.standartSingle.header.description",
        count: 6,
        view: "roomsState.standartSingle.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.standartSingle.about.pOne",
        pTwo: "roomsState.standartSingle.about.pTwo",
        rooms: 2,
        swiperImagesStyle: "object-[100%_40%]",
        swiperImages: [
          imgs.standartSingleSliderFst,
          imgs.standartSingleSliderScd,
          imgs.standartSingleSliderTrd,
          imgs.standartSingleSliderFth,
          imgs.standartSingleSliderFve,
          imgs.standartSingleSliderSix,
          imgs.standartSingleSliderSev, 
          imgs.standartSingleSliderEig,
          imgs.standartSingleSliderNin,

        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[2%_20%]",
        ammetiveImgStyleScd: "",

        ammentiesImages: [
          imgs.ammentiesFst,
          imgs.standartSingleAmmenties,
          imgs.standartBathRoomFst,
          imgs.standartBathRoomSnd,
        ],
        ammentiesMobileImages: [
          imgs.standartSingleAmmenties,
          imgs.standartBathRoomFst,
        ],
        bedText: "roomsState.standartSingle.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.bed",
          },
          {
            src: icons.cabinetBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.table",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.minibarBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.safeBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.safe",
          },
          {
            src: icons.kettleBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.phoneBrown,
            text: "roomsState.standartSingle.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.standartSingle.icons.bathRoom.shower",
          },
          {
            src: icons.wc,
            text: "roomsState.standartSingle.icons.bathRoom.wc",
          },
          {
            src: icons.shovergigi,
            text: "roomsState.standartSingle.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.standartSingle.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.standartSingle.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.standartSingle.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.standartSingle.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.standartSingle.icons.bathRoom.cosmetic",
          },
        ],
      },

      suggestion: [
        {
          title: "roomsState.standartSingle.suggestion.0.title",
          size: "roomsState.standartSingle.suggestion.0.size",
          desc: "roomsState.standartSingle.suggestion.0.desc",
          img: imgs.standartBigBedPreview,
          type: "standart-big-bed",
        },
        {
          title: "roomsState.standartSingle.suggestion.1.title",
          size: "roomsState.standartSingle.suggestion.1.size",
          desc: "roomsState.standartSingle.suggestion.1.desc",
          img: imgs.standartBigBedAndBalconyPreview,
          type: "standart-big-bed-balcony",
        },
      ],
    },
    {
      type: "standart-big-bed",
      title: "roomsState.standartBigbed.title",
      description: "roomsState.standartBigbed.desc",
      area: 18,
      isLux: false,
      guests: "2",
      header: {
        previewImage: imgs.standartBigBedPreview,
        title: "roomsState.standartBigbed.header.title",
        size: "roomsState.standartBigbed.header.size",
        description: "roomsState.standartBigbed.header.description",
        count: 12,
        view: "roomsState.standartBigbed.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.standartBigbed.about.pOne",
        pTwo: "roomsState.standartBigbed.about.pTwo",
        rooms: 1,
        swiperImagesStyle: "object-[100%_65%]",
        swiperImages: [
          imgs.standartBigBedSliderFst,
          imgs.standartBigBedSliderScd,
          imgs.standartBigBedSliderTrd,
          imgs.standartBigBedSliderFth,
          imgs.standartBigBedSliderFve,
          imgs.standartBigBedSliderSix,
          imgs.standartBigBedSliderSev,
          imgs.standartBigBedSliderEig,
          imgs.standartBigBedSliderNin,
          imgs.standartBigBedSliderTen,

        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[33%_50%]",
        ammetiveImgStyleScd: "object-[0%_100%]",

        ammentiesImages: [
          imgs.ammentiesBigBedFst,
          imgs.ammentiesPng,
          imgs.standartBathRoomFst,
          imgs.standartBathRoomSnd,
        ],
        ammentiesMobileImages: [imgs.ammentiesPng, imgs.standartBathRoomFst],
        bedText: "roomsState.standartBigbed.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          { src: icons.bedBrown, text: "двоспальне ліжко (160*200 см)" },
          {
            src: icons.cabinetBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.table",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.minibarBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.safeBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.safe",
          },
          {
            src: icons.kettleBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.airConditioner",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.phoneBrown,
            text: "roomsState.standartBigbed.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.standartBigbed.icons.bathRoom.shower",
          },
          {
            src: icons.wc,
            text: "roomsState.standartBigbed.icons.bathRoom.wc",
          },
          {
            src: icons.shovergigi,
            text: "roomsState.standartBigbed.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.standartBigbed.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.standartBigbed.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.standartBigbed.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.standartBigbed.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.standartBigbed.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.standartBigbed.suggestion.0.title",
          size: "roomsState.standartBigbed.suggestion.0.size",
          desc: "roomsState.standartBigbed.suggestion.0.desc",
          img: imgs.standartSinglePreview,
          type: "standart-single",
        },
        {
          title: "roomsState.standartBigbed.suggestion.1.title",
          size: "roomsState.standartBigbed.suggestion.1.size",
          desc: "roomsState.standartBigbed.suggestion.1.desc",
          img: imgs.standartBigBedAndBalconyPreview,
          type: "standart-big-bed-balcony",
        },
      ],
    },
    {
      type: "standart-two-bed",
      title: "roomsState.standartTwoBed.title",
      description: "roomsState.standartTwoBed.desc",
      area: 18,
      guests: "2",
      isLux: false,
      header: {
        previewImage: imgs.standartTwoBedPreview,
        title: "roomsState.standartTwoBed.header.title",
        size: "roomsState.standartTwoBed.header.size",
        description: "roomsState.standartTwoBed.header.description",
        count: 18,
        view: "roomsState.standartTwoBed.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.standartTwoBed.about.pOne",
        pTwo: "roomsState.standartTwoBed.about.pTwo",
        rooms: 1,
        swiperImagesStyle: "object-[100%_78%]",
        swiperImages: [
          imgs.standartTwoBedSliderFst, 
          imgs.standartTwoBedSliderScd,
          imgs.standartTwoBedSliderTrd,
          imgs.standartTwoBedSliderFth,
          imgs.standartTwoBedSliderFve,
          imgs.standartTwoBedSliderSix,
          imgs.standartTwoBedSliderSev,
          imgs.standartTwoBedSliderEig,
          imgs.standartTwoBedSliderNin,
          imgs.standartTwoBedSliderTen,
        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[0%_20%]",
        ammetiveImgStyleScd: "object-[0%_100%]",
        ammentiesImages: [
          imgs.ammentiesTwoBedFst,
          imgs.ammentiesPng,
          imgs.standartBathRoomFst,
          imgs.standartBathRoomSnd,
        ],
        ammentiesMobileImages: [imgs.ammentiesPng, imgs.standartBathRoomFst],
        bedText: "roomsState.standartTwoBed.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.bed",
          },
          {
            src: icons.cabinetBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.table",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.minibarBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.safeBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.safe",
          },
          {
            src: icons.kettleBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.phoneBrown,
            text: "roomsState.standartTwoBed.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.standartTwoBed.icons.bathRoom.shower",
          },
          {
            src: icons.wc,
            text: "roomsState.standartTwoBed.icons.bathRoom.wc",
          },
          {
            src: icons.shovergigi,
            text: "roomsState.standartTwoBed.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.standartTwoBed.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.standartTwoBed.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.standartTwoBed.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.standartTwoBed.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.standartTwoBed.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.standartTwoBed.suggestion.0.title",
          size: "roomsState.standartTwoBed.suggestion.0.size",
          desc: "roomsState.standartTwoBed.suggestion.0.desc",
          img: imgs.standartBigBedPreview,
          type: "standart-big-bed",
        },
        {
          title: "roomsState.standartTwoBed.suggestion.1.title",
          size: "roomsState.standartTwoBed.suggestion.1.size",
          desc: "roomsState.standartTwoBed.suggestion.1.desc",
          img: imgs.standartTwoBedAndBalconyPreview,
          type: "standart-two-bed-balcony",
        },
      ],
    },
    {
      type: "standart-big-bed-balcony",
      title: "roomsState.standartBigBedBalcony.title",
      description: "roomsState.standartBigBedBalcony.desc",
      area: 18,
      guests: "2",
      isLux: false,
      header: {
        previewImage: imgs.standartBigBedAndBalconyPreview,
        title: "roomsState.standartBigBedBalcony.header.title",
        size: "roomsState.standartBigBedBalcony.header.size",
        description: "roomsState.standartBigBedBalcony.header.description",
        count: 19,
        view: "roomsState.standartBigBedBalcony.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.standartBigBedBalcony.about.pOne",
        pTwo: "roomsState.standartBigBedBalcony.about.pTwo",
        rooms: 1,
        swiperImagesStyle: "object-[0%_100%]",
        swiperImages: [
        imgs.standartBigBedAndBalconySliderFst,
        imgs.standartBigBedAndBalconySliderScd,
        imgs.standartBigBedAndBalconySliderTrd,
        imgs.standartBigBedAndBalconySliderFth,
        imgs.standartBigBedAndBalconySliderFve,
        imgs.standartBigBedAndBalconySliderSix,
        imgs.standartBigBedAndBalconySliderSev, 
        imgs.standartBigBedAndBalconySliderEig,
        imgs.standartBigBedAndBalconySliderNin,
        imgs.standartBigBedAndBalconySliderTen,
        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[65%_20%]",
        ammetiveImgStyleScd: "object-[0%_100%]",
        ammentiesImages: [
          imgs.standartBigBedAndBalconyBedroomScd,
          imgs.ammentiesPng,
          imgs.standartBathRoomFst,
          imgs.standartBathRoomSnd,
        ],
        ammentiesMobileImages: [imgs.ammentiesPng, imgs.standartBathRoomFst],
        bedText: "roomsState.standartBigBedBalcony.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.bed",
          },
          {
            src: icons.balconyBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.balcony",
          },
          {
            src: icons.cabinetBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.table",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.minibarBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.safeBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.safe",
          },
          {
            src: icons.kettleBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.phoneBrown,
            text: "roomsState.standartBigBedBalcony.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.shower",
          },
          {
            src: icons.wc,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.wc",
          },
          {
            src: icons.shovergigi,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.standartBigBedBalcony.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.standartBigBedBalcony.suggestion.0.title",
          size: "roomsState.standartBigBedBalcony.suggestion.0.size",
          desc: "roomsState.standartBigBedBalcony.suggestion.0.desc",
          img: imgs.semiLuxPreview,
          type: "standart-big-bed",
        },
        {
          title: "roomsState.standartBigBedBalcony.suggestion.1.title",
          size: "roomsState.standartBigBedBalcony.suggestion.1.size",
          desc: "roomsState.standartBigBedBalcony.suggestion.1.desc",
          img: imgs.luxTwoRoomsPreview,
          type: "lux-two-rooms",
        },
      ],
    },

    {
      type: "standart-two-bed-balcony",
      title: "roomsState.standartTwoBedBalcony.title",
      description: "roomsState.standartTwoBedBalcony.desc",
      area: 18,
      guests: "2",
      isLux: false,
      header: {
        previewImage: imgs.standartTwoBedAndBalconyPreview,
        title: "roomsState.standartTwoBedBalcony.header.title",
        size: "roomsState.standartTwoBedBalcony.header.size",
        description: "roomsState.standartTwoBedBalcony.header.description",
        count: 33,
        view: "roomsState.standartTwoBedBalcony.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.standartTwoBedBalcony.about.pOne",
        pTwo: "roomsState.standartTwoBedBalcony.about.pTwo",
        rooms: 1,
        swiperImagesStyle: "object-[0%_100%]",
        swiperImages: [
         imgs.standartTwoBedAndBalconySliderFst,
         imgs.standartTwoBedAndBalconySliderScd,
         imgs.standartTwoBedAndBalconySliderTrd,
         imgs.standartTwoBedAndBalconySliderFth,
         imgs.standartTwoBedAndBalconySliderFve,
         imgs.standartTwoBedAndBalconySliderSix,
         imgs.standartTwoBedAndBalconySliderSev,
         imgs.standartTwoBedAndBalconySliderEig,
         imgs.standartTwoBedAndBalconySliderNin,
         imgs.standartTwoBedAndBalconySliderTen,
        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[65%_20%]",
        ammetiveImgStyleScd: "object-[0%_100%]",
        ammentiesImages: [
          imgs.standartTwoBedAndBalconyBedroomFst,
          imgs.ammentiesPng,
          imgs.standartBathRoomFst,
          imgs.standartBathRoomSnd,
        ],
        ammentiesMobileImages: [imgs.ammentiesPng, imgs.standartBathRoomSnd],
        bedText: "roomsState.standartTwoBedBalcony.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.bed",
          },
          {
            src: icons.balconyBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.balcony",
          },
          {
            src: icons.cabinetBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.table",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.minibarBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.safeBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.safe",
          },
          {
            src: icons.kettleBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.phoneBrown,
            text: "roomsState.standartTwoBedBalcony.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.shower",
          },
          {
            src: icons.wc,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.wc",
          },
          {
            src: icons.shovergigi,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.standartTwoBedBalcony.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.standartTwoBedBalcony.suggestion.0.title",
          size: "roomsState.standartTwoBedBalcony.suggestion.0.size",
          desc: "roomsState.standartTwoBedBalcony.suggestion.0.desc",
          img: imgs.semiLuxPreview,
          type: "semi-lux",
        },
        {
          title: "roomsState.standartTwoBedBalcony.suggestion.1.title",
          size: "roomsState.standartTwoBedBalcony.suggestion.1.size",
          desc: "roomsState.standartTwoBedBalcony.suggestion.1.desc",
          img: imgs.luxTwoRoomsPreview,
          type: "lux-two-rooms",
        },
      ],
    },
    {
      type: "semi-lux",
      title: "roomsState.semiLux.title",
      description: "roomsState.semiLux.desc",
      area: 22,
      guests: "2+2",
      isLux: false,
      header: {
        previewImage: imgs.semiLuxPreview,
        title: "roomsState.semiLux.header.title",
        description: "roomsState.semiLux.header.description",
        count: 6,
        view: "roomsState.semiLux.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.semiLux.about.pOne",
        pTwo: "roomsState.semiLux.about.pTwo",
        rooms: 1,
        swiperImagesStyle: "object-[0%_65%]",
        swiperImages: [
          imgs.semiLuxSliderFst,
          imgs.semiLuxSliderScd,
          imgs.semiLuxSliderTrd,
          imgs.semiLuxSliderFth,
          imgs.semiLuxSliderFve,
          imgs.semiLuxSliderSix,
          imgs.semiLuxSliderSev,
          imgs.semiLuxSliderEig,
          imgs.semiLuxSliderNin,
          imgs.semiLuxSliderTen,
        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[0%_100%]",
        ammetiveImgStyleScd: "object-[0%_100%]",
        ammentiesImages: [
          imgs.semiLuxBedroomScd,
          imgs.ammentiesPng,
          imgs.semiLuxBathroomFst,
          imgs.semiLuxBathroomScd,
        ],
        ammentiesMobileImages: [imgs.ammentiesPng, imgs.semiLuxBathroomScd],
        bedText: "roomsState.semiLux.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.bed",
          },
          {
            src: icons.sofaBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.sofa",
          },
          {
            src: icons.teakitBrown,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.teakit",
          },
          {
            src: icons.cabinetBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.table",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.minibarBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.safeBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.safe",
          },
          {
            src: icons.kettleBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.tv",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
          {
            src: icons.phoneBrown,
            text: "roomsState.semiLux.icons.ammentiesInRoom.phone",
          },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.semiLux.icons.bathRoom.shower",
          },
          { src: icons.wc, text: "roomsState.semiLux.icons.bathRoom.wc" },
          {
            src: icons.shovergigi,
            text: "roomsState.semiLux.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.semiLux.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.semiLux.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.semiLux.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.semiLux.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.semiLux.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.semiLux.suggestion.0.title",
          size: "roomsState.semiLux.suggestion.0.size",
          desc: "roomsState.semiLux.suggestion.0.desc",
          img: imgs.luxElegantPreview,
          type: "lux-elegant",
        },
        {
          title: "roomsState.semiLux.suggestion.1.title",
          size: "roomsState.semiLux.suggestion.1.size",
          desc: "roomsState.semiLux.suggestion.1.desc",
          img: imgs.luxTwoRoomsPreview,
          type: "lux-two-rooms",
        },
      ],
    },
    {
      type: "lux-two-rooms",
      title: "roomsState.luxTwoRooms.title",
      description: "roomsState.luxTwoRooms.desc",
      area: 38,
      guests: "2+2",
      isLux: true,
      header: {
        previewImage: imgs.luxTwoRoomsPreview,
        title: "roomsState.luxTwoRooms.header.title",
        description: "roomsState.luxTwoRooms.header.description",
        descriptionMobile: "roomsState.luxTwoRooms.header.descriptionMobile",
        count: 4,
        view: "roomsState.luxTwoRooms.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.luxTwoRooms.about.pOne",
        pTwo: "roomsState.luxTwoRooms.about.pTwo",
        rooms: 2,
        swiperImagesStyle: "object-[0%_70%]",
        swiperImages: [
        imgs.luxTwoRoomsSliderFst,
        imgs.luxTwoRoomsSliderScd,
        imgs.luxTwoRoomsSliderTrd,
        imgs.luxTwoRoomsSliderFth,
        imgs.luxTwoRoomsSliderFve,
        imgs.luxTwoRoomsSliderSix,
        imgs.luxTwoRoomsSliderSev,
        imgs.luxTwoRoomsSliderEig,
        imgs.luxTwoRoomsSliderNin,
        imgs.luxTwoRoomsSliderTen,
        imgs.luxTwoRoomsSliderEleven,
        ],
        isBalcony: false,
        ammetiveImgStyleFst: "",
        ammetiveImgStyleScd: "object-[0%_100%]",
        ammentiesImages: [
          imgs.luxTwoRoomsLivingRoomFst,
          imgs.luxTwoRoomsLivingRoomScd,
          imgs.luxTwoRoomsBedroomFst,
          imgs.luxTwoRoomsBedroomScd,
          imgs.luxTwoRoomsBathRoomFst,
          imgs.luxTwoRoomsBathRoomScd,
        ],
        ammentiesMobileImages: [
          imgs.luxTwoRoomsLivingRoomFst,
          imgs.luxTwoRoomsBedroomFst,
          imgs.luxTwoRoomsBathRoomFst,
        ],
        bedText: "roomsState.luxTwoRooms.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.sofa,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.sofa",
          },
          {
            src: icons.armChair,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.armChair",
          },
          {
            src: icons.balcony,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.balcony",
          },
          {
            src: icons.carpet,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.wardrobe,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.wardrobe",
          },
          {
            src: icons.cabinet,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.table",
          },
          {
            src: icons.airCondition,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.condition",
          },
          {
            src: icons.tv,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.minibar,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.kettle,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.teakit,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.teakit",
          },
          {
            src: icons.phone,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifi, text: "WI-fi" },
          {
            src: icons.safe,
            text: "roomsState.luxTwoRooms.icons.ammentiesInRoom.safe",
          },
        ],
        bedRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.luxTwoRooms.icons.bedRoom.bed",
          },
          {
            src: icons.balconyBrown,
            text: "roomsState.luxTwoRooms.icons.bedRoom.balcony",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.luxTwoRooms.icons.bedRoom.carpet",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.luxTwoRooms.icons.bedRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.luxTwoRooms.icons.bedRoom.tv",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
          {
            src: icons.phoneBrown,
            text: "roomsState.luxTwoRooms.icons.bedRoom.phone",
          },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.luxTwoRooms.icons.bathRoom.shower",
          },
          { src: icons.wc, text: "roomsState.luxTwoRooms.icons.bathRoom.wc" },
          {
            src: icons.shovergigi,
            text: "roomsState.luxTwoRooms.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.luxTwoRooms.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.luxTwoRooms.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.luxTwoRooms.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.luxTwoRooms.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.luxTwoRooms.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.luxTwoRooms.suggestion.0.title",
          size: "roomsState.luxTwoRooms.suggestion.0.size",
          desc: "roomsState.luxTwoRooms.suggestion.0.desc",
          img: imgs.semiLuxPreview,
          type: "semi-lux",
        },
        {
          title: "roomsState.luxTwoRooms.suggestion.1.title",
          size: "roomsState.luxTwoRooms.suggestion.1.size",
          desc: "roomsState.luxTwoRooms.suggestion.1.desc",
          img: imgs.luxImperiumPreview,
          type: "lux-imperial",
        },
      ],
    },
    {
      type: "lux-imperial",
      title: "roomsState.luxImperial.title",
      description: "roomsState.luxImperial.desc",
      area: 60,
      guests: "2",
      isLux: true,
      header: {
        previewImage: imgs.luxImperiumPreview,
        title: "roomsState.luxImperial.header.title",
        size: `roomsState.luxImperial.header.size`,
        description: "roomsState.luxImperial.header.description",
        count: 1,
        view: "roomsState.luxImperial.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.luxImperial.about.pOne",
        pTwo: "roomsState.luxImperial.about.pTwo",
        rooms: 2,
        swiperImagesStyle: "object-[0%_70%]",
        swiperImages: [
          imgs.luxImperialSliderFst,  
          imgs.luxImperialSliderScd,
          imgs.luxImperialSliderTrd,
          imgs.luxImperialSliderFth,
          imgs.luxImperialSliderFve,
          imgs.luxImperialSliderSix,
          imgs.luxImperialSliderSev,
          imgs.luxImperialSliderEig,
          imgs.luxImperialSliderNin,
        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[70%_100%]",
        ammetiveImgStyleScd: "object-[70%_100%]",
        ammentiesImages: [
          imgs.luxImperiumlivigRoomScd,
          imgs.ammentiesLuxImperium,
          imgs.luxImperiumBedRoomFst,
          imgs.ammentiesLuxImperiumFst,
          imgs.luxImperiumBathRoomFst,
          imgs.ammentiesLuxImperiumScd,
        ],
        ammentiesMobileImages: [
          imgs.luxImperiumlivigRoomScd,
          imgs.ammentiesLuxImperiumFst,
          imgs.luxImperiumBathRoomFst,
        ],
        bedText: "roomsState.luxImperial.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.sofa,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.sofa",
          },

          {
            src: icons.balcony,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.balcony",
          },
          {
            src: icons.carpet,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.carpet",
          },

          {
            src: icons.cabinet,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.table",
          },
          {
            src: icons.airCondition,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.condition",
          },
          {
            src: icons.tv,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.minibar,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.kettle,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.teakit,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.teakit",
          },
          {
            src: icons.phone,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifi, text: "WI-fi" },
          {
            src: icons.safe,
            text: "roomsState.luxImperial.icons.ammentiesInRoom.safe",
          },
        ],
        bedRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.luxImperial.icons.bedRoom.bed",
          },
          {
            src: icons.balconyBrown,
            text: "roomsState.luxImperial.icons.bedRoom.balcony",
          },
          {
            src: icons.wardrobeBrown,
            text: "roomsState.luxImperial.icons.bedRoom.wardrobe",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.luxImperial.icons.bedRoom.carpet",
          },
          {
            src: icons.conditionBrown,
            text: "roomsState.luxImperial.icons.bedRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.luxImperial.icons.bedRoom.tv",
          },
          { src: icons.wifiBrown, text: "WI-fi" },
          {
            src: icons.phoneBrown,
            text: "roomsState.luxImperial.icons.bedRoom.phone",
          },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.luxImperial.icons.bathRoom.shower",
          },
          { src: icons.wc, text: "roomsState.luxImperial.icons.bathRoom.wc" },
          {
            src: icons.shovergigi,
            text: "roomsState.luxImperial.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.luxImperial.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.luxImperial.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.luxImperial.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.luxImperial.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.luxImperial.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.luxImperial.suggestion.0.title",
          size: "roomsState.luxImperial.suggestion.0.size",
          desc: "roomsState.luxImperial.suggestion.0.desc",
          img: imgs.luxElegantPreview,
          type: "lux-elegant",
        },
        {
          title: "roomsState.luxImperial.suggestion.1.title",
          size: "roomsState.luxImperial.suggestion.1.size",
          desc: "roomsState.luxImperial.suggestion.1.desc",
          img: imgs.luxTwoRoomsPreview,
          type: "lux-two-rooms",
        },
      ],
    },

    {
      type: "lux-elegant",
      title: "roomsState.luxElegant.title",
      description: "roomsState.luxElegant.desc",
      area: 60,
      guests: "2",
      isLux: true,
      header: {
        previewImage: imgs.luxElegantPreview,
        title: "roomsState.luxElegant.header.title",
        size: `roomsState.luxElegant.header.size`,
        description: "roomsState.luxElegant.header.description",
        count: 1,
        view: "roomsState.luxElegant.header.view",
        arriveTime: "14:00",
        leaveTime: "12:00",
      },
      about: {
        pOne: "roomsState.luxElegant.about.pOne",
        pTwo: "roomsState.luxElegant.about.pTwo",
        rooms: 2,
        swiperImagesStyle: "object-[0%_70%]",
        swiperImages: [
          imgs.luxElegantSliderFst,
          imgs.luxElegantSliderScd,
          imgs.luxElegantSliderTrd,
          imgs.luxElegantSliderFth,
          imgs.luxElegantSliderFve,
          imgs.luxElegantSliderSix,
          imgs.luxElegantSliderSev, 
          imgs.luxElegantSliderEig,
        ],
        isBalcony: false,
        ammetiveImgStyleFst: "object-[5%_100%]",
        ammetiveImgStyleScd: "object-[30%_100%]",
        ammentiesImages: [
          imgs.luxElegantLivingRoomFst,
          imgs.luxElegantLivingRoomScd,
          imgs.luxElegantBedRoomFst,
          imgs.luxElegantBedRoomScd,
          imgs.luxElegantBathRoomFst,
          imgs.luxElegantBathRoomScd,
        ],
        ammentiesMobileImages: [
          imgs.luxElegantLivingRoomScd,
          imgs.luxElegantBedRoomFst,
          imgs.luxElegantBathRoomFst,
        ],
        bedText: "roomsState.luxElegant.about.bedText",
      },
      icons: {
        ammentiesInRoom: [
          {
            src: icons.sofa,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.sofa",
          },
          {
            src: icons.balcony,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.balcony",
          },
          {
            src: icons.carpet,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.carpet",
          },
          {
            src: icons.airCondition,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.condition",
          },

          {
            src: icons.tv,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.tv",
          },
          {
            src: icons.minibar,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.minibar",
          },
          {
            src: icons.kettle,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.kettle",
          },
          {
            src: icons.teakit,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.teakit",
          },
          {
            src: icons.phone,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.phone",
          },
          { src: icons.wifi, text: "WI-fi" },
          {
            src: icons.safe,
            text: "roomsState.luxElegant.icons.ammentiesInRoom.safe",
          },
        ],
        bedRoom: [
          {
            src: icons.bedBrown,
            text: "roomsState.luxElegant.icons.bedRoom.bed",
          },
          {
            src: icons.balconyBrown,
            text: "roomsState.luxElegant.icons.bedRoom.balcony",
          },
          {
            src: icons.carpetBrown,
            text: "roomsState.luxElegant.icons.bedRoom.carpet",
          },

          {
            src: icons.wardrobeBrown,
            text: "roomsState.luxElegant.icons.bedRoom.wardrobe",
          },

          {
            src: icons.conditionBrown,
            text: "roomsState.luxElegant.icons.bedRoom.condition",
          },
          {
            src: icons.tvBrown,
            text: "roomsState.luxElegant.icons.bedRoom.tv",
          },

          { src: icons.wifiBrown, text: "WI-fi" },
          {
            src: icons.phoneBrown,
            text: "roomsState.luxElegant.icons.bedRoom.phone",
          },
        ],
        bathRoom: [
          {
            src: icons.shower,
            text: "roomsState.luxElegant.icons.bathRoom.shower",
          },
          { src: icons.wc, text: "roomsState.luxElegant.icons.bathRoom.wc" },
          {
            src: icons.shovergigi,
            text: "roomsState.luxElegant.icons.bathRoom.showerGigi",
          },
          {
            src: icons.hairDryer,
            text: "roomsState.luxElegant.icons.bathRoom.hairDryer",
          },
          {
            src: icons.towels,
            text: "roomsState.luxElegant.icons.bathRoom.towels",
          },
          {
            src: icons.bathRobe,
            text: "roomsState.luxElegant.icons.bathRoom.bathRobe",
          },
          {
            src: icons.slippers,
            text: "roomsState.luxElegant.icons.bathRoom.slippers",
          },
          {
            src: icons.cosmetic,
            text: "roomsState.luxElegant.icons.bathRoom.cosmetic",
          },
        ],
      },
      suggestion: [
        {
          title: "roomsState.luxElegant.suggestion.0.title",
          size: "roomsState.luxElegant.suggestion.0.size",
          desc: "roomsState.luxElegant.suggestion.0.desc",
          img: imgs.luxImperiumPreview,
          type: "lux-imperial",
        },
        {
          title: "roomsState.luxElegant.suggestion.1.title",
          size: "roomsState.luxElegant.suggestion.1.size",
          desc: "roomsState.luxElegant.suggestion.1.desc",
          img: imgs.luxTwoRoomsPreview,
          type: "lux-two-rooms",
        },
      ],
    },
  ],
  sliderProps: [
    {
      type: "lux-elegant",
      area: 60,
      guests: "2",
      src: imgs.luxElegantPreview,
      title: "roomsState.luxElegant.title",
    },
    {
      type: "lux-two-rooms",
      area: 38,
      guests: "2+2",
      src: imgs.luxTwoRoomsPreview,
      title: "roomsState.luxTwoRooms.title",
    },
    {
      type: "lux-imperial",
      area: 60,
      guests: "2",
      src: imgs.luxImperiumPreview,
      title: "roomsState.luxImperial.title",
    },
    {
      type: "semi-lux",
      area: 22,
      guests: "2+2",
      src: imgs.semiLuxPreview,
      title: "roomsState.semiLux.title",
    },
    {
      type: "standart-two-bed",
      area: 18,
      guests: "2",
      src: imgs.standartTwoBedAndBalconyPreview,
      title: "roomsState.standartTwoBedBalcony.title",
    },
    {
      type: "standart-big-bed-balcony",
      area: 18,
      guests: "2",
      src: imgs.standartBigBedAndBalconyPreview,
      title: "roomsState.standartBigBedBalcony.title",
    },
    {
      type: "standart-two-bed",
      area: 18,
      guests: "2",
      src: imgs.standartTwoBedPreview,
      title: "roomsState.standartTwoBed.title",
    },
    {
      type: "standart-big-bed",
      area: 18,
      guests: "2",
      src: imgs.standartBigBedPreview,
      title: "roomsState.standartBigbed.title",
    },
    {
      type: "standart-single",
      area: 15,
      guests: "1",
      src: imgs.standartSinglePreview,
      title: "roomsState.standartSingle.title",
    },
  ],
};
