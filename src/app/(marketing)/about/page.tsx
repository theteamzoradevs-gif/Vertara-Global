import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/leads/ContactForm";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { OurVision } from "@/components/home/OurVision";
import { WhoAreWe } from "@/components/home/WhoAreWe";
import { PractitionersTeam } from "@/components/home/PractitionersTeam";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import {
  getSettings,
  getTestimonials,
  getClientLogos,
  getFaqs,
} from "@/lib/content";

export const metadata = {
  title: "About",
  description: "Company story, leadership, and credibility markers for GCC Advisor.",
};

export default async function AboutPage() {
  const [settings, testimonials, logos, faqs] = await Promise.all([
    getSettings(),
    getTestimonials(),
    getClientLogos(),
    getFaqs(),
  ]);

  return (
    <>
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/65 to-navy/45" />
          <FlowThreads intensity="medium" onDark className="opacity-50" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b49339]">
            About
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            About {settings.brandName}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            {settings.aboutMission}
          </p>
        </div>
      </section>

      {/* 2. Our Story & Vision */}
      <OurVision />

      {/* 4. Foundation Pillars & Operator Mindset */}
      <WhoAreWe />

      {/* 5. Leadership Team */}
      <PractitionersTeam />

      {/* 6. Client Voices & Testimonials */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Trust"
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

      {/* 7. Contact & Enquiry */}
      <Section>
        <SectionHeader
          eyebrow="Enquire"
          title="Start a conversation with the team"
          description="Share what you’re building, we’ll connect you with the right partner."
        />
        <div className="mx-auto max-w-2xl">
          <ContactForm source="about" submitLabel="Request a partner call" />
        </div>
      </Section>

      {/* 8. FAQ Section */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions about Vertara"
          description="Timelines, ownership models, governance, and leadership answered upfront."
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
