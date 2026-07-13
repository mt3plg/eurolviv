const TOKEN_KEY = "eurohotel-cms-token";

export const getCmsToken = () => localStorage.getItem(TOKEN_KEY) || "";

export const setCmsToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearCmsToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const cmsFetch = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const token = getCmsToken();
  const response = await fetch(`/api/cms${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fallback = response.statusText || "Request failed";
    throw new Error(
      typeof data.error === "string" && data.error ? data.error : fallback
    );
  }
  return data as T;
};
