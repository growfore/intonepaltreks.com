"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      const whatsappMessage = `
*New Contact Form Submission*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappNumber = siteConfig.whatsAppNumber;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");

      toast.success("Opening WhatsApp with your message...");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to open WhatsApp. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-canvas border border-hairline rounded-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
            Full Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
            Phone Number
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-sm border border-hairline bg-canvas text-ink text-sm placeholder:text-mute focus:border-ring focus:ring-[3px] focus:ring-ring/50 outline-none transition"
            placeholder="What information do you need?"
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          <FaWhatsapp className="text-lg" />
          {loading ? "Preparing..." : "Send via WhatsApp"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
