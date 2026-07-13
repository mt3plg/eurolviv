import {
  parseFileName,
  parseFrontmatter,
  type BlogLocale,
} from "@/utils/blogMarkdown";

export type BlogPost = {
  slug: string;
  locale: BlogLocale;
  title: string;
  date: string;
  description: string;
  cover?: string;
  draft: boolean;
  body: string;
};

const markdownModules = import.meta.glob("../../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const allPosts: BlogPost[] = Object.entries(markdownModules)
  .flatMap(([path, raw]) => {
    const fileName = path.split("/").pop() || "";
    const meta = parseFileName(fileName);
    if (!meta) return [];

    const { data, body } = parseFrontmatter(raw);

    const post: BlogPost = {
      slug: meta.slug,
      locale: meta.locale,
      title: data.title || meta.slug,
      date: data.date || "",
      description: data.description || "",
      draft: Boolean(data.draft),
      body,
    };

    if (data.cover) {
      post.cover = data.cover;
    }

    return [post];
  })
  .sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });

export const getPosts = (locale: BlogLocale): BlogPost[] =>
  allPosts.filter((post) => post.locale === locale && !post.draft);

export const getPost = (
  slug: string,
  locale: BlogLocale
): BlogPost | undefined =>
  allPosts.find(
    (post) => post.slug === slug && post.locale === locale && !post.draft
  );

export type { BlogLocale };
