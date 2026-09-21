import {
  getSettings,
  getServices,
  getEngagementModels,
  getInsights,
  getCaseStudies,
  getTestimonials,
  getFaqs,
} from "@/lib/content";
import { practitionersTeam } from "@/data/practitioners-team";

export type KnowledgeLink = { href: string; label: string };

export type KnowledgeAnswer = {
  answer: string;
  link?: KnowledgeLink;
  collectLead?: boolean;
  intent: string;
  found: boolean;
};

type KnowledgeDoc = {
  id: string;
  kind:
    | "service"
    | "insight"
    | "case_study"
    | "faq"
    | "testimonial"
    | "team"
    | "about"
    | "engagement"
    | "contact"
    | "hero";
  title: string;
  text: string;
  link?: KnowledgeLink;
  keywords: string[];
};

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "is",
  "are",
  "was",
  "were",
  "be",
  "do",
  "does",
  "did",
  "you",
  "your",
  "our",
  "we",
  "me",
  "my",
  "i",
  "what",
  "which",
  "who",
  "whom",
  "whose",
  "where",
  "when",
  "how",
  "why",
  "can",
  "could",
  "would",
  "should",
  "about",
  "tell",
  "please",
  "with",
  "from",
  "this",
  "that",
  "these",
  "those",
  "any",
  "have",
  "has",
  "had",
  "into",
  "over",
  "under",
  "also",
  "just",
  "more",
  "some",
  "than",
  "then",
  "them",
  "they",
  "their",
  "there",
  "here",
  "website",
  "site",
  "veratara",
  "global",
  "alex",
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s.-]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function wordMatch(haystack: string, token: string): boolean {
  const words = haystack
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  return words.some((w) => {
    if (w === token) return true;
    // Contains only when both sides are long enough (avoids "random".includes("a"))
    if (token.length >= 5 && w.length >= 5 && (w.includes(token) || token.includes(w))) {
      return true;
    }
    return false;
  });
}

function scoreDoc(tokens: string[], doc: KnowledgeDoc): number {
  if (!tokens.length) return 0;
  const hay = `${doc.title} ${doc.text} ${doc.keywords.join(" ")}`.toLowerCase();
  let score = 0;
  let strongHits = 0;
  for (const token of tokens) {
    if (wordMatch(doc.title, token)) {
      score += 6;
      strongHits += 1;
    }
    if (doc.keywords.some((k) => k === token || wordMatch(k, token))) {
      score += 4;
      strongHits += 1;
    } else if (wordMatch(hay, token)) {
      score += 2;
    }
    // Soft name match only for team bios (e.g. "Namit" → "Namit G")
    if (doc.kind === "team" && token.length >= 3) {
      for (const word of doc.title.toLowerCase().split(/\s+/)) {
        if (word.length >= 3 && (word.startsWith(token) || token.startsWith(word))) {
          score += 5;
          strongHits += 1;
          break;
        }
      }
    }
  }
  if (strongHits === 0) return 0;
  return score;
}

function detectConsult(q: string): boolean {
  return /book|call|consult|callback|speak|talk|meeting|demo|enquiry|inquiry|contact\s*us|get\s*a\s*quick/i.test(
    q,
  );
}

function detectGreeting(q: string): boolean {
  return /^(hi|hello|hey|good\s+(morning|afternoon|evening))\b/i.test(q.trim());
}

function detectThanks(q: string): boolean {
  return /^(thanks|thank you|thx|ok|okay|great|cool)\b/i.test(q.trim());
}

async function buildCorpus(): Promise<KnowledgeDoc[]> {
  const [settings, services, models, insights, cases, testimonials, faqs] =
    await Promise.all([
      getSettings(),
      getServices(),
      getEngagementModels(),
      getInsights(),
      getCaseStudies(),
      getTestimonials(),
      getFaqs(),
    ]);

  const docs: KnowledgeDoc[] = [];

  docs.push({
    id: "about",
    kind: "about",
    title: `${settings.brandName} — About`,
    text: [settings.aboutStory, settings.aboutMission, settings.tagline]
      .filter(Boolean)
      .join(" "),
    link: { href: "/about", label: "Open About" },
    keywords: ["about", "company", "story", "mission", "who", "vertara", "veratara"],
  });

  docs.push({
    id: "hero",
    kind: "hero",
    title: settings.heroHeadline || settings.brandName,
    text: [
      settings.heroSubheadline,
      settings.tagline,
      ...(settings.heroRotatingLines || []).map((l) => `${l.label}: ${l.detail}`),
      ...(settings.metrics || []).map(
        (m) => `${m.prefix || ""}${m.value}${m.suffix || ""} ${m.label}`,
      ),
    ]
      .filter(Boolean)
      .join(" "),
    link: { href: "/", label: "Open homepage" },
    keywords: ["homepage", "hero", "gcc", "india", "capability", "center", "centre"],
  });

  docs.push({
    id: "contact",
    kind: "contact",
    title: "Contact & consultation",
    text: [
      `Email ${settings.contactEmail}`,
      `Phone ${settings.contactPhone}`,
      settings.heroFormDescription,
      settings.heroFormTitle,
      "Book a consultation or request a quick call with a partner.",
    ]
      .filter(Boolean)
      .join(". "),
    link: { href: "/contact", label: "Open consultation form" },
    keywords: ["contact", "email", "phone", "consultation", "call", "book"],
  });

  // Public About-page practitioners (same source as PractitionersTeam UI)
  for (const person of practitionersTeam) {
    docs.push({
      id: `team-${person.name}`,
      kind: "team",
      title: person.name,
      text: `${person.name} is ${person.role}. ${person.bio || ""}`,
      link: { href: "/about", label: "Meet the team" },
      keywords: [
        "team",
        "leadership",
        "partner",
        "practitioner",
        "founder",
        "who",
        ...person.name.toLowerCase().split(/\s+/),
        ...(person.role || "").toLowerCase().split(/\s+/),
      ],
    });
  }

  for (const service of services) {
    const sub = (service.subServices || [])
      .map((s) => `${s.title}: ${s.summary || s.detail || ""}`)
      .join(" ");
    const steps = (service.processSteps || [])
      .map((s) => `${s.title}: ${s.summary || s.detail || ""}`)
      .join(" ");
    docs.push({
      id: `service-${service.slug}`,
      kind: "service",
      title: service.name,
      text: [
        service.shortDescription,
        service.valueProposition,
        sub,
        steps,
      ]
        .filter(Boolean)
        .join(" "),
      link: {
        href: `/services/${service.slug}`,
        label: `Open ${service.name}`,
      },
      keywords: [
        "service",
        "services",
        "offer",
        "module",
        service.slug,
        ...service.name.toLowerCase().split(/\s+/),
      ],
    });
  }

  for (const model of models) {
    docs.push({
      id: `model-${model.slug}`,
      kind: "engagement",
      title: model.name,
      text: [
        model.summary,
        `Best fit: ${model.bestFit}`,
        `Ownership: ${model.ownership}`,
        `Setup time: ${model.setupTime}`,
        `Engagement length: ${model.engagementLength}`,
        `Cost profile: ${model.costProfile}`,
        ...(model.practiceSteps || []).map((s) => `${s.title}: ${s.detail}`),
      ]
        .filter(Boolean)
        .join(" "),
      link: { href: "/engagement-models", label: "Open engagement models" },
      keywords: [
        "engagement",
        "model",
        "models",
        "managed",
        "team",
        "build",
        "transfer",
        "partnership",
        model.slug,
        ...model.name.toLowerCase().split(/\s+/),
      ],
    });
  }

  for (const insight of insights) {
    docs.push({
      id: `insight-${insight.slug}`,
      kind: "insight",
      title: insight.title,
      text: [insight.excerpt, insight.category, insight.body]
        .filter(Boolean)
        .join(" ")
        .slice(0, 2500),
      link: {
        href: `/insights/${insight.slug}`,
        label: "Read insight",
      },
      keywords: [
        "insight",
        "insights",
        "article",
        "strategy",
        (insight.category || "").toLowerCase(),
        ...insight.title.toLowerCase().split(/\s+/),
      ],
    });
  }

  for (const cs of cases) {
    docs.push({
      id: `case-${cs.title}`,
      kind: "case_study",
      title: cs.title,
      text: [
        `Client: ${cs.client}`,
        `Industry: ${cs.industry}`,
        `Challenge: ${cs.challenge}`,
        `Approach: ${cs.approach}`,
        `Result: ${cs.result}`,
        ...(cs.metrics || []).map((m) => `${m.value} ${m.label}`),
      ]
        .filter(Boolean)
        .join(" "),
      link: { href: "/case-studies", label: "View case studies" },
      keywords: [
        "case",
        "study",
        "studies",
        "outcome",
        "client",
        (cs.industry || "").toLowerCase(),
        ...cs.title.toLowerCase().split(/\s+/),
      ],
    });
  }

  for (const t of testimonials) {
    docs.push({
      id: `testimonial-${t.name}`,
      kind: "testimonial",
      title: `${t.name} — ${t.company || t.role || "Client"}`,
      text: `"${t.quote}" — ${t.name}, ${t.role || ""}${t.company ? `, ${t.company}` : ""}`,
      link: { href: "/case-studies", label: "See operator voices" },
      keywords: ["testimonial", "review", "client", "voice", "trust", t.name.toLowerCase()],
    });
  }

  for (const faq of faqs) {
    docs.push({
      id: `faq-${faq.question}`,
      kind: "faq",
      title: faq.question,
      text: faq.answer,
      link: { href: "/#faq", label: "Browse FAQs" },
      keywords: [
        "faq",
        "question",
        (faq.category || "").toLowerCase(),
        ...faq.question.toLowerCase().split(/\s+/),
      ],
    });
  }

  return docs;
}

function formatAnswer(doc: KnowledgeDoc, allHits: KnowledgeDoc[]): string {
  if (doc.kind === "service" && allHits.filter((h) => h.kind === "service").length > 1) {
    const services = allHits.filter((h) => h.kind === "service").slice(0, 6);
    const list = services.map((s) => `• ${s.title}`).join("\n");
    return `Here’s what we offer on the site:\n${list}\n\n${doc.title}: ${trimText(doc.text, 280)}`;
  }

  if (doc.kind === "case_study" && allHits.filter((h) => h.kind === "case_study").length > 1) {
    const cases = allHits.filter((h) => h.kind === "case_study").slice(0, 4);
    const list = cases.map((c) => `• ${c.title}`).join("\n");
    return `From our case studies:\n${list}\n\n${doc.title}: ${trimText(doc.text, 320)}`;
  }

  if (doc.kind === "insight" && allHits.filter((h) => h.kind === "insight").length > 1) {
    const insights = allHits.filter((h) => h.kind === "insight").slice(0, 4);
    const list = insights.map((i) => `• ${i.title}`).join("\n");
    return `Relevant insights from the site:\n${list}\n\n${doc.title}: ${trimText(doc.text, 280)}`;
  }

  if (doc.kind === "team") {
    return trimText(doc.text, 420);
  }

  if (doc.kind === "faq") {
    return `${doc.title}\n\n${trimText(doc.text, 500)}`;
  }

  if (doc.kind === "engagement") {
    return `${doc.title}: ${trimText(doc.text, 360)}`;
  }

  if (doc.kind === "contact") {
    return trimText(doc.text, 320);
  }

  return `${doc.title}: ${trimText(doc.text, 360)}`;
}

function trimText(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function boostForIntent(q: string, docs: KnowledgeDoc[]): KnowledgeDoc[] {
  const lower = q.toLowerCase();
  return docs.map((doc) => {
    let bonus = 0;
    if (/service|offer|module|what do you/.test(lower) && doc.kind === "service") bonus += 8;
    if (/case\s*stud|outcome|client\s*work/.test(lower) && doc.kind === "case_study") bonus += 8;
    if (/insight|article|blog|reading|strategy/.test(lower) && doc.kind === "insight") bonus += 8;
    if (/faq|frequently|question/.test(lower) && doc.kind === "faq") bonus += 8;
    if (/team|leadership|partner|who is|who's/.test(lower) && doc.kind === "team") bonus += 10;
    if (/about|company|mission|story/.test(lower) && doc.kind === "about") bonus += 8;
    if (/engagement|managed\s*team|build\s*&?\s*transfer|partnership/.test(lower) && doc.kind === "engagement")
      bonus += 10;
    if (/testimonial|review|what.*(say|said)|client\s*voice/.test(lower) && doc.kind === "testimonial")
      bonus += 8;
    if (/contact|email|phone|reach/.test(lower) && doc.kind === "contact") bonus += 8;
    return { ...doc, _bonus: bonus } as KnowledgeDoc & { _bonus: number };
  });
}

/**
 * Controlled public-content answer. Uses existing CMS getters only —
 * no admin/leads/chat-session data.
 */
export async function answerFromWebsiteKnowledge(
  question: string,
): Promise<KnowledgeAnswer> {
  const q = question.trim();
  if (!q) {
    return {
      answer: "Ask me anything about our services, case studies, insights, team, or how to book a call.",
      intent: "empty",
      found: false,
    };
  }

  if (detectGreeting(q)) {
    return {
      answer:
        "Hello! I can answer from our website — services, case studies, insights, FAQs, team, engagement models, or help you book a consultation.",
      intent: "greeting",
      found: true,
    };
  }

  if (detectThanks(q)) {
    return {
      answer: "You’re welcome. Ask another question anytime, or say “book a call” if you’d like a partner to follow up.",
      intent: "thanks",
      found: true,
    };
  }

  if (detectConsult(q)) {
    const settings = await getSettings();
    return {
      answer: `Happy to help you book a consultation. Leave your details below, or use the contact form — a partner typically replies within one business day. You can also reach us at ${settings.contactEmail} / ${settings.contactPhone}.`,
      link: { href: "/contact", label: "Open consultation form" },
      collectLead: true,
      intent: "consult",
      found: true,
    };
  }

  const corpus = await buildCorpus();
  const tokens = tokenize(q);
  const boosted = boostForIntent(q, corpus);

  const ranked = boosted
    .map((doc) => {
      const base = scoreDoc(tokens, doc);
      if (base <= 0) return { doc, score: 0 };
      const bonus = (doc as KnowledgeDoc & { _bonus?: number })._bonus || 0;
      return { doc, score: base + bonus };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length || ranked[0].score < 6) {
    return {
      answer:
        "I couldn’t find that in the information published on this website. Try asking about our services, case studies, insights, FAQs, team, engagement models — or say “book a call” to leave your details.",
      intent: "unknown",
      found: false,
    };
  }

  const topScore = ranked[0].score;
  const hits = ranked
    .filter((r) => r.score >= Math.max(6, topScore * 0.6))
    .map((r) => r.doc)
    .slice(0, 6);

  const best = hits[0];
  return {
    answer: formatAnswer(best, hits),
    link: best.link,
    intent: best.kind,
    found: true,
  };
}
