import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { cmsFetch, getCmsToken, setCmsToken } from "@/cms/cmsApi";

export const CmsLogin = () => {
  const navigate = useNavigate();
  const token = getCmsToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await cmsFetch<{ token: string }>("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setCmsToken(data.token);
      navigate("/cms", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка входу");
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    return <Navigate to="/cms" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2F5F8] px-[20px]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[400px] border border-[#D9D9D9] bg-white p-[28px]"
      >
        <h1 className="font-cofo text-[28px] uppercase tracking-[-0.05em] text-[#252526]">
          Eurohotel CMS
        </h1>
        <p className="mt-[8px] text-[14px] text-[#666666]">
          Увійдіть, щоб керувати блогом
        </p>

        <label className="mt-[24px] block text-[12px] uppercase tracking-[0.04em] text-[#252526]">
          Логін
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-[6px] w-full border border-[#C7C7C7] px-[12px] py-[10px] text-[14px]"
          autoComplete="username"
          required
        />

        <label className="mt-[16px] block text-[12px] uppercase tracking-[0.04em] text-[#252526]">
          Пароль
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-[6px] w-full border border-[#C7C7C7] px-[12px] py-[10px] text-[14px]"
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="mt-[12px] text-[13px] text-[#8C331B]">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-[20px] w-full bg-[#252526] px-[12px] py-[12px] text-[13px] uppercase tracking-[0.04em] text-white hover:bg-[#8C331B] disabled:opacity-60"
        >
          {loading ? "Вхід..." : "Увійти"}
        </button>

        <a
          href="/"
          className="mt-[16px] inline-block text-[13px] text-[#8C331B] hover:text-[#252526]"
        >
          ← На сайт
        </a>
      </form>
    </div>
  );
};
