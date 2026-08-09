"use client";

import { siteConfig } from "@/lib/siteConfig";
import { FloatingWhatsApp } from "@digicroz/react-floating-whatsapp";

export default function FloatingWhatsAppIcon() {
  return (
    <div>
      <FloatingWhatsApp
        className=""
        phoneNumber={siteConfig.whatsAppNumber}
        avatar={"/favicon.ico"}
        buttonStyle={{
          position: "fixed",
          bottom: "72px",
          right: "16px",
        }}
        accountName={siteConfig.name}
      />
    </div>
  );
}
