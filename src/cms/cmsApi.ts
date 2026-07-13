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
    throw new Error(data.error || "Request failed");
  }
  return data as T;
};
