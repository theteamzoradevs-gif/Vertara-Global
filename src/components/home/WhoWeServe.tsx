"use client";

import { Reveal } from "@/components/ui/Reveal";

interface CardItem {
  id: string;
  category: "sector" | "buyer";
  title: string;
  blurb: string;
  detail: string;
}

const allCards: CardItem[] = [
  // Sector Verticals (Cards 1–6)
  {
    id: "engineering",
    category: "sector",
    title: "Engineering & ER&D",
    blurb: "Product engineering, R&D, software simulation, AI, Architectural Design",
    detail:
      "Specialized engineering and R&D pipelines, software simulation capabilities, and architectural design CoEs built for high-precision global engineering mandates.",
  },
  {
    id: "fmcg",
    category: "sector",
    title: "FMCG & Retail",
    blurb: "Consumer analytics, merchandising, supply chain, marketing, e-commerce",
    detail:
      "Data-driven retail and FMCG operations, consumer analytics hubs, end-to-end supply chain optimization, merchandising systems, and omnichannel digital commerce.",
  },
  {
    id: "healthcare",
    category: "sector",
    title: "Healthcare & Life Sciences",
    blurb: "R&D, regulatory, clinical, medical affairs, patient analytics AI, cyber",
    detail:
      "Compliant life sciences hubs with rigorous regulatory data handling, clinical trials support, medical affairs operations, and patient analytics AI with zero compliance drift.",
  },
  {
    id: "hospitality",
    category: "sector",
    title: "Travel, Leisure, Hospitality",
    blurb: "Reservations, loyalty platforms, guest analytics, revenue reporting",
    detail:
      "High-availability guest reservation engines, multi-tier loyalty platforms, predictive customer analytics, and real-time revenue management operations.",
  },
  {
    id: "wealth",
    category: "sector",
    title: "Wealth Management, PE, Insurance",
    blurb: "Fund, portfolio ops, actuarial, client reporting, compliance, research, ops",
    detail:
      "Institutional-grade fund and portfolio accounting, actuarial modeling, investor reporting, statutory audit compliance, and equity research support.",
  },
  {
    id: "manufacturing",
    category: "sector",
    title: "Manufacturing",
    blurb: "Supply chain & procurement, plant ops analytics, industrial IoT, quality",
    detail:
      "Global procurement towers, smart factory and plant operations analytics, industrial IoT integration, quality engineering, and supply chain visibility.",
  },

  // Buyer Archetypes (Cards 7–12)
  {
    id: "enterprise",
    category: "buyer",
    title: "Global enterprises",
    blurb: "Standing up or scaling a captive India centre with clear ownership.",
    detail:
      "You need one accountable partner across talent, floors, and ops — not a patchwork of vendors that drift after the kickoff deck.",
  },
  {
    id: "bfsi",
    category: "buyer",
    title: "BFSI & regulated firms",
    blurb: "Controls, audit trails, and leadership that survive scrutiny.",
    detail:
      "We sequence compliance, EOR bridges, and process design so your hub is productive without compromising parent-bank or insurer standards.",
  },
  {
    id: "mining-metals",
    category: "buyer",
    title: "Mining & Metals",
    blurb: "Asset analytics engineering procurement ESG/HSE data",
    detail:
      "Asset performance analytics, engineering & operational design CoEs, strategic global procurement hubs, and ESG/HSE compliance data systems.",
  },
  {
    id: "ai",
    category: "buyer",
    title: "AI / data-heavy teams",
    blurb: "Specialist pipelines in India’s deep tech talent markets.",
    detail:
      "City mix, role architecture, and employer brand shaped for scarce skills — so you don’t lose six months hiring the wrong profiles.",
  },
  {
    id: "scaleup",
    category: "buyer",
    title: "Scaling mid-market firms",
    blurb: "First India capability without overbuilding entity too early.",
    detail:
      "Flexible and build-transfer paths let you prove the model, then move to captive ownership when headcount and confidence justify it.",
  },
  {
    id: "global-ops",
    category: "buyer",
    title: "Global operations leaders",
    blurb: "CHROs, COOs, and centre heads who own the outcome.",
    detail:
      "Board-ready cases, milestone calendars, and a single operating rhythm — so India capability is a programme, not a side project.",
  },
];

const columns = [
  allCards.slice(0, 3),
  allCards.slice(3, 6),
  allCards.slice(6, 9),
  allCards.slice(9, 12),
];

export function WhoWeServe() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
      {columns.map((colCards, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4 sm:gap-5">
          {colCards.map((card, cardIdx) => (
            <Reveal
              key={card.id}
              delay={(colIdx * 3 + cardIdx) * 0.03}
              className="flex flex-col"
            >
              <div className="group flex h-[185px] sm:h-[190px] w-full flex-col justify-start overflow-hidden rounded-2xl border border-[#cddcd1] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2F3F34]/50 hover:shadow-md">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B59439]">
                    {card.category === "sector" ? "Sector Vertical" : "Buyer Archetype"}
                  </p>

                  <h3 className="mt-2 text-base sm:text-lg font-bold tracking-tight text-[#101C30] group-hover:text-[#2F3F34] transition-colors leading-snug min-h-[44px] sm:min-h-[50px] line-clamp-2">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#101C30]/80 line-clamp-3">
                    {card.blurb}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
