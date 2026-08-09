import { siteConfig } from "./siteConfig";

export const siteUrl = siteConfig.url;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_BASE_URL || "").origin;
  } catch {
    return "";
  }
})();

export function imageUrl(path: string | null | undefined) {
  if (!path) return `${siteUrl}/og.png`;
  if (path.startsWith("http")) return path;
  const relative = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN || siteUrl}${relative}`;
}

export const defaultMetadataImages = [
  {
    url: `${siteUrl}/og.png`,
    width: 1200,
    height: 630,
    alt: siteConfig.name,
  },
];
