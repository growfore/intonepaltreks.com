const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_BASE_URL || "").origin;
  } catch {
    return "";
  }
})();

export const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (API_ORIGIN && url.startsWith("/")) return `${API_ORIGIN}${url}`;
  return url.startsWith("/") ? url : `/${url}`;
};
