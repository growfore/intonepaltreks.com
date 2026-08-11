import { MenuController } from "./menu-controller";
import { cache } from "react";
import { apiFetch } from "@/lib/api";

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
    const res = await apiFetch(`/menu`, {
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