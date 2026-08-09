import { MenuController } from "./menu-controller";
import { cache } from "react";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
  parentId?: string | null;
  depth?: number;
};

type MenuData = {
  success: boolean;
  data: {
    items: MenuItem[];
    version: string;
    updatedAt: string;
  };
};

const fetchMenu = cache(async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data: MenuData = await res.json();
    return data?.data?.items ?? [];
  } catch {
    return [];
  }
});

// Root server component
export async function Navigation() {
  const items = await fetchMenu();

  return <MenuController items={items} />;
}