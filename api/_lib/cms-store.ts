import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  assertCmsAuthConfigured,
  getCmsAuthConfig,
  getCmsSessionToken,
  validateCmsLogin,
} from "./cms-auth.js";
import {
  parseFileName,
  parseFrontmatter,
  serializeMarkdown,
  slugify,
  type BlogPostInput,
} from "./blog-markdown.js";

const REPO = process.env.CMS_GITHUB_REPO || "mt3plg/eurolviv";
const BRANCH = process.env.CMS_GITHUB_BRANCH || "main";
export const authConfig = getCmsAuthConfig();

type GithubContent = {
  content?: string;
  sha?: string;
  name?: string;
  path?: string;
  type?: string;
};

export const getToken = () => process.env.CMS_GITHUB_TOKEN || "";

export const unauthorized = (res: VercelResponse) =>
  res.status(401).json({ error: "Unauthorized" });

export const getAuthHeader = (req: VercelRequest) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return "";
  return header.slice(7);
};

export const getSessionToken = () => getCmsSessionToken(authConfig);

export const requireCmsSession = (req: VercelRequest, res: VercelResponse) => {
  try {
    assertCmsAuthConfigured(authConfig);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "CMS не налаштовано на Vercel",
    });
    return false;
  }

  const session = getAuthHeader(req);
  if (!session || session !== getSessionToken()) {
    unauthorized(res);
    return false;
  }
  return true;
};

export {
  assertCmsAuthConfigured,
  validateCmsLogin,
  type BlogPostInput,
};

const githubFetch = async (pathname: string, init?: RequestInit) => {
  const token = getToken();
  if (!token) throw new Error("CMS_GITHUB_TOKEN не налаштовано");

  return fetch(`https://api.github.com/repos/${REPO}${pathname}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  });
};

const encodeGithubPath = (filePath: string) =>
  filePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

export const listGithubPosts = async () => {
  const response = await githubFetch(`/contents/content/blog?ref=${BRANCH}`);
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`GitHub list failed: ${response.status}`);
  }

  const files = (await response.json()) as GithubContent[];
  const bySlug = new Map<
    string,
    {
      slug: string;
      titleUk: string;
      titleEn: string;
      date: string;
      draft: boolean;
    }
  >();

  for (const file of files) {
    if (!file.name || !file.name.endsWith(".md") || !file.path) continue;
    const meta = parseFileName(file.name);
    if (!meta) continue;

    const fileRes = await githubFetch(
      `/contents/${encodeGithubPath(file.path)}?ref=${BRANCH}`
    );
    if (!fileRes.ok) continue;
    const fileData = (await fileRes.json()) as GithubContent;
    const raw = Buffer.from(fileData.content || "", "base64").toString("utf8");
    const { data } = parseFrontmatter(raw);

    const current = bySlug.get(meta.slug) || {
      slug: meta.slug,
      titleUk: "",
      titleEn: "",
      date: data.date || "",
      draft: Boolean(data.draft),
    };
    if (meta.locale === "uk") current.titleUk = data.title || meta.slug;
    if (meta.locale === "en") current.titleEn = data.title || meta.slug;
    if (data.date) current.date = data.date;
    current.draft = Boolean(data.draft);
    bySlug.set(meta.slug, current);
  }

  return Array.from(bySlug.values()).sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });
};

const readGithubFile = async (filePath: string) => {
  const response = await githubFetch(
    `/contents/${encodeGithubPath(filePath)}?ref=${BRANCH}`
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub read failed: ${response.status}`);
  const data = (await response.json()) as GithubContent;
  return {
    raw: Buffer.from(data.content || "", "base64").toString("utf8"),
    sha: data.sha || "",
  };
};

const upsertGithubFile = async (
  filePath: string,
  content: string,
  message: string
) => {
  const existing = await readGithubFile(filePath);
  const response = await githubFetch(`/contents/${encodeGithubPath(filePath)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: BRANCH,
      ...(existing?.sha ? { sha: existing.sha } : {}),
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub write failed: ${response.status} ${text}`);
  }
};

const deleteGithubFile = async (filePath: string, message: string) => {
  const existing = await readGithubFile(filePath);
  if (!existing) return;
  const response = await githubFetch(`/contents/${encodeGithubPath(filePath)}`, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      branch: BRANCH,
      sha: existing.sha,
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub delete failed: ${response.status} ${text}`);
  }
};

export const readPost = async (slug: string): Promise<BlogPostInput | null> => {
  const uk = await readGithubFile(`content/blog/${slug}.uk.md`);
  const en = await readGithubFile(`content/blog/${slug}.en.md`);
  if (!uk && !en) return null;

  const ukParsed = parseFrontmatter(uk?.raw || "");
  const enParsed = parseFrontmatter(en?.raw || "");

  return {
    slug,
    titleUk: ukParsed.data.title || "",
    titleEn: enParsed.data.title || "",
    descriptionUk: ukParsed.data.description || "",
    descriptionEn: enParsed.data.description || "",
    bodyUk: ukParsed.body || "",
    bodyEn: enParsed.body || "",
    date: ukParsed.data.date || enParsed.data.date || new Date().toISOString(),
    cover: ukParsed.data.cover || enParsed.data.cover || "",
    draft: Boolean(ukParsed.data.draft || enParsed.data.draft),
  };
};

export const writePost = async (input: BlogPostInput) => {
  const slug = slugify(input.slug || input.titleUk || input.titleEn);
  const date = input.date || new Date().toISOString();

  const ukContent = serializeMarkdown({
    title: input.titleUk,
    date,
    description: input.descriptionUk,
    cover: input.cover,
    draft: input.draft,
    body: input.bodyUk,
  });
  const enContent = serializeMarkdown({
    title: input.titleEn || input.titleUk,
    date,
    description: input.descriptionEn || input.descriptionUk,
    cover: input.cover,
    draft: input.draft,
    body: input.bodyEn || input.bodyUk,
  });

  await upsertGithubFile(
    `content/blog/${slug}.uk.md`,
    ukContent,
    `cms: update blog post ${slug} (uk)`
  );
  await upsertGithubFile(
    `content/blog/${slug}.en.md`,
    enContent,
    `cms: update blog post ${slug} (en)`
  );

  return slug;
};

export const deletePost = async (slug: string) => {
  const response = await githubFetch(`/contents/content/blog?ref=${BRANCH}`);
  if (response.status === 404) return;
  if (!response.ok) {
    throw new Error(`GitHub list failed: ${response.status}`);
  }

  const files = (await response.json()) as GithubContent[];
  const targets = files.filter(
    (file) =>
      file.name === `${slug}.uk.md` ||
      file.name === `${slug}.en.md` ||
      file.name === `${encodeURIComponent(slug)}.uk.md` ||
      file.name === `${encodeURIComponent(slug)}.en.md`
  );

  for (const file of targets) {
    if (!file.path || !file.sha) continue;
    const deleteRes = await githubFetch(
      `/contents/${encodeGithubPath(file.path)}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          message: `cms: delete blog post ${file.name}`,
          branch: BRANCH,
          sha: file.sha,
        }),
      }
    );
    if (!deleteRes.ok) {
      const text = await deleteRes.text();
      throw new Error(`GitHub delete failed: ${deleteRes.status} ${text}`);
    }
  }

  if (targets.length === 0) {
    await deleteGithubFile(
      `content/blog/${slug}.uk.md`,
      `cms: delete blog post ${slug} (uk)`
    );
    await deleteGithubFile(
      `content/blog/${slug}.en.md`,
      `cms: delete blog post ${slug} (en)`
    );
  }
};

export const listGithubImages = async () => {
  const response = await githubFetch(
    `/contents/public/blog-images?ref=${BRANCH}`
  );
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`GitHub images list failed: ${response.status}`);
  }
  const files = (await response.json()) as GithubContent[];
  return files
    .filter(
      (file) =>
        file.name && file.name !== ".gitkeep" && !file.name.startsWith(".")
    )
    .map((file) => `/blog-images/${file.name}`)
    .sort();
};

export const uploadGithubImage = async (fileName: string, base64: string) => {
  const safeName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const finalName = `${Date.now()}-${safeName || "image.jpg"}`;
  const pure = base64.includes(",") ? base64.split(",")[1] : base64;
  const filePath = `public/blog-images/${finalName}`;

  const response = await githubFetch(`/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `cms: upload image ${finalName}`,
      content: pure,
      branch: BRANCH,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub image upload failed: ${response.status} ${text}`);
  }

  return `/blog-images/${finalName}`;
};

export const parseJsonBody = (req: VercelRequest) =>
  typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
