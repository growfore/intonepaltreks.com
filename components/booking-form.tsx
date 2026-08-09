"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideSend,
  LucideClock,
  LucideCheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { buildInquiryEmail } from "@/lib/email-template";
import { siteConfig } from "@/lib/siteConfig";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  destination: z.string().min(1, "Please select a destination"),
  groupSize: z.string().min(1, "Please select a group size"),
  startDate: z.string("Please choose your desired date for the activity."),
  experienceLevel: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type TPackageDetails = {
  id: string;
  slug: string;
  title: string;
};

const ContactForm = ({ packages }: { packages: TPackageDetails[] }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form_Component packages={packages} />
    </Suspense>
  );
};

export default ContactForm;

export function Form_Component({ packages }: { packages: TPackageDetails[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const searchParams = useSearchParams();
  const destinationParam = searchParams?.get("q") ?? "";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      destination: destinationParam || "",
      groupSize: "",
      startDate: "",
      experienceLevel: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (destinationParam) form.setValue("destination", destinationParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationParam]);

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/email/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: data.email,
            to: siteConfig.email,
            subject: `Website Booking: Inquiry from ${data.fullName} — ${data.destination}`,
            text: [
              `Name:              ${data.fullName}`,
              `Email:             ${data.email}`,
              `Phone:             ${data.phone || "Not provided"}`,
              `Destination:       ${data.destination}`,
              `Start Date:        ${data.startDate}`,
              `Group Size:        ${data.groupSize}`,
              `Experience Level:  ${data.experienceLevel || "Not specified"}`,
              ``,
              `Message:`,
              data.message,
            ].join("\n"),
            html: buildInquiryEmail(data),
          }),
          cache: "no-store",
        },
      );
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        "Something went wrong. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="relative bg-ink text-white py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,currentColor 39px,currentColor 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,currentColor 39px,currentColor 40px)",
          }}
        />
        <div className="container mx-auto relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 -tracking-[1.44px]">
            Plan Your New Adventure
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Ready to explore? Let us help you plan your perfect trekking and
            travel experience.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-canvas-soft py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ── Form card ── */}
            <div className="lg:col-span-8 bg-canvas rounded-2xl border shadow-sm overflow-hidden">
              {/* Card header */}
              <div className="px-8 pt-8 pb-6 border-b bg-canvas-soft">
                <h2 className="text-xl font-semibold tracking-tight">
                  Start Your Journey
                </h2>
                <p className="text-sm text-mute mt-1">
                  Tell us about your dream adventure and we&apos;ll create the
                  perfect experience for you.
                </p>
              </div>

              <div className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    {/* Row: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row: Phone + Start Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+977 9800000000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date *</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                min={today}
                                id="datePicker"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    {/* Destination */}
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desired Destination *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a destination" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {packages.map((pkg: TPackageDetails) => (
                                <SelectItem key={pkg.slug} value={pkg.slug}>
                                  {pkg.title.split(":")[0]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row: Group Size + Experience Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="groupSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Group Size *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select group size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">
                                  Solo (1 person)
                                </SelectItem>
                                <SelectItem value="2">
                                  Couple (2 people)
                                </SelectItem>
                                <SelectItem value="3-5">
                                  Small group (3-5)
                                </SelectItem>
                                <SelectItem value="6-10">
                                  Medium group (6-10)
                                </SelectItem>
                                <SelectItem value="10+">
                                  Large group (10+)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="beginner">
                                  Beginner
                                </SelectItem>
                                <SelectItem value="intermediate">
                                  Intermediate
                                </SelectItem>
                                <SelectItem value="advanced">
                                  Advanced
                                </SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Details *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your ideal trekking experience, special requirements, preferred dates, etc."
                              rows={5}
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit */}
                    <div className="pt-1">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gap-2"
                        size="lg"
                      >
                        <LucideSend className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                      </Button>
                    </div>

                    {/* Success */}
                    {submitSuccess && (
                      <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground border">
                        <LucideCheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        Form submitted successfully! We&apos;ll be in touch
                        soon.
                      </div>
                    )}
                  </form>
                </Form>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-4 space-y-4">
              {/* Contact info card */}
              <div className="bg-canvas rounded-2xl border shadow-sm p-6">
                <h3 className="font-semibold text-base mb-4">Reach Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg mt-0.5">
                      <LucidePhone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Call us</p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.phoneNumbers[0].phone}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg mt-0.5">
                      <LucideMail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.email}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg mt-0.5">
                      <LucideMapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.fullAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick response card */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <LucideClock className="w-4 h-4" />
                  <h3 className="font-semibold text-sm">Quick Response</h3>
                </div>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  We typically respond to all inquiries within 24 hours during
                  business days to help you plan your trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
