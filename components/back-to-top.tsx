"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    show && (
      <Button
        title="Back to Top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        variant={"default"}
        className="bg-primary hover:bg-primary/90 hover:cursor-pointer rounded-full fixed left-2 bottom-16 md:bottom-2 z-40"
      >
        <ChevronUp color="white" />
      </Button>
    )
  );
}
