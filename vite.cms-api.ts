import fs from "fs";
import path from "path";
import { loadEnv, type Plugin } from "vite";
import {
  assertCmsAuthConfigured,
  getCmsAuthConfig,
  getCmsSessionToken,
  validateCmsLogin,
} from "./cms-auth";
import {
  parseFileName,
  parseFrontmatter,
  serializeMarkdown,
  slugify,
  type BlogPostInput,
} from "./src/utils/blogMarkdown";

const BLOG_DIR = path.resolve(__dirname, "content/blog");
const IMAGES_DIR = path.resolve(__dirname, "public/blog-images");

const readJson = async (req: import("http").IncomingMessage) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const sendJson = (
  res: import("http").ServerResponse,
  status: number,
  data: unknown
) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const ensureBlogDir = () => {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
};

const listPosts = () => {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
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
    const meta = parseFileName(file);
    if (!meta) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
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

const readPost = (slug: string): BlogPostInput | null => {
  ensureBlogDir();
  const ukPath = path.join(BLOG_DIR, `${slug}.uk.md`);
  const enPath = path.join(BLOG_DIR, `${slug}.en.md`);
  if (!fs.existsSync(ukPath) && !fs.existsSync(enPath)) return null;

  const ukRaw = fs.existsSync(ukPath) ? fs.readFileSync(ukPath, "utf8") : "";
  const enRaw = fs.existsSync(enPath) ? fs.readFileSync(enPath, "utf8") : "";
  const uk = parseFrontmatter(ukRaw);
  const en = parseFrontmatter(enRaw);

  return {
    slug,
    titleUk: uk.data.title || "",
    titleEn: en.data.title || "",
    descriptionUk: uk.data.description || "",
    descriptionEn: en.data.description || "",
    bodyUk: uk.body || "",
    bodyEn: en.body || "",
    date: uk.data.date || en.data.date || new Date().toISOString(),
    cover: uk.data.cover || en.data.cover || "",
    draft: Boolean(uk.data.draft || en.data.draft),
  };
};

const writePost = (input: BlogPostInput) => {
  ensureBlogDir();
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

  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.uk.md`), ukContent, "utf8");
  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.en.md`), enContent, "utf8");
  return slug;
};

const deletePost = (slug: string) => {
  ensureBlogDir();
  for (const locale of ["uk", "en"] as const) {
    const filePath = path.join(BLOG_DIR, `${slug}.${locale}.md`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};

const isAuthorized = (
  req: import("http").IncomingMessage,
  sessionToken: string
) => {
  const header = req.headers.authorization || "";
  return header === `Bearer ${sessionToken}`;
};

const ensureImagesDir = () => {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
};

const listImages = () => {
  ensureImagesDir();
  return fs
    .readdirSync(IMAGES_DIR)
    .filter((file) => !file.startsWith(".") && file !== ".gitkeep")
    .map((file) => `/blog-images/${file}`)
    .sort();
};

const saveImage = (fileName: string, base64: string) => {
  ensureImagesDir();
  const safeName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const finalName = `${Date.now()}-${safeName || "image.jpg"}`;
  const pure = base64.includes(",") ? base64.split(",")[1] : base64;
  fs.writeFileSync(path.join(IMAGES_DIR, finalName), Buffer.from(pure, "base64"));
  return `/blog-images/${finalName}`;
};

export const cmsApiPlugin = (mode: string): Plugin => ({
  name: "cms-api-plugin",
  configureServer(server) {
    const env = loadEnv(mode, process.cwd(), "");
    const authConfig = getCmsAuthConfig(env);

    server.middlewares.use(async (req, res, next) => {
      const url = req.url?.split("?")[0] || "";
      if (!url.startsWith("/api/cms")) return next();

      try {
        if (url === "/api/cms/login" && req.method === "POST") {
          try {
            assertCmsAuthConfigured(authConfig);
          } catch (error) {
            return sendJson(res, 500, {
              error:
                error instanceof Error
                  ? error.message
                  : "CMS не налаштовано",
            });
          }

          const body = await readJson(req);
          const username = String(body.username || "").trim();
          const password = String(body.password || "");
          if (validateCmsLogin(username, password, authConfig)) {
            return sendJson(res, 200, {
              token: getCmsSessionToken(authConfig),
            });
          }
          return sendJson(res, 401, { error: "Невірний логін або пароль" });
        }

        try {
          assertCmsAuthConfigured(authConfig);
        } catch (error) {
          return sendJson(res, 500, {
            error:
              error instanceof Error ? error.message : "CMS не налаштовано",
          });
        }

        const sessionToken = getCmsSessionToken(authConfig);

        if (!isAuthorized(req, sessionToken)) {
          return sendJson(res, 401, { error: "Unauthorized" });
        }

        if (url === "/api/cms/posts" && req.method === "GET") {
          return sendJson(res, 200, { posts: listPosts() });
        }

        if (url === "/api/cms/posts" && req.method === "POST") {
          const body = (await readJson(req)) as BlogPostInput;
          if (!body.titleUk?.trim()) {
            return sendJson(res, 400, { error: "Потрібен український заголовок" });
          }
          const slug = writePost(body);
          return sendJson(res, 200, { slug });
        }

        if (url === "/api/cms/images" && req.method === "GET") {
          return sendJson(res, 200, { images: listImages() });
        }

        if (url === "/api/cms/images" && req.method === "POST") {
          const body = await readJson(req);
          const fileName = String(body.fileName || "image.jpg");
          const data = String(body.data || "");
          if (!data) {
            return sendJson(res, 400, { error: "Немає файлу" });
          }
          const urlPath = saveImage(fileName, data);
          return sendJson(res, 200, { url: urlPath });
        }

        const postMatch = url.match(/^\/api\/cms\/posts\/([^/]+)$/);
        if (postMatch) {
          const slug = decodeURIComponent(postMatch[1]);

          if (req.method === "GET") {
            const post = readPost(slug);
            if (!post) return sendJson(res, 404, { error: "Not found" });
            return sendJson(res, 200, { post });
          }

          if (req.method === "PUT") {
            const body = (await readJson(req)) as BlogPostInput;
            const nextSlug = writePost({ ...body, slug });
            if (nextSlug !== slug) deletePost(slug);
            return sendJson(res, 200, { slug: nextSlug });
          }

          if (req.method === "DELETE") {
            deletePost(slug);
            return sendJson(res, 200, { ok: true });
          }
        }

        return sendJson(res, 404, { error: "Not found" });
      } catch (error) {
        return sendJson(res, 500, {
          error: error instanceof Error ? error.message : "Server error",
        });
      }
    });
  },
});
