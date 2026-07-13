import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { getPost } from "@/content/blog";
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

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en" : "uk";

  if (!slug) {
    return <Navigate to={buildLocalizedPath("/blog", locale)} replace />;
  }

  const post = getPost(slug, locale);

  if (!post) {
    return <Navigate to={buildLocalizedPath("/blog", locale)} replace />;
  }

  return (
    <div className="overflow-x-hidden bg-white pb-[60px] pt-[25.33vw] lg:pb-[80px] lg:pt-[9.18vw] 2xl:pt-[6.93vw]">
      <div className="mx-auto w-[89.58%] border-x border-[#C7C7C7]">
        <div className="border-b border-[#C7C7C7] px-[20px] py-[16px] lg:px-[40px] lg:py-[20px]">
          <Link
            to={buildLocalizedPath("/blog", locale)}
            className="inline-flex items-center gap-[8px] font-cofo-medium text-[12px] uppercase tracking-[-0.03em] text-[#8C331B] transition-colors hover:text-[#252526] md:text-[14px]"
          >
            <span aria-hidden>←</span>
            {t("blog.back")}
          </Link>
        </div>

        <article className="px-[20px] py-[32px] lg:px-[40px] lg:py-[48px]">
          <time className="font-cofo-medium text-[12px] uppercase tracking-[-0.03em] text-[#8C331B] lg:text-[14px]">
            {formatDate(post.date, locale)}
          </time>
          <h2 className="mt-[16px] max-w-[900px] font-cofo text-[36px] uppercase leading-[85%] tracking-[-0.07em] text-[#252526] lg:text-[64px]">
            {post.title}
          </h2>
          {post.description && (
            <p className="mt-[18px] max-w-[720px] font-cofo text-[14px] uppercase leading-[120%] text-[#444444] lg:text-[18px]">
              {post.description}
            </p>
          )}

          {post.cover && (
            <img
              src={post.cover}
              alt={post.title}
              className="mt-[28px] h-[220px] w-full object-cover lg:mt-[40px] lg:h-[420px]"
            />
          )}

          <div className="prose-blog mt-[32px] max-w-[760px] space-y-[18px] font-cofo text-[16px] leading-[160%] text-[#444444] lg:mt-[40px] lg:text-[18px]">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h3 className="pt-[12px] font-cofo text-[28px] uppercase leading-[90%] tracking-[-0.05em] text-[#252526] lg:text-[36px]">
                    {children}
                  </h3>
                ),
                h2: ({ children }) => (
                  <h3 className="pt-[18px] font-cofo text-[24px] uppercase leading-[90%] tracking-[-0.05em] text-[#252526] lg:text-[32px]">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className="pt-[10px] font-cofo-medium text-[18px] uppercase tracking-[-0.03em] text-[#252526] lg:text-[22px]">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="normal-case tracking-[0.01em]">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc space-y-[8px] pl-[20px] normal-case">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal space-y-[8px] pl-[20px] normal-case">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-[150%]">{children}</li>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[#8C331B] underline underline-offset-2 hover:text-[#252526]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="font-cofo-medium text-[#252526]">
                    {children}
                  </strong>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src || ""}
                    alt={alt || ""}
                    className="my-[16px] w-full object-cover"
                  />
                ),
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};
