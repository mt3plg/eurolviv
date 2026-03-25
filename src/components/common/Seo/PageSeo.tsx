import { Helmet } from "react-helmet-async";
import { getSeoMeta } from "@/seo/pageSeoConfig";

type PageSeoProps = {
  pathname: string;
};

const CANONICAL_BASE_URL = "https://eurohotel.lviv.ua";

const getCanonicalPath = (pathname: string): string => {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

export const PageSeo = ({ pathname }: PageSeoProps) => {
  const seo = getSeoMeta(pathname);
  const canonicalUrl = `${CANONICAL_BASE_URL}${getCanonicalPath(pathname)}`;

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <h1
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {seo.h1}
      </h1>
    </>
  );
};
