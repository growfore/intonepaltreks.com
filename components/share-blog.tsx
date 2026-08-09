"use client";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function ShareBlog({
  shareUrl,
  title,
}: Readonly<{
  shareUrl: string;
  title: string;
}>) {
  return (
    <div className="flex items-center">
      Share on:
      <div className="flex gap-4 ml-8 items-center">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <EmailShareButton url={shareUrl} subject={title} body="body">
          <EmailIcon size={32} round />
        </EmailShareButton>

        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
