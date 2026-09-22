import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/leads/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { getSettings } from "@/lib/content";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Book a consultation with Vertara Global — low-friction form and direct contact details.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const email =
    settings.contactEmail && !settings.contactEmail.includes("gccadvisor")
      ? settings.contactEmail
      : "info@vertara.global";
  const phone = settings.contactPhone || "+91 120 456 7890";

  return (
    <>
      <PageHero
        title="Book a consultation"
        description="Tell us what you're building. A partner will respond within one business day."
      />
      <Section tone="muted" className="bg-[#fbfbf9] py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Contact details & proposition */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2.5">

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1c2e24]">
                  CONTACT US
                </span>
              </div>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-navy leading-[1.18]">
                Your next opportunity starts here.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                Talk to our team about your GCC plans, expansion goals or specific capabilities. We&apos;re here to help.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e8e0d2] bg-[#f4efe6] text-navy shadow-xs">
                  <Mail className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate">Email us</p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-0.5 block text-base font-semibold text-navy transition-colors hover:text-[#b49339]"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e8e0d2] bg-[#f4efe6] text-navy shadow-xs">
                  <Phone className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate">Call us</p>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="mt-0.5 block text-base font-semibold text-navy transition-colors hover:text-[#b49339]"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e8e0d2] bg-[#f4efe6] text-navy shadow-xs">
                  <MapPin className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate">Visit us</p>
                  <p className="mt-0.5 text-base font-semibold text-navy">
                    Gurugram, India
                  </p>

                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form Card */}
          <div className="lg:col-span-7">
            <ContactForm
              source="contact"
              title="Send us a message"

              submitLabel="Send message"
              buttonVariant="primary"
              className="border border-[#e2e8f0]/80 shadow-lg shadow-black/[0.03] sm:p-8"
            />
          </div>
        </div>

        {calendly ? (
          <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-surface-elevated">
            <iframe
              title="Schedule a consultation"
              src={calendly}
              className="h-[640px] w-full"
            />
          </div>
        ) : null}
      </Section>
    </>
  );
}
