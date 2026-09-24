import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/leads/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { JourneySteps } from "@/components/home/JourneySteps";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { FlowThreads } from "@/components/ui/FlowThreads";
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
      <Section id="enquire" tone="muted" className="bg-[#fbfbf9] py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Contact details & proposition */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1c2e24]">
                  CONTACT US
                </span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-navy leading-tight">
                Your next opportunity starts here.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                Talk to our team about your GCC plans, expansion goals or specific capabilities. We&apos;re here to help.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#cddcd1] bg-[#edf5ef] text-[#2e3f33] shadow-xs">
                  <Mail className="h-5 w-5 text-[#2e3f33]" />
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#cddcd1] bg-[#edf5ef] text-[#2e3f33] shadow-xs">
                  <Phone className="h-5 w-5 text-[#2e3f33]" />
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#cddcd1] bg-[#edf5ef] text-[#2e3f33] shadow-xs">
                  <MapPin className="h-5 w-5 text-[#2e3f33]" />
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
              submitLabel="Book a consultation"
              buttonVariant="primary"
              className="border border-[#cddcd1] bg-[#edf5ef] rounded-3xl shadow-xl shadow-navy/5 p-6 sm:p-8 md:p-10"
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

      {/* 4. FULL-WIDTH CTA BANNER */}
      <section className="relative w-full overflow-hidden text-white">
        <Image
          src="/images/workspace-vibrant.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl text-white">
              Ready to talk through your GCC plans?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
              Share a short brief a partner will map fit, timeline, and next steps. No sales theatre.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-start">
              <Button href="#enquire" variant="gold" size="lg" className="w-full text-center sm:w-auto">
                Get a quick call
              </Button>
              <Button
                href="/engagement-models"
                variant="outline"
                size="lg"
                className="w-full text-center border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Compare engagement models
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
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
      </Section>
    </>
  );
}
