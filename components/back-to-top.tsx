"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/package/")) return;

    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname.startsWith("/package/")) return null;

  return (
    show && (
      <Button
        title="Back to Top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        variant={"default"}
        className="bg-primary hover:bg-primary/90 hover:cursor-pointer rounded-full fixed left-2 bottom-2"
      >
        <ChevronUp color="white" />
      </Button>
    )
  );
}
