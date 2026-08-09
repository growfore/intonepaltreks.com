import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideHome } from "lucide-react";

type BCItem = { label: string; href?: string };

export function MyBreadCrumb({ items }: Readonly<{ items?: BCItem[] }>) {
  const renderDefault = () => (
    <Breadcrumb className="prose-li:before:mask-none">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <LucideHome />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="size-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/docs/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  if (!items || items.length === 0) return renderDefault();

  return (
    <Breadcrumb className="pt-12 pb-1 w-full shadow-none z-9">
      <BreadcrumbList>
        {items.map((it, idx) => (
          <span key={idx} className="flex items-center">
            <BreadcrumbItem>
              {it.href ? (
                <BreadcrumbLink asChild className=" cursor-pointer">
                  <Link href={it.href}>{it.label}</Link>
                </BreadcrumbLink>
              ) : idx === items.length - 1 ? (
                <BreadcrumbPage>{it.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbPage>{it.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {idx < items.length - 1 && <BreadcrumbSeparator />}
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
