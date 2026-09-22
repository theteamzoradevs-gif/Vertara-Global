import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { CTABand } from "@/components/ui/CTABand";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { SubServiceCards } from "@/components/services/SubServiceCards";
import { ContactForm } from "@/components/leads/ContactForm";
import { getServiceBySlug, getServices, getSettings, getTestimonials, getClientLogos, getFaqs } from "@/lib/content";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { CompetitiveComparison } from "@/components/home/CompetitiveComparison";
import { TestimonialMarquee } from "@/components/home/TestimonialMarquee";
import { Accordion } from "@/components/ui/Accordion";
import { Mail, Phone } from "lucide-react";

const galleryBySlug: Record<string, string[]> = {
  talent: [
    "/images/talent-team.webp",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  ],
  workspace: [
    "/images/workspace-blue.webp",
    "/images/workspace-collab.jpg",
    "/images/workspace-vibrant.jpg",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  ],
  operations: [
    "/images/gcc-ops.png",
    "/images/gcc-floor.webp",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  advisory: [
    "/images/workspace-collab.jpg",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, settings, testimonials, logos, faqs] = await Promise.all([
    getServiceBySlug(slug),
    getSettings(),
    getTestimonials(),
    getClientLogos(),
    getFaqs(),
  ]);
  if (!service) notFound();

  const gallery = galleryBySlug[slug] ?? [service.image];

  return (
    <>
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/65 to-navy/40" />
          <FlowThreads intensity="medium" onDark className="opacity-45" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-highlight">
            Service
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
            {service.valueProposition}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#enquire" size="lg">
              Enquire about this service
            </Button>
            <Button
              href="#how-it-works"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 hover:text-white"
            >
              How it works
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 rounded-2xl border border-border bg-surface-elevated p-5 sm:grid-cols-3 sm:p-8">
          {service.metrics.map(
            (m: {
              label: string;
              value: number;
              suffix?: string;
              prefix?: string;
            }) => (
              <div
                key={m.label}
                className="rounded-xl bg-surface p-4 transition hover:border-accent hover:shadow-md sm:border sm:border-transparent"
              >
                <MetricCounter
                  value={m.value}
                  suffix={m.suffix}
                  prefix={m.prefix}
                  className="text-3xl font-bold text-accent md:text-4xl"
                />
                <p className="mt-1 text-sm text-muted">{m.label}</p>
              </div>
            ),
          )}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="Environment"
          title="What this looks like in practice"
          description="Real workplaces, teams, and operating environments — the tangible side of GCC delivery."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="group relative h-44 overflow-hidden rounded-2xl border border-border sm:h-52"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-60" />
            </div>
          ))}
        </div>
      </Section>

      <Section id="how-it-works">
        <SectionHeader
          eyebrow="Process"
          title="How this works"
          description="A numbered path from strategy to scale — expand any step for detail."
        />
        <ProcessSteps steps={service.processSteps} />
        <div className="mt-10">
          <CTABand
            title={`Ready to start on ${service.name}?`}
            primaryHref="#enquire"
            primaryLabel="Enquire now"
            secondaryHref="/engagement-models"
            secondaryLabel="See engagement models"
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="Capabilities"
          title="What’s included"
          description="Tap any card for more detail without leaving the page."
        />
        <SubServiceCards items={service.subServices} />
      </Section>

      <Section id="compare">
        <SectionHeader
          eyebrow="Compare"
          title="How this stacks up"
          description="See how a connected GCC partner differs from multi-vendor stacks and classic offshore models — then enquire below."
        />
        <CompetitiveComparison />
      </Section>

      {/* TESTIMONIALS & TRUST */}
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

      {/* FAQ SECTION */}
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title={`Frequently asked questions about ${service.name.toLowerCase()}`}
          description="Everything you need to know about timelines, ownership, and operations before starting."
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

      {/* ENQUIRY & CONTACT FORM */}
      <Section id="enquire" tone="muted">
        <SectionHeader
          eyebrow="Enquire"
          title={`Talk about ${service.name}`}
          description="Tell us your timeline and intent. A partner will respond within one business day — commercials are discussed live, not as generic rates."
        />
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
          <div className="flex flex-col">
            <ContactForm
              source={`service_${slug}`}
              defaultIntent={slug}
              submitLabel="Request a partner call"
            />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-border shadow-xs">
              <Image
                src={gallery[0]}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
              <p className="text-base font-bold text-navy">Prefer a direct line?</p>
              <div className="mt-4 space-y-2.5">
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-2.5 text-sm text-slate hover:text-accent font-medium transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  {settings.contactEmail}
                </a>
                <a
                  href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-slate hover:text-accent font-medium transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  {settings.contactPhone}
                </a>
              </div>
              <Button href="/contact" variant="outline" className="mt-5 w-full" size="sm">
                Full consultation page
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
