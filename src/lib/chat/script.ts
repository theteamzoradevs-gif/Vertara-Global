export type ChatChoice = {
  id: string;
  label: string;
  next: string;
};

export type ChatNode = {
  id: string;
  bot: string;
  choices?: ChatChoice[];
  link?: { href: string; label: string };
  collectLead?: boolean;
};

/** Rule-based free-text → node routing (no LLM). */
export function resolveUserMessage(text: string): string {
  const t = text.toLowerCase().trim();
  if (!t) return "start";
  if (/\b(hi|hello|hey|good (morning|afternoon|evening))\b/.test(t)) return "greeting";
  if (/price|cost|how much|budget|rate|commercial|quote|ballpark/.test(t)) return "pricing";
  if (/talent|hire|hiring|recruit|staff|people|chro/.test(t)) return "talent";
  if (/workspace|office|floor|fit[- ]?out|facility|seat/.test(t)) return "workspace";
  if (/operation|eor|payroll|compliance|hr ops|entity/.test(t)) return "operations";
  if (/advisor|advisory|strategy|business case|location|city/.test(t)) return "advisory";
  if (/model|build.?transfer|managed team|partnership|engagement/.test(t))
    return "models_link";
  if (/full.?gcc|set.?up|capability center|capability centre|gcc\b/.test(t))
    return "full_gcc";
  if (/call|speak|talk|book|meeting|demo|enquiry|inquiry|contact|callback/.test(t))
    return "consult";
  if (/service|module|what do you|offer/.test(t)) return "services_hub";
  if (/thank|thanks|ok|okay|great/.test(t)) return "thanks";
  return "fallback";
}

export const chatNodes: Record<string, ChatNode> = {
  start: {
    id: "start",
    bot: "Hi — I’m Alex. Ask me anything about GCC setup in India, or tap a quick topic below. I can also book you a short call with a partner.",
    choices: [
      { id: "full", label: "Full GCC setup", next: "full_gcc" },
      { id: "talent", label: "Talent & hiring", next: "talent" },
      { id: "workspace", label: "Workspace", next: "workspace" },
      { id: "ops", label: "Operations & compliance", next: "operations" },
      { id: "pricing", label: "Cost / commercial", next: "pricing" },
      { id: "call", label: "Get a quick call", next: "consult" },
    ],
  },
  greeting: {
    id: "greeting",
    bot: "Hello! Happy to help. You can ask about talent, workspace, operations, advisory, commercials — or say “book a call” and I’ll take your details.",
    choices: [
      { id: "services", label: "Browse services", next: "services_hub" },
      { id: "call", label: "Get a quick call", next: "consult" },
    ],
  },
  fallback: {
    id: "fallback",
    bot: "Got it. I can help with services, engagement models, or booking a discovery call — what should we dig into?",
    choices: [
      { id: "services", label: "Services", next: "services_hub" },
      { id: "pricing", label: "Commercials", next: "pricing" },
      { id: "call", label: "Get a quick call", next: "consult" },
    ],
  },
  thanks: {
    id: "thanks",
    bot: "You’re welcome. Whenever you’re ready, I can connect you with a partner for a quick call.",
    choices: [
      { id: "call", label: "Get a quick call", next: "consult" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  knowledge: {
    id: "knowledge",
    bot: "",
    choices: [
      { id: "services", label: "Browse services", next: "services_hub" },
      { id: "models", label: "Engagement models", next: "models_link" },
      { id: "call", label: "Get a quick call", next: "consult" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  full_gcc: {
    id: "full_gcc",
    bot: "A full GCC typically spans talent, workspace, operations, and advisory as one plan — so ownership, timeline, and quality stay aligned. The next step is usually a short discovery call to map your headcount, city, and ownership preference.",
    choices: [
      { id: "see-modules", label: "Browse our services", next: "services_hub" },
      { id: "models", label: "Compare engagement models", next: "models_link" },
      { id: "call", label: "Book a discovery call", next: "consult" },
    ],
  },
  services_hub: {
    id: "services_hub",
    bot: "Pick a module to explore — or jump straight to a call if you’d rather talk it through.",
    choices: [
      { id: "talent", label: "Talent Solutions", next: "talent" },
      { id: "workspace", label: "Workspace", next: "workspace" },
      { id: "ops", label: "Business Operations", next: "operations" },
      { id: "advisory", label: "Research & Advisory", next: "advisory" },
      { id: "call", label: "Get a call", next: "consult" },
    ],
  },
  talent: {
    id: "talent",
    bot: "Talent Solutions covers leadership hiring, specialist pipelines, onboarding, and retention — sequenced so workspace and ops are ready when offers go out.",
    link: { href: "/services/talent", label: "Open Talent Solutions" },
    choices: [
      { id: "pricing", label: "Ask about commercial fit", next: "pricing" },
      { id: "call", label: "Book a call", next: "consult" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  workspace: {
    id: "workspace",
    bot: "Workspace includes site selection, fit-out, facilities, and security in India’s talent hubs — timed to your hiring waves.",
    link: { href: "/services/workspace", label: "Open Workspace" },
    choices: [
      { id: "pricing", label: "Ask about commercial fit", next: "pricing" },
      { id: "call", label: "Book a call", next: "consult" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  operations: {
    id: "operations",
    bot: "Business Operations handles the employment and compliance layer — EOR bridge, HR, payroll, and clean transfer to your captive entity.",
    link: { href: "/services/operations", label: "Open Business Operations" },
    choices: [
      { id: "pricing", label: "Ask about commercial fit", next: "pricing" },
      { id: "call", label: "Book a call", next: "consult" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  advisory: {
    id: "advisory",
    bot: "Research & Advisory helps you choose city, scale, org design, and a board-ready business case before you commit.",
    link: { href: "/services/advisory", label: "Open Research & Advisory" },
    choices: [
      { id: "pricing", label: "Ask about commercial fit", next: "pricing" },
      { id: "call", label: "Book a call", next: "consult" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  pricing: {
    id: "pricing",
    bot: "Commercials depend on headcount, city, entity path, and which modules you need — we don’t publish generic rates because they mislead enterprise buyers. A partner can walk you through a scoped view for your case, under NDA if you prefer.",
    choices: [
      { id: "call", label: "Get a call with an expert", next: "consult" },
      { id: "callback", label: "Request a callback", next: "callback" },
      { id: "models", label: "See engagement models first", next: "models_link" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  models_link: {
    id: "models_link",
    bot: "Flexible Partnership, Build & Transfer, and Managed Team — compare fit, ownership, and timeline.",
    link: { href: "/engagement-models", label: "Open engagement models" },
    choices: [
      { id: "call", label: "Book a call", next: "consult" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  callback: {
    id: "callback",
    bot: "Share your details — we’ll schedule a short call with a partner who can discuss scope and next steps. No ballpark quotes in chat; you’ll get a clear conversation.",
    collectLead: true,
    choices: [
      { id: "form", label: "Prefer the full contact form", next: "consult_form" },
      { id: "back", label: "Main menu", next: "start" },
    ],
  },
  consult: {
    id: "consult",
    bot: "Perfect. Leave your details and a partner will reach out within one business day — or open the consultation form if you prefer more context.",
    link: { href: "/contact", label: "Open consultation form" },
    collectLead: true,
    choices: [{ id: "back", label: "Main menu", next: "start" }],
  },
  consult_form: {
    id: "consult_form",
    bot: "The consultation form lets you add company context and intent in one place.",
    link: { href: "/contact", label: "Go to contact form" },
    choices: [{ id: "back", label: "Main menu", next: "start" }],
  },
};
