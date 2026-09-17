import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { ContactForm } from "@/components/leads/ContactForm";
import { FlowThreads } from "@/components/ui/FlowThreads";
import { OurVision } from "@/components/home/OurVision";
import { WhoAreWe } from "@/components/home/WhoAreWe";
import { getSettings } from "@/lib/content";

export const metadata = {
  title: "About",
  description: "Company story, leadership, and credibility markers for GCC Advisor.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-highlight">
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

      <OurVision />

      <WhoAreWe />

      <Section>
        <SectionHeader eyebrow="Story" title="Operators first, advisors second" />
        <p className="max-w-3xl text-base leading-relaxed text-slate md:text-lg">
          {settings.aboutStory}
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {settings.metrics.map((m: { label: string; value: number; suffix?: string; prefix?: string }) => (
            <div key={m.label} className="rounded-2xl border border-border bg-surface-elevated p-4">
              <MetricCounter
                value={m.value}
                suffix={m.suffix}
                prefix={m.prefix}
                className="text-2xl font-bold text-accent sm:text-3xl"
              />
              <p className="mt-1 text-xs text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader eyebrow="Leadership" title="Partners who have run centres" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {settings.leadership.map((person: {
            name: string;
            role: string;
            bio: string;
            image: string;
          }) => (
            <Reveal key={person.name}>
              <article className="overflow-hidden rounded-2xl border border-border bg-surface-elevated">
                <div className="relative h-52 sm:h-56">
                  <Image src={person.image} alt={person.name} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-navy">{person.name}</h3>
                  <p className="text-sm font-medium text-accent">{person.role}</p>
                  <p className="mt-2 text-sm text-muted">{person.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <CTABand title="Meet the team on a consultation call" />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Enquire"
          title="Start a conversation with the team"
          description="Share what you’re building — we’ll connect you with the right partner."
        />
        <div className="mx-auto max-w-2xl">
          <ContactForm source="about" submitLabel="Request a partner call" />
        </div>
      </Section>
    </>
  );
}
