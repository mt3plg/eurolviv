import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPosts } from "@/content/blog";
import { buildLocalizedPath } from "@/utils/localeRouting";

const formatDate = (value: string, locale: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const Blog = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en" : "uk";
  const posts = getPosts(locale);

  return (
    <div className="overflow-x-hidden bg-white pb-[60px] pt-[25.33vw] lg:pb-[80px] lg:pt-[9.18vw] 2xl:pt-[6.93vw]">
      <div className="mx-auto w-[89.58%] border-x border-[#C7C7C7]">
        <div className="border-b border-[#C7C7C7] px-[20px] py-[40px] text-center lg:px-[40px] lg:py-[60px]">
          <h2 className="font-cofo text-[40px] uppercase leading-[81%] tracking-[-0.07em] text-[#252526] lg:text-[72px]">
            {t("blog.title")}
          </h2>
          <p className="mx-auto mt-[16px] max-w-[640px] font-cofo text-[14px] uppercase leading-[120%] text-[#444444] lg:mt-[24px] lg:text-[16px]">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="divide-y divide-[#C7C7C7]">
          {posts.length === 0 ? (
            <p className="px-[20px] py-[40px] text-center font-cofo text-[14px] uppercase text-[#444444] lg:px-[40px]">
              {t("blog.empty")}
            </p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="grid grid-cols-1 gap-[20px] px-[20px] py-[28px] lg:grid-cols-[1.2fr_0.8fr] lg:gap-[40px] lg:px-[40px] lg:py-[40px]"
              >
                <div className="flex flex-col justify-center">
                  <time className="font-cofo-medium text-[12px] uppercase tracking-[-0.03em] text-[#8C331B] lg:text-[14px]">
                    {formatDate(post.date, locale)}
                  </time>
                  <h3 className="mt-[12px] font-cofo text-[28px] uppercase leading-[90%] tracking-[-0.06em] text-[#252526] lg:text-[40px]">
                    <Link
                      to={buildLocalizedPath(`/blog/${post.slug}`, locale)}
                      className="hover:text-[#8C331B]"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.description && (
                    <p className="mt-[14px] max-w-[640px] font-cofo text-[14px] uppercase leading-[120%] text-[#444444] lg:text-[16px]">
                      {post.description}
                    </p>
                  )}
                  <Link
                    to={buildLocalizedPath(`/blog/${post.slug}`, locale)}
                    className="mt-[20px] inline-flex w-fit items-center font-cofo-medium text-[12px] uppercase tracking-[-0.03em] text-[#8C331B] hover:text-[#252526] lg:text-[14px]"
                  >
                    {t("blog.readMore")} →
                  </Link>
                </div>

                {post.cover ? (
                  <Link
                    to={buildLocalizedPath(`/blog/${post.slug}`, locale)}
                    className="block overflow-hidden"
                  >
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="h-[220px] w-full object-cover lg:h-[280px]"
                      loading="lazy"
                    />
                  </Link>
                ) : (
                  <div className="hidden bg-[#F5F5F5] lg:block lg:h-[280px]" />
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
