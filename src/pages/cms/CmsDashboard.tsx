import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { clearCmsToken, cmsFetch, getCmsToken } from "@/cms/cmsApi";
import type { BlogPostListItem } from "@/utils/blogMarkdown";

export const CmsDashboard = () => {
  const navigate = useNavigate();
  const token = getCmsToken();
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      try {
        const data = await cmsFetch<{ posts: BlogPostListItem[] }>("/posts");
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Помилка завантаження");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const onDelete = async (slug: string) => {
    if (!window.confirm(`Видалити статтю «${slug}»?`)) return;
    try {
      await cmsFetch(`/posts/${encodeURIComponent(slug)}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((post) => post.slug !== slug));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не вдалося видалити");
    }
  };

  const onLogout = () => {
    clearCmsToken();
    navigate("/cms/login", { replace: true });
  };

  if (!token) {
    return <Navigate to="/cms/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F2F5F8] px-[20px] py-[32px]">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-[24px] flex flex-wrap items-center justify-between gap-[12px]">
          <div>
            <h1 className="font-cofo text-[32px] uppercase tracking-[-0.05em] text-[#252526]">
              Блог CMS
            </h1>
            <p className="mt-[6px] text-[14px] text-[#666666]">
              Створення та редагування статей
            </p>
          </div>
          <div className="flex gap-[10px]">
            <Link
              to="/cms/new"
              className="bg-[#8C331B] px-[16px] py-[10px] text-[12px] uppercase tracking-[0.04em] text-white hover:bg-[#252526]"
            >
              Нова стаття
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="border border-[#C7C7C7] bg-white px-[16px] py-[10px] text-[12px] uppercase tracking-[0.04em] text-[#252526]"
            >
              Вийти
            </button>
          </div>
        </div>

        {error && (
          <p className="mb-[16px] border border-[#8C331B] bg-white px-[14px] py-[10px] text-[13px] text-[#8C331B]">
            {error}
          </p>
        )}

        <div className="border border-[#D9D9D9] bg-white">
          {loading ? (
            <p className="px-[20px] py-[28px] text-[14px] text-[#666666]">
              Завантаження...
            </p>
          ) : posts.length === 0 ? (
            <p className="px-[20px] py-[28px] text-[14px] text-[#666666]">
              Статей ще немає. Створіть першу.
            </p>
          ) : (
            <ul className="divide-y divide-[#E5E5E5]">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="flex flex-wrap items-center justify-between gap-[12px] px-[20px] py-[16px]"
                >
                  <div>
                    <p className="font-cofo-medium text-[16px] text-[#252526]">
                      {post.titleUk || post.titleEn || post.slug}
                    </p>
                    <p className="mt-[4px] text-[12px] uppercase tracking-[0.03em] text-[#888888]">
                      {post.slug} · {post.draft ? "чернетка" : "опубліковано"}
                    </p>
                  </div>
                  <div className="flex gap-[8px]">
                    <Link
                      to={`/cms/edit/${post.slug}`}
                      className="border border-[#C7C7C7] px-[12px] py-[8px] text-[12px] uppercase tracking-[0.03em] text-[#252526] hover:border-[#8C331B] hover:text-[#8C331B]"
                    >
                      Редагувати
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(post.slug)}
                      className="border border-[#C7C7C7] px-[12px] py-[8px] text-[12px] uppercase tracking-[0.03em] text-[#8C331B]"
                    >
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a
          href="/blog"
          className="mt-[18px] inline-block text-[13px] text-[#8C331B] hover:text-[#252526]"
        >
          ← Переглянути блог
        </a>
      </div>
    </div>
  );
};
