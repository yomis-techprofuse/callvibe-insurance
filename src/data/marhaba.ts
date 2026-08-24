// Fictional demo dataset for the Marhaba Intelligence prototype.
// All figures are mock data for demonstration purposes only.

export const WORKSPACE = "Dubai Residential Portfolio";

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  name: string;
  short: string;
  location: string;
  type: string;
  from: string;
  handover: string;
  mix: string;
  conversations: number;
  qualifiedRate: number;
  highIntentRate: number;
  siteVisits: number;
  bookingIntent: number;
  dominantBuyerType: string;
  topConfig: string;
  medianBudget: string;
  drivers: { label: string; value: number }[];
  objections: { label: string; value: number }[];
  competitors: { label: string; value: number }[];
  sourceMix: { label: string; value: number }[];
  trend: { day: string; conversations: number; intent: number }[];
  brief: string;
  advisors: { name: string; calls: number; quality: number; siteVisits: number }[];
};

const trendFor = (base: number, seed: number) =>
  Array.from({ length: 12 }, (_, i) => {
    const w = Math.sin((i + seed) / 1.7) * 0.16 + Math.cos((i + seed) / 3.1) * 0.1;
    return {
      day: `W${i + 1}`,
      conversations: Math.round(base * (1 + w)),
      intent: Math.round(52 + w * 60 + (i % 3) * 2),
    };
  });

export const projects: Project[] = [
  {
    id: "creek",
    name: "Marhaba Creek Residences",
    short: "Creek Residences",
    location: "Dubai Creek Harbour",
    type: "Apartments",
    from: "$520K",
    handover: "Q4 2028",
    mix: "1BR–3BR",
    conversations: 1042,
    qualifiedRate: 34,
    highIntentRate: 27,
    siteVisits: 68,
    bookingIntent: 24,
    dominantBuyerType: "Investor",
    topConfig: "2BR",
    medianBudget: "$650K",
    drivers: [
      { label: "Waterfront Location", value: 312 },
      { label: "Rental Yield", value: 264 },
      { label: "Capital Appreciation", value: 208 },
      { label: "Amenities", value: 151 },
      { label: "Golden Visa", value: 96 },
    ],
    objections: [
      { label: "Price", value: 241 },
      { label: "Service Charges", value: 164 },
      { label: "Payment Plan", value: 132 },
      { label: "Handover", value: 88 },
      { label: "Unit Size", value: 54 },
    ],
    competitors: [
      { label: "Emaar", value: 188 },
      { label: "Sobha Realty", value: 74 },
      { label: "DAMAC", value: 61 },
      { label: "Ellington", value: 33 },
    ],
    sourceMix: [
      { label: "Meta", value: 34 },
      { label: "Google Search", value: 27 },
      { label: "Property Portals", value: 19 },
      { label: "Broker Referral", value: 12 },
      { label: "Events", value: 8 },
    ],
    trend: trendFor(88, 0),
    brief:
      "Marhaba Creek Residences is generating the portfolio's strongest investor interest. Demand is concentrated in 2BR units between $600K and $750K. Waterfront location and rental potential are the strongest positive drivers. Price and service charges are the dominant objections, with Emaar the most frequently mentioned competitor.",
    advisors: [
      { name: "Sara Khan", calls: 214, quality: 86, siteVisits: 24 },
      { name: "Fatima Noor", calls: 176, quality: 88, siteVisits: 21 },
      { name: "Priya Menon", calls: 152, quality: 81, siteVisits: 13 },
      { name: "Omar Rahman", calls: 141, quality: 78, siteVisits: 10 },
    ],
  },
  {
    id: "hills",
    name: "Marhaba Hills",
    short: "Hills",
    location: "Dubai Hills Estate",
    type: "Apartments",
    from: "$400K",
    handover: "Q2 2028",
    mix: "1BR–3BR",
    conversations: 812,
    qualifiedRate: 31,
    highIntentRate: 24,
    siteVisits: 51,
    bookingIntent: 17,
    dominantBuyerType: "End User",
    topConfig: "2BR",
    medianBudget: "$495K",
    drivers: [
      { label: "Community Quality", value: 246 },
      { label: "Schools", value: 188 },
      { label: "Park / Green Space", value: 141 },
      { label: "Capital Appreciation", value: 112 },
      { label: "Amenities", value: 97 },
    ],
    objections: [
      { label: "Price", value: 174 },
      { label: "Payment Plan", value: 141 },
      { label: "Handover", value: 96 },
      { label: "Unit Size", value: 71 },
      { label: "Service Charges", value: 58 },
    ],
    competitors: [
      { label: "Emaar", value: 152 },
      { label: "Meraas", value: 48 },
      { label: "Sobha Realty", value: 41 },
      { label: "Nakheel", value: 22 },
    ],
    sourceMix: [
      { label: "Meta", value: 31 },
      { label: "Google Search", value: 29 },
      { label: "Property Portals", value: 21 },
      { label: "Walk-in", value: 11 },
      { label: "Events", value: 8 },
    ],
    trend: trendFor(68, 2),
    brief:
      "Marhaba Hills attracts a predominantly end-user audience. Community quality and school proximity are the strongest positive drivers, while payment-plan flexibility is the most common blocker after price. Emaar is the most-referenced comparison, mainly on community maturity.",
    advisors: [
      { name: "Priya Menon", calls: 168, quality: 82, siteVisits: 16 },
      { name: "Omar Rahman", calls: 154, quality: 79, siteVisits: 12 },
      { name: "Sara Khan", calls: 121, quality: 84, siteVisits: 13 },
      { name: "Daniel George", calls: 98, quality: 72, siteVisits: 6 },
    ],
  },
  {
    id: "marina",
    name: "Marhaba Marina Residences",
    short: "Marina Residences",
    location: "Dubai Marina",
    type: "Apartments",
    from: "$650K",
    handover: "Ready / Near Ready",
    mix: "1BR–4BR",
    conversations: 704,
    qualifiedRate: 36,
    highIntentRate: 29,
    siteVisits: 47,
    bookingIntent: 21,
    dominantBuyerType: "Existing Investor",
    topConfig: "2BR",
    medianBudget: "$850K",
    drivers: [
      { label: "Ready Handover", value: 221 },
      { label: "Marina View", value: 194 },
      { label: "Rental Yield", value: 172 },
      { label: "Metro / Connectivity", value: 108 },
      { label: "Golden Visa", value: 88 },
    ],
    objections: [
      { label: "Price", value: 198 },
      { label: "Service Charges", value: 132 },
      { label: "Unit Size", value: 74 },
      { label: "Payment Plan", value: 61 },
      { label: "Legal / Documentation", value: 28 },
    ],
    competitors: [
      { label: "Emaar", value: 98 },
      { label: "DAMAC", value: 72 },
      { label: "Ellington", value: 44 },
      { label: "Binghatti", value: 27 },
    ],
    sourceMix: [
      { label: "Google Search", value: 33 },
      { label: "Property Portals", value: 26 },
      { label: "Meta", value: 21 },
      { label: "Broker Referral", value: 14 },
      { label: "Events", value: 6 },
    ],
    trend: trendFor(58, 4),
    brief:
      "Marhaba Marina Residences skews to higher budgets and ready-inventory demand. Existing investors dominate, and short-term rental eligibility is an increasingly common question. Price per square foot and service charges are the main friction points.",
    advisors: [
      { name: "Fatima Noor", calls: 149, quality: 89, siteVisits: 18 },
      { name: "Sara Khan", calls: 132, quality: 85, siteVisits: 14 },
      { name: "Arjun Nair", calls: 96, quality: 71, siteVisits: 6 },
      { name: "Daniel George", calls: 88, quality: 74, siteVisits: 5 },
    ],
  },
  {
    id: "south",
    name: "Marhaba South Gardens",
    short: "South Gardens",
    location: "Dubai South",
    type: "Apartments & Townhouses",
    from: "$260K",
    handover: "Q1 2029",
    mix: "1BR–3BR / TH",
    conversations: 668,
    qualifiedRate: 26,
    highIntentRate: 18,
    siteVisits: 34,
    bookingIntent: 11,
    dominantBuyerType: "First-Time Buyer",
    topConfig: "2BR",
    medianBudget: "$320K",
    drivers: [
      { label: "Entry Price", value: 268 },
      { label: "Payment Plan", value: 214 },
      { label: "Townhouse Option", value: 141 },
      { label: "Expo / Connectivity", value: 96 },
      { label: "Schools", value: 62 },
    ],
    objections: [
      { label: "Location", value: 202 },
      { label: "Handover", value: 158 },
      { label: "Mortgage", value: 146 },
      { label: "Price", value: 91 },
      { label: "Reputation", value: 44 },
    ],
    competitors: [
      { label: "DAMAC", value: 88 },
      { label: "Danube", value: 76 },
      { label: "Nakheel", value: 51 },
      { label: "Binghatti", value: 38 },
    ],
    sourceMix: [
      { label: "Meta", value: 41 },
      { label: "Property Portals", value: 22 },
      { label: "Google Search", value: 18 },
      { label: "Walk-in", value: 12 },
      { label: "Broker Referral", value: 7 },
    ],
    trend: trendFor(55, 6),
    brief:
      "Marhaba South Gardens is the most price-sensitive and mortgage-oriented project in the portfolio. It generates the highest share of mortgage-related questions and the highest volume of payment-plan objections. Location perception remains the primary blocker for end users.",
    advisors: [
      { name: "Daniel George", calls: 161, quality: 71, siteVisits: 8 },
      { name: "Arjun Nair", calls: 148, quality: 69, siteVisits: 7 },
      { name: "Omar Rahman", calls: 122, quality: 78, siteVisits: 11 },
      { name: "Priya Menon", calls: 96, quality: 80, siteVisits: 8 },
    ],
  },
  {
    id: "islands",
    name: "Marhaba Islands",
    short: "Islands",
    location: "Dubai Islands",
    type: "Apartments & Penthouses",
    from: "$750K",
    handover: "Q4 2029",
    mix: "1BR–4BR",
    conversations: 574,
    qualifiedRate: 29,
    highIntentRate: 22,
    siteVisits: 26,
    bookingIntent: 9,
    dominantBuyerType: "Investor",
    topConfig: "2BR",
    medianBudget: "$950K",
    drivers: [
      { label: "Sea View", value: 198 },
      { label: "Capital Appreciation", value: 166 },
      { label: "Golden Visa", value: 121 },
      { label: "Beach Access", value: 98 },
      { label: "Payment Plan", value: 71 },
    ],
    objections: [
      { label: "Handover", value: 172 },
      { label: "Price", value: 134 },
      { label: "Location", value: 96 },
      { label: "Service Charges", value: 62 },
      { label: "Unit Size", value: 41 },
    ],
    competitors: [
      { label: "Nakheel", value: 96 },
      { label: "Emaar", value: 62 },
      { label: "Meraas", value: 48 },
      { label: "Sobha Realty", value: 26 },
    ],
    sourceMix: [
      { label: "Meta", value: 30 },
      { label: "Google Search", value: 24 },
      { label: "Property Portals", value: 22 },
      { label: "Events", value: 14 },
      { label: "Broker Referral", value: 10 },
    ],
    trend: trendFor(48, 8),
    brief:
      "Marhaba Islands draws international investor attention with Golden Visa eligibility mentioned in roughly one in five qualified conversations. The 2029 handover is the dominant objection and the main reason buyers compare with ready Nakheel inventory.",
    advisors: [
      { name: "Fatima Noor", calls: 116, quality: 87, siteVisits: 9 },
      { name: "Sara Khan", calls: 98, quality: 84, siteVisits: 8 },
      { name: "Priya Menon", calls: 89, quality: 80, siteVisits: 5 },
      { name: "Arjun Nair", calls: 74, quality: 70, siteVisits: 4 },
    ],
  },
  {
    id: "meydan",
    name: "Marhaba Meydan One",
    short: "Meydan One",
    location: "Meydan",
    type: "Apartments",
    from: "$350K",
    handover: "Q3 2028",
    mix: "1BR–3BR",
    conversations: 486,
    qualifiedRate: 28,
    highIntentRate: 20,
    siteVisits: 15,
    bookingIntent: 5,
    dominantBuyerType: "End User",
    topConfig: "1BR",
    medianBudget: "$450K",
    drivers: [
      { label: "Downtown Proximity", value: 172 },
      { label: "Entry Price", value: 141 },
      { label: "Payment Plan", value: 118 },
      { label: "Amenities", value: 84 },
      { label: "Rental Yield", value: 62 },
    ],
    objections: [
      { label: "Price", value: 121 },
      { label: "Payment Plan", value: 108 },
      { label: "Service Charges", value: 74 },
      { label: "Handover", value: 66 },
      { label: "Unit Size", value: 38 },
    ],
    competitors: [
      { label: "Emaar", value: 66 },
      { label: "Binghatti", value: 52 },
      { label: "DAMAC", value: 44 },
      { label: "Danube", value: 31 },
    ],
    sourceMix: [
      { label: "Meta", value: 36 },
      { label: "Google Search", value: 25 },
      { label: "Property Portals", value: 20 },
      { label: "Walk-in", value: 11 },
      { label: "Events", value: 8 },
    ],
    trend: trendFor(41, 10),
    brief:
      "Marhaba Meydan One converts primarily on price-per-square-foot and downtown proximity. 1BR demand is unusually strong relative to the portfolio, and buyers frequently benchmark payment plans against Binghatti and Danube.",
    advisors: [
      { name: "Omar Rahman", calls: 131, quality: 79, siteVisits: 6 },
      { name: "Daniel George", calls: 116, quality: 73, siteVisits: 4 },
      { name: "Arjun Nair", calls: 80, quality: 70, siteVisits: 3 },
      { name: "Priya Menon", calls: 62, quality: 81, siteVisits: 2 },
    ],
  },
];

export const projectNames = projects.map((p) => p.name);

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

export const topKpis = [
  { label: "Buyer Conversations", value: "4,286", delta: "+8.4%", up: true, tone: "primary" },
  { label: "Qualified Buyers", value: "1,247", delta: "+6.1%", up: true, tone: "info" },
  { label: "High-Intent Buyers", value: "386", delta: "+11.2%", up: true, tone: "success" },
  { label: "Site Visits Requested", value: "241", delta: "+4.7%", up: true, tone: "classify" },
  { label: "Booking Intent Detected", value: "87", delta: "+9.3%", up: true, tone: "warning" },
  { label: "Opportunities at Risk", value: "63", delta: "+12.0%", up: false, tone: "danger" },
] as const;

export const secondaryKpis = [
  { label: "Avg Sales Quality", value: "79%", sub: "Across 6 advisors" },
  { label: "Avg Conversation", value: "5:48", sub: "Duration" },
  { label: "Answer Rate", value: "72%", sub: "Inbound + outbound" },
  { label: "Qualified Rate", value: "29%", sub: "Of all conversations" },
  { label: "Site Visit Conversion", value: "41%", sub: "Requested → confirmed" },
  { label: "WhatsApp Share", value: "38%", sub: "Of all conversations" },
] as const;

export const volumeTrend = Array.from({ length: 30 }, (_, i) => {
  const base = 118 + Math.sin(i / 3.4) * 22 + (i > 20 ? 14 : 0);
  const weekend = i % 7 === 5 || i % 7 === 6 ? -26 : 0;
  return {
    day: `${String(((i + 8) % 30) + 1).padStart(2, "0")} ${i < 22 ? "Jul" : "Aug"}`,
    calls: Math.round(base + weekend),
    whatsapp: Math.round((base + weekend) * 0.62 + (i % 4) * 3),
  };
});

export const intentDistribution = [
  { name: "High", value: 23, color: "var(--color-success)" },
  { name: "Medium", value: 49, color: "var(--color-warning)" },
  { name: "Low", value: 28, color: "var(--color-muted-foreground)" },
];

export const sentimentDistribution = [
  { name: "Positive", value: 54, color: "var(--color-success)" },
  { name: "Neutral", value: 33, color: "var(--color-warning)" },
  { name: "Negative", value: 13, color: "var(--color-danger)" },
];

export const projectDemand = projects
  .map((p) => ({ label: p.short, value: Math.round((p.conversations * p.qualifiedRate) / 100) }))
  .sort((a, b) => b.value - a.value);

export const buyerTypeSplit = [
  { label: "Investor", value: 57 },
  { label: "End User", value: 38 },
  { label: "Undecided", value: 5 },
];

export const configurationDemand = [
  { label: "Studio", value: 6 },
  { label: "1BR", value: 24 },
  { label: "2BR", value: 46 },
  { label: "3BR", value: 17 },
  { label: "4BR+", value: 7 },
];

export const budgetBands = [
  { label: "Under $250K", value: 9 },
  { label: "$250K–$400K", value: 22 },
  { label: "$400K–$650K", value: 41 },
  { label: "$650K–$1M", value: 21 },
  { label: "$1M–$2M+", value: 7 },
];

export const topObjections = [
  { label: "Price", value: 961 },
  { label: "Payment Plan", value: 674 },
  { label: "Location", value: 448 },
  { label: "Service Charges", value: 402 },
  { label: "Handover", value: 366 },
  { label: "Unit Size", value: 214 },
  { label: "Mortgage", value: 188 },
];

export const executiveBrief = [
  {
    tone: "danger" as const,
    title: "Price resistance rising at Creek",
    body: "Price resistance for Marhaba Creek Residences increased 18% over the last 30 days, concentrated among 2BR investors comparing the project with Emaar Creek Harbour.",
    meta: "Portfolio · last 30 days",
  },
  {
    tone: "success" as const,
    title: "Payment-plan follow-ups convert",
    body: "Buyers asking about payment-plan flexibility are 1.6x more likely to request a site visit after receiving a structured follow-up within 24 hours.",
    meta: "1,204 conversations analysed",
  },
  {
    tone: "warning" as const,
    title: "63 high-intent buyers awaiting follow-up",
    body: "18 of these previously requested a site visit that has not yet been confirmed. Creek and Marina account for 61% of the backlog.",
    meta: "Opportunity leakage",
  },
  {
    tone: "info" as const,
    title: "Golden Visa mentions up 21%",
    body: "Golden Visa eligibility mentions increased 21% among international investor conversations, strongest on Marhaba Islands and Marina Residences.",
    meta: "Emerging buyer trend",
  },
  {
    tone: "classify" as const,
    title: "2BR remains the portfolio engine",
    body: "2BR accounts for 46% of qualified buyer conversations across the portfolio and 52% of booking-intent signals.",
    meta: "Configuration demand",
  },
];

export type Leak = {
  buyer: string;
  project: string;
  reason: string;
  intent: number;
  lastContact: string;
  advisor: string;
  value: string;
  risk: "High" | "Medium" | "Low";
};

export const opportunityLeakage: Leak[] = [
  { buyer: "Ahmed Al Mansoori", project: "Marhaba Creek Residences", reason: "Site visit requested, not confirmed", intent: 89, lastContact: "2h ago", advisor: "Sara Khan", value: "$550K", risk: "High" },
  { buyer: "Rashid Al Suwaidi", project: "Marhaba Marina Residences", reason: "Booking intent, inactive > 72h", intent: 91, lastContact: "4d ago", advisor: "Fatima Noor", value: "$900K", risk: "High" },
  { buyer: "Elena Petrova", project: "Marhaba Islands", reason: "Payment-plan query without follow-up", intent: 84, lastContact: "3d ago", advisor: "Priya Menon", value: "$700K", risk: "High" },
  { buyer: "Vikram Shetty", project: "Marhaba Hills", reason: "High intent awaiting follow-up", intent: 82, lastContact: "2d ago", advisor: "Omar Rahman", value: "$500K", risk: "High" },
  { buyer: "Sarah Whitfield", project: "Marhaba Creek Residences", reason: "Site visit requested, not confirmed", intent: 78, lastContact: "1d ago", advisor: "Sara Khan", value: "$575K", risk: "Medium" },
  { buyer: "Mohammed Al Balushi", project: "Marhaba South Gardens", reason: "Mortgage pre-approval pending", intent: 71, lastContact: "5d ago", advisor: "Daniel George", value: "$300K", risk: "Medium" },
  { buyer: "Lina Haddad", project: "Marhaba Meydan One", reason: "High intent awaiting follow-up", intent: 74, lastContact: "3d ago", advisor: "Arjun Nair", value: "$400K", risk: "Medium" },
  { buyer: "James Okafor", project: "Marhaba Marina Residences", reason: "Service-charge estimate not sent", intent: 69, lastContact: "6d ago", advisor: "Daniel George", value: "$780K", risk: "Medium" },
  { buyer: "Nadia Karimi", project: "Marhaba Islands", reason: "Booking intent, inactive > 72h", intent: 86, lastContact: "4d ago", advisor: "Fatima Noor", value: "$620K", risk: "High" },
  { buyer: "Ravi Deshmukh", project: "Marhaba Hills", reason: "Payment-plan query without follow-up", intent: 66, lastContact: "2d ago", advisor: "Priya Menon", value: "$450K", risk: "Low" },
  { buyer: "Chen Wei", project: "Marhaba Creek Residences", reason: "Rental-yield data not provided", intent: 80, lastContact: "1d ago", advisor: "Sara Khan", value: "$600K", risk: "Medium" },
  { buyer: "Aisha Rahman", project: "Marhaba South Gardens", reason: "High intent awaiting follow-up", intent: 63, lastContact: "7d ago", advisor: "Arjun Nair", value: "$270K", risk: "Low" },
];

/* ------------------------------------------------------------------ */
/* Advisors                                                            */
/* ------------------------------------------------------------------ */

export type Advisor = {
  id: string;
  name: string;
  role: string;
  calls: number;
  quality: number;
  avgDuration: string;
  answerRate: number;
  inbound: number;
  outbound: number;
  recorded: number;
  sentiment: { positive: number; neutral: number; negative: number };
  scores: {
    needs: number;
    project: number;
    budget: number;
    investment: number;
    objection: number;
    competitor: number;
    siteVisit: number;
    closing: number;
  };
  topProjects: { label: string; value: number }[];
  drivers: { label: string; value: number }[];
  activity: { day: string; calls: number }[];
  coaching: { tone: "success" | "warning" | "danger" | "info"; text: string }[];
};

const activity = (base: number) =>
  Array.from({ length: 14 }, (_, i) => ({
    day: `D${i + 1}`,
    calls: Math.max(4, Math.round(base + Math.sin(i / 1.6) * base * 0.35 - (i % 7 === 6 ? base * 0.5 : 0))),
  }));

export const advisors: Advisor[] = [
  {
    id: "sara-khan",
    name: "Sara Khan",
    role: "Senior Sales Advisor · Creek & Marina",
    calls: 612,
    quality: 84,
    avgDuration: "6:12",
    answerRate: 76,
    inbound: 344,
    outbound: 268,
    recorded: 598,
    sentiment: { positive: 58, neutral: 31, negative: 11 },
    scores: { needs: 88, project: 91, budget: 82, investment: 79, objection: 76, competitor: 72, siteVisit: 82, closing: 78 },
    topProjects: [
      { label: "Creek Residences", value: 214 },
      { label: "Marina Residences", value: 132 },
      { label: "Hills", value: 121 },
      { label: "Islands", value: 98 },
    ],
    drivers: [
      { label: "Project Inquiry", value: 188 },
      { label: "Pricing", value: 141 },
      { label: "Site Visit", value: 112 },
      { label: "Investment", value: 96 },
      { label: "Payment Plan", value: 75 },
    ],
    activity: activity(22),
    coaching: [
      { tone: "success", text: "Strongest site-visit conversion at Creek: 24 confirmed visits from 214 conversations." },
      { tone: "warning", text: "Quantify rental yield when investors raise return expectations — missed in 31% of investor calls." },
      { tone: "info", text: "Competitor handling improves when Emaar is addressed on payment flexibility rather than price." },
    ],
  },
  {
    id: "omar-rahman",
    name: "Omar Rahman",
    role: "Sales Advisor · Hills & Meydan",
    calls: 548,
    quality: 79,
    avgDuration: "5:31",
    answerRate: 71,
    inbound: 301,
    outbound: 247,
    recorded: 522,
    sentiment: { positive: 51, neutral: 36, negative: 13 },
    scores: { needs: 81, project: 88, budget: 78, investment: 70, objection: 71, competitor: 68, siteVisit: 77, closing: 72 },
    topProjects: [
      { label: "Hills", value: 154 },
      { label: "Meydan One", value: 131 },
      { label: "Creek Residences", value: 141 },
      { label: "South Gardens", value: 122 },
    ],
    drivers: [
      { label: "Project Inquiry", value: 172 },
      { label: "Payment Plan", value: 128 },
      { label: "Pricing", value: 116 },
      { label: "Handover", value: 84 },
      { label: "Site Visit", value: 71 },
    ],
    activity: activity(19),
    coaching: [
      { tone: "success", text: "Excellent project knowledge scores on Hills community and school questions." },
      { tone: "warning", text: "Closing behaviour trails peers — asks for a next step in only 64% of qualified calls." },
      { tone: "info", text: "Payment-plan conversations frequently end without a scheduled follow-up." },
    ],
  },
  {
    id: "priya-menon",
    name: "Priya Menon",
    role: "Sales Advisor · Hills & Islands",
    calls: 505,
    quality: 81,
    avgDuration: "5:58",
    answerRate: 73,
    inbound: 288,
    outbound: 217,
    recorded: 491,
    sentiment: { positive: 55, neutral: 32, negative: 13 },
    scores: { needs: 84, project: 86, budget: 80, investment: 76, objection: 74, competitor: 70, siteVisit: 80, closing: 75 },
    topProjects: [
      { label: "Hills", value: 168 },
      { label: "Creek Residences", value: 152 },
      { label: "South Gardens", value: 96 },
      { label: "Islands", value: 89 },
    ],
    drivers: [
      { label: "Project Inquiry", value: 164 },
      { label: "Investment", value: 108 },
      { label: "Pricing", value: 104 },
      { label: "Service Charges", value: 79 },
      { label: "Site Visit", value: 68 },
    ],
    activity: activity(18),
    coaching: [
      { tone: "success", text: "Consistently strong needs discovery — captures budget and timeline in 88% of calls." },
      { tone: "warning", text: "Service-charge objections are acknowledged but rarely resolved with concrete figures." },
      { tone: "info", text: "Highest positive sentiment on Islands investor conversations." },
    ],
  },
  {
    id: "daniel-george",
    name: "Daniel George",
    role: "Sales Advisor · South Gardens",
    calls: 463,
    quality: 73,
    avgDuration: "4:52",
    answerRate: 66,
    inbound: 259,
    outbound: 204,
    recorded: 438,
    sentiment: { positive: 44, neutral: 38, negative: 18 },
    scores: { needs: 74, project: 82, budget: 71, investment: 62, objection: 63, competitor: 59, siteVisit: 69, closing: 64 },
    topProjects: [
      { label: "South Gardens", value: 161 },
      { label: "Meydan One", value: 116 },
      { label: "Hills", value: 98 },
      { label: "Marina Residences", value: 88 },
    ],
    drivers: [
      { label: "Pricing", value: 148 },
      { label: "Mortgage", value: 121 },
      { label: "Payment Plan", value: 112 },
      { label: "Project Inquiry", value: 96 },
      { label: "Handover", value: 62 },
    ],
    activity: activity(16),
    coaching: [
      { tone: "danger", text: "Objection handling is the lowest in the team (63%). Location objections at South Gardens are frequently left unanswered." },
      { tone: "warning", text: "Average call duration 4:52 — discovery is being cut short before budget qualification." },
      { tone: "info", text: "Mortgage questions should be routed to the mortgage partner script." },
    ],
  },
  {
    id: "fatima-noor",
    name: "Fatima Noor",
    role: "Senior Sales Advisor · Marina & Islands",
    calls: 441,
    quality: 86,
    avgDuration: "6:41",
    answerRate: 79,
    inbound: 236,
    outbound: 205,
    recorded: 433,
    sentiment: { positive: 63, neutral: 28, negative: 9 },
    scores: { needs: 90, project: 93, budget: 86, investment: 88, objection: 80, competitor: 79, siteVisit: 84, closing: 83 },
    topProjects: [
      { label: "Marina Residences", value: 149 },
      { label: "Creek Residences", value: 176 },
      { label: "Islands", value: 116 },
      { label: "Hills", value: 62 },
    ],
    drivers: [
      { label: "Investment", value: 156 },
      { label: "Project Inquiry", value: 142 },
      { label: "Site Visit", value: 118 },
      { label: "Pricing", value: 96 },
      { label: "Golden Visa", value: 71 },
    ],
    activity: activity(17),
    coaching: [
      { tone: "success", text: "Highest overall sales-quality score and the strongest site-visit pitch in the team." },
      { tone: "success", text: "Investment case is quantified with yield and appreciation data in 84% of investor calls." },
      { tone: "info", text: "Use her Emaar comparison framing as the team coaching benchmark." },
    ],
  },
  {
    id: "arjun-nair",
    name: "Arjun Nair",
    role: "Sales Advisor · South Gardens & Meydan",
    calls: 398,
    quality: 70,
    avgDuration: "4:28",
    answerRate: 62,
    inbound: 221,
    outbound: 177,
    recorded: 371,
    sentiment: { positive: 41, neutral: 39, negative: 20 },
    scores: { needs: 71, project: 79, budget: 66, investment: 58, objection: 58, competitor: 55, siteVisit: 66, closing: 60 },
    topProjects: [
      { label: "South Gardens", value: 148 },
      { label: "Meydan One", value: 80 },
      { label: "Islands", value: 74 },
      { label: "Marina Residences", value: 96 },
    ],
    drivers: [
      { label: "Pricing", value: 132 },
      { label: "Project Inquiry", value: 101 },
      { label: "Payment Plan", value: 96 },
      { label: "Mortgage", value: 74 },
      { label: "Handover", value: 58 },
    ],
    activity: activity(14),
    coaching: [
      { tone: "danger", text: "Competitor handling at 55% — Danube and Binghatti payment plans are conceded without repositioning." },
      { tone: "warning", text: "Site visit is proposed in only 46% of qualified conversations." },
      { tone: "info", text: "Shadow Fatima Noor on two investor calls per week." },
    ],
  },
];

export const scoringDimensions = [
  { key: "needs", label: "Needs Discovery" },
  { key: "project", label: "Project Knowledge" },
  { key: "budget", label: "Budget Qualification" },
  { key: "investment", label: "Investment Case" },
  { key: "objection", label: "Objection Handling" },
  { key: "competitor", label: "Competitor Handling" },
  { key: "siteVisit", label: "Site Visit Pitch" },
  { key: "closing", label: "Closing Behaviour" },
] as const;

export type ScoreKey = (typeof scoringDimensions)[number]["key"];

export const scoreFieldSummary = scoringDimensions.map((d) => {
  const vals = advisors.map((a) => a.scores[d.key]);
  const avg = Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
  const best = advisors.reduce((b, a) => (a.scores[d.key] > b.scores[d.key] ? a : b));
  const worst = advisors.reduce((b, a) => (a.scores[d.key] < b.scores[d.key] ? a : b));
  return {
    key: d.key,
    label: d.label,
    avg: Number((avg / 10).toFixed(1)),
    pct: avg,
    best: { name: best.name, score: best.scores[d.key] },
    worst: { name: worst.name, score: worst.scores[d.key] },
    bands: [
      { label: "9–10", value: vals.filter((v) => v >= 90).length },
      { label: "7–8", value: vals.filter((v) => v >= 70 && v < 90).length },
      { label: "5–6", value: vals.filter((v) => v >= 50 && v < 70).length },
      { label: "< 5", value: vals.filter((v) => v < 50).length },
    ],
  };
});

export const conversationDrivers = [
  { label: "Project Inquiry", value: 1284 },
  { label: "Pricing", value: 1041 },
  { label: "Payment Plan", value: 812 },
  { label: "Site Visit", value: 604 },
  { label: "Investment", value: 566 },
  { label: "Mortgage", value: 388 },
  { label: "Handover", value: 341 },
  { label: "Service Charges", value: 297 },
];

export const classifications = [
  {
    title: "Buyer Stage",
    values: [
      { label: "Enquiry", value: 31, tone: "info" },
      { label: "Qualification", value: 27, tone: "classify" },
      { label: "Consideration", value: 19, tone: "warning" },
      { label: "Site Visit", value: 13, tone: "success" },
      { label: "Negotiation", value: 7, tone: "primary" },
      { label: "Booking", value: 3, tone: "success" },
    ],
  },
  {
    title: "Conversation Outcome",
    values: [
      { label: "Follow-Up Scheduled", value: 34, tone: "info" },
      { label: "Information Sent", value: 24, tone: "classify" },
      { label: "Site Visit Requested", value: 16, tone: "success" },
      { label: "Site Visit Confirmed", value: 9, tone: "success" },
      { label: "Negotiation", value: 6, tone: "warning" },
      { label: "Booking Intent", value: 4, tone: "primary" },
      { label: "Lost / No Interest", value: 7, tone: "danger" },
    ],
  },
  {
    title: "Buyer Type",
    values: [
      { label: "Investor", value: 41, tone: "primary" },
      { label: "Existing Investor", value: 16, tone: "classify" },
      { label: "End User", value: 26, tone: "info" },
      { label: "First-Time Buyer", value: 12, tone: "warning" },
      { label: "Undecided", value: 5, tone: "danger" },
    ],
  },
  {
    title: "Financing Type",
    values: [
      { label: "Cash", value: 46, tone: "success" },
      { label: "Mortgage", value: 39, tone: "info" },
      { label: "Undecided", value: 15, tone: "warning" },
    ],
  },
  {
    title: "Intent Level",
    values: [
      { label: "High", value: 23, tone: "success" },
      { label: "Medium", value: 49, tone: "warning" },
      { label: "Low", value: 28, tone: "danger" },
    ],
  },
] as const;

export const recentAiInsights = [
  { tone: "danger" as const, title: "Objection left unresolved", body: "Daniel George acknowledged the Dubai South location objection but did not present the Al Maktoum connectivity data in 7 of 9 recent calls.", meta: "Daniel George · 12 Aug" },
  { tone: "success" as const, title: "Strong investment framing", body: "Fatima Noor quantified projected rental yield and 3-year appreciation in every Marina investor conversation this week.", meta: "Fatima Noor · 12 Aug" },
  { tone: "warning" as const, title: "Emerging buyer trend", body: "Short-term rental eligibility questions rose 34% on Marina Residences over the last two weeks.", meta: "Market signal · 11 Aug" },
  { tone: "info" as const, title: "Project issue detected", body: "Handover date confidence is the most common Islands objection; 22% of buyers requested construction-progress evidence.", meta: "Marhaba Islands · 11 Aug" },
  { tone: "classify" as const, title: "Competitor pattern", body: "Emaar mentions rose 27% among Creek-area buyers; payment flexibility is the most common comparison point.", meta: "Market Intelligence · 10 Aug" },
  { tone: "warning" as const, title: "Advisor behaviour", body: "Arjun Nair proposed a site visit in only 46% of qualified conversations, against a team average of 71%.", meta: "Arjun Nair · 10 Aug" },
  { tone: "success" as const, title: "Follow-up effectiveness", body: "Structured payment-plan follow-ups within 24h lifted site-visit requests by 1.6x across Creek and Hills.", meta: "Portfolio · 09 Aug" },
  { tone: "info" as const, title: "Buyer trend", body: "Golden Visa eligibility mentioned in 19% of international investor conversations, up from 15% last month.", meta: "Portfolio · 09 Aug" },
];

/* ------------------------------------------------------------------ */
/* Calls                                                               */
/* ------------------------------------------------------------------ */

export type Call = {
  id: string;
  buyer: string;
  phone: string;
  advisor: string;
  project: string;
  intent: number;
  intentLevel: "High" | "Medium" | "Low";
  intentReason: string;
  stage: string;
  stageReason: string;
  channel: "Call" | "WhatsApp";
  direction: "Inbound" | "Outbound";
  date: string;
  time: string;
  duration: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  buyerType: string;
  outcome: string;
  config: string;
  budget: string;
  timeline: string;
  financing: string;
  objection: string;
  competitor: string;
  siteVisit: string;
  summary: string;
  recommendedAction: string;
  coaching: string;
  scores: { label: string; value: number }[];
  transcript: { speaker: "advisor" | "buyer"; name: string; at: string; text: string }[];
};

const genericTranscript = (
  buyer: string,
  advisor: string,
  project: string,
  config: string,
  budget: string,
): Call["transcript"] => [
  { speaker: "advisor", name: advisor, at: "0:00", text: `Good afternoon, this is ${advisor} calling from Marhaba Developments regarding your enquiry on ${project}. Is now a good time?` },
  { speaker: "buyer", name: buyer, at: "0:07", text: "Yes, that's fine. I registered online a couple of days ago." },
  { speaker: "advisor", name: advisor, at: "0:13", text: `Thank you. Can I confirm what you're looking for — configuration and approximate budget?` },
  { speaker: "buyer", name: buyer, at: "0:22", text: `A ${config}, and I'd like to stay around ${budget}.` },
  { speaker: "advisor", name: advisor, at: "0:31", text: "Understood. Are you buying for personal use or as an investment?" },
  { speaker: "buyer", name: buyer, at: "0:38", text: "Mainly investment, but I may use it occasionally." },
  { speaker: "advisor", name: advisor, at: "0:47", text: `We currently have released inventory at ${project} in that range, with a construction-linked payment plan.` },
  { speaker: "buyer", name: buyer, at: "1:02", text: "What is the payment structure, and what are the service charges likely to be?" },
  { speaker: "advisor", name: advisor, at: "1:14", text: "The plan is 60/40 with 10% on booking. Service charges are estimated per square foot and I can send the detailed sheet." },
  { speaker: "buyer", name: buyer, at: "1:34", text: "Please do. I'm also looking at another development in the same area." },
  { speaker: "advisor", name: advisor, at: "1:45", text: "Understood. Would you like to see the show apartment this weekend so you can compare directly?" },
  { speaker: "buyer", name: buyer, at: "1:58", text: "Possibly Saturday. Send me the details and the floor plans first." },
  { speaker: "advisor", name: advisor, at: "2:09", text: "I'll send the floor plans, payment plan and service-charge estimate today, and follow up tomorrow to confirm." },
  { speaker: "buyer", name: buyer, at: "2:20", text: "That works. Thank you." },
];

export const heroCall: Call = {
  id: "CV-48219",
  buyer: "Ahmed Al Mansoori",
  phone: "+971 50 442 8891",
  advisor: "Sara Khan",
  project: "Marhaba Creek Residences",
  intent: 89,
  intentLevel: "High",
  intentReason: "Explicit budget, <90 day timeline, cash financing and a site-visit request in the same conversation.",
  stage: "Consideration",
  stageReason: "Buyer has shortlisted the project and is actively comparing pricing with one competing Creek-area development.",
  channel: "Call",
  direction: "Outbound",
  date: "12 Aug 2026",
  time: "14:22",
  duration: "6:42",
  sentiment: "Positive",
  buyerType: "Investor",
  outcome: "Site Visit Requested",
  config: "2 Bedroom",
  budget: "$500K – $600K",
  timeline: "< 90 Days",
  financing: "Cash",
  objection: "Price",
  competitor: "Emaar Creek Harbour",
  siteVisit: "Requested — Saturday",
  summary:
    "Ahmed is evaluating a 2BR primarily as an investment. His target budget is around $550K. He likes the waterfront positioning but considers the quoted price high compared with another Creek-area development. He asked about rental yield, service charges and payment terms and indicated interest in visiting this weekend.",
  recommendedAction:
    "Send available 2BR inventory, payment plan and rental-yield information; confirm Saturday site visit.",
  coaching:
    "Advisor explained amenities and location well but did not quantify expected rental yield after the buyer explicitly identified investment return as a key criterion.",
  scores: [
    { label: "Needs Discovery", value: 9 },
    { label: "Project Knowledge", value: 8 },
    { label: "Budget Qualification", value: 9 },
    { label: "Investment Case", value: 6 },
    { label: "Objection Handling", value: 6 },
    { label: "Competitor Handling", value: 7 },
    { label: "Site Visit Pitch", value: 9 },
    { label: "Closing Behaviour", value: 8 },
  ],
  transcript: [
    { speaker: "advisor", name: "Sara Khan", at: "0:00", text: "Good afternoon Mr Al Mansoori, this is Sara Khan from Marhaba Developments, following up on your enquiry about Marhaba Creek Residences. Is now a convenient time?" },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "0:09", text: "Yes, go ahead. I registered on the website on Sunday." },
    { speaker: "advisor", name: "Sara Khan", at: "0:14", text: "Thank you. May I confirm what you're looking for — is it a one or two bedroom?" },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "0:21", text: "Two bedroom. It's primarily an investment for me, so I care about the rental return more than anything else." },
    { speaker: "advisor", name: "Sara Khan", at: "0:32", text: "Understood. And do you have a budget range in mind?" },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "0:37", text: "Realistically between 500 and 600 thousand dollars. I'd be paying cash, so I don't need a mortgage arrangement." },
    { speaker: "advisor", name: "Sara Khan", at: "0:49", text: "That's helpful. In the current release we have 2BR units from $525,000 on the mid floors, and a small number of higher floors with a full creek view at $580,000." },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "1:06", text: "That's honestly higher than I expected. I've been looking at Emaar Creek Harbour and the per-square-foot numbers there looked more competitive." },
    { speaker: "advisor", name: "Sara Khan", at: "1:20", text: "I understand the comparison. Our waterfront promenade units sit directly on the marina edge, and the podium amenity deck is larger than what's offered in that phase. The location and the amenity ratio are where the premium sits." },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "1:39", text: "The location is good, I agree. But what kind of rental yield should I realistically expect there?" },
    { speaker: "advisor", name: "Sara Khan", at: "1:48", text: "The Creek area performs well on rentals — I can prepare the yield indication for you and send it across with the inventory sheet." },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "2:01", text: "Please do. And what are the service charges going to look like? That's what makes or breaks the net yield." },
    { speaker: "advisor", name: "Sara Khan", at: "2:12", text: "Service charges are estimated per square foot at handover and I'll include the projected figure in the pack. It's aligned with comparable waterfront communities." },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "2:28", text: "Alright. And the payment plan?" },
    { speaker: "advisor", name: "Sara Khan", at: "2:33", text: "It's a 60/40 construction-linked plan — 10% on booking, 50% across construction milestones, and 40% on handover in Q4 2028." },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "2:47", text: "That's reasonable. I'd want to see the unit before I commit to anything." },
    { speaker: "advisor", name: "Sara Khan", at: "2:55", text: "Of course. Our sales pavilion at Creek Harbour is open Saturday — would 11am suit you? You'd see the 2BR show apartment and the view line from the actual floor." },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "3:08", text: "Saturday works. Send me the inventory, the payment plan and the yield numbers before then." },
    { speaker: "advisor", name: "Sara Khan", at: "3:17", text: "I'll send all three today and confirm the Saturday appointment by message. Thank you for your time, Mr Al Mansoori." },
    { speaker: "buyer", name: "Ahmed Al Mansoori", at: "3:26", text: "Thank you, Sara." },
  ],
};

const buyerPool = [
  ["Ahmed Al Mansoori", "+971 50 442 8891"],
  ["Rashid Al Suwaidi", "+971 55 118 4402"],
  ["Elena Petrova", "+971 52 908 7731"],
  ["Vikram Shetty", "+971 50 771 2298"],
  ["Sarah Whitfield", "+44 7700 900312"],
  ["Mohammed Al Balushi", "+971 56 330 1187"],
  ["Lina Haddad", "+971 54 662 9014"],
  ["James Okafor", "+971 58 447 2210"],
  ["Nadia Karimi", "+971 50 229 6683"],
  ["Ravi Deshmukh", "+91 98200 44127"],
  ["Chen Wei", "+86 138 0011 4477"],
  ["Aisha Rahman", "+971 55 903 4412"],
  ["Tariq Al Zaabi", "+971 50 664 7781"],
  ["Marina Kovač", "+971 52 774 1180"],
  ["Daniel Fischer", "+49 151 2345 6789"],
  ["Priyanka Iyer", "+971 56 118 2276"],
  ["Yusuf Demir", "+90 532 118 4471"],
  ["Grace Mensah", "+971 54 220 9931"],
  ["Hassan Al Marri", "+971 50 118 6642"],
  ["Olga Sokolova", "+7 916 442 1187"],
  ["Rohan Kapoor", "+971 55 447 3320"],
  ["Amelia Clarke", "+44 7700 900884"],
  ["Faisal Al Hashimi", "+971 50 992 1174"],
  ["Sneha Warrier", "+971 58 220 6647"],
  ["Michael Brennan", "+353 86 118 4429"],
  ["Layla Al Fardan", "+971 52 441 9903"],
  ["Ibrahim Sultan", "+971 50 336 7729"],
  ["Karim Boutros", "+20 100 442 1187"],
  ["Anastasia Volkova", "+971 55 774 2298"],
  ["Deepak Menon", "+971 56 998 4471"],
  ["Sophie Laurent", "+33 6 12 44 88 21"],
  ["Abdulla Al Nuaimi", "+971 50 447 1123"],
  ["Meera Pillai", "+971 54 118 9932"],
  ["Thomas Müller", "+49 172 998 4412"],
  ["Zainab Qureshi", "+971 52 330 7714"],
  ["Ali Reza Tehrani", "+971 55 220 1148"],
  ["Natalia Ivanova", "+971 58 774 6690"],
  ["Sanjay Bhatia", "+971 50 118 3327"],
  ["Emily Watson", "+44 7700 900117"],
  ["Khalid Al Shamsi", "+971 56 447 9982"],
];

const stages = ["Enquiry", "Qualification", "Consideration", "Site Visit", "Negotiation", "Booking"];
const outcomes = [
  "Follow-Up Scheduled",
  "Site Visit Requested",
  "Site Visit Confirmed",
  "Information Sent",
  "Negotiation",
  "Booking Intent",
  "Lost / No Interest",
];
const buyerTypes = ["Investor", "End User", "First-Time Buyer", "Existing Investor", "Undecided"];
const configs = ["1BR", "2BR", "2BR", "3BR", "Studio", "Townhouse", "4BR+", "Penthouse"];
const budgets = ["Under $250K", "$250K–$400K", "$400K–$650K", "$400K–$650K", "$650K–$1M", "$1M–$2M+"];
const timelines = ["Immediate", "< 30 Days", "1–3 Months", "3–6 Months", "6+ Months"];
const financings = ["Cash", "Mortgage", "Undecided"];
const objections = ["Price", "Payment Plan", "Location", "Service Charges", "Handover", "Unit Size", "Mortgage", "Reputation"];
const competitorNames = ["Emaar", "Emaar Creek Harbour", "DAMAC", "Sobha Realty", "Nakheel", "Meraas", "Binghatti", "Danube", "Ellington", "—"];

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCalls(): Call[] {
  const rnd = mulberry(42);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)]!;
  const list: Call[] = [heroCall];

  for (let i = 0; i < 71; i++) {
    const [buyer, phone] = buyerPool[(i + 1) % buyerPool.length]!;
    const advisor = advisors[Math.floor(rnd() * advisors.length)]!;
    const project = projects[Math.floor(rnd() * projects.length)]!;
    const intent = Math.round(28 + rnd() * 66);
    const intentLevel = intent >= 75 ? "High" : intent >= 50 ? "Medium" : "Low";
    const channel: Call["channel"] = rnd() > 0.62 ? "WhatsApp" : "Call";
    const sentiment: Call["sentiment"] = intent >= 70 ? "Positive" : intent >= 45 ? (rnd() > 0.5 ? "Neutral" : "Positive") : rnd() > 0.5 ? "Neutral" : "Negative";
    const config = pick(configs);
    const budget = pick(budgets);
    const buyerType = pick(buyerTypes);
    const objection = pick(objections);
    const day = 12 - Math.floor(i / 6);
    const mins = 1 + Math.floor(rnd() * 9);
    const secs = Math.floor(rnd() * 60);
    const outcome = intent >= 75 ? pick(["Site Visit Requested", "Site Visit Confirmed", "Booking Intent", "Negotiation"]) : pick(outcomes);
    const stage = intent >= 80 ? pick(["Consideration", "Site Visit", "Negotiation", "Booking"]) : intent >= 55 ? pick(["Qualification", "Consideration", "Site Visit"]) : pick(["Enquiry", "Qualification"]);
    const competitor = pick(competitorNames);
    const timeline = intent >= 75 ? pick(["Immediate", "< 30 Days", "1–3 Months"]) : pick(timelines);
    const financing = pick(financings);

    list.push({
      id: `CV-${48220 + i}`,
      buyer: buyer!,
      phone: phone!,
      advisor: advisor.name,
      project: project.name,
      intent,
      intentLevel,
      intentReason: `${intentLevel} intent: ${timeline.toLowerCase()} timeline, ${financing.toLowerCase()} financing and ${config} budget of ${budget} confirmed in conversation.`,
      stage,
      stageReason: `Assigned ${stage} — buyer discussed ${objection.toLowerCase()} and requested ${outcome.toLowerCase()} follow-up on ${project.short}.`,
      channel,
      direction: rnd() > 0.45 ? "Inbound" : "Outbound",
      date: `${String(Math.max(1, day)).padStart(2, "0")} Aug 2026`,
      time: `${String(9 + Math.floor(rnd() * 9)).padStart(2, "0")}:${String(Math.floor(rnd() * 60)).padStart(2, "0")}`,
      duration: `${mins}:${String(secs).padStart(2, "0")}`,
      sentiment,
      buyerType,
      outcome,
      config,
      budget,
      timeline,
      financing,
      objection,
      competitor,
      siteVisit: outcome.includes("Site Visit") ? "Requested" : "Not raised",
      summary: `${buyer} enquired about a ${config} at ${project.name} with a budget of ${budget}. The buyer is classified as ${buyerType.toLowerCase()} with a ${timeline.toLowerCase()} purchase timeline and ${financing.toLowerCase()} financing. ${objection} was raised as the primary objection${competitor !== "—" ? `, with ${competitor} mentioned as a comparison` : ""}. Outcome: ${outcome.toLowerCase()}.`,
      recommendedAction:
        outcome.includes("Site Visit")
          ? `Confirm the site visit at ${project.short} and send the ${config} floor plan pack beforehand.`
          : objection === "Payment Plan"
            ? `Send the revised construction-linked payment plan for ${project.short} and follow up within 24 hours.`
            : objection === "Mortgage"
              ? "Share mortgage partner details and pre-approval checklist, then re-qualify budget."
              : `Send ${config} availability and pricing for ${project.short}, then schedule a follow-up call.`,
      coaching:
        intent >= 75
          ? "Buyer signalled strong intent early; advisor should have secured a firm appointment slot rather than an open follow-up."
          : "Discovery captured configuration and budget, but the investment case was not quantified for this buyer profile.",
      scores: [
        { label: "Needs Discovery", value: Math.max(4, Math.round(advisor.scores.needs / 10 + (rnd() - 0.5))) },
        { label: "Project Knowledge", value: Math.max(4, Math.round(advisor.scores.project / 10 + (rnd() - 0.5))) },
        { label: "Budget Qualification", value: Math.max(4, Math.round(advisor.scores.budget / 10 + (rnd() - 0.5))) },
        { label: "Investment Case", value: Math.max(3, Math.round(advisor.scores.investment / 10 + (rnd() - 0.5))) },
        { label: "Objection Handling", value: Math.max(3, Math.round(advisor.scores.objection / 10 + (rnd() - 0.5))) },
        { label: "Competitor Handling", value: Math.max(3, Math.round(advisor.scores.competitor / 10 + (rnd() - 0.5))) },
        { label: "Site Visit Pitch", value: Math.max(4, Math.round(advisor.scores.siteVisit / 10 + (rnd() - 0.5))) },
        { label: "Closing Behaviour", value: Math.max(3, Math.round(advisor.scores.closing / 10 + (rnd() - 0.5))) },
      ],
      transcript: genericTranscript(buyer!, advisor.name, project.name, config, budget),
    });
  }
  return list;
}

export const calls = buildCalls();
export const phoneCalls = calls.filter((c) => c.channel === "Call");
export const whatsappThreads = calls.filter((c) => c.channel === "WhatsApp");

/* ------------------------------------------------------------------ */
/* Buyers                                                              */
/* ------------------------------------------------------------------ */

export type Buyer = {
  id: string;
  name: string;
  phone: string;
  created: string;
  conversations: number;
  project: string;
  aiStatus: string;
  humanStatus: string;
  intent: number;
  intentLevel: "High" | "Medium" | "Low";
  nextAction: string;
  advisor: string;
  config: string;
  budget: string;
  buyerType: string;
  financing: string;
  timeline: string;
  market: string;
  source: string;
  summary: string;
  topics: string[];
  objections: string[];
  competitors: string[];
  timeline_events: { at: string; type: "Call" | "WhatsApp" | "Site Visit" | "Email"; text: string }[];
  actions: { text: string; due: string; status: "Pending" | "In Progress" | "Done" }[];
  notes: { author: string; at: string; text: string; auto?: boolean }[];
};

const aiStatuses = ["New / Cold", "Attempting Contact", "Connected / Warm", "Qualified", "Site Visit Ready", "Booking Ready", "Nurturing", "Lost"];
const markets = ["UAE", "India", "United Kingdom", "Russia", "China", "Germany", "Egypt", "France", "Turkey", "Nigeria"];
const sources = ["Google Search", "Meta", "Property Portals", "Broker Referral", "Walk-in", "Events"];

function buildBuyers(): Buyer[] {
  const rnd = mulberry(7);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)]!;

  return buyerPool.map(([name, phone], i) => {
    const related = calls.filter((c) => c.buyer === name);
    const first = related[0];
    const project = first?.project ?? pick(projectNames);
    const intent = first?.intent ?? Math.round(30 + rnd() * 60);
    const intentLevel = intent >= 75 ? "High" : intent >= 50 ? "Medium" : "Low";
    const advisor = first?.advisor ?? pick(advisors).name;
    const config = first?.config ?? pick(configs);
    const budget = first?.budget ?? pick(budgets);
    const buyerType = first?.buyerType ?? pick(buyerTypes);
    const financing = first?.financing ?? pick(financings);
    const timeline = first?.timeline ?? pick(timelines);
    const aiStatus =
      intent >= 85 ? "Booking Ready" : intent >= 75 ? "Site Visit Ready" : intent >= 60 ? "Qualified" : intent >= 45 ? "Connected / Warm" : intent >= 35 ? "Nurturing" : pick(aiStatuses);
    const short = projects.find((p) => p.name === project)?.short ?? "the project";

    return {
      id: `BY-${9100 + i}`,
      name: name!,
      phone: phone!,
      created: `${String(1 + (i % 28)).padStart(2, "0")} Aug 2026`,
      conversations: Math.max(1, related.length + Math.floor(rnd() * 3)),
      project,
      aiStatus,
      humanStatus: intent >= 75 ? "Working" : intent >= 50 ? "Contacted" : "New",
      intent,
      intentLevel,
      nextAction:
        intent >= 85
          ? "Prepare booking form and unit hold"
          : intent >= 75
            ? "Confirm site visit slot"
            : intent >= 60
              ? "Send payment plan and availability"
              : "Nurture with project update",
      advisor,
      config,
      budget,
      buyerType,
      financing,
      timeline,
      market: pick(markets),
      source: pick(sources),
      summary: `${name!.split(" ")[0]} has engaged across ${Math.max(1, related.length)} conversation(s) about a ${config} at ${short}. Classified as ${buyerType.toLowerCase()} with a ${timeline.toLowerCase()} timeline and ${financing.toLowerCase()} financing. Budget discussed at ${budget}. Intent is currently ${intentLevel.toLowerCase()} at ${intent}.`,
      topics: [pick(["Pricing", "Payment Plan", "Rental Yield", "Handover", "Service Charges", "Golden Visa"]), pick(["Site Visit", "Floor Plans", "Unit Availability", "Mortgage", "Community"]), pick(["Investment Return", "Schools", "Metro Access", "View Line"])],
      objections: [first?.objection ?? pick(objections), pick(objections)],
      competitors: [first?.competitor && first.competitor !== "—" ? first.competitor : pick(["Emaar", "DAMAC", "Sobha Realty", "Nakheel"])],
      timeline_events: [
        { at: "12 Aug · 14:22", type: "Call", text: `Discussed ${config} availability at ${short}; ${(first?.objection ?? "price").toLowerCase()} raised as the main objection.` },
        { at: "11 Aug · 10:04", type: "WhatsApp", text: "Requested floor plans and payment plan document." },
        { at: "09 Aug · 16:41", type: "Call", text: `Initial enquiry from ${pick(sources)}; budget and configuration captured.` },
        { at: "08 Aug · 09:12", type: "Email", text: "Project brochure and price list sent automatically." },
      ],
      actions: [
        { text: intent >= 75 ? "Confirm Saturday site visit" : "Send payment plan options", due: "13 Aug 2026", status: "Pending" },
        { text: `Share ${config} availability for ${short}`, due: "14 Aug 2026", status: "In Progress" },
        { text: "Provide service-charge estimate", due: "11 Aug 2026", status: "Done" },
      ],
      notes: [
        { author: "Marhaba AI", at: "12 Aug 2026", text: `Buyer emphasised ${(first?.objection ?? "price").toLowerCase()} twice in the last conversation. Recommend leading the next call with the payment plan.`, auto: true },
        { author: advisor, at: "11 Aug 2026", text: "Prefers to be contacted after 6pm on weekdays." },
      ],
    };
  });
}

export const buyers = buildBuyers();

export const pipelineStages = ["Qualified", "Site Visit Ready", "Booking Ready", "Nurturing", "Connected / Warm"];

export const scheduledFollowUps = buyers
  .filter((b) => b.intent >= 55)
  .slice(0, 14)
  .map((b, i) => ({
    id: b.id,
    buyer: b.name,
    project: b.project,
    advisor: b.advisor,
    when: `${13 + (i % 5)} Aug 2026 · ${String(9 + (i % 8)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
    type: i % 3 === 0 ? "Site Visit" : i % 3 === 1 ? "Follow-Up Call" : "WhatsApp Follow-Up",
    intent: b.intent,
  }));

/* ------------------------------------------------------------------ */
/* Action items                                                        */
/* ------------------------------------------------------------------ */

export type ActionItem = {
  id: string;
  buyer: string;
  project: string;
  item: string;
  status: "Pending" | "In Progress" | "Done" | "Overdue";
  due: string;
  intent: number;
  advisor: string;
  source: string;
  priority: "High" | "Medium" | "Low";
};

const actionTemplates = [
  "Confirm Saturday site visit",
  "Send revised payment plan",
  "Share 2BR availability",
  "Provide service-charge estimate",
  "Send mortgage partner details",
  "Follow up after spouse review",
  "Send rental-yield projection",
  "Share construction progress update",
  "Issue unit hold for 48 hours",
  "Send Golden Visa eligibility note",
  "Re-qualify budget after price update",
  "Share townhouse floor plans",
];

export const actionItems: ActionItem[] = buyers.slice(0, 34).map((b, i) => {
  const statusPool: ActionItem["status"][] = ["Pending", "In Progress", "Done", "Overdue", "Pending", "In Progress"];
  const status = statusPool[i % statusPool.length]!;
  return {
    id: `AI-${3300 + i}`,
    buyer: b.name,
    project: b.project,
    item: actionTemplates[i % actionTemplates.length]!,
    status,
    due: `${9 + (i % 8)} Aug 2026`,
    intent: b.intent,
    advisor: b.advisor,
    source: `CV-${48219 + (i % 60)}`,
    priority: b.intent >= 78 ? "High" : b.intent >= 55 ? "Medium" : "Low",
  };
});

/* ------------------------------------------------------------------ */
/* Market intelligence                                                 */
/* ------------------------------------------------------------------ */

export const competitorMentions = [
  { name: "Emaar", mentions: 566, change: 27, reasons: ["Brand reputation", "Community quality", "Location"] },
  { name: "DAMAC", mentions: 265, change: 9, reasons: ["Payment plan", "Price", "Amenities"] },
  { name: "Sobha Realty", mentions: 141, change: -4, reasons: ["Build quality", "Brand reputation"] },
  { name: "Nakheel", mentions: 169, change: 14, reasons: ["Location", "Handover", "Beach access"] },
  { name: "Meraas", mentions: 96, change: 3, reasons: ["Community quality", "Design"] },
  { name: "Binghatti", mentions: 117, change: 18, reasons: ["Price", "Payment plan"] },
  { name: "Danube", mentions: 107, change: 21, reasons: ["Payment plan", "Entry price"] },
  { name: "Ellington", mentions: 77, change: -6, reasons: ["Design", "Unit size"] },
];

export const comparisonReasons = [
  { label: "Brand reputation", value: 24 },
  { label: "Payment plan", value: 21 },
  { label: "Location", value: 17 },
  { label: "Price", value: 14 },
  { label: "Community quality", value: 9 },
  { label: "Rental potential", value: 7 },
  { label: "Handover", value: 5 },
  { label: "Amenities", value: 3 },
];

export const competitorTrend = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  Emaar: Math.round(32 + i * 1.9 + Math.sin(i / 1.4) * 5),
  DAMAC: Math.round(18 + Math.sin(i / 2) * 4),
  Nakheel: Math.round(11 + i * 0.4 + Math.cos(i / 1.7) * 3),
  Binghatti: Math.round(7 + i * 0.5 + Math.sin(i / 2.4) * 2),
}));

export const emergingTrends = [
  { label: "Golden Visa interest", value: 21, direction: "up" },
  { label: "Short-term rental eligibility", value: 34, direction: "up" },
  { label: "Mortgage demand", value: 12, direction: "up" },
  { label: "School proximity", value: 8, direction: "up" },
  { label: "Handover sensitivity", value: 17, direction: "up" },
  { label: "Service-charge questions", value: 15, direction: "up" },
  { label: "Payment-plan flexibility", value: 26, direction: "up" },
];

export const leadSources = [
  { source: "Meta", leads: 1642, qualifiedRate: 24, highIntentRate: 14, avgBudget: "$400K" },
  { source: "Google Search", leads: 1104, qualifiedRate: 36, highIntentRate: 23, avgBudget: "$575K" },
  { source: "Property Portals", leads: 782, qualifiedRate: 31, highIntentRate: 18, avgBudget: "$520K" },
  { source: "Broker Referral", leads: 386, qualifiedRate: 42, highIntentRate: 29, avgBudget: "$700K" },
  { source: "Walk-in", leads: 211, qualifiedRate: 47, highIntentRate: 33, avgBudget: "$600K" },
  { source: "Events", leads: 161, qualifiedRate: 38, highIntentRate: 26, avgBudget: "$650K" },
];

export const marketInsights = [
  { tone: "danger" as const, title: "Emaar comparison intensifying at Creek", body: "Emaar mentions rose 27% among Creek-area buyers; payment flexibility is the most common comparison point, ahead of price.", meta: "Marhaba Creek Residences · last 30 days" },
  { tone: "warning" as const, title: "Danube and Binghatti pressure on entry pricing", body: "Danube mentions up 21% and Binghatti up 18%, concentrated in South Gardens and Meydan One conversations under $400K.", meta: "Entry-price segment" },
  { tone: "success" as const, title: "Walk-in and referral quality leads the funnel", body: "Walk-in traffic converts to qualified conversations at 47% and broker referrals at 42%, both far above paid social.", meta: "Lead-source quality" },
  { tone: "info" as const, title: "Rebalance spend toward conversation quality", body: "Google Search generates fewer leads than Meta but a 64% higher share of high-intent conversations. Shift focus from CPL alone to intent quality per source.", meta: "Marketing recommendation" },
];

/* ------------------------------------------------------------------ */
/* WhatsApp                                                            */
/* ------------------------------------------------------------------ */

export const whatsappKpis = [
  { label: "WhatsApp Conversations", value: "1,628", sub: "38% of all conversations" },
  { label: "Response Rate", value: "84%", sub: "Within 30 minutes" },
  { label: "Qualified via Chat", value: "412", sub: "25% of chats" },
  { label: "Site Visits from Chat", value: "96", sub: "+12% vs last period" },
];

export const whatsappMessages: Record<string, { from: "buyer" | "advisor"; at: string; text: string }[]> = {};
