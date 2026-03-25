export type SiteLocale = "uk" | "en";

export const DEFAULT_LOCALE: SiteLocale = "uk";

export const getLocaleFromPath = (pathname: string): SiteLocale => {
  return pathname.startsWith("/en") ? "en" : "uk";
};

export const stripLocalePrefix = (pathname: string): string => {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    return pathname.replace("/en", "");
  }
  return pathname;
};

export const buildLocalizedPath = (
  pathname: string,
  locale: SiteLocale
): string => {
  const normalized = stripLocalePrefix(pathname);

  if (locale === "uk") {
    return normalized || "/";
  }

  if (normalized === "/") {
    return "/en";
  }

  return `/en${normalized}`;
};
