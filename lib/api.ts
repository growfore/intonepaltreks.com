import { cache } from "react";

export const getGuides = cache(async () => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/blogs/published?category=travel-guide`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch guides");
  return res.json();
});

export const getCompanyInfos = cache(async () => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/blogs/published?category=company`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) throw new Error("Failed to fetch company infos");
  return res.json();
});

export const getFooterItems = cache(async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/footer`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch footer items.");
  return res.json();
});
