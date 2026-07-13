export type BlogLocale = "uk" | "en";

export type BlogPostInput = {
  slug: string;
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  bodyUk: string;
  bodyEn: string;
  date: string;
  cover: string;
  draft: boolean;
};

export type BlogPostListItem = {
  slug: string;
  titleUk: string;
  titleEn: string;
  date: string;
  draft: boolean;
};

type BlogFrontmatter = {
  title?: string;
  date?: string;
  description?: string;
  cover?: string;
  draft?: boolean;
};

const unquote = (value: string): string => {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
};

export const parseFrontmatter = (
  raw: string
): { data: BlogFrontmatter; body: string } => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, body: raw.trim() };
  }

  const data: BlogFrontmatter = {};

  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = unquote(line.slice(separatorIndex + 1).trim());

    if (key === "draft") {
      data.draft = value === "true";
      continue;
    }
    if (key === "title") data.title = value;
    if (key === "date") data.date = value;
    if (key === "description") data.description = value;
    if (key === "cover") data.cover = value;
  }

  return { data, body: match[2].trim() };
};

export const serializeMarkdown = (input: {
  title: string;
  date: string;
  description: string;
  cover: string;
  draft: boolean;
  body: string;
}): string => {
  const escape = (value: string) => value.replace(/"/g, '\\"');

  return `---
title: "${escape(input.title)}"
date: ${input.date || new Date().toISOString()}
description: "${escape(input.description)}"
cover: "${escape(input.cover || "")}"
draft: ${input.draft ? "true" : "false"}
---

${input.body.trim()}
`;
};

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ye",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "yi",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "yu",
  я: "ya",
  "'": "",
  "’": "",
  "`": "",
};

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-") || "post";

export const parseFileName = (
  fileName: string
): { slug: string; locale: BlogLocale } | null => {
  const match = fileName.match(/^(.+)\.(uk|en)\.md$/);
  if (!match) return null;
  return { slug: match[1], locale: match[2] as BlogLocale };
};
