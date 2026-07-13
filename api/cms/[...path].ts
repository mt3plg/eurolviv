import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  assertCmsAuthConfigured,
  authConfig,
  deletePost,
  getSessionToken,
  getToken,
  listGithubImages,
  listGithubPosts,
  parseJsonBody,
  requireCmsSession,
  type BlogPostInput,
  uploadGithubImage,
  validateCmsLogin,
  writePost,
} from "../_lib/cms-store.js";

const getAction = (req: VercelRequest): string => {
  const raw = req.query.path;
  if (typeof raw === "string" && raw) {
    try {
      return decodeURIComponent(raw.split("/")[0] || "");
    } catch {
      return raw.split("/")[0] || "";
    }
  }
  if (Array.isArray(raw) && raw[0]) {
    try {
      return decodeURIComponent(String(raw[0]));
    } catch {
      return String(raw[0]);
    }
  }

  const parts = (req.url || "").split("?")[0].split("/").filter(Boolean);
  const cmsIndex = parts.indexOf("cms");
  if (cmsIndex >= 0) {
    try {
      return decodeURIComponent(parts[cmsIndex + 1] || "");
    } catch {
      return parts[cmsIndex + 1] || "";
    }
  }
  return "";
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const action = getAction(req);

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

      const body = parseJsonBody(req);
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

    if (!requireCmsSession(req, res)) return;

    if (action === "posts" && req.method === "GET") {
      const posts = await listGithubPosts();
      return res.status(200).json({ posts });
    }

    if (action === "posts" && req.method === "POST") {
      const body = parseJsonBody(req);
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
      const body = parseJsonBody(req);
      const fileName = String(body.fileName || "image.jpg");
      const data = String(body.data || "");
      if (!data) return res.status(400).json({ error: "Немає файлу" });
      const url = await uploadGithubImage(fileName, data);
      return res.status(200).json({ url });
    }

    return res.status(404).json({ error: "Not found" });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
}
