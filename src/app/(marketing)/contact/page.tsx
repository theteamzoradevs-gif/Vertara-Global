import { Section, SectionHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/leads/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { JourneySteps } from "@/components/home/JourneySteps";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { getSettings, getTestimonials, getClientLogos, getFaqs } from "@/lib/content";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Book a consultation with Vertara Global — low-friction form and direct contact details.",
};

export default async function ContactPage() {
  const [settings, testimonials, logos, faqs] = await Promise.all([
    getSettings(),
    getTestimonials(),
    getClientLogos(),
    getFaqs(),
  ]);

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

      {/* 1. CONTACT FORM & DIRECT INFO */}
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

      {/* 2. HOW IT UNFOLDS / JOURNEY STEPS SECTION */}
      <JourneySteps />

      {/* 3. TESTIMONIALS & TRUST SECTION */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust & Track Record"
          title="Enterprises building lasting India capability"
          description="The capabilities we deliver, backed by the experiences of leaders building and scaling in India."
        />
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex min-h-[64px] items-center justify-center rounded-xl border border-[#cddcd1] bg-[#e5ebe6] px-2 py-2 text-center text-xs font-semibold text-navy transition hover:-translate-y-0.5 hover:border-[#2e3f33]/40 hover:shadow-md sm:min-h-[80px] sm:rounded-2xl sm:px-3 sm:text-sm"
            >
              {logo.logoText}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <TestimonialMarquee items={testimonials} />
        </div>
      </Section>

      {/* 4. FAQ SECTION */}
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Timelines, commercials, ownership models, and capability scaling answered upfront."
        />
        <Accordion
          items={faqs.slice(0, 5).map((f) => ({
            id: f.question,
            title: f.question,
            content: f.answer,
          }))}
        />
        <div className="mt-6 flex justify-center sm:justify-start">
          <Button href="/faq" variant="primary">
            View full FAQ
          </Button>
        </div>
        <div className="mt-12">
          <CTABand />
        </div>
      </Section>
    </>
  );
}
