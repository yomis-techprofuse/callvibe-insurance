// CallVibe — Insurance Conversation Intelligence
// Fictional demonstration dataset for Harbour Insurance Australia.
// Every customer, policy, claim, employee, conversation and figure below is
// simulated for demo purposes only. Currency is USD throughout.

export const PRODUCT_NAME = "CallVibe";
export const PRODUCT_DESCRIPTOR = "Insurance Conversation Intelligence";
export const WORKSPACE = "Harbour Insurance Australia";

export const STATES = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
];

export const PRODUCTS = [
  "Comprehensive Motor",
  "Third Party Property",
  "Home and Contents",
  "Landlord",
  "Travel",
  "Pet Insurance",
];

export const CONVERSATION_TYPES = [
  "Quote Enquiry",
  "Policy Renewal",
  "Cancellation",
  "Claim Notification",
  "Claim Status",
  "Complaint",
  "Policy Change",
  "Billing",
  "Coverage Question",
  "Cross-sell",
  "General Service",
];

export const BUSINESS_FUNCTIONS = ["Sales", "Service", "Retention", "Claims", "Complaints"];
export const SEGMENTS = ["New Customer", "Established", "Long Tenure", "Multi-Policy", "Lapsed Risk"];
export const INTENTS = ["High", "Medium", "Low"];
export const RISK_LEVELS = ["Critical", "High", "Moderate", "Low"];
export const REVIEW_STATUSES = ["New", "Under Review", "Confirmed", "Dismissed", "Escalated", "Closed"];
export const SEVERITIES = ["Low", "Moderate", "High", "Critical"];

export const AGENT_NAMES = [
  "Daniel Reed",
  "Amelia Hartley",
  "Nathan Whitfield",
  "Chloe Donnelly",
  "Marcus Ellery",
  "Isla Brennan",
  "Ruby Fitzgerald",
  "Harrison Vaughn",
  "Tessa Lockhart",
  "Owen Callaghan",
];

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

export function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function usdCompact(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (n >= 1_000) return `$${Math.round(n / 1000)}K`;
  return `$${n}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Australian date formatting: DD MMM YYYY */
export function auDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/* ------------------------------------------------------------------ */
/* Deterministic pseudo-random helpers                                 */
/* ------------------------------------------------------------------ */

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const pick = <T,>(arr: T[], r: number): T => arr[Math.floor(r * arr.length) % arr.length]!;

/* ------------------------------------------------------------------ */
/* Fictional customer names (Australian)                               */
/* ------------------------------------------------------------------ */

const FIRST = [
  "Sophie", "Liam", "Charlotte", "Jack", "Ava", "Noah", "Mia", "Ethan", "Grace", "Lachlan",
  "Ruby", "Hunter", "Zoe", "Cooper", "Isla", "Xavier", "Harper", "Angus", "Willow", "Declan",
  "Matilda", "Riley", "Poppy", "Flynn", "Eleanor", "Callum", "Freya", "Jasper", "Imogen", "Toby",
];
const LAST = [
  "Bennett", "Hargrave", "Whitlock", "Camden", "Fairbairn", "Kingsley", "Marlowe", "Prescott",
  "Quinlan", "Rutherford", "Sandover", "Thackeray", "Underwood", "Vandenberg", "Weatherall",
  "Ashcombe", "Bexley", "Caldwell", "Dunmore", "Eastwood", "Fenwick", "Garrick", "Holloway",
  "Ingleby", "Jarratt", "Kellerman", "Langridge", "Mortlake", "Norwood", "Oakhurst",
];

const CITY_BY_STATE: Record<string, string> = {
  "New South Wales": "Sydney",
  Victoria: "Melbourne",
  Queensland: "Brisbane",
  "Western Australia": "Perth",
  "South Australia": "Adelaide",
  Tasmania: "Hobart",
  "Australian Capital Territory": "Canberra",
  "Northern Territory": "Darwin",
};

export const COMPETITORS = [
  "BudgetSure Insurance",
  "Coastline Mutual",
  "Southern Cross Cover",
  "Redgum General",
  "Everbright Assurance",
  "—",
];

export const PRIMARY_SIGNALS = [
  "Price objection",
  "Cancellation language",
  "Competitor comparison",
  "Repair authorisation delay",
  "Excess confusion",
  "Coverage uncertainty",
  "Follow-up gap",
  "Repeat contact",
  "Expression of dissatisfaction",
  "Cross-sell signal",
  "Financial pressure mention",
  "Documentation request",
];

export const BUSINESS_OUTCOMES = [
  "Retention at risk",
  "Quote not converted",
  "Quote converted",
  "Policy renewed",
  "Claim progressed",
  "Escalation created",
  "Complaint logged",
  "Cross-sell opportunity",
  "Resolved first contact",
  "No confirmed next step",
];

export const PURCHASE_BARRIERS = [
  "Price",
  "Coverage uncertainty",
  "Excess",
  "Competitor offer",
  "Waiting for another quote",
  "Payment options",
  "Policy exclusions",
  "No immediate follow-up",
  "Unclear next step",
];

export const CANCELLATION_DRIVERS = [
  "Premium increase",
  "Competitor price",
  "Coverage mismatch",
  "Claims experience",
  "Service dissatisfaction",
  "Financial pressure",
  "Vehicle sold",
  "No longer required",
  "Unclear policy value",
];

export const CLAIM_STAGES = [
  "First Notification of Loss",
  "Assessment",
  "Repair Authorisation",
  "Repair Progress",
  "Settlement",
  "Excess",
  "Documentation",
  "Closure",
];

export const CLAIM_ROOT_CAUSES = [
  "Repair authorisation delay",
  "Unclear next step",
  "Status not updated",
  "Document request",
  "Repairer communication",
  "Settlement explanation",
  "Excess confusion",
  "Previous commitment not completed",
  "Customer unable to reach case owner",
];

export const COMPLAINT_THEMES = [
  "Premium increases",
  "Claim delays",
  "Excess explanations",
  "Coverage declined",
  "Cancellation process",
  "Communication failures",
  "Repair quality",
  "Payment issues",
  "Policy wording",
  "Previous commitment not completed",
];

export const RISK_SIGNAL_TYPES = [
  "Potential complaint signal",
  "Disclosure issue",
  "Process-adherence exception",
  "Vulnerability indicator",
  "Customer-harm indicator",
  "Mis-selling concern",
  "Unresolved escalation",
  "Sensitive-data handling",
];

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TranscriptTurn = {
  speaker: "agent" | "customer";
  name: string;
  at: string;
  text: string;
  tag?: string | undefined;
};

export type Conversation = {
  id: string;
  customer: string;
  customerId: string;
  policyId: string;
  type: string;
  product: string;
  state: string;
  city: string;
  segment: string;
  fn: string;
  agent: string;
  date: string;
  dateSort: number;
  time: string;
  duration: string;
  direction: "Inbound" | "Outbound";
  sentiment: "Positive" | "Neutral" | "Negative";
  intent: "High" | "Medium" | "Low";
  risk: "Critical" | "High" | "Moderate" | "Low";
  reviewStatus: string;
  primarySignal: string;
  outcome: string;
  competitor: string;
  objection: string;
  premium: number;
  previousPremium: number;
  opportunity: number;
  followUp: "Confirmed" | "Not confirmed" | "Overdue";
  quality: number;
  tags: string[];
  summary: string;
  recommendedAction: string;
  claimStage?: string | undefined;
  rootCause?: string | undefined;
  transcript: TranscriptTurn[];
  scores: { label: string; value: number }[];
  coaching: { title: string; body: string }[];
  hero?: boolean;
};

/* ------------------------------------------------------------------ */
/* Hero conversation — Sophie Bennett                                  */
/* ------------------------------------------------------------------ */

export const HERO_TAGS = [
  "RENEWAL",
  "HIGH CANCELLATION RISK",
  "PRICE OBJECTION",
  "COMPETITOR MENTION",
  "POTENTIAL COMPLAINT",
  "ADDITIONAL CARE INDICATOR",
  "CROSS-SELL SIGNAL",
  "REVIEW REQUIRED",
];

export const TRANSCRIPT_TAGS = [
  "Price Objection",
  "Competitor Mention",
  "Cancellation Risk",
  "Potential Complaint",
  "Additional-Care Indicator",
  "Cross-sell Opportunity",
  "Coaching Opportunity",
];

const heroTranscript: TranscriptTurn[] = [
  { speaker: "agent", name: "Daniel Reed", at: "00:04", text: "Good morning, you've reached Harbour Insurance, this is Daniel. Who do I have the pleasure of speaking with today?" },
  { speaker: "customer", name: "Sophie Bennett", at: "00:11", text: "Hi Daniel, it's Sophie Bennett. I've received my motor renewal and I wanted to talk about it." },
  { speaker: "agent", name: "Daniel Reed", at: "00:18", text: "Of course, Sophie. Before we go further, could I confirm your date of birth and the first line of your address please?" },
  { speaker: "customer", name: "Sophie Bennett", at: "00:26", text: "Yes, and I'm in Brisbane, Queensland." },
  { speaker: "agent", name: "Daniel Reed", at: "00:33", text: "Thank you, that all matches. I can see policy POL-MOT-49281, comprehensive motor cover on your 2024 Mazda CX-5 Touring, renewing shortly." },
  { speaker: "customer", name: "Sophie Bennett", at: "00:44", text: "That's the one. The renewal has come through at $1,486. Last year I paid $1,259, so that's a jump of nearly 18%.", tag: "Price Objection" },
  { speaker: "agent", name: "Daniel Reed", at: "00:57", text: "You're right, the renewal premium is $1,486 this year." },
  { speaker: "customer", name: "Sophie Bennett", at: "01:03", text: "I honestly don't think that's reasonable. Nothing has changed. No claims, no incidents, same car, same garage.", tag: "Potential Complaint" },
  { speaker: "agent", name: "Daniel Reed", at: "01:14", text: "I understand. Premiums this year reflect updated pricing factors, including repair costs and claims experience in your postcode." },
  { speaker: "customer", name: "Sophie Bennett", at: "01:26", text: "That doesn't really help me. I've been with Harbour for six years and I feel like being loyal is costing me money.", tag: "Potential Complaint" },
  { speaker: "agent", name: "Daniel Reed", at: "01:36", text: "I appreciate that, Sophie. The pricing is generated by our rating engine rather than manually set." },
  { speaker: "customer", name: "Sophie Bennett", at: "01:45", text: "I've already had a quote from BudgetSure Insurance. They came back at around $1,290 for what looks like the same cover.", tag: "Competitor Mention" },
  { speaker: "agent", name: "Daniel Reed", at: "01:56", text: "Thank you for letting me know. Comparisons can differ on excess and agreed value, so the covers aren't always identical." },
  { speaker: "customer", name: "Sophie Bennett", at: "02:07", text: "Maybe, but the difference is almost $200. If Harbour can't do better I'll probably cancel and move across before the renewal date.", tag: "Cancellation Risk" },
  { speaker: "agent", name: "Daniel Reed", at: "02:19", text: "I understand. I can email you the renewal certificate and the Product Disclosure Statement so you can compare properly." },
  { speaker: "customer", name: "Sophie Bennett", at: "02:29", text: "It isn't only about comparing. My hours at work were cut back in March and household costs have become much harder to manage.", tag: "Additional-Care Indicator" },
  { speaker: "agent", name: "Daniel Reed", at: "02:41", text: "I'm sorry to hear that, Sophie. That must be difficult." },
  { speaker: "customer", name: "Sophie Bennett", at: "02:47", text: "It is. I'd rather stay with Harbour honestly — you were good when my windscreen was replaced — but the number has to work.", tag: "Coaching Opportunity" },
  { speaker: "agent", name: "Daniel Reed", at: "02:59", text: "That's good to hear. The premium shown is the renewal premium generated for your policy." },
  { speaker: "customer", name: "Sophie Bennett", at: "03:07", text: "Is there anything at all you can look at? A different excess, monthly payments, anything?" },
  { speaker: "agent", name: "Daniel Reed", at: "03:16", text: "You can pay monthly if that helps. Otherwise the renewal premium is what the system has produced.", tag: "Coaching Opportunity" },
  { speaker: "customer", name: "Sophie Bennett", at: "03:26", text: "Right. And my home insurance is with another insurer — I assumed Harbour would be dearer, so I never asked.", tag: "Cross-sell Opportunity" },
  { speaker: "agent", name: "Daniel Reed", at: "03:37", text: "Understood. I'll send the renewal documents through to the email on file today." },
  { speaker: "customer", name: "Sophie Bennett", at: "03:45", text: "Okay. So what happens next — will someone call me back about the price?" },
  { speaker: "agent", name: "Daniel Reed", at: "03:53", text: "You can call us any time before the renewal date and we can talk it through again.", tag: "Coaching Opportunity" },
  { speaker: "customer", name: "Sophie Bennett", at: "04:01", text: "So there's no set time for a follow-up. I'll have to chase it myself.", tag: "Cancellation Risk" },
  { speaker: "agent", name: "Daniel Reed", at: "04:09", text: "That's right, whenever suits you. Is there anything else I can help with today?" },
  { speaker: "customer", name: "Sophie Bennett", at: "04:16", text: "No, that's everything. Thanks Daniel." },
  { speaker: "agent", name: "Daniel Reed", at: "04:21", text: "Thanks for calling Harbour Insurance, Sophie. Have a good day.", tag: "Coaching Opportunity" },
];

export const HERO_SCORES = [
  { label: "Opening and Verification", value: 94 },
  { label: "Needs Identification", value: 81 },
  { label: "Clarity of Explanation", value: 75 },
  { label: "Product Knowledge", value: 88 },
  { label: "Objection Handling", value: 63 },
  { label: "Retention Exploration", value: 54 },
  { label: "Customer Care and Empathy", value: 86 },
  { label: "Next-Step Confirmation", value: 58 },
  { label: "Process Adherence", value: 91 },
  { label: "Closure", value: 69 },
];

export const HERO_COACHING = [
  {
    title: "RETENTION EXPLORATION",
    body: "The agent acknowledged the pricing concern but did not investigate available retention pathways.",
  },
  {
    title: "NEEDS DISCOVERY",
    body: "The customer mentioned financial pressure and another insurance product, but these needs were not explored.",
  },
  { title: "NEXT-STEP CONFIRMATION", body: "No clear owner or follow-up time was confirmed." },
  { title: "CLOSURE", body: "The agent did not summarise the agreed next action before ending the conversation." },
];

export const HERO_SUMMARY =
  "Sophie contacted Harbour Insurance regarding an 18% increase in her comprehensive motor-insurance renewal premium. She compared the renewal with an approximately $1,290 offer from BudgetSure Insurance and stated that she may cancel unless a more competitive option is available.\n\nSophie also mentioned that her working hours were recently reduced and that household costs have become more difficult to manage. She currently holds home insurance with another provider.\n\nThe agent explained that the premium reflected updated pricing factors but did not explore available retention options, confirm a follow-up time or investigate a possible motor-and-home bundle.\n\nThe conversation contains a strong cancellation signal, a possible expression of dissatisfaction, an additional-care indicator and a potential cross-sell opportunity.";

export const heroConversation: Conversation = {
  id: "CV-AU-100001",
  customer: "Sophie Bennett",
  customerId: "HI-AU-18492",
  policyId: "POL-MOT-49281",
  type: "Policy Renewal",
  product: "Comprehensive Motor",
  state: "Queensland",
  city: "Brisbane",
  segment: "Long Tenure",
  fn: "Retention",
  agent: "Daniel Reed",
  date: "18 Aug 2026",
  dateSort: 20260818,
  time: "09:42",
  duration: "04:26",
  direction: "Inbound",
  sentiment: "Negative",
  intent: "High",
  risk: "Critical",
  reviewStatus: "New",
  primarySignal: "Cancellation language",
  outcome: "Retention at risk",
  competitor: "BudgetSure Insurance",
  objection: "Premium increase",
  premium: 1486,
  previousPremium: 1259,
  opportunity: 1486,
  followUp: "Not confirmed",
  quality: 76,
  tags: HERO_TAGS,
  summary: HERO_SUMMARY,
  recommendedAction: "Priority retention review within two hours.",
  transcript: heroTranscript,
  scores: HERO_SCORES,
  coaching: HERO_COACHING,
  hero: true,
};

/* ------------------------------------------------------------------ */
/* Generated conversation dataset                                      */
/* ------------------------------------------------------------------ */

function makeTranscript(c: {
  customer: string;
  agent: string;
  product: string;
  type: string;
  competitor: string;
  objection: string;
}): TranscriptTurn[] {
  const lines: [TranscriptTurn["speaker"], string, (string | undefined)?][] = [
    ["agent", `Good morning, Harbour Insurance, this is ${c.agent.split(" ")[0]}. How can I help today?`],
    ["customer", `Hi, it's ${c.customer.split(" ")[0]}. I'm calling about my ${c.product.toLowerCase()} policy.`],
    ["agent", "Certainly — can I confirm a couple of security details before we continue?"],
    ["customer", "Yes, of course."],
    ["agent", "Thank you, that's verified. I have your policy on screen now."],
    ["customer", `My main concern is ${c.objection.toLowerCase()}.`, c.objection === "Premium increase" ? "Price Objection" : undefined],
    ["agent", "I understand. Let me talk you through how that's been calculated."],
    [
      "customer",
      c.competitor === "—"
        ? "I just want to understand what I'm actually covered for."
        : `I've also been quoted by ${c.competitor} and their number looked better.`,
      c.competitor === "—" ? undefined : "Competitor Mention",
    ],
    ["agent", "That's useful to know — covers can differ on excess and inclusions."],
    ["customer", "So what would the next step be from here?"],
    ["agent", "I'll send the documentation across and note the conversation on your record."],
    ["customer", "Alright, thank you for your help."],
    ["agent", "Thanks for calling Harbour Insurance. Have a good day."],
  ];
  return lines.map(([speaker, text, tag], i) => ({
    speaker,
    name: speaker === "agent" ? c.agent : c.customer,
    at: `0${Math.floor(i / 3)}:${String((i * 17) % 60).padStart(2, "0")}`,
    text,
    tag,
  }));
}

const SCORE_LABELS = HERO_SCORES.map((s) => s.label);

function buildConversations(count: number): Conversation[] {
  const out: Conversation[] = [heroConversation];
  const r = rng(97);
  for (let i = 0; i < count; i++) {
    const first = pick(FIRST, r());
    const last = pick(LAST, r());
    const customer = `${first} ${last}`;
    const state = pick(STATES, r());
    const product = pick(PRODUCTS, r());
    const type = pick(CONVERSATION_TYPES, r());
    const agent = pick(AGENT_NAMES, r());
    const competitor = pick(COMPETITORS, r());
    const rv = r();
    const risk = (rv > 0.9 ? "Critical" : rv > 0.68 ? "High" : rv > 0.35 ? "Moderate" : "Low") as Conversation["risk"];
    const iv = r();
    const intent = (iv > 0.68 ? "High" : iv > 0.32 ? "Medium" : "Low") as Conversation["intent"];
    const sv = r();
    const sentiment = (sv > 0.62 ? "Positive" : sv > 0.3 ? "Neutral" : "Negative") as Conversation["sentiment"];
    const day = 1 + Math.floor(r() * 28);
    const premium = Math.round(420 + r() * 2400);
    const previousPremium = Math.round(premium * (0.82 + r() * 0.16));
    const isClaim = type.startsWith("Claim");
    const objection = isClaim ? pick(CLAIM_ROOT_CAUSES, r()) : pick(PURCHASE_BARRIERS, r());
    const fn =
      type === "Quote Enquiry" || type === "Cross-sell"
        ? "Sales"
        : type === "Policy Renewal" || type === "Cancellation"
          ? "Retention"
          : isClaim
            ? "Claims"
            : type === "Complaint"
              ? "Complaints"
              : "Service";
    const followUpRoll = r();
    const conv: Conversation = {
      id: `CV-AU-${100002 + i}`,
      customer,
      customerId: `HI-AU-${10000 + ((i * 37) % 8999)}`,
      policyId: `POL-${product.slice(0, 3).toUpperCase()}-${40000 + ((i * 53) % 9000)}`,
      type,
      product,
      state,
      city: CITY_BY_STATE[state]!,
      segment: pick(SEGMENTS, r()),
      fn,
      agent,
      date: `${String(day).padStart(2, "0")} Aug 2026`,
      dateSort: 20260800 + day,
      time: `${String(8 + Math.floor(r() * 10)).padStart(2, "0")}:${String(Math.floor(r() * 60)).padStart(2, "0")}`,
      duration: `${String(2 + Math.floor(r() * 12)).padStart(2, "0")}:${String(Math.floor(r() * 60)).padStart(2, "0")}`,
      direction: r() > 0.28 ? "Inbound" : "Outbound",
      sentiment,
      intent,
      risk,
      reviewStatus: pick(REVIEW_STATUSES, r()),
      primarySignal: pick(PRIMARY_SIGNALS, r()),
      outcome: pick(BUSINESS_OUTCOMES, r()),
      competitor,
      objection,
      premium,
      previousPremium,
      opportunity: Math.round(premium * (0.6 + r() * 1.2)),
      followUp: followUpRoll > 0.62 ? "Confirmed" : followUpRoll > 0.28 ? "Not confirmed" : "Overdue",
      quality: Math.round(58 + r() * 38),
      tags: [type.toUpperCase(), product.toUpperCase(), risk === "Critical" || risk === "High" ? "REVIEW REQUIRED" : "ROUTINE"],
      summary: `${first} contacted Harbour Insurance regarding their ${product.toLowerCase()} policy. The conversation was classified as ${type.toLowerCase()} with a primary signal of ${objection.toLowerCase()}. ${competitor === "—" ? "No competitor was mentioned." : `${competitor} was mentioned as an alternative.`} AI-generated summary — subject to human review.`,
      recommendedAction:
        fn === "Retention"
          ? "Create a priority retention task and review available options with the customer."
          : fn === "Sales"
            ? "Add to the priority follow-up queue and confirm a next step with the customer."
            : fn === "Claims"
              ? "Review the claim record and provide a proactive status update."
              : "Review the conversation and confirm the agreed next action with the customer.",
      claimStage: isClaim ? pick(CLAIM_STAGES, r()) : undefined,
      rootCause: isClaim ? pick(CLAIM_ROOT_CAUSES, r()) : undefined,
      transcript: makeTranscript({ customer, agent, product, type, competitor, objection }),
      scores: SCORE_LABELS.map((label, k) => ({ label, value: Math.round(52 + ((i * 7 + k * 13) % 44)) })),
      coaching: HERO_COACHING.slice(0, 2 + (i % 3)),
    };
    out.push(conv);
  }
  return out;
}

export const conversations = buildConversations(239);

export const conversationById = (id: string) => conversations.find((c) => c.id === id);

/* ------------------------------------------------------------------ */
/* Dashboard aggregates                                                */
/* ------------------------------------------------------------------ */

export const DASHBOARD_KPIS = [
  { label: "Conversations Analysed", value: "48,276", delta: "6.4%", up: true, sub: "vs previous period" },
  { label: "Quote Conversations", value: "7,842", delta: "3.1%", up: true, sub: "sales function" },
  { label: "Renewals at Risk", value: "1,126", delta: "9.2%", up: false, sub: "cancellation signals" },
  { label: "Claims Requiring Attention", value: "684", delta: "4.8%", up: false, sub: "unresolved or repeat" },
  { label: "Potential Complaints Detected", value: "392", delta: "7.5%", up: false, sub: "pending human review" },
  { label: "Illustrative Opportunity Value", value: "$2.84M", delta: "5.2%", up: true, sub: "simulated" },
];

export const volumeSeries = Array.from({ length: 14 }, (_, i) => {
  const r = rng(i + 3);
  const base = 3100 + Math.round(Math.sin(i / 2.1) * 420 + r() * 300);
  return {
    day: `${String(5 + i).padStart(2, "0")} Aug`,
    conversations: base,
    quoteLeakage: Math.round(base * 0.062 + r() * 40),
    renewalRisk: Math.round(base * 0.048 + r() * 35),
    claimsFrustration: Math.round(base * 0.041 + r() * 30),
    complaintSignals: Math.round(base * 0.021 + r() * 20),
    reviewRequired: Math.round(base * 0.014 + r() * 14),
  };
});

export const COMMERCIAL_SIGNALS = [
  { label: "Quote Conversion Opportunities", value: 486, sub: "high-intent quotes without a confirmed next step", tone: "primary" as const },
  { label: "Renewal Save Opportunities", value: 438, sub: "cancellation language with save potential", tone: "warning" as const },
  { label: "Cross-sell Opportunities", value: 612, sub: "products mentioned as held elsewhere", tone: "info" as const },
  { label: "Lead Follow-up Gaps", value: 274, sub: "no follow-up signal recorded", tone: "danger" as const },
];

export const OPERATIONAL_SIGNALS = [
  { label: "Repeat Contact", value: 1146, sub: "customers contacting more than twice", tone: "warning" as const },
  { label: "Unresolved Claims Enquiries", value: 684, sub: "no resolution signal detected", tone: "danger" as const },
  { label: "Process Friction", value: 529, sub: "handoffs, transfers and re-verification", tone: "info" as const },
  { label: "Escalation Drivers", value: 312, sub: "escalation language detected", tone: "primary" as const },
];

export const RISK_SIGNALS = [
  { label: "Potential Complaints", value: 392, sub: "detected — pending human review", tone: "danger" as const },
  { label: "Vulnerability Indicators", value: 168, sub: "additional-care review recommended", tone: "warning" as const },
  { label: "Disclosure Review", value: 143, sub: "clarity of explanation to confirm", tone: "info" as const },
  { label: "Customer Harm Indicators", value: 47, sub: "review of next action appropriateness", tone: "primary" as const },
];

export type InsightItem = {
  id: string;
  title: string;
  changed: string;
  matters: string;
  cohort: string;
  action: string;
  tone: "danger" | "warning" | "info" | "primary" | "success" | "classify";
};

export const WEEKLY_INSIGHTS: InsightItem[] = [
  {
    id: "ins-1",
    title: "Premium-related cancellation language increased 17%",
    changed: "Premium-related cancellation language increased 17% in motor-renewal conversations.",
    matters: "Cancellation language paired with a competitor mention is the strongest leading indicator of lapse in the simulated dataset.",
    cohort: "Comprehensive Motor renewals, tenure 4+ years, NSW / QLD / VIC",
    action: "Review the affected renewal cohort and test targeted retention treatments before renewal date.",
    tone: "danger",
  },
  {
    id: "ins-2",
    title: "Delayed repair authorisation mentions increased 12%",
    changed: "Claims conversations mentioning delayed repair authorisation increased 12%.",
    matters: "Repair-authorisation enquiries generate a disproportionate share of repeat contact and escalation language.",
    cohort: "Motor claims at Repair Authorisation stage, all states",
    action: "Review communication and proactive status updates at the repair-authorisation stage.",
    tone: "warning",
  },
  {
    id: "ins-3",
    title: "Unclear excess explanations increased 9%",
    changed: "Potential complaints relating to unclear excess explanations increased 9%.",
    matters: "Excess confusion appears at both sale and claim, indicating a product-explanation issue rather than an agent issue.",
    cohort: "Home and Contents plus Comprehensive Motor claimants",
    action: "Review policy wording, sales explanations and claims communication for excess application.",
    tone: "info",
  },
  {
    id: "ins-4",
    title: "High-intent home quotes without follow-up rose to 148",
    changed: "High-intent home-insurance quotes without a recorded follow-up increased to 148.",
    matters: "High-intent quotes without a confirmed next step convert materially lower in the simulated dataset.",
    cohort: "Home and Contents quote enquiries, high intent",
    action: "Create a priority follow-up queue for sales teams and confirm ownership per quote.",
    tone: "primary",
  },
];

/* ------------------------------------------------------------------ */
/* Executive intelligence                                              */
/* ------------------------------------------------------------------ */

export type ExecInsight = {
  id: string;
  section: string;
  title: string;
  body: string[];
  action: string;
  metric: string;
  metricLabel: string;
  tone: "danger" | "warning" | "info" | "primary" | "success" | "classify";
};

export const EXEC_INSIGHTS: ExecInsight[] = [
  {
    id: "ex-1",
    section: "Retention Intelligence",
    title: "MOTOR RENEWAL PRICE PRESSURE IS INCREASING",
    body: [
      "Price objections appear in 38% of motor-renewal conversations.",
      "Customers mentioning a competitor alongside cancellation language show materially higher cancellation risk.",
    ],
    action: "Review affected renewal cohorts and test targeted retention treatments.",
    metric: "38%",
    metricLabel: "motor renewals with price objection",
    tone: "danger",
  },
  {
    id: "ex-2",
    section: "Revenue Intelligence",
    title: "QUOTE FOLLOW-UP IS LEAKING HIGH-INTENT OPPORTUNITIES",
    body: [
      "312 quote conversations were classified as high intent.",
      "148 did not contain a confirmed next step or completed follow-up signal.",
    ],
    action: "Create a priority follow-up queue for sales teams.",
    metric: "148",
    metricLabel: "high-intent quotes without follow-up",
    tone: "warning",
  },
  {
    id: "ex-3",
    section: "Claims Intelligence",
    title: "CLAIMS DELAYS ARE CREATING REPEAT CONTACT",
    body: [
      "Repair-authorisation enquiries represent a disproportionate share of repeat claims conversations.",
      "Repeat contact concentrates where no proactive status update was issued.",
    ],
    action: "Review communication at the repair-authorisation stage.",
    metric: "31%",
    metricLabel: "of repeat claims contact",
    tone: "info",
  },
  {
    id: "ex-4",
    section: "Risk Intelligence",
    title: "EXCESS EXPLANATIONS ARE GENERATING COMPLAINT RISK",
    body: [
      "Customers frequently express dissatisfaction after discovering how their excess applies.",
      "Signals appear at both point of sale and point of claim.",
    ],
    action: "Review policy wording, sales explanations and claims communication.",
    metric: "94",
    metricLabel: "excess-related complaint signals",
    tone: "primary",
  },
  {
    id: "ex-5",
    section: "Product Intelligence",
    title: "HOME AND MOTOR BUNDLE INTEREST IS BEING MISSED",
    body: [
      "Customers discussing motor insurance frequently mention home insurance held elsewhere.",
      "Bundle conversations are rarely initiated by agents when the signal appears.",
    ],
    action: "Test a targeted bundle conversation and follow-up workflow.",
    metric: "612",
    metricLabel: "cross-sell signals detected",
    tone: "success",
  },
  {
    id: "ex-6",
    section: "Customer Intelligence",
    title: "FINANCIAL PRESSURE LANGUAGE IS RISING IN RENEWALS",
    body: [
      "168 conversations contained additional-care indicators such as reduced income or hardship language.",
      "These conversations are concentrated in motor and home renewals with premium increases above 12%.",
    ],
    action: "Route detected indicators to qualified staff for human review and appropriate customer treatment.",
    metric: "168",
    metricLabel: "additional-care indicators",
    tone: "warning",
  },
];

/* ------------------------------------------------------------------ */
/* Quotes                                                              */
/* ------------------------------------------------------------------ */

export type Quote = {
  id: string;
  conversationId: string;
  customer: string;
  product: string;
  intent: "High" | "Medium" | "Low";
  quoted: number;
  barrier: string;
  competitor: string;
  followUp: "Confirmed" | "Not confirmed" | "Overdue";
  agent: string;
  opportunity: number;
  state: string;
  date: string;
};

export const quotes: Quote[] = conversations
  .filter((c) => c.type === "Quote Enquiry" || c.type === "Cross-sell")
  .map((c, i) => ({
    id: `QT-2026-${3100 + i}`,
    conversationId: c.id,
    customer: c.customer,
    product: c.product,
    intent: c.intent,
    quoted: c.premium,
    barrier: PURCHASE_BARRIERS[i % PURCHASE_BARRIERS.length]!,
    competitor: c.competitor,
    followUp: c.followUp,
    agent: c.agent,
    opportunity: c.opportunity,
    state: c.state,
    date: c.date,
  }));

export const QUOTE_KPIS = [
  { label: "Quote Conversations", value: "7,842" },
  { label: "High-Intent Quotes", value: "2,184" },
  { label: "Illustrative Quote Conversion", value: "61%" },
  { label: "Follow-up Gaps", value: "486" },
  { label: "Illustrative Opportunity Value", value: "$1.12M" },
];

export const QUOTE_FUNNEL = [
  { label: "Quote conversations", value: 7842 },
  { label: "Qualified need identified", value: 5416 },
  { label: "Premium quoted", value: 4321 },
  { label: "High intent", value: 2184 },
  { label: "Follow-up confirmed", value: 1698 },
  { label: "Converted", value: 1332 },
];

export const QUOTE_CONVERSION_BY_PRODUCT = PRODUCTS.map((p, i) => ({
  label: p,
  value: [64, 58, 62, 55, 71, 49][i]!,
}));

export const QUOTE_BARRIERS = PURCHASE_BARRIERS.map((b, i) => ({
  label: b,
  value: [1284, 962, 741, 688, 512, 431, 388, 341, 276][i]!,
}));

export const COMPETITOR_MENTIONS = [
  { label: "BudgetSure Insurance", value: 984 },
  { label: "Coastline Mutual", value: 612 },
  { label: "Southern Cross Cover", value: 487 },
  { label: "Redgum General", value: 341 },
  { label: "Everbright Assurance", value: 218 },
];

/* ------------------------------------------------------------------ */
/* Renewals                                                            */
/* ------------------------------------------------------------------ */

export const RENEWAL_KPIS = [
  { label: "Renewal Conversations", value: "6,428" },
  { label: "Renewals at Risk", value: "1,126" },
  { label: "High-Priority Save Opportunities", value: "438" },
  { label: "Annual Premium at Risk", value: "$1.64M" },
  { label: "No Save Attempt Detected", value: "27%" },
];

export const renewalRiskTrend = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  atRisk: Math.round(78 + Math.sin(i / 1.9) * 18 + i * 2.4),
  saved: Math.round(41 + Math.cos(i / 2.3) * 11 + i * 1.1),
}));

export const CANCELLATION_DRIVER_DATA = CANCELLATION_DRIVERS.map((d, i) => ({
  label: d,
  value: [412, 338, 221, 196, 174, 152, 118, 96, 74][i]!,
}));

export const RENEWAL_RISK_BY_PRODUCT = PRODUCTS.map((p, i) => ({ label: p, value: [386, 142, 258, 131, 104, 105][i]! }));

export const RENEWAL_RISK_BY_TENURE = [
  { label: "Under 1 year", value: 214 },
  { label: "1–3 years", value: 318 },
  { label: "4–6 years", value: 341 },
  { label: "7–10 years", value: 168 },
  { label: "10+ years", value: 85 },
];

export const SAVE_OUTCOMES = [
  { name: "Saved", value: 42, color: "var(--color-success)" },
  { name: "Lapsed", value: 23, color: "var(--color-danger)" },
  { name: "Pending", value: 21, color: "var(--color-warning)" },
  { name: "No attempt", value: 14, color: "var(--color-muted-foreground)" },
];

/* ------------------------------------------------------------------ */
/* Claims                                                              */
/* ------------------------------------------------------------------ */

export const CLAIMS_KPIS = [
  { label: "Claims Conversations", value: "9,284" },
  { label: "Require Attention", value: "684" },
  { label: "Repeat Claims Contacts", value: "1,146" },
  { label: "Escalation Signals", value: "312" },
  { label: "Illustrative Repeat-Contact Rate", value: "21%" },
];

export const CLAIMS_STAGE_VOLUME = CLAIM_STAGES.map((s, i) => ({
  label: s,
  value: [2148, 1642, 1671, 1284, 894, 712, 546, 387][i]!,
}));

export const CLAIMS_ROOT_CAUSE_DATA = CLAIM_ROOT_CAUSES.map((s, i) => ({
  label: s,
  value: [355, 214, 186, 141, 122, 96, 88, 71, 63][i]!,
}));

export const claimsFrustrationTrend = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  frustration: Math.round(120 + Math.sin(i / 1.6) * 22 + i * 3.1),
  repeatContact: Math.round(88 + Math.cos(i / 2.1) * 16 + i * 2.2),
}));

export const CLAIMS_ESCALATION_DRIVERS = [
  { label: "Repair authorisation delay", value: 96 },
  { label: "Previous commitment not completed", value: 71 },
  { label: "Status not updated", value: 58 },
  { label: "Settlement explanation", value: 44 },
  { label: "Excess confusion", value: 43 },
];

export const CLAIMS_SUPPLIER_MENTIONS = [
  { label: "Metro Panel Group", value: 214 },
  { label: "Northline Repairs", value: 168 },
  { label: "Harbourside Assessors", value: 121 },
  { label: "Glasspoint Auto", value: 94 },
  { label: "Statewide Restoration", value: 62 },
];

/* ------------------------------------------------------------------ */
/* Complaints                                                          */
/* ------------------------------------------------------------------ */

export const COMPLAINT_KPIS = [
  { label: "Potential Complaint Signals", value: "392" },
  { label: "Confirmed After Review", value: "241" },
  { label: "Emerging Complaint Theme", value: "94" },
  { label: "Escalation Required", value: "57" },
];

export const COMPLAINTS_BY_PRODUCT = PRODUCTS.map((p, i) => ({ label: p, value: [148, 41, 96, 38, 34, 35][i]! }));

export const COMPLAINT_THEME_DATA = COMPLAINT_THEMES.map((t, i) => ({
  label: t,
  value: [118, 94, 72, 58, 44, 41, 33, 28, 24, 19][i]!,
}));

export const COMPLAINT_REVIEW_SPLIT = [
  { name: "Confirmed", value: 61, color: "var(--color-danger)" },
  { name: "Dismissed", value: 24, color: "var(--color-muted-foreground)" },
  { name: "Under review", value: 15, color: "var(--color-warning)" },
];

export const TIME_TO_REVIEW = [
  { label: "Under 4 hours", value: 118 },
  { label: "4–24 hours", value: 146 },
  { label: "1–3 days", value: 84 },
  { label: "Over 3 days", value: 44 },
];

/* ------------------------------------------------------------------ */
/* Product intelligence                                                */
/* ------------------------------------------------------------------ */

export type ProductProfile = {
  name: string;
  conversations: number;
  quoteIntent: number;
  conversion: number;
  renewalRisk: number;
  claimsFriction: number;
  complaintSignals: number;
  competitorMentions: number;
  crossSell: number;
  objections: { label: string; value: number }[];
  questions: string[];
  note: string;
};

export const productProfiles: ProductProfile[] = [
  {
    name: "Comprehensive Motor",
    conversations: 18426,
    quoteIntent: 34,
    conversion: 64,
    renewalRisk: 386,
    claimsFriction: 41,
    complaintSignals: 148,
    competitorMentions: 984,
    crossSell: 312,
    objections: [
      { label: "Premium increase", value: 1284 },
      { label: "Excess amount", value: 642 },
      { label: "Competitor offer", value: 588 },
      { label: "Agreed value", value: 341 },
      { label: "Payment options", value: 274 },
    ],
    questions: ["How is my excess applied?", "Is a hire car included?", "Does agreed value change at renewal?"],
    note: "Comprehensive Motor generates the highest conversation volume across the portfolio.",
  },
  {
    name: "Third Party Property",
    conversations: 5142,
    quoteIntent: 22,
    conversion: 58,
    renewalRisk: 142,
    claimsFriction: 26,
    complaintSignals: 41,
    competitorMentions: 218,
    crossSell: 84,
    objections: [
      { label: "Price", value: 421 },
      { label: "Coverage uncertainty", value: 288 },
      { label: "Excess", value: 164 },
      { label: "Policy exclusions", value: 121 },
      { label: "Unclear next step", value: 96 },
    ],
    questions: ["What is not covered?", "Can I upgrade mid-term?", "Does this cover a hire vehicle?"],
    note: "Coverage uncertainty is the dominant barrier and drives repeat coverage questions.",
  },
  {
    name: "Home and Contents",
    conversations: 11284,
    quoteIntent: 31,
    conversion: 62,
    renewalRisk: 258,
    claimsFriction: 34,
    complaintSignals: 96,
    competitorMentions: 487,
    crossSell: 246,
    objections: [
      { label: "Sum insured adequacy", value: 612 },
      { label: "Premium increase", value: 548 },
      { label: "Excess", value: 388 },
      { label: "Flood cover", value: 288 },
      { label: "Competitor offer", value: 241 },
    ],
    questions: ["Is flood included?", "How is sum insured calculated?", "Are contents covered away from home?"],
    note: "Home and Contents shows strong cross-sell interest during motor conversations.",
  },
  {
    name: "Landlord",
    conversations: 4218,
    quoteIntent: 26,
    conversion: 55,
    renewalRisk: 131,
    claimsFriction: 29,
    complaintSignals: 38,
    competitorMentions: 174,
    crossSell: 71,
    objections: [
      { label: "Loss of rent limits", value: 288 },
      { label: "Premium increase", value: 214 },
      { label: "Tenant damage cover", value: 168 },
      { label: "Excess", value: 121 },
      { label: "Payment options", value: 84 },
    ],
    questions: ["Is malicious tenant damage covered?", "How long is loss of rent paid?", "Is landlord contents included?"],
    note: "Loss-of-rent limits are the most common source of coverage confusion.",
  },
  {
    name: "Travel",
    conversations: 6142,
    quoteIntent: 38,
    conversion: 71,
    renewalRisk: 104,
    claimsFriction: 22,
    complaintSignals: 34,
    competitorMentions: 148,
    crossSell: 62,
    objections: [
      { label: "Pre-existing conditions", value: 486 },
      { label: "Policy exclusions", value: 341 },
      { label: "Price", value: 288 },
      { label: "Cancellation cover", value: 174 },
      { label: "Excess", value: 96 },
    ],
    questions: ["Are pre-existing conditions covered?", "What if my flight is delayed?", "Is cruise cover included?"],
    note: "Travel insurance produces recurring questions about exclusions and pre-existing conditions.",
  },
  {
    name: "Pet Insurance",
    conversations: 3064,
    quoteIntent: 29,
    conversion: 49,
    renewalRisk: 105,
    claimsFriction: 19,
    complaintSignals: 35,
    competitorMentions: 96,
    crossSell: 41,
    objections: [
      { label: "Benefit limits", value: 241 },
      { label: "Waiting periods", value: 188 },
      { label: "Premium increase", value: 164 },
      { label: "Pre-existing conditions", value: 121 },
      { label: "Price", value: 88 },
    ],
    questions: ["What are the waiting periods?", "Are dental treatments covered?", "Do benefits reset annually?"],
    note: "Benefit limits and waiting periods drive the majority of pet-insurance objections.",
  },
];

/* ------------------------------------------------------------------ */
/* Agents                                                              */
/* ------------------------------------------------------------------ */

export type Agent = {
  name: string;
  team: string;
  conversations: number;
  quality: number;
  quoteConversion: number;
  renewalSaveRate: number;
  repeatContact: number;
  escalation: number;
  complaintRecognition: number;
  customerCare: number;
  followUpCompletion: number;
  strengths: string[];
  coaching: string[];
};

const AGENT_TEAMS = ["Sales", "Retention", "Claims", "Service"];

export const agents: Agent[] = AGENT_NAMES.map((name, i) => {
  const r = rng(i * 31 + 11);
  return {
    name,
    team: AGENT_TEAMS[i % AGENT_TEAMS.length]!,
    conversations: 280 + Math.round(r() * 260),
    quality: 68 + Math.round(r() * 24),
    quoteConversion: 44 + Math.round(r() * 26),
    renewalSaveRate: 32 + Math.round(r() * 28),
    repeatContact: 12 + Math.round(r() * 14),
    escalation: 3 + Math.round(r() * 9),
    complaintRecognition: 52 + Math.round(r() * 38),
    customerCare: 66 + Math.round(r() * 28),
    followUpCompletion: 58 + Math.round(r() * 34),
    strengths: ["Product knowledge", "Professional tone", "Verification", "Process adherence"],
    coaching: ["Needs discovery", "Retention exploration", "Complaint recognition", "Next-step confirmation", "Closure"],
  };
});

// Pin the featured agent's figures to the specified demo values.
agents[0] = {
  ...agents[0]!,
  name: "Daniel Reed",
  team: "Retention",
  conversations: 428,
  quality: 81,
  quoteConversion: 58,
  renewalSaveRate: 42,
  repeatContact: 19,
  escalation: 6,
  complaintRecognition: 64,
  customerCare: 86,
  followUpCompletion: 72,
};

/* ------------------------------------------------------------------ */
/* Risk & review queue                                                 */
/* ------------------------------------------------------------------ */

export type RiskItem = {
  id: string;
  conversationId: string;
  customer: string;
  signal: string;
  product: string;
  severity: string;
  evidence: string;
  reviewer: string;
  status: string;
  date: string;
};

const REVIEWERS = ["Customer Care Team", "Compliance Team", "Quality Team", "Unassigned"];

export const riskItems: RiskItem[] = conversations
  .filter((c) => c.risk === "Critical" || c.risk === "High")
  .slice(0, 64)
  .map((c, i) => ({
    id: `RR-2026-${800 + i}`,
    conversationId: c.id,
    customer: c.customer,
    signal: c.hero ? "Potential complaint signal" : RISK_SIGNAL_TYPES[i % RISK_SIGNAL_TYPES.length]!,
    product: c.product,
    severity: c.hero ? "Critical" : SEVERITIES[(i + 1) % SEVERITIES.length]!,
    evidence: c.hero
      ? "\u201cIf Harbour can't do better I'll probably cancel and move across before the renewal date.\u201d"
      : `\u201c${c.transcript[5]?.text ?? "Customer expressed concern during the conversation."}\u201d`,
    reviewer: REVIEWERS[i % REVIEWERS.length]!,
    status: c.hero ? "New" : REVIEW_STATUSES[i % REVIEW_STATUSES.length]!,
    date: c.date,
  }));

/* ------------------------------------------------------------------ */
/* Customers                                                           */
/* ------------------------------------------------------------------ */

export type Customer = {
  id: string;
  name: string;
  state: string;
  city: string;
  segment: string;
  tenure: string;
  products: string[];
  annualPremium: number;
  renewalDate: string;
  retentionRisk: "Critical" | "High" | "Moderate" | "Low";
  currentIntent: string;
  complaints: number;
  claims: number;
  conversations: number;
  competitor: string;
  crossSell: string;
  preference: string;
  openActions: number;
  conversationIds: string[];
  summary: string;
};

export const customers: Customer[] = (() => {
  const byName = new Map<string, Conversation[]>();
  for (const c of conversations) {
    const list = byName.get(c.customer) ?? [];
    list.push(c);
    byName.set(c.customer, list);
  }
  const out: Customer[] = [];
  let i = 0;
  for (const [name, list] of byName) {
    const head = list[0]!;
    const r = rng(i * 17 + 7);
    const hero = name === "Sophie Bennett";
    out.push({
      id: hero ? "HI-AU-18492" : head.customerId,
      name,
      state: head.state,
      city: head.city,
      segment: head.segment,
      tenure: hero ? "6 years" : `${1 + Math.floor(r() * 12)} years`,
      products: hero ? ["Comprehensive Motor"] : Array.from(new Set(list.map((c) => c.product))),
      annualPremium: hero ? 1486 : list.reduce((s, c) => s + c.premium, 0),
      renewalDate: hero ? "12 Sep 2026" : `${String(1 + Math.floor(r() * 28)).padStart(2, "0")} ${["Sep", "Oct", "Nov", "Dec"][Math.floor(r() * 4)]} 2026`,
      retentionRisk: hero ? "Critical" : head.risk,
      currentIntent: hero ? "Would prefer to remain if value improves" : head.intent === "High" ? "Actively comparing" : "Monitoring",
      complaints: hero ? 1 : Math.floor(r() * 2),
      claims: hero ? 1 : Math.floor(r() * 3),
      conversations: list.length,
      competitor: hero ? "BudgetSure Insurance" : head.competitor,
      crossSell: hero ? "Home Insurance" : PRODUCTS[Math.floor(r() * PRODUCTS.length)]!,
      preference: ["Phone", "Email", "SMS"][Math.floor(r() * 3)]!,
      openActions: hero ? 3 : Math.floor(r() * 3),
      conversationIds: list.map((c) => c.id),
      summary: hero
        ? "Six-year comprehensive motor policyholder in Brisbane. Renewal premium increased 18% to $1,486. Competitor offer of approximately $1,290 recorded, cancellation language detected, additional-care indicator present and home insurance held with another insurer."
        : `${name} holds ${list.length} recorded conversation${list.length === 1 ? "" : "s"} with Harbour Insurance. Current intelligence indicates ${head.primarySignal.toLowerCase()} as the leading signal on the account.`,
    });
    i++;
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
})();

/* ------------------------------------------------------------------ */
/* Action items                                                        */
/* ------------------------------------------------------------------ */

export const ACTION_TYPES = [
  "Quote Follow-up",
  "Retention Review",
  "Claims Escalation",
  "Complaint Review",
  "Customer Care Review",
  "Compliance Review",
  "Coaching",
  "Product Investigation",
  "Process Improvement",
];

export const ACTION_STATUSES = ["Open", "In Progress", "Completed", "Dismissed", "Escalated"];

export const OUTCOME_OPTIONS = [
  "—",
  "Converted",
  "Renewed",
  "Cancelled",
  "Issue Resolved",
  "Complaint Confirmed",
  "Complaint Dismissed",
  "Escalated",
  "No Response",
  "No Change",
];

export type ActionItem = {
  id: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  target: string;
  type: string;
  action: string;
  reason: string;
  owner: string;
  due: string;
  conversationId: string;
  potential: string;
  status: string;
  outcome: string;
};

const OWNERS = ["Retention Team", "Sales Team", "Claims Team", "Customer Care", "Compliance", "Quality Team"];

export const seedActions: ActionItem[] = [
  {
    id: "ACT-2026-0001",
    priority: "Critical",
    target: "Sophie Bennett",
    type: "Retention Review",
    action: "Priority retention review — contact within two hours",
    reason: "18% premium increase, competitor offer $1,290, cancellation language detected",
    owner: "Retention Team",
    due: "18 Aug 2026",
    conversationId: "CV-AU-100001",
    potential: "$1,486 annual premium retained",
    status: "Open",
    outcome: "—",
  },
  {
    id: "ACT-2026-0002",
    priority: "Critical",
    target: "Sophie Bennett",
    type: "Customer Care Review",
    action: "Review additional-care indicator before next contact",
    reason: "Customer referred to reduced working hours and financial pressure",
    owner: "Customer Care",
    due: "18 Aug 2026",
    conversationId: "CV-AU-100001",
    potential: "Appropriate customer treatment",
    status: "Open",
    outcome: "—",
  },
  ...conversations.slice(1, 46).map((c, i) => ({
    id: `ACT-2026-${String(3 + i).padStart(4, "0")}`,
    priority: (c.risk === "Critical" ? "Critical" : c.risk === "High" ? "High" : c.risk === "Moderate" ? "Medium" : "Low") as ActionItem["priority"],
    target: c.customer,
    type: ACTION_TYPES[i % ACTION_TYPES.length]!,
    action:
      ACTION_TYPES[i % ACTION_TYPES.length] === "Quote Follow-up"
        ? "Contact customer and confirm next step on open quote"
        : ACTION_TYPES[i % ACTION_TYPES.length] === "Coaching"
          ? `Coaching session with ${c.agent} on retention exploration`
          : `Review ${c.product.toLowerCase()} conversation and confirm next action`,
    reason: `${c.primarySignal} detected on ${c.type.toLowerCase()} conversation`,
    owner: OWNERS[i % OWNERS.length]!,
    due: c.date,
    conversationId: c.id,
    potential: `${usd(c.opportunity)} illustrative value`,
    status: ACTION_STATUSES[i % 3]!,
    outcome: "—",
  })),
];

/* ------------------------------------------------------------------ */
/* Ask CallVibe — simulated answers                                    */
/* ------------------------------------------------------------------ */

export type AskAnswer = {
  q: string;
  headline: string;
  body: string[];
  stats: { label: string; value: string }[];
};

export const ASK_SUGGESTIONS = [
  "Why are motor-policy customers cancelling?",
  "Which quote objections are increasing?",
  "Show high-intent quotes without a confirmed follow-up.",
  "What is driving repeat claims contact?",
  "Which claims stage creates the most frustration?",
  "Show conversations containing possible complaint signals.",
  "Which products generate the most coverage confusion?",
  "Which agents need coaching on renewal retention?",
  "What competitors are customers mentioning?",
  "Which conversations contain possible customer vulnerability indicators?",
];

export const ASK_ANSWERS: AskAnswer[] = [
  {
    q: "Why are motor-policy customers cancelling?",
    headline: "Premium increase is the dominant cancellation driver in motor conversations.",
    body: [
      "Price objections appear in 38% of motor-renewal conversations, and premium increase is the leading cancellation driver at 412 detected mentions.",
      "Cancellation language paired with a named competitor is the strongest lapse indicator in the simulated dataset.",
      "27% of at-risk renewals contained no detected save attempt.",
    ],
    stats: [
      { label: "At-risk renewals", value: "1,126" },
      { label: "Premium at risk", value: "$1.64M" },
      { label: "No save attempt", value: "27%" },
    ],
  },
  {
    q: "Which quote objections are increasing?",
    headline: "Price and coverage uncertainty are rising fastest across quote conversations.",
    body: [
      "Price remains the largest single barrier at 1,284 detected mentions, followed by coverage uncertainty at 962.",
      "Excess-related objections increased 9% period-on-period and appear across both motor and home quotes.",
    ],
    stats: [
      { label: "Quote conversations", value: "7,842" },
      { label: "Follow-up gaps", value: "486" },
      { label: "Opportunity value", value: "$1.12M" },
    ],
  },
  {
    q: "Show high-intent quotes without a confirmed follow-up.",
    headline: "148 high-intent quotes have no confirmed next step recorded.",
    body: [
      "312 quote conversations were classified as high intent; 148 contained no confirmed follow-up signal.",
      "Home and Contents represents the largest share of the gap.",
    ],
    stats: [
      { label: "High-intent quotes", value: "2,184" },
      { label: "No confirmed next step", value: "148" },
      { label: "Illustrative value", value: "$427K" },
    ],
  },
  {
    q: "What is driving repeat claims contact?",
    headline: "Repair-authorisation delay is the largest source of repeat claims contact.",
    body: [
      "Repair-authorisation enquiries represent 18% of claims conversations but 31% of repeat claims contact.",
      "Repeat contact concentrates where no proactive status update was issued after the previous conversation.",
    ],
    stats: [
      { label: "Repeat contacts", value: "1,146" },
      { label: "Repeat-contact rate", value: "21%" },
      { label: "Escalation signals", value: "312" },
    ],
  },
  {
    q: "Which claims stage creates the most frustration?",
    headline: "Repair Authorisation shows the highest frustration density.",
    body: [
      "Assessment and Repair Authorisation account for the majority of negative-sentiment claims conversations.",
      "Excess and Settlement stages generate lower volume but higher complaint-signal density.",
    ],
    stats: [
      { label: "Claims conversations", value: "9,284" },
      { label: "Require attention", value: "684" },
      { label: "Escalations", value: "312" },
    ],
  },
  {
    q: "Show conversations containing possible complaint signals.",
    headline: "392 conversations contain potential complaint signals pending human review.",
    body: [
      "241 were confirmed as complaints after review; 94 relate to an emerging theme around excess explanations.",
      "Detection supports review. It does not replace the insurer's complaint-identification process.",
    ],
    stats: [
      { label: "Potential signals", value: "392" },
      { label: "Confirmed", value: "241" },
      { label: "Escalation required", value: "57" },
    ],
  },
  {
    q: "Which products generate the most coverage confusion?",
    headline: "Travel and Landlord generate the highest coverage-confusion density.",
    body: [
      "Travel produces recurring questions about exclusions and pre-existing conditions.",
      "Landlord shows concentrated confusion around loss-of-rent limits and tenant damage.",
    ],
    stats: [
      { label: "Coverage questions", value: "3,418" },
      { label: "Travel share", value: "24%" },
      { label: "Landlord share", value: "17%" },
    ],
  },
  {
    q: "Which agents need coaching on renewal retention?",
    headline: "Retention exploration is the lowest-scoring dimension across the retention team.",
    body: [
      "Four agents score below 60 on retention exploration while scoring above 85 on process adherence.",
      "Coaching should target objection handling and next-step confirmation rather than compliance behaviour.",
    ],
    stats: [
      { label: "Agents reviewed", value: "10" },
      { label: "Below-target retention exploration", value: "4" },
      { label: "Avg quality", value: "79" },
    ],
  },
  {
    q: "What competitors are customers mentioning?",
    headline: "BudgetSure Insurance is the most frequently mentioned competitor.",
    body: [
      "BudgetSure appears in 984 conversations, predominantly during motor renewals with premium increases above 12%.",
      "Coastline Mutual mentions concentrate in Home and Contents quotes.",
    ],
    stats: [
      { label: "Competitor mentions", value: "2,642" },
      { label: "BudgetSure share", value: "37%" },
      { label: "With cancellation language", value: "418" },
    ],
  },
  {
    q: "Which conversations contain possible customer vulnerability indicators?",
    headline: "168 conversations contain additional-care indicators for human review.",
    body: [
      "Indicators include reduced income, hardship language and difficulty managing household costs.",
      "No automatic determination is made. Qualified employees remain responsible for review and treatment.",
    ],
    stats: [
      { label: "Indicators detected", value: "168" },
      { label: "Reviewed", value: "112" },
      { label: "Awaiting review", value: "56" },
    ],
  },
];

export function askCallVibe(query: string): AskAnswer {
  const n = query.toLowerCase();
  const found = ASK_ANSWERS.find((a) => {
    const words = a.q.toLowerCase().replace(/[^a-z ]/g, "").split(" ").filter((w) => w.length > 4);
    return words.filter((w) => n.includes(w)).length >= 2;
  });
  return (
    found ?? {
      q: query,
      headline: "No exact match in the simulated dataset — showing the closest portfolio signals.",
      body: [
        "CallVibe searched 48,276 simulated conversations across quotes, renewals, claims and complaints.",
        "The strongest current signals are motor renewal price pressure, quote follow-up gaps and repair-authorisation delays.",
      ],
      stats: [
        { label: "Conversations searched", value: "48,276" },
        { label: "Signals detected", value: "3,412" },
        { label: "Opportunity value", value: "$2.84M" },
      ],
    }
  );
}
