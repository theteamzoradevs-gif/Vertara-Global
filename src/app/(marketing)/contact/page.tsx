import { Section, SectionHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/leads/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { getSettings } from "@/lib/content";
import { Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Book a consultation with GCC Advisor — low-friction form and direct contact details.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      <PageHero
        title="Book a consultation"
        description="Tell us what you're building. A partner will respond within one business day."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Enquire"
              title="Low-friction form"
              description="Name, company, and intent — enough for a useful first conversation."
            />
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface-elevated p-6">
              <h3 className="text-lg font-bold text-navy">Direct contact</h3>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mt-4 flex items-center gap-3 text-sm text-slate hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" />
                {settings.contactEmail}
              </a>
              <a
                href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
                className="mt-3 flex items-center gap-3 text-sm text-slate hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {settings.contactPhone}
              </a>
            </div>
            {calendly ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated">
                <iframe
                  title="Schedule a consultation"
                  src={calendly}
                  className="h-[640px] w-full"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted">
                Calendar booking can be enabled by setting{" "}
                <code className="text-navy">NEXT_PUBLIC_CALENDLY_URL</code> in
                your environment.
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
