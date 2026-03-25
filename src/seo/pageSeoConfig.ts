type SiteLocale = "uk" | "en";

const getLocaleFromPath = (pathname: string): SiteLocale => {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "uk";
};

const stripLocalePrefix = (pathname: string): string => {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
};

type SeoMeta = {
  title: string;
  description: string;
  h1: string;
};

type SeoConfig = {
  uk: Record<string, SeoMeta>;
  en: Record<string, SeoMeta>;
};

const seoConfig: SeoConfig = {
  uk: {
    "/": {
      title: "Eurohotel Львів – готель у центрі Львова",
      description:
        "Eurohotel у центрі Львова пропонує комфортні номери, ресторан та конференц-сервіс. Забронюйте проживання онлайн.",
      h1: "Готель у центрі Львова",
    },
    "/about": {
      title: "Про готель Eurohotel Львів",
      description:
        "Дізнайтеся більше про Eurohotel у Львові: розташування, послуги та умови проживання для гостей міста.",
      h1: "Про готель Eurohotel",
    },
    "/booking": {
      title: "Бронювання готелю у Львові – Eurohotel",
      description:
        "Забронюйте номер у Львові в готелі Eurohotel. Зручне онлайн-бронювання та вигідні умови проживання.",
      h1: "Бронювання номера у Львові",
    },
    "/conference-service": {
      title: "Конференц-зал у Львові – Eurohotel",
      description:
        "Оренда конференц-залу у Львові для зустрічей, подій та бізнес-заходів. Сучасне обладнання в Eurohotel.",
      h1: "Конференц-сервіс у Львові",
    },
    "/contacts": {
      title: "Контакти Eurohotel Львів",
      description:
        "Контакти готелю Eurohotel у Львові: адреса, телефон та як нас знайти в центрі міста.",
      h1: "Контакти Eurohotel",
    },
    "/restaurant": {
      title: "Ресторан у Львові – Eurohotel",
      description:
        "Ресторан Eurohotel у Львові: сніданки, обіди та вечері у затишній атмосфері в центрі міста.",
      h1: "Ресторан Eurohotel",
    },
    "/rooms": {
      title: "Номери готелю у Львові – Eurohotel",
      description:
        "Оберіть номер у Львові в готелі Eurohotel: стандарт, напівлюкс або люкс для комфортного проживання.",
      h1: "Номери готелю Eurohotel",
    },
    "/rooms/lux-elegant": {
      title: "Люкс Elegant у Львові – Eurohotel",
      description:
        "Просторий номер люкс Elegant у Львові з сучасним дизайном для комфортного відпочинку.",
      h1: "Люкс Elegant",
    },
    "/rooms/lux-imperial": {
      title: "Люкс Imperial у Львові – Eurohotel",
      description:
        "Номер люкс Imperial у Львові з вишуканим інтер’єром та підвищеним рівнем комфорту.",
      h1: "Люкс Imperial",
    },
    "/rooms/lux-two-rooms": {
      title: "Двокімнатний люкс у Львові – Eurohotel",
      description:
        "Двокімнатний люкс у Львові для комфортного проживання з додатковим простором.",
      h1: "Двокімнатний люкс",
    },
    "/rooms/semi-lux": {
      title: "Напівлюкс у Львові – Eurohotel",
      description:
        "Номер напівлюкс у Львові з додатковим простором та комфортом для гостей.",
      h1: "Номер напівлюкс",
    },
    "/rooms/standart-big-bed": {
      title: "Стандартний номер з великим ліжком у Львові",
      description:
        "Стандартний номер у Львові з великим ліжком для комфортного проживання в центрі міста.",
      h1: "Стандартний номер з великим ліжком",
    },
    "/rooms/standart-big-bed-balcony": {
      title: "Номер з балконом у Львові – Eurohotel",
      description:
        "Комфортний номер з балконом у Львові для короткого або тривалого проживання.",
      h1: "Номер з балконом",
    },
    "/rooms/standart-single": {
      title: "Одномісний номер у Львові – Eurohotel",
      description:
        "Одномісний номер у Львові для індивідуального проживання. Зручний варіант у центрі міста.",
      h1: "Одномісний номер",
    },
    "/rooms/standart-two-bed": {
      title: "Двомісний номер з окремими ліжками у Львові",
      description:
        "Двомісний номер у Львові з двома ліжками – ідеально для друзів або колег.",
      h1: "Двомісний номер з окремими ліжками",
    },
    "/rooms/standart-two-bed-balcony": {
      title: "Двомісний номер з балконом у Львові",
      description:
        "Двомісний номер з балконом у Львові для комфортного проживання з додатковим простором.",
      h1: "Двомісний номер з балконом",
    },
    "/special-offers": {
      title: "Спеціальні пропозиції готелю у Львові",
      description:
        "Актуальні акції та спеціальні пропозиції готелю Eurohotel у Львові. Вигідні умови проживання.",
      h1: "Спеціальні пропозиції",
    },
    "/terrace": {
      title: "Тераса у Львові – Eurohotel",
      description:
        "Тераса готелю Eurohotel у Львові – ідеальне місце для відпочинку та приємного проведення часу.",
      h1: "Тераса Eurohotel",
    },
  },
  en: {
    "/": {
      title: "Eurohotel Lviv – Hotel in Lviv City Centre",
      description:
        "Eurohotel in Lviv city centre offers comfortable rooms, restaurant, and conference services. Book your stay in Lviv today.",
      h1: "Hotel in Lviv City Centre",
    },
    "/about": {
      title: "About Eurohotel Lviv – Hotel Overview",
      description:
        "Learn more about Eurohotel in Lviv, its location, services, and комфортні умови проживання для гостей міста.",
      h1: "About Eurohotel Lviv",
    },
    "/booking": {
      title: "Book a Room in Lviv – Eurohotel",
      description:
        "Book your hotel room in Lviv at Eurohotel. Easy online booking, best rates, and comfortable stay in the city centre.",
      h1: "Book a Room",
    },
    "/conference-service": {
      title: "Conference Hall in Lviv – Eurohotel",
      description:
        "Rent a conference hall in Lviv for meetings, events, and business gatherings. Modern facilities at Eurohotel.",
      h1: "Conference Services in Lviv",
    },
    "/contacts": {
      title: "Contacts – Eurohotel Lviv",
      description:
        "Contact Eurohotel in Lviv. Find address, phone number, and directions to the hotel in the city centre.",
      h1: "Eurohotel Contacts",
    },
    "/restaurant": {
      title: "Restaurant in Lviv – Eurohotel",
      description:
        "Visit Eurohotel restaurant in Lviv. Enjoy breakfast, lunch, and dinner with European cuisine in the city centre.",
      h1: "Restaurant in Eurohotel Lviv",
    },
    "/rooms": {
      title: "Hotel Rooms in Lviv – Eurohotel",
      description:
        "Explore hotel rooms in Lviv at Eurohotel. Choose from standard, semi-lux, and luxury rooms for your stay.",
      h1: "Rooms at Eurohotel",
    },
    "/rooms/lux-elegant": {
      title: "Elegant Suite in Lviv – Eurohotel",
      description:
        "Elegant suite room in Lviv with modern design and комфортом. Perfect for a premium stay at Eurohotel.",
      h1: "Elegant Suite Room",
    },
    "/rooms/lux-imperial": {
      title: "Imperial Suite in Lviv – Eurohotel",
      description:
        "Imperial suite in Lviv with spacious layout and classic interior. Ideal for luxury accommodation.",
      h1: "Imperial Suite Room",
    },
    "/rooms/lux-two-rooms": {
      title: "Two-Room Suite in Lviv – Eurohotel",
      description:
        "Two-room suite in Lviv for comfortable stays with extra space. Ideal for families or long visits.",
      h1: "Two-Room Suite",
    },
    "/rooms/semi-lux": {
      title: "Junior Suite in Lviv – Eurohotel",
      description:
        "Junior suite room in Lviv offering comfort and additional space. Great choice for a relaxed stay.",
      h1: "Junior Suite Room",
    },
    "/rooms/standart-big-bed": {
      title: "Standard Double Room in Lviv – Eurohotel",
      description:
        "Standard double room in Lviv with a large bed. Comfortable and affordable stay in the city centre.",
      h1: "Standard Double Room",
    },
    "/rooms/standart-big-bed-balcony": {
      title: "Double Room with Balcony in Lviv – Eurohotel",
      description:
        "Comfortable double room with balcony in Lviv. Ideal for short and long stays.",
      h1: "Double Room with Balcony",
    },
    "/rooms/standart-single": {
      title: "Standard Single Room in Lviv – Eurohotel",
      description:
        "Standard single room in Lviv for solo travellers. Affordable and comfortable accommodation.",
      h1: "Standard Single Room",
    },
    "/rooms/standart-two-bed": {
      title: "Standard Twin Room in Lviv – Eurohotel",
      description:
        "Standard twin room in Lviv with two beds. Perfect for friends or colleagues travelling together.",
      h1: "Standard Twin Room",
    },
    "/rooms/standart-two-bed-balcony": {
      title: "Twin Room with Balcony in Lviv – Eurohotel",
      description:
        "Twin room with balcony in Lviv. Comfortable stay with extra space and natural light.",
      h1: "Twin Room with Balcony",
    },
    "/special-offers": {
      title: "Hotel Special Offers in Lviv – Eurohotel",
      description:
        "Discover special offers and deals at Eurohotel Lviv. Save on your stay with seasonal promotions.",
      h1: "Special Offers",
    },
    "/terrace": {
      title: "Terrace in Lviv – Eurohotel",
      description:
        "Relax on the terrace at Eurohotel in Lviv. Perfect place to enjoy the view and fresh air.",
      h1: "Terrace at Eurohotel Lviv",
    },
  },
};

const fallbackSeo: SeoMeta = seoConfig.uk["/"];

export const getSeoMeta = (pathname: string): SeoMeta => {
  const locale: SiteLocale = getLocaleFromPath(pathname);
  const normalizedPath = stripLocalePrefix(pathname);
  const pageMeta = seoConfig[locale][normalizedPath];

  if (pageMeta) return pageMeta;
  return fallbackSeo;
};
