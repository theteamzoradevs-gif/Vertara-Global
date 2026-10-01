import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/leads/ContactForm";
import { getContactContent } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Book a consultation with Vertara Global — low-friction form and direct contact details.",
};

export default async function ContactPage() {
  const content = await getContactContent();
  const calendly = content.calendlyUrl || process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="w-full bg-[#edf5ef] font-sans" style={{ fontFamily: 'Calibri' }}>
      {/* CONTACT FORM & DIRECT INFO */}
      <Section id="enquire" tone="none" threads={false} className="bg-[#edf5ef] py-6 sm:py-8 md:py-10 min-h-[calc(100vh-5rem)] flex flex-col justify-center font-sans" style={{ fontFamily: 'Calibri' }}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Contact proposition */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
                  {content.eyebrow}
                </span>
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-[#101C30] leading-tight">
                {content.headline}
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#2F3F34]/85">
                {content.description}
              </p>
            </div>
          </div>

          {/* Right Column: Message Form Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <ContactForm
              source="contact"
              title={content.formTitle}
              submitLabel={content.formSubmitLabel}
              buttonVariant="gold"
              className="w-full max-w-[500px]"
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
    </div>
  );
}
