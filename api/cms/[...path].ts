import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  assertCmsAuthConfigured,
  getCmsAuthConfig,
  getCmsSessionToken,
  validateCmsLogin,
} from "../_lib/cms-auth";
import {
  parseFileName,
  parseFrontmatter,
  serializeMarkdown,
  slugify,
  type BlogPostInput,
} from "../_lib/blog-markdown";

const REPO = process.env.CMS_GITHUB_REPO || "mt3plg/eurolviv";
const BRANCH = process.env.CMS_GITHUB_BRANCH || "main";
const authConfig = getCmsAuthConfig();

const getRouteParts = (req: VercelRequest): string[] => {
  const raw = req.query.path;
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string" && raw) return [raw];

  const parts = (req.url || "").split("?")[0].split("/").filter(Boolean);
  const cmsIndex = parts.indexOf("cms");
  if (cmsIndex >= 0) return parts.slice(cmsIndex + 1);
  return [];
};

type GithubContent = {
  content?: string;
  sha?: string;
  name?: string;
  path?: string;
  type?: string;
};

const getToken = () => process.env.CMS_GITHUB_TOKEN || "";

const unauthorized = (res: VercelResponse) =>
  res.status(401).json({ error: "Unauthorized" });

const getAuthHeader = (req: VercelRequest) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return "";
  return header.slice(7);
};

const githubFetch = async (pathname: string, init?: RequestInit) => {
  const token = getToken();
  if (!token) throw new Error("CMS_GITHUB_TOKEN не налаштовано");

  const response = await fetch(`https://api.github.com/repos/${REPO}${pathname}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  });

  return response;
};

const listGithubPosts = async () => {
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

    const fileRes = await githubFetch(`/contents/${file.path}?ref=${BRANCH}`);
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
  const response = await githubFetch(`/contents/${filePath}?ref=${BRANCH}`);
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
  const response = await githubFetch(`/contents/${filePath}`, {
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
  const response = await githubFetch(`/contents/${filePath}`, {
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

const readPost = async (slug: string): Promise<BlogPostInput | null> => {
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

const writePost = async (input: BlogPostInput) => {
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

const deletePost = async (slug: string) => {
  await deleteGithubFile(
    `content/blog/${slug}.uk.md`,
    `cms: delete blog post ${slug} (uk)`
  );
  await deleteGithubFile(
    `content/blog/${slug}.en.md`,
    `cms: delete blog post ${slug} (en)`
  );
};

const listGithubImages = async () => {
  const response = await githubFetch(`/contents/public/blog-images?ref=${BRANCH}`);
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`GitHub images list failed: ${response.status}`);
  const files = (await response.json()) as GithubContent[];
  return files
    .filter((file) => file.name && file.name !== ".gitkeep" && !file.name.startsWith("."))
    .map((file) => `/blog-images/${file.name}`)
    .sort();
};

const uploadGithubImage = async (fileName: string, base64: string) => {
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

const getSessionToken = () => getCmsSessionToken(authConfig);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const routeParts = getRouteParts(req);
    const action = routeParts[0] || "";
    const slug = routeParts[1] ? decodeURIComponent(routeParts[1]) : "";

    if (action === "login" && req.method === "POST") {
      try {
        assertCmsAuthConfigured(authConfig);
      } catch (error) {
        return res.status(500).json({
          error:
            error instanceof Error
              ? error.message
              : "CMS не налаштовано на Vercel",
        });
      }

      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const username = String(body.username || "").trim();
      const password = String(body.password || "");

      if (!validateCmsLogin(username, password, authConfig)) {
        return res.status(401).json({ error: "Невірний логін або пароль" });
      }
      if (!getToken()) {
        return res.status(500).json({
          error: "CMS_GITHUB_TOKEN не налаштовано на Vercel",
        });
      }
      return res.status(200).json({ token: getSessionToken() });
    }

    try {
      assertCmsAuthConfigured(authConfig);
    } catch (error) {
      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "CMS не налаштовано на Vercel",
      });
    }

    const session = getAuthHeader(req);
    if (!session || session !== getSessionToken()) return unauthorized(res);

    if (action === "posts" && !slug && req.method === "GET") {
      const posts = await listGithubPosts();
      return res.status(200).json({ posts });
    }

    if (action === "posts" && !slug && req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      if (!body.titleUk?.trim()) {
        return res.status(400).json({ error: "Потрібен український заголовок" });
      }
      const nextSlug = await writePost(body as BlogPostInput);
      return res.status(200).json({ slug: nextSlug });
    }

    if (action === "images" && req.method === "GET") {
      const images = await listGithubImages();
      return res.status(200).json({ images });
    }

    if (action === "images" && req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const fileName = String(body.fileName || "image.jpg");
      const data = String(body.data || "");
      if (!data) return res.status(400).json({ error: "Немає файлу" });
      const url = await uploadGithubImage(fileName, data);
      return res.status(200).json({ url });
    }

    if (action === "posts" && slug) {
      if (req.method === "GET") {
        const post = await readPost(slug);
        if (!post) return res.status(404).json({ error: "Not found" });
        return res.status(200).json({ post });
      }

      if (req.method === "PUT") {
        const body =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
        const nextSlug = await writePost({ ...(body as BlogPostInput), slug });
        if (nextSlug !== slug) await deletePost(slug);
        return res.status(200).json({ slug: nextSlug });
      }

      if (req.method === "DELETE") {
        await deletePost(slug);
        return res.status(200).json({ ok: true });
      }
    }

    return res.status(404).json({ error: "Not found" });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
}
