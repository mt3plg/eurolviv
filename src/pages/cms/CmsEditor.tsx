import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { cmsFetch, getCmsToken } from "@/cms/cmsApi";
import type { BlogPostInput } from "@/utils/blogMarkdown";
import { slugify } from "@/utils/blogMarkdown";

type LangTab = "uk" | "en";
type ViewTab = "write" | "preview" | "split";

const emptyPost: BlogPostInput = {
  slug: "",
  titleUk: "",
  titleEn: "",
  descriptionUk: "",
  descriptionEn: "",
  bodyUk: "",
  bodyEn: "",
  date: new Date().toISOString(),
  cover: "",
  draft: false,
};

const countWords = (value: string) =>
  value.trim() ? value.trim().split(/\s+/).length : 0;

const estimateReadMinutes = (words: number) => Math.max(1, Math.ceil(words / 200));

const draftKey = (slug?: string) =>
  `eurohotel-cms-draft:${slug || "new"}`;

const markdownPreviewComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h2 className="pt-[10px] font-cofo text-[26px] uppercase leading-[90%] tracking-[-0.04em] text-[#252526]">
      {children}
    </h2>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="pt-[8px] font-cofo text-[22px] uppercase leading-[90%] tracking-[-0.04em] text-[#252526]">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="pt-[4px] font-cofo-medium text-[17px] uppercase tracking-[-0.03em] text-[#252526]">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => <p>{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc space-y-[6px] pl-[20px]">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="list-decimal space-y-[6px] pl-[20px]">{children}</ol>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-2 border-[#8C331B] pl-[12px] text-[#666666]">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="bg-[#F2F2F2] px-[4px] py-[1px] text-[13px]">{children}</code>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a href={href} className="text-[#8C331B] underline" target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-cofo-medium text-[#252526]">{children}</strong>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img src={src || ""} alt={alt || ""} className="my-[10px] w-full object-cover" />
  ),
  hr: () => <hr className="border-[#E5E5E5]" />,
};

type ToolbarBtn = {
  label: string;
  title: string;
  action: () => void;
};

export const CmsEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const isNew = !slug;
  const navigate = useNavigate();
  const token = getCmsToken();
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<BlogPostInput>(emptyPost);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const skipHistoryRef = useRef(false);

  const [form, setForm] = useState<BlogPostInput>(emptyPost);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lang, setLang] = useState<LangTab>("uk");
  const [view, setView] = useState<ViewTab>("write");
  const [slugTouched, setSlugTouched] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [showMedia, setShowMedia] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  formRef.current = form;

  const pushHistory = useCallback((body: string) => {
    if (skipHistoryRef.current) {
      skipHistoryRef.current = false;
      return;
    }
    const next = historyRef.current.slice(0, historyIndexRef.current + 1);
    if (next[next.length - 1] === body) return;
    next.push(body);
    if (next.length > 80) next.shift();
    historyRef.current = next;
    historyIndexRef.current = next.length - 1;
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(false);
  }, []);

  const updateField = useCallback(
    <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setSuccess("");
      setDirty(true);
    },
    []
  );

  const activeTitle = lang === "uk" ? form.titleUk : form.titleEn;
  const activeDescription =
    lang === "uk" ? form.descriptionUk : form.descriptionEn;
  const activeBody = lang === "uk" ? form.bodyUk : form.bodyEn;

  const setActiveTitle = (value: string) => {
    if (lang === "uk") {
      updateField("titleUk", value);
      if (!slugTouched) updateField("slug", slugify(value));
    } else {
      updateField("titleEn", value);
    }
  };

  const setActiveDescription = (value: string) => {
    updateField(lang === "uk" ? "descriptionUk" : "descriptionEn", value);
  };

  const setActiveBody = (value: string, trackHistory = true) => {
    if (trackHistory) pushHistory(value);
    updateField(lang === "uk" ? "bodyUk" : "bodyEn", value);
  };

  const stats = useMemo(() => {
    const words = countWords(activeBody);
    return {
      words,
      chars: activeBody.length,
      descChars: activeDescription.length,
      readMin: estimateReadMinutes(words),
      headings: (activeBody.match(/^#{1,3}\s/gm) || []).length,
      links: (activeBody.match(/\[[^\]]+\]\([^)]+\)/g) || []).length,
      images: (activeBody.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length,
    };
  }, [activeBody, activeDescription]);

  const toc = useMemo(() => {
    return activeBody
      .split("\n")
      .map((line, index) => {
        const match = line.match(/^(#{1,3})\s+(.+)$/);
        if (!match) return null;
        return {
          level: match[1].length,
          text: match[2].trim(),
          line: index,
        };
      })
      .filter(Boolean) as Array<{ level: number; text: string; line: number }>;
  }, [activeBody]);

  const loadImages = useCallback(async () => {
    try {
      const data = await cmsFetch<{ images: string[] }>("/images");
      setImages(data.images);
    } catch {
      // ignore for empty folders
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    loadImages();
  }, [token, loadImages]);

  useEffect(() => {
    if (!token) return;

    if (isNew) {
      const saved = localStorage.getItem(draftKey());
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as BlogPostInput;
          setForm(parsed);
          setDirty(true);
          setSuccess("Відновлено локальну чернетку");
        } catch {
          // ignore
        }
      }
      historyRef.current = [""];
      historyIndexRef.current = 0;
      setLoading(false);
      return;
    }

    if (!slug) return;

    const load = async () => {
      try {
        const data = await cmsFetch<{ post: BlogPostInput }>(
          `/posts/${encodeURIComponent(slug)}`
        );
        setForm(data.post);
        setSlugTouched(true);
        historyRef.current = [data.post.bodyUk || ""];
        historyIndexRef.current = 0;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не вдалося завантажити");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isNew, slug, token]);

  useEffect(() => {
    if (!dirty) return;
    const timer = window.setTimeout(() => {
      localStorage.setItem(draftKey(slug), JSON.stringify(formRef.current));
      setLastSavedAt(new Date().toLocaleTimeString("uk-UA"));
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [form, dirty, slug]);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const insertMarkdown = (
    before: string,
    after = "",
    placeholder = "",
    block = false
  ) => {
    const el = bodyRef.current;
    if (!el) {
      setActiveBody(`${activeBody}${before}${placeholder}${after}`);
      return;
    }

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = activeBody.slice(start, end) || placeholder;
    const prefix =
      block && start > 0 && activeBody[start - 1] !== "\n" ? "\n" : "";
    const suffix =
      block && end < activeBody.length && activeBody[end] !== "\n" ? "\n" : "";
    const next =
      activeBody.slice(0, start) +
      prefix +
      before +
      selected +
      after +
      suffix +
      activeBody.slice(end);
    setActiveBody(next);

    requestAnimationFrame(() => {
      el.focus();
      const cursor =
        start +
        prefix.length +
        before.length +
        selected.length +
        after.length;
      el.setSelectionRange(cursor, cursor);
    });
  };

  const wrapSelection = (marker: string) => {
    insertMarkdown(marker, marker, "текст");
  };

  const undo = () => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    skipHistoryRef.current = true;
    const value = historyRef.current[historyIndexRef.current] || "";
    updateField(lang === "uk" ? "bodyUk" : "bodyEn", value);
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(true);
  };

  const redo = () => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    skipHistoryRef.current = true;
    const value = historyRef.current[historyIndexRef.current] || "";
    updateField(lang === "uk" ? "bodyUk" : "bodyEn", value);
    setCanUndo(true);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  };

  const clearLocalDraft = () => {
    localStorage.removeItem(draftKey(slug));
    setSuccess("Локальну чернетку очищено");
  };

  const findNext = () => {
    if (!findText || !bodyRef.current) return;
    const el = bodyRef.current;
    const from = el.selectionEnd;
    const index = activeBody.toLowerCase().indexOf(findText.toLowerCase(), from);
    const fallback = activeBody.toLowerCase().indexOf(findText.toLowerCase());
    const found = index >= 0 ? index : fallback;
    if (found < 0) {
      setError("Нічого не знайдено");
      return;
    }
    el.focus();
    el.setSelectionRange(found, found + findText.length);
  };

  const replaceOne = () => {
    if (!findText || !bodyRef.current) return;
    const el = bodyRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = activeBody.slice(start, end);
    if (selected.toLowerCase() === findText.toLowerCase()) {
      const next =
        activeBody.slice(0, start) + replaceText + activeBody.slice(end);
      setActiveBody(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start, start + replaceText.length);
      });
      return;
    }
    findNext();
  };

  const replaceAll = () => {
    if (!findText) return;
    const regex = new RegExp(
      findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );
    const next = activeBody.replace(regex, replaceText);
    setActiveBody(next);
    setSuccess("Заміну виконано");
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Не вдалося прочитати файл"));
      reader.readAsDataURL(file);
    });

  const uploadImage = async (file: File, asCover = false) => {
    setUploading(true);
    setError("");
    try {
      const data = await fileToBase64(file);
      const result = await cmsFetch<{ url: string }>("/images", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, data }),
      });
      await loadImages();
      if (asCover) {
        updateField("cover", result.url);
      } else {
        insertMarkdown(`![${file.name}](`, ")", result.url, true);
      }
      setSuccess("Зображення завантажено");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка завантаження");
    } finally {
      setUploading(false);
    }
  };

  const onDropBody = async (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    await uploadImage(file);
  };

  const savePost = async (asDraft: boolean) => {
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const payload: BlogPostInput = {
        ...formRef.current,
        draft: asDraft,
        slug: slugify(
          formRef.current.slug ||
            formRef.current.titleUk ||
            formRef.current.titleEn
        ),
      };

      if (!payload.titleUk.trim()) {
        throw new Error("Додайте український заголовок");
      }
      if (!payload.bodyUk.trim()) {
        throw new Error("Додайте текст статті українською");
      }

      if (isNew) {
        const data = await cmsFetch<{ slug: string }>("/posts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        localStorage.removeItem(draftKey());
        setDirty(false);
        navigate(`/cms/edit/${data.slug}`, { replace: true });
      } else if (slug) {
        const data = await cmsFetch<{ slug: string }>(
          `/posts/${encodeURIComponent(slug)}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
        localStorage.removeItem(draftKey(slug));
        setDirty(false);
        if (data.slug !== slug) {
          navigate(`/cms/edit/${data.slug}`, { replace: true });
        }
      }

      setSuccess(
        asDraft
          ? "Чернетку збережено"
          : "Статтю опубліковано. Оновіть /blog, щоб побачити на сайті."
      );
      updateField("draft", asDraft);
      setDirty(false);
      setLastSavedAt(new Date().toLocaleTimeString("uk-UA"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не вдалося зберегти");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      if (!meta) return;

      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        void savePost(formRef.current.draft);
      }
      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        wrapSelection("**");
      }
      if (event.key.toLowerCase() === "i") {
        event.preventDefault();
        wrapSelection("*");
      }
      if (event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      }
      if (
        (event.key.toLowerCase() === "z" && event.shiftKey) ||
        event.key.toLowerCase() === "y"
      ) {
        event.preventDefault();
        redo();
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        setFindOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lang]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await savePost(form.draft);
  };

  const toolbar: ToolbarBtn[] = [
    { label: "H1", title: "Заголовок 1", action: () => insertMarkdown("# ", "", "Заголовок", true) },
    { label: "H2", title: "Заголовок 2", action: () => insertMarkdown("## ", "", "Підзаголовок", true) },
    { label: "H3", title: "Заголовок 3", action: () => insertMarkdown("### ", "", "Підпункт", true) },
    { label: "B", title: "Жирний (⌘B)", action: () => wrapSelection("**") },
    { label: "I", title: "Курсив (⌘I)", action: () => wrapSelection("*") },
    { label: "S", title: "Закреслений", action: () => wrapSelection("~~") },
    { label: "Quote", title: "Цитата", action: () => insertMarkdown("> ", "", "цитата", true) },
    { label: "Code", title: "Код", action: () => wrapSelection("`") },
    { label: "UL", title: "Список", action: () => insertMarkdown("- ", "", "пункт", true) },
    { label: "OL", title: "Нумерований", action: () => insertMarkdown("1. ", "", "пункт", true) },
    {
      label: "Link",
      title: "Посилання",
      action: () => insertMarkdown("[", "](https://)", "текст"),
    },
    {
      label: "HR",
      title: "Роздільник",
      action: () => insertMarkdown("\n---\n", "", "", true),
    },
    {
      label: "Table",
      title: "Таблиця",
      action: () =>
        insertMarkdown(
          "\n| Колонка 1 | Колонка 2 |\n| --- | --- |\n| значення | значення |\n",
          "",
          "",
          true
        ),
    },
  ];

  if (!token) {
    return <Navigate to="/cms/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F5F8] text-[14px] text-[#666666]">
        Завантаження...
      </div>
    );
  }

  const editorArea = (
    <textarea
      ref={bodyRef}
      value={activeBody}
      onChange={(e) => setActiveBody(e.target.value)}
      onDrop={onDropBody}
      onDragOver={(e) => e.preventDefault()}
      className={`w-full resize-y border-0 px-[16px] py-[16px] text-[15px] leading-[160%] text-[#333333] outline-none lg:px-[20px] ${
        fullscreen ? "min-h-[75vh]" : "min-h-[62vh]"
      }`}
      placeholder={`Пишіть статтю markdown’ом.

## Підзаголовок розділу

Текст абзацу...

### Окрема локація

Опис місця...

Можна перетягнути зображення прямо сюди.`}
      required={lang === "uk"}
    />
  );

  const previewArea = (
    <div
      className={`prose-blog space-y-[14px] overflow-auto px-[16px] py-[16px] text-[15px] leading-[160%] text-[#444444] lg:px-[20px] ${
        fullscreen ? "min-h-[75vh]" : "min-h-[62vh]"
      }`}
    >
      {activeBody.trim() ? (
        <ReactMarkdown components={markdownPreviewComponents}>
          {activeBody}
        </ReactMarkdown>
      ) : (
        <p className="text-[#888888]">Поки немає тексту для прев’ю</p>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#F2F5F8] ${fullscreen ? "fixed inset-0 z-50 overflow-auto" : ""}`}>
      <form onSubmit={onSubmit}>
        <div className="sticky top-0 z-20 border-b border-[#D9D9D9] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-[12px] px-[20px] py-[14px]">
            <div>
              <h1 className="font-cofo text-[22px] uppercase tracking-[-0.05em] text-[#252526] lg:text-[28px]">
                {isNew ? "Нова стаття" : "Редагування статті"}
              </h1>
              <p className="mt-[2px] text-[12px] text-[#888888]">
                {form.draft ? "Чернетка" : "Опубліковано"}
                {dirty ? " · незбережені зміни" : ""}
                {lastSavedAt ? ` · автозбереження ${lastSavedAt}` : ""}
                {" · "}
                {stats.words} слів · ~{stats.readMin} хв читання
              </p>
            </div>
            <div className="flex flex-wrap gap-[8px]">
              <Link
                to="/cms"
                className="border border-[#C7C7C7] bg-white px-[14px] py-[10px] text-[12px] uppercase tracking-[0.04em] text-[#252526]"
              >
                Назад
              </Link>
              <button
                type="button"
                disabled={saving}
                onClick={() => savePost(true)}
                className="border border-[#C7C7C7] bg-white px-[14px] py-[10px] text-[12px] uppercase tracking-[0.04em] text-[#252526] disabled:opacity-60"
              >
                Чернетка
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => savePost(false)}
                className="bg-[#8C331B] px-[14px] py-[10px] text-[12px] uppercase tracking-[0.04em] text-white hover:bg-[#252526] disabled:opacity-60"
              >
                {saving ? "Збереження..." : "Опублікувати"}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1280px] gap-[20px] px-[20px] py-[24px] xl:grid-cols-[1fr_300px]">
          <div className="space-y-[16px]">
            {(error || success) && (
              <p
                className={`border bg-white px-[14px] py-[10px] text-[13px] ${
                  error
                    ? "border-[#8C331B] text-[#8C331B]"
                    : "border-[#2F6B3A] text-[#2F6B3A]"
                }`}
              >
                {error || success}
              </p>
            )}

            <div className="border border-[#D9D9D9] bg-white p-[16px] lg:p-[20px]">
              <div className="mb-[16px] flex flex-wrap gap-[8px]">
                {(["uk", "en"] as LangTab[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLang(item)}
                    className={`px-[14px] py-[8px] text-[12px] uppercase tracking-[0.04em] ${
                      lang === item
                        ? "bg-[#252526] text-white"
                        : "border border-[#C7C7C7] text-[#252526]"
                    }`}
                  >
                    {item === "uk" ? "Українська" : "English"}
                  </button>
                ))}
              </div>

              <label className="block text-[12px] uppercase tracking-[0.04em] text-[#666666]">
                Заголовок
              </label>
              <input
                value={activeTitle}
                onChange={(e) => setActiveTitle(e.target.value)}
                className="mt-[6px] w-full border border-[#C7C7C7] px-[14px] py-[12px] font-cofo text-[22px] tracking-[-0.03em] text-[#252526] lg:text-[28px]"
                placeholder={
                  lang === "uk"
                    ? "Вихідні у Львові: 10 місць..."
                    : "Weekend in Lviv: 10 places..."
                }
                required={lang === "uk"}
              />

              <div className="mt-[16px] flex items-center justify-between gap-[12px]">
                <label className="block text-[12px] uppercase tracking-[0.04em] text-[#666666]">
                  Короткий опис (SEO / картка блогу)
                </label>
                <span
                  className={`text-[12px] ${
                    stats.descChars > 160 ? "text-[#8C331B]" : "text-[#888888]"
                  }`}
                >
                  {stats.descChars}/160
                </span>
              </div>
              <textarea
                value={activeDescription}
                onChange={(e) => setActiveDescription(e.target.value)}
                className="mt-[6px] min-h-[88px] w-full border border-[#C7C7C7] px-[14px] py-[12px] text-[14px] leading-[140%] text-[#444444]"
                placeholder="1–2 речення для прев’ю та meta description"
              />
            </div>

            <div className="border border-[#D9D9D9] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-[8px] border-b border-[#E5E5E5] px-[12px] py-[10px]">
                <div className="flex flex-wrap gap-[6px]">
                  {(["write", "preview", "split"] as ViewTab[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setView(item)}
                      className={`px-[12px] py-[7px] text-[12px] uppercase tracking-[0.04em] ${
                        view === item
                          ? "bg-[#252526] text-white"
                          : "border border-[#C7C7C7] text-[#252526]"
                      }`}
                    >
                      {item === "write"
                        ? "Редактор"
                        : item === "preview"
                          ? "Прев’ю"
                          : "Split"}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-[6px]">
                  <button
                    type="button"
                    disabled={!canUndo}
                    onClick={undo}
                    className="border border-[#C7C7C7] px-[8px] py-[5px] text-[11px] uppercase disabled:opacity-40"
                  >
                    Undo
                  </button>
                  <button
                    type="button"
                    disabled={!canRedo}
                    onClick={redo}
                    className="border border-[#C7C7C7] px-[8px] py-[5px] text-[11px] uppercase disabled:opacity-40"
                  >
                    Redo
                  </button>
                  <button
                    type="button"
                    onClick={() => setFindOpen((v) => !v)}
                    className="border border-[#C7C7C7] px-[8px] py-[5px] text-[11px] uppercase"
                  >
                    Find
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMedia((v) => !v)}
                    className="border border-[#C7C7C7] px-[8px] py-[5px] text-[11px] uppercase"
                  >
                    Media
                  </button>
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="border border-[#C7C7C7] px-[8px] py-[5px] text-[11px] uppercase"
                    disabled={uploading}
                  >
                    {uploading ? "..." : "Upload"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFullscreen((v) => !v)}
                    className="border border-[#C7C7C7] px-[8px] py-[5px] text-[11px] uppercase"
                  >
                    {fullscreen ? "Exit" : "Full"}
                  </button>
                </div>
              </div>

              {view !== "preview" && (
                <div className="flex flex-wrap gap-[6px] border-b border-[#E5E5E5] px-[12px] py-[8px]">
                  {toolbar.map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      title={btn.title}
                      onClick={btn.action}
                      className="border border-[#C7C7C7] px-[8px] py-[5px] text-[11px] uppercase"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}

              {findOpen && (
                <div className="flex flex-wrap items-center gap-[8px] border-b border-[#E5E5E5] bg-[#FAFAFA] px-[12px] py-[10px]">
                  <input
                    value={findText}
                    onChange={(e) => setFindText(e.target.value)}
                    placeholder="Знайти"
                    className="border border-[#C7C7C7] px-[10px] py-[7px] text-[13px]"
                  />
                  <input
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    placeholder="Замінити на"
                    className="border border-[#C7C7C7] px-[10px] py-[7px] text-[13px]"
                  />
                  <button
                    type="button"
                    onClick={findNext}
                    className="border border-[#C7C7C7] px-[10px] py-[7px] text-[11px] uppercase"
                  >
                    Далі
                  </button>
                  <button
                    type="button"
                    onClick={replaceOne}
                    className="border border-[#C7C7C7] px-[10px] py-[7px] text-[11px] uppercase"
                  >
                    Замінити
                  </button>
                  <button
                    type="button"
                    onClick={replaceAll}
                    className="border border-[#C7C7C7] px-[10px] py-[7px] text-[11px] uppercase"
                  >
                    Усі
                  </button>
                </div>
              )}

              {showMedia && (
                <div className="border-b border-[#E5E5E5] bg-[#FAFAFA] px-[12px] py-[12px]">
                  <div className="mb-[10px] flex items-center justify-between">
                    <p className="text-[12px] uppercase tracking-[0.04em] text-[#666666]">
                      Медіатека
                    </p>
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="border border-[#C7C7C7] px-[10px] py-[6px] text-[11px] uppercase"
                    >
                      Завантажити
                    </button>
                  </div>
                  {images.length === 0 ? (
                    <p className="text-[13px] text-[#888888]">Поки немає зображень</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-[8px] md:grid-cols-5">
                      {images.map((image) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() =>
                            insertMarkdown("![фото](", ")", image, true)
                          }
                          className="overflow-hidden border border-[#E0E0E0]"
                          title="Вставити в текст"
                        >
                          <img
                            src={image}
                            alt=""
                            className="h-[72px] w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {view === "write" && editorArea}
              {view === "preview" && previewArea}
              {view === "split" && (
                <div className="grid md:grid-cols-2">
                  <div className="border-r border-[#E5E5E5]">{editorArea}</div>
                  {previewArea}
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit space-y-[16px] xl:sticky xl:top-[88px]">
            <div className="border border-[#D9D9D9] bg-white p-[16px]">
              <h2 className="font-cofo-medium text-[13px] uppercase tracking-[0.04em] text-[#252526]">
                Налаштування
              </h2>

              <label className="mt-[14px] block text-[11px] uppercase tracking-[0.04em] text-[#666666]">
                URL (slug)
              </label>
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  updateField("slug", e.target.value);
                }}
                className="mt-[6px] w-full border border-[#C7C7C7] px-[10px] py-[9px] text-[13px]"
                placeholder="vyhidni-u-lvovi"
              />
              <p className="mt-[6px] text-[11px] leading-[140%] text-[#888888]">
                /blog/{form.slug || "slug"}
              </p>

              <label className="mt-[14px] block text-[11px] uppercase tracking-[0.04em] text-[#666666]">
                Дата публікації
              </label>
              <input
                type="datetime-local"
                value={form.date ? form.date.slice(0, 16) : ""}
                onChange={(e) =>
                  updateField(
                    "date",
                    e.target.value
                      ? new Date(e.target.value).toISOString()
                      : new Date().toISOString()
                  )
                }
                className="mt-[6px] w-full border border-[#C7C7C7] px-[10px] py-[9px] text-[13px]"
              />

              <label className="mt-[14px] block text-[11px] uppercase tracking-[0.04em] text-[#666666]">
                Обкладинка
              </label>
              <div className="mt-[6px] flex gap-[6px]">
                <input
                  value={form.cover}
                  onChange={(e) => updateField("cover", e.target.value)}
                  className="w-full border border-[#C7C7C7] px-[10px] py-[9px] text-[13px]"
                  placeholder="/blog-images/lviv.jpg"
                />
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="border border-[#C7C7C7] px-[10px] text-[11px] uppercase"
                >
                  +
                </button>
              </div>
              {form.cover ? (
                <img
                  src={form.cover}
                  alt=""
                  className="mt-[10px] h-[120px] w-full object-cover"
                />
              ) : (
                <div className="mt-[10px] flex h-[120px] items-center justify-center bg-[#F5F5F5] text-[11px] uppercase text-[#999999]">
                  Немає фото
                </div>
              )}

              <label className="mt-[14px] flex items-center gap-[8px] text-[13px] text-[#444444]">
                <input
                  type="checkbox"
                  checked={form.draft}
                  onChange={(e) => updateField("draft", e.target.checked)}
                />
                Чернетка
              </label>

              <button
                type="button"
                onClick={clearLocalDraft}
                className="mt-[12px] w-full border border-[#C7C7C7] px-[10px] py-[8px] text-[11px] uppercase"
              >
                Очистити локальну чернетку
              </button>
            </div>

            <div className="border border-[#D9D9D9] bg-white p-[16px] text-[12px] leading-[150%] text-[#666666]">
              <p className="font-cofo-medium uppercase tracking-[0.04em] text-[#252526]">
                Статистика
              </p>
              <ul className="mt-[10px] space-y-[6px]">
                <li>Слів: {stats.words}</li>
                <li>Символів: {stats.chars}</li>
                <li>Читання: ~{stats.readMin} хв</li>
                <li>Заголовків: {stats.headings}</li>
                <li>Посилань: {stats.links}</li>
                <li>Зображень у тексті: {stats.images}</li>
              </ul>
            </div>

            <div className="border border-[#D9D9D9] bg-white p-[16px] text-[12px] leading-[150%] text-[#666666]">
              <p className="font-cofo-medium uppercase tracking-[0.04em] text-[#252526]">
                Зміст статті
              </p>
              {toc.length === 0 ? (
                <p className="mt-[10px]">Додайте ## або ### у тексті</p>
              ) : (
                <ul className="mt-[10px] space-y-[6px]">
                  {toc.map((item) => (
                    <li
                      key={`${item.line}-${item.text}`}
                      style={{ paddingLeft: `${(item.level - 1) * 10}px` }}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </form>

      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadImage(file, true);
          e.target.value = "";
        }}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadImage(file, false);
          e.target.value = "";
        }}
      />
    </div>
  );
};
