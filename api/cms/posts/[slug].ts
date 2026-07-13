import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  deletePost,
  parseJsonBody,
  readPost,
  requireCmsSession,
  type BlogPostInput,
  writePost,
} from "../../_lib/cms-store.js";

const getSlug = (req: VercelRequest): string => {
  const raw = req.query.slug;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return "";
  try {
    return decodeURIComponent(String(value));
  } catch {
    return String(value);
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!requireCmsSession(req, res)) return;

    const slug = getSlug(req);
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    if (req.method === "GET") {
      const post = await readPost(slug);
      if (!post) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ post });
    }

    if (req.method === "PUT") {
      const body = parseJsonBody(req);
      const nextSlug = await writePost({ ...(body as BlogPostInput), slug });
      if (nextSlug !== slug) await deletePost(slug);
      return res.status(200).json({ slug: nextSlug });
    }

    if (req.method === "DELETE") {
      await deletePost(slug);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Server error",
    });
  }
}
