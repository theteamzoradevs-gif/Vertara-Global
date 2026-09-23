import { CheckCircle2 } from "lucide-react";

const nextSteps = [
  {
    step: "01",
    title: "Tell Us Your Requirements",
    desc: "Share your domain focus, target team size, and operational timeline.",
  },
  {
    step: "02",
    title: "Dedicated Sector Lead Call",
    desc: "A domain practice director connects with you within 24 hours at your convenience.",
  },
  {
    step: "03",
    title: "Custom GCC Feasibility Blueprint",
    desc: "Receive a tailored regulatory framework, location shortlist, and talent model with zero sales push.",
  },
];

const assurances = [
  "Mutual NDA & IP protection from day one",
  "Institutional data segregation & zero drift",
  "100% direct parent-entity asset ownership",
];

export function IndustryFormSideContent() {
  return (
    <div className="h-full flex flex-col justify-between py-2 sm:py-3 lg:pl-2">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b49339]">
          WHAT HAPPENS NEXT?
        </p>

        <h3 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight text-navy">
          From inquiry to dedicated capability blueprint
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate leading-relaxed">
          We architect every capability centre as a strategic, domain native build tailored to your industry.
        </p>

        {/* Numbered Steps */}
        <div className="mt-6 space-y-3.5 sm:space-y-4">
          {nextSteps.map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-3.5 rounded-2xl border border-[#cddcd1] bg-white p-4 sm:p-4.5 shadow-xs transition-all duration-300 hover:border-[#2e3f33]/40 hover:shadow-sm"
            >
              <span className="flex h-7 w-8 shrink-0 items-center justify-center rounded-lg bg-[#b49339] text-xs font-extrabold text-white shadow-xs">
                {item.step}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-navy">
                  {item.title}
                </h4>
                <p className="mt-0.5 text-xs text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Guarantees */}
      <div className="mt-6 pt-5 border-t border-[#cddcd1]">
        <p className="text-xs font-bold uppercase tracking-wider text-navy mb-2.5">
          Enterprise Guarantees
        </p>
        <div className="space-y-2">
          {assurances.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#2e3f33]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#b49339]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
