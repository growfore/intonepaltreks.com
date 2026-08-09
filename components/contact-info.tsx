import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const ContactInfo = () => {
  return (
    <div className="bg-canvas border border-hairline rounded-md p-6">
      <h2 className="text-lg font-semibold text-ink mb-6 pb-4 border-b border-hairline">
        Contact Information
      </h2>

      <div className="space-y-5 mb-6">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">
              Our Location
            </h3>
            <p className="text-sm text-body">
              Into Nepal Treks &amp; Travels P (Ltd)
            </p>
            <p className="text-sm text-body">Lakeside, Pokhara, Nepal</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaPhoneAlt className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">
              Phone Numbers
            </h3>
            <a
              href={`tel:${siteConfig.phoneNumbers[0].phone.replace(/[^+\d]/g, "")}`}
              className="block text-sm text-body hover:text-ink transition-colors"
            >
              {siteConfig.phoneNumbers[0].phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaEnvelope className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">
              Email Address
            </h3>
            <a
              href={`mailto:${siteConfig?.email}`}
              className="text-sm text-body hover:text-ink transition-colors"
            >
              {siteConfig?.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaWhatsapp className="text-mute text-lg mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink mb-0.5">WhatsApp</h3>
            <a
              href={`https://wa.me/${siteConfig.whatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-body hover:text-ink transition-colors"
            >
              {siteConfig.phoneNumbers[0].phone}
            </a>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-hairline">
        <h3 className="text-sm font-medium text-ink mb-3">Connect With Us</h3>
        <Link
          href={siteConfig.socials.facebook}
          target="_blank"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm text-body hover:text-ink hover:bg-canvas-soft rounded-sm transition-colors"
        >
          <FaFacebook className="text-lg" />
          <span>Facebook</span>
        </Link>
      </div>
    </div>
  );
};

export default ContactInfo;
