import { cache } from "react";

// Fetches the platform API as this tenant. The X-Api-Key header resolves the
// tenant on the backend — any frontend with the key can consume the tenant's
// data, no slug or frontend coupling needed.
export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const base =
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const key = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";
  const h = new Headers(init?.headers);
  if (key) h.set("X-Api-Key", key);
  return fetch(`${base}${path}`, { ...init, headers: h });
}

export const getGuides = cache(async () => {
  const res = await apiFetch("/blogs/published?category=travel-guide", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch guides");
  return res.json();
});

export const getCompanyInfos = cache(async () => {
  const res = await apiFetch("/blogs/published?category=company", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch company infos");
  return res.json();
});

export const getFooterItems = cache(async () => {
  const res = await apiFetch("/footer", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch footer items.");
  return res.json();
});
