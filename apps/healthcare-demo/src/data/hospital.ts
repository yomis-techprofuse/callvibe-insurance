// Fictional demo dataset for CallVibe — Hospital Enquiry & Patient Access Intelligence.
// Marhaba Multispecialty Hospital, Bengaluru. All figures are mock data for demonstration only.
//
// PRODUCT BOUNDARY: this dataset describes patient ACCESS and ENQUIRY OPERATIONS.
// It never contains clinical judgement, diagnosis, triage decisions or doctor quality scoring.

export const HOSPITAL = "Marhaba Multispecialty Hospital";
export const WORKSPACE = "Bengaluru — Patient Access";
export const CURRENCY = "₹";

/* ------------------------------------------------------------------ */
/* Command centre KPIs                                                 */
/* ------------------------------------------------------------------ */

export const heroKpis = [
  { label: "Total Patient Enquiries", value: "4,862", delta: "12.4%", up: true, tone: "primary" as const, sub: "vs 30-day daily average" },
  { label: "New Patient Enquiries", value: "2,714", delta: "9.1%", up: true, tone: "info" as const, sub: "55.8% of all enquiries" },
  { label: "Appointment Intent Detected", value: "1,436", delta: "6.8%", up: true, tone: "success" as const, sub: "29.5% of enquiries" },
  { label: "Appointments Requested", value: "927", delta: "4.2%", up: true, tone: "classify" as const, sub: "64.6% of intent" },
];

export const supportKpis = [
  { label: "Follow-Up Required", value: "318", sub: "promised actions not yet closed", tone: "warning" as const },
  { label: "Unresolved Enquiries", value: "184", sub: "no documented resolution", tone: "danger" as const },
  { label: "Priority / Escalation Flags", value: "42", sub: "routed per hospital protocol", tone: "danger" as const },
  { label: "Repeat Enquiries", value: "286", sub: "same issue, more than one contact", tone: "warning" as const },
];

export const accessFunnel = [
  { label: "Total Enquiries", value: 4862, note: "Every inbound and outbound patient interaction analysed" },
  { label: "Relevant Care / Service Identified", value: 3214, note: "Conversation contained an identifiable care need" },
  { label: "Doctor / Service Discussed", value: 2106, note: "A named doctor, diagnostic or package was discussed" },
  { label: "Appointment Intent", value: 1436, note: "Patient signalled intent to book" },
  { label: "Appointment Requested", value: 927, note: "Patient asked for a specific slot" },
  { label: "Appointment Confirmed", value: 742, note: "Confirmation observed in conversation or HIS record" },
];

export const funnelTail = {
  label: "Unresolved / Follow-Up Required",
  value: 184,
  note: "Enquiries that left the access journey without a documented outcome",
};

export const enquiryReasons = [
  { label: "Appointment Booking", value: 31, color: "var(--color-chart-1)" },
  { label: "Doctor Availability", value: 17, color: "var(--color-chart-2)" },
  { label: "Treatment / Procedure Information", value: 13, color: "var(--color-chart-3)" },
  { label: "Diagnostics", value: 10, color: "var(--color-chart-4)" },
  { label: "Insurance / Cashless", value: 8, color: "var(--color-chart-5)" },
  { label: "Pricing / Estimate", value: 7, color: "var(--color-info)" },
  { label: "Reports / Results", value: 5, color: "var(--color-classify)" },
  { label: "Existing Appointment", value: 4, color: "var(--color-warning)" },
  { label: "Priority / Emergency Routing", value: 3, color: "var(--color-danger)" },
  { label: "Other", value: 2, color: "var(--color-muted-foreground)" },
];

export const reasonCategories = enquiryReasons.map((r) => r.label);

export const volumeTrend = Array.from({ length: 30 }, (_, i) => {
  const w = Math.sin(i / 2.4) * 0.14 + Math.cos(i / 5.1) * 0.09;
  const weekend = i % 7 === 5 || i % 7 === 6;
  const base = weekend ? 96 : 138;
  return {
    day: `${i + 1}`,
    calls: Math.round(base * (1 + w)),
    whatsapp: Math.round(base * 0.44 * (1 + w * 0.7)),
  };
});

export const hourlyLoad = [
  { hour: "7a", enquiries: 84 },
  { hour: "8a", enquiries: 186 },
  { hour: "9a", enquiries: 342 },
  { hour: "10a", enquiries: 428 },
  { hour: "11a", enquiries: 401 },
  { hour: "12p", enquiries: 318 },
  { hour: "1p", enquiries: 246 },
  { hour: "2p", enquiries: 271 },
  { hour: "3p", enquiries: 309 },
  { hour: "4p", enquiries: 336 },
  { hour: "5p", enquiries: 388 },
  { hour: "6p", enquiries: 352 },
  { hour: "7p", enquiries: 264 },
  { hour: "8p", enquiries: 148 },
];

export const channelSplit = [
  { name: "Inbound Call", value: 58, color: "var(--color-chart-1)" },
  { name: "WhatsApp", value: 27, color: "var(--color-chart-3)" },
  { name: "Outbound Call", value: 11, color: "var(--color-chart-2)" },
  { name: "Web / Other", value: 4, color: "var(--color-chart-4)" },
];

export const patientTypeSplit = [
  { label: "New Patient", value: 56 },
  { label: "Existing Patient", value: 33 },
  { label: "International Patient", value: 7 },
  { label: "Corporate / Empanelled", value: 4 },
];

export const intentDistribution = [
  { name: "High", value: 30, color: "var(--color-success)" },
  { name: "Medium", value: 43, color: "var(--color-warning)" },
  { name: "Low", value: 27, color: "var(--color-muted-foreground)" },
];

export const managementBrief = {
  headline: "Today's Patient Access Brief",
  body: "Patient enquiry volume is 12% above the 30-day daily average. Cardiology and Orthopaedics account for the largest share of appointment intent. Doctor availability remains the leading access barrier. 74 high-intent enquiries require follow-up, including 26 awaiting insurance confirmation. Repeat contacts are elevated for insurance-related enquiries, which generate 21% of repeat contacts from only 8% of total volume.",
  generated: "Generated 10 minutes ago from 4,862 analysed conversations",
};

export const executiveInsights = [
  {
    tone: "warning" as const,
    title: "Doctor availability is the dominant access barrier",
    body: "24% of enquiries that did not convert to an appointment ended on availability. Orthopaedics and Cardiology account for 46% of those conversations, concentrated on Saturday and post-5 PM slot requests.",
    meta: "Patient Access Intelligence · 1,124 conversations",
  },
  {
    tone: "danger" as const,
    title: "Insurance questions generate disproportionate repeat contact",
    body: "Insurance and cashless enquiries are 8% of total volume but 21% of repeat contacts. Patients typically call back within 26 hours when eligibility is described as 'we will check and revert' without a committed callback time.",
    meta: "Patient Experience Intelligence · 286 repeat contacts",
  },
  {
    tone: "info" as const,
    title: "Named-doctor demand is highly concentrated",
    body: "38% of all enquiries name a specific consultant. Dr. Ananya Rao, Dr. Arjun Menon and Dr. Rahul Desai together account for 31% of named-doctor requests, but only 54% of those requests result in a confirmed appointment.",
    meta: "Doctor Demand Intelligence · 1,847 named requests",
  },
  {
    tone: "success" as const,
    title: "Health-check package demand is rising",
    body: "Preventive health-check enquiries grew 18% over the last three weeks, driven by corporate empanelment renewals. 62% of these conversations request weekend slots that are currently not offered beyond 11 AM.",
    meta: "Service Demand Intelligence · 402 conversations",
  },
];

/* ------------------------------------------------------------------ */
/* Attention required                                                  */
/* ------------------------------------------------------------------ */

export const attentionItems = [
  { value: 74, text: "High-intent appointment enquiries awaiting follow-up", tone: "danger" as const, filter: "Follow-Up Required" },
  { value: 31, text: "Patients requested a specialist but no appointment is recorded", tone: "warning" as const, filter: "Appointment Pending" },
  { value: 26, text: "Insurance-dependent enquiries awaiting confirmation", tone: "warning" as const, filter: "Insurance Pending" },
  { value: 18, text: "Patients contacted the hospital multiple times about the same unresolved issue", tone: "danger" as const, filter: "Repeat Contact" },
  { value: 14, text: "Diagnostic enquiries have no documented next action", tone: "info" as const, filter: "Unresolved" },
  { value: 8, text: "Priority enquiries require operational review", tone: "danger" as const, filter: "Priority" },
];

/* ------------------------------------------------------------------ */
/* Patient access                                                      */
/* ------------------------------------------------------------------ */

export const accessKpis = [
  { label: "Appointment Intent", value: "1,436", sub: "29.5% of enquiries", tone: "success" as const },
  { label: "Appointment Requests", value: "927", sub: "64.6% of intent", tone: "primary" as const },
  { label: "Appointment Confirmations", value: "742", sub: "80.0% of requests", tone: "success" as const },
  { label: "Follow-Up Pending", value: "318", sub: "promised actions open", tone: "warning" as const },
  { label: "Doctor Availability Issues", value: "271", sub: "slot not offered or declined", tone: "danger" as const },
  { label: "Insurance Pending", value: "214", sub: "eligibility unconfirmed", tone: "warning" as const },
  { label: "Repeat Enquiries", value: "286", sub: "same unresolved issue", tone: "warning" as const },
  { label: "Unresolved Enquiries", value: "184", sub: "no documented outcome", tone: "danger" as const },
];

export const accessBarriers = [
  { label: "Doctor Availability", value: 24 },
  { label: "Insurance / Cashless", value: 19 },
  { label: "Appointment Timing", value: 16 },
  { label: "Pricing / Estimate", value: 14 },
  { label: "Waiting Time", value: 9 },
  { label: "Information Incomplete", value: 7 },
  { label: "Location / Travel", value: 5 },
  { label: "Other", value: 6 },
];

export const barrierNames = accessBarriers.map((b) => b.label);

export const frictionColumns = [
  "Doctor Availability",
  "Insurance",
  "Appointment Timing",
  "Pricing",
  "Waiting Time",
  "Information Gap",
];

export const frictionMatrix: { specialty: string; values: number[] }[] = [
  { specialty: "Cardiology", values: [28, 21, 17, 14, 11, 9] },
  { specialty: "Orthopaedics", values: [37, 16, 22, 18, 13, 8] },
  { specialty: "Oncology", values: [19, 34, 14, 24, 16, 12] },
  { specialty: "Neurology", values: [26, 18, 19, 21, 12, 14] },
  { specialty: "Gastroenterology", values: [21, 15, 16, 17, 9, 11] },
  { specialty: "Paediatrics", values: [24, 12, 27, 9, 18, 7] },
  { specialty: "OB-GYN", values: [22, 19, 24, 16, 14, 10] },
];

export const frictionInsight =
  "Orthopaedics carries the highest doctor-availability friction, concentrated on Saturday requests for Dr. Arjun Menon. Oncology generates the highest proportion of insurance-related friction — 34% of Oncology enquiries stall on cashless approval rather than clinical or scheduling issues.";

export const accessTrend = Array.from({ length: 12 }, (_, i) => {
  const w = Math.sin((i + 1) / 1.9) * 0.12;
  return {
    week: `W${i + 1}`,
    intent: Math.round(120 * (1 + w)),
    requested: Math.round(78 * (1 + w * 0.9)),
    confirmed: Math.round(62 * (1 + w * 0.7)),
  };
});

/* ------------------------------------------------------------------ */
/* Patient experience                                                  */
/* ------------------------------------------------------------------ */

export const patientStruggles = [
  { label: "Doctor Availability", value: 412, detail: "Requested consultant has no slot in the patient's preferred window" },
  { label: "Insurance Confirmation", value: 348, detail: "Cashless eligibility described as pending with no committed callback" },
  { label: "Appointment Waiting Time", value: 296, detail: "Next available slot beyond the patient's acceptable wait" },
  { label: "Unable to Reach Department", value: 241, detail: "Patient transferred to a department extension that did not answer" },
  { label: "Repeated Information Requests", value: 218, detail: "Patient asked to restate details already provided in a prior contact" },
  { label: "Appointment Rescheduling", value: 187, detail: "Consultant schedule changed after the appointment was confirmed" },
  { label: "Pricing Clarity", value: 164, detail: "Package inclusions and estimate ranges not clearly explained" },
  { label: "Diagnostic Availability", value: 132, detail: "MRI, CT or Echo slot unavailable on the requested day" },
  { label: "Reports / Results", value: 118, detail: "Report delivery timing and collection method unclear" },
  { label: "Directions / Location", value: 74, detail: "Block, floor and entrance guidance requested repeatedly" },
];

export const repeatReasons = [
  { label: "No Callback", value: 28 },
  { label: "Insurance Still Pending", value: 21 },
  { label: "Appointment Not Confirmed", value: 17 },
  { label: "Doctor Schedule Changed", value: 11 },
  { label: "Reports / Results", value: 9 },
  { label: "Information Incomplete", value: 8 },
  { label: "Other", value: 6 },
];

export const repeatBreakdown = [
  { label: "2 Contacts", value: 186, share: 65 },
  { label: "3 Contacts", value: 68, share: 24 },
  { label: "4+ Contacts", value: 32, share: 11 },
];

export const repeatInsight =
  "Insurance-related enquiries account for only 8% of total enquiries but 21% of repeat contacts. Patients whose first contact ended without a committed callback time are 3.4× more likely to contact the hospital again within 48 hours.";

export const sentimentTrend = Array.from({ length: 12 }, (_, i) => {
  const w = Math.cos((i + 2) / 2.3) * 0.08;
  return {
    week: `W${i + 1}`,
    positive: Math.round(48 * (1 + w)),
    neutral: Math.round(36 * (1 - w * 0.4)),
    negative: Math.round(16 * (1 - w)),
  };
});

export const experienceInsights = [
  {
    tone: "danger" as const,
    title: "Transfers to department extensions are a silent failure point",
    body: "241 patients described being transferred to a department that did not answer. 61% of those patients contacted the hospital again the same day, and 44% of them changed the reason for their call to a complaint.",
    meta: "Patient Experience Intelligence",
  },
  {
    tone: "warning" as const,
    title: "Patients repeat their details across channels",
    body: "218 conversations contained the patient restating their name, UHID or previous request. This concentrates in journeys that begin on WhatsApp and continue on a voice call.",
    meta: "Cross-channel analysis",
  },
  {
    tone: "info" as const,
    title: "Weekend demand exceeds weekend supply",
    body: "Saturday-morning slot requests are 2.7× weekday requests for Orthopaedics and Paediatrics, while offered Saturday capacity is unchanged. Patients decline weekday alternatives in 58% of those conversations.",
    meta: "Access timing analysis",
  },
];

/* ------------------------------------------------------------------ */
/* Specialties                                                         */
/* ------------------------------------------------------------------ */

export type Specialty = {
  id: string;
  name: string;
  short: string;
  enquiries: number;
  highIntentPct: number;
  requests: number;
  confirmed: number;
  unresolved: number;
  repeatRate: number;
  sentiment: { positive: number; neutral: number; negative: number };
  topDoctor: string;
  topService: string;
  services: { label: string; value: number }[];
  questions: string[];
  barriers: { label: string; value: number }[];
  topQuestion: string;
  topBarrier: string;
  peak: string;
  brief: string;
  trend: { week: string; enquiries: number; intent: number }[];
};

const trendFor = (base: number, seed: number) =>
  Array.from({ length: 12 }, (_, i) => {
    const w = Math.sin((i + seed) / 1.8) * 0.15 + Math.cos((i + seed) / 3.3) * 0.08;
    return {
      week: `W${i + 1}`,
      enquiries: Math.round(base * (1 + w)),
      intent: Math.round(34 + w * 40 + (i % 3) * 2),
    };
  });

type SpecSeed = [
  id: string,
  name: string,
  enq: number,
  intent: number,
  req: number,
  conf: number,
  unres: number,
  repeat: number,
  doctor: string,
  services: [string, number][],
  questions: string[],
  barriers: [string, number][],
  peak: string,
  brief: string,
];

const specSeeds: SpecSeed[] = [
  [
    "cardiology",
    "Cardiology",
    682,
    41,
    218,
    176,
    34,
    9.1,
    "Dr. Ananya Rao",
    [
      ["Cardiology Consultation", 284],
      ["ECG", 148],
      ["Echocardiography", 121],
      ["Angiography", 74],
      ["Cardiac Health Check", 55],
    ],
    ["Doctor availability", "Consultation fee", "Insurance acceptance", "Diagnostic availability", "Appointment timing"],
    [
      ["Doctor Availability", 28],
      ["Insurance / Cashless", 21],
      ["Appointment Timing", 17],
      ["Pricing / Estimate", 14],
      ["Waiting Time", 11],
    ],
    "Mon–Wed, 9–11 AM",
    "Cardiology demand is strongest Monday through Wednesday. Dr. Ananya Rao accounts for 28% of named-doctor requests. Appointment availability is the leading access barrier, while insurance questions are concentrated among diagnostic and procedure enquiries rather than first consultations.",
  ],
  [
    "orthopaedics",
    "Orthopaedics",
    614,
    38,
    196,
    148,
    41,
    11.4,
    "Dr. Arjun Menon",
    [
      ["Orthopaedic Consultation", 262],
      ["MRI Knee / Spine", 134],
      ["Physiotherapy", 96],
      ["Knee Replacement Counselling", 71],
      ["Fracture Review", 51],
    ],
    ["Saturday availability", "Surgery cost estimate", "Insurance approval", "Physiotherapy schedule", "Second opinion"],
    [
      ["Doctor Availability", 37],
      ["Appointment Timing", 22],
      ["Pricing / Estimate", 18],
      ["Insurance / Cashless", 16],
      ["Waiting Time", 13],
    ],
    "Sat, 8–11 AM",
    "Orthopaedics carries the highest doctor-availability friction in the hospital. Saturday-morning demand for Dr. Arjun Menon is 2.7× the weekday average, and 58% of patients offered a weekday alternative decline it. Surgery estimate requests are frequently deferred to a callback that is not completed.",
  ],
  [
    "gastroenterology",
    "Gastroenterology",
    438,
    33,
    132,
    104,
    24,
    8.2,
    "Dr. Vikram Shah",
    [
      ["Gastro Consultation", 188],
      ["Endoscopy", 96],
      ["Colonoscopy", 61],
      ["Liver Function Panel", 52],
      ["Ultrasound Abdomen", 41],
    ],
    ["Endoscopy preparation", "Fasting requirement", "Procedure cost", "Day-care admission", "Report timing"],
    [
      ["Doctor Availability", 21],
      ["Pricing / Estimate", 17],
      ["Appointment Timing", 16],
      ["Insurance / Cashless", 15],
      ["Information Incomplete", 11],
    ],
    "Tue–Thu, 10 AM–1 PM",
    "Gastroenterology enquiries are procedure-led. Patients ask about endoscopy preparation and fasting more than about the consultation itself, and 31% of conversations end without documented preparation instructions — a leading cause of day-of-procedure rescheduling.",
  ],
  [
    "neurology",
    "Neurology",
    396,
    36,
    118,
    88,
    28,
    10.1,
    "Dr. Meera Krishnan",
    [
      ["Neurology Consultation", 172],
      ["MRI Brain", 88],
      ["EEG", 54],
      ["Nerve Conduction Study", 44],
      ["Headache Clinic", 38],
    ],
    ["Doctor availability", "MRI slot availability", "Insurance approval", "Report interpretation timing", "Follow-up interval"],
    [
      ["Doctor Availability", 26],
      ["Pricing / Estimate", 21],
      ["Appointment Timing", 19],
      ["Insurance / Cashless", 18],
      ["Information Incomplete", 14],
    ],
    "Mon & Thu, 11 AM–2 PM",
    "Neurology enquiries frequently pair a consultation request with an imaging question. Where MRI availability is not confirmed in the same conversation, appointment confirmation drops by 22 percentage points.",
  ],
  [
    "obgyn",
    "Obstetrics & Gynaecology",
    472,
    39,
    164,
    138,
    19,
    7.4,
    "Dr. Nisha Kapoor",
    [
      ["Antenatal Consultation", 196],
      ["Anomaly Scan", 84],
      ["Gynae Consultation", 78],
      ["Delivery Package", 64],
      ["Fertility Counselling", 50],
    ],
    ["Delivery package cost", "Doctor availability", "Insurance coverage for delivery", "Scan scheduling", "Room category"],
    [
      ["Appointment Timing", 24],
      ["Doctor Availability", 22],
      ["Insurance / Cashless", 19],
      ["Pricing / Estimate", 16],
      ["Waiting Time", 14],
    ],
    "Wed & Fri, 10 AM–1 PM",
    "OB-GYN generates the hospital's most package-driven conversations. Delivery package pricing and room category dominate, and enquiries where the full package inclusion list is explained convert to a confirmed appointment 1.9× more often.",
  ],
  [
    "paediatrics",
    "Paediatrics",
    528,
    35,
    172,
    142,
    22,
    8.8,
    "Dr. Priya Nair",
    [
      ["Paediatric Consultation", 244],
      ["Vaccination", 128],
      ["Growth & Development Review", 62],
      ["Paediatric Emergency Advice", 52],
      ["Newborn Check", 42],
    ],
    ["Evening slot availability", "Vaccination schedule", "Walk-in possibility", "Consultation fee", "Doctor on duty today"],
    [
      ["Appointment Timing", 27],
      ["Doctor Availability", 24],
      ["Waiting Time", 18],
      ["Insurance / Cashless", 12],
      ["Pricing / Estimate", 9],
    ],
    "Daily, 5–8 PM",
    "Paediatric demand is overwhelmingly evening-weighted: 61% of enquiries request a slot after 5 PM. Vaccination scheduling is the single largest repeat-contact driver in this specialty, usually because the due-date reminder was not confirmed in writing.",
  ],
  [
    "oncology",
    "Oncology",
    342,
    44,
    124,
    92,
    31,
    13.2,
    "Dr. Rahul Desai",
    [
      ["Oncology Consultation", 148],
      ["PET-CT", 71],
      ["Chemotherapy Day Care", 58],
      ["Biopsy Review", 38],
      ["Second Opinion", 27],
    ],
    ["Cashless approval process", "Treatment estimate", "Second opinion process", "Day-care scheduling", "Report upload"],
    [
      ["Insurance / Cashless", 34],
      ["Pricing / Estimate", 24],
      ["Doctor Availability", 19],
      ["Waiting Time", 16],
      ["Information Incomplete", 12],
    ],
    "Mon–Wed, 9 AM–12 PM",
    "Oncology is the hospital's most insurance-sensitive specialty. 34% of Oncology enquiries stall on cashless pre-authorisation rather than on scheduling. Patients contacting about second opinions ask for report-upload guidance in 68% of conversations.",
  ],
  [
    "ent",
    "ENT",
    364,
    31,
    108,
    88,
    17,
    6.9,
    "Dr. Mohammed Farooq",
    [
      ["ENT Consultation", 168],
      ["Audiometry", 71],
      ["Sinus Evaluation", 48],
      ["Tonsillectomy Counselling", 41],
      ["Vertigo Clinic", 36],
    ],
    ["Doctor availability", "Audiometry timing", "Procedure day-care cost", "Insurance", "Child ENT slots"],
    [
      ["Doctor Availability", 22],
      ["Appointment Timing", 18],
      ["Pricing / Estimate", 15],
      ["Waiting Time", 12],
      ["Insurance / Cashless", 11],
    ],
    "Tue & Sat, 9 AM–12 PM",
    "ENT enquiries are highly resolvable in a single contact — the specialty has the lowest repeat-contact rate. Most friction comes from pairing consultation with same-day audiometry, which is currently only offered before noon.",
  ],
  [
    "dermatology",
    "Dermatology",
    318,
    28,
    94,
    81,
    12,
    5.8,
    "Dr. Kavita Reddy",
    [
      ["Dermatology Consultation", 156],
      ["Laser / Cosmetic Procedure", 62],
      ["Allergy Patch Test", 41],
      ["Hair Loss Clinic", 34],
      ["Acne Programme", 25],
    ],
    ["Procedure pricing", "Session count", "Doctor availability", "Insurance applicability", "Weekend slots"],
    [
      ["Pricing / Estimate", 29],
      ["Appointment Timing", 19],
      ["Doctor Availability", 16],
      ["Information Incomplete", 11],
      ["Insurance / Cashless", 8],
    ],
    "Thu–Sat, 11 AM–3 PM",
    "Dermatology is the most price-led specialty: 29% of barriers are estimate-related, and patients ask for session counts and package pricing before they ask about the doctor. Insurance is rarely relevant and agents spend unnecessary time on it.",
  ],
  [
    "urology",
    "Urology",
    286,
    34,
    88,
    68,
    16,
    7.7,
    "Dr. Sanjay Iyer",
    [
      ["Urology Consultation", 128],
      ["Ultrasound KUB", 58],
      ["Lithotripsy Counselling", 42],
      ["Uroflowmetry", 31],
      ["Prostate Screening", 27],
    ],
    ["Stone procedure cost", "Admission duration", "Insurance approval", "Doctor availability", "Diagnostic bundling"],
    [
      ["Pricing / Estimate", 24],
      ["Insurance / Cashless", 21],
      ["Doctor Availability", 18],
      ["Appointment Timing", 15],
      ["Waiting Time", 10],
    ],
    "Mon & Fri, 10 AM–1 PM",
    "Urology conversations are dominated by stone-management enquiries. Patients ask about admission duration as often as cost, and conversations that answer both convert at nearly double the rate.",
  ],
  [
    "nephrology",
    "Nephrology",
    214,
    37,
    72,
    54,
    18,
    12.1,
    "Dr. Meera Krishnan",
    [
      ["Nephrology Consultation", 96],
      ["Dialysis Enquiry", 54],
      ["Renal Function Panel", 34],
      ["Transplant Counselling", 18],
      ["Dietician Referral", 12],
    ],
    ["Dialysis slot availability", "Insurance coverage", "Session pricing", "Transport / timing", "Doctor availability"],
    [
      ["Insurance / Cashless", 26],
      ["Appointment Timing", 22],
      ["Waiting Time", 19],
      ["Pricing / Estimate", 17],
      ["Doctor Availability", 12],
    ],
    "Daily, 7–10 AM",
    "Nephrology has the second-highest repeat-contact rate. Dialysis slot enquiries are recurring by nature, but 43% of repeats are caused by unconfirmed recurring-slot allocation rather than new clinical need.",
  ],
  [
    "pulmonology",
    "Pulmonology",
    258,
    30,
    76,
    61,
    14,
    7.2,
    "Dr. Vikram Shah",
    [
      ["Pulmonology Consultation", 118],
      ["Pulmonary Function Test", 56],
      ["Sleep Study", 38],
      ["Allergy Evaluation", 26],
      ["Chest Imaging", 20],
    ],
    ["Sleep study process", "PFT preparation", "Doctor availability", "Report timing", "Package pricing"],
    [
      ["Appointment Timing", 21],
      ["Information Incomplete", 19],
      ["Doctor Availability", 17],
      ["Pricing / Estimate", 16],
      ["Insurance / Cashless", 11],
    ],
    "Wed & Sat, 10 AM–2 PM",
    "Pulmonology enquiries frequently require multi-step preparation guidance. Sleep-study conversations are the longest in the hospital and the most likely to end with the patient asking to be called back with written instructions.",
  ],
  [
    "endocrinology",
    "Endocrinology",
    276,
    32,
    84,
    69,
    13,
    6.4,
    "Dr. Kavita Reddy",
    [
      ["Endocrine Consultation", 124],
      ["Diabetes Programme", 62],
      ["Thyroid Panel", 46],
      ["Obesity Clinic", 26],
      ["Hormone Assessment", 18],
    ],
    ["Programme pricing", "Follow-up frequency", "Lab bundling", "Doctor availability", "Dietician inclusion"],
    [
      ["Pricing / Estimate", 23],
      ["Appointment Timing", 18],
      ["Doctor Availability", 16],
      ["Information Incomplete", 13],
      ["Insurance / Cashless", 10],
    ],
    "Tue & Fri, 9 AM–12 PM",
    "Endocrinology demand is programme-led rather than consultation-led. Diabetes programme enquiries convert best when lab bundling and follow-up frequency are explained in the first conversation.",
  ],
  [
    "ophthalmology",
    "Ophthalmology",
    232,
    29,
    68,
    58,
    11,
    5.2,
    "Dr. Mohammed Farooq",
    [
      ["Eye Consultation", 108],
      ["Cataract Counselling", 48],
      ["Retina Clinic", 32],
      ["Vision Screening", 26],
      ["Lens Options", 18],
    ],
    ["Cataract package cost", "Lens options", "Day-care duration", "Insurance", "Doctor availability"],
    [
      ["Pricing / Estimate", 26],
      ["Information Incomplete", 17],
      ["Doctor Availability", 15],
      ["Insurance / Cashless", 14],
      ["Appointment Timing", 12],
    ],
    "Mon & Thu, 2–5 PM",
    "Ophthalmology enquiries centre on cataract packages. Lens-option explanations are the strongest predictor of a confirmed appointment, yet they appear in only 41% of relevant conversations.",
  ],
  [
    "general-medicine",
    "General Medicine",
    486,
    26,
    142,
    122,
    21,
    6.1,
    "Dr. Priya Nair",
    [
      ["General Consultation", 232],
      ["Master Health Check", 118],
      ["Fever Clinic", 62],
      ["Vaccination (Adult)", 42],
      ["Corporate Health Check", 32],
    ],
    ["Walk-in availability", "Health-check package price", "Fasting requirement", "Report timing", "Doctor on duty"],
    [
      ["Appointment Timing", 22],
      ["Waiting Time", 20],
      ["Pricing / Estimate", 17],
      ["Doctor Availability", 13],
      ["Information Incomplete", 11],
    ],
    "Daily, 9 AM–12 PM",
    "General Medicine is the hospital's entry point and health-check engine. Waiting time — not availability — is the dominant complaint, and package price questions frequently precede any clinical discussion.",
  ],
  [
    "general-surgery",
    "General Surgery",
    246,
    33,
    76,
    58,
    17,
    8.4,
    "Dr. Sanjay Iyer",
    [
      ["Surgical Consultation", 112],
      ["Hernia Counselling", 48],
      ["Laparoscopy Estimate", 38],
      ["Pre-Anaesthetic Check", 26],
      ["Post-Op Review", 22],
    ],
    ["Surgery estimate", "Insurance pre-authorisation", "Admission duration", "Doctor availability", "Pre-op tests"],
    [
      ["Pricing / Estimate", 27],
      ["Insurance / Cashless", 23],
      ["Doctor Availability", 16],
      ["Appointment Timing", 14],
      ["Information Incomplete", 11],
    ],
    "Tue & Sat, 11 AM–2 PM",
    "General Surgery conversations almost always begin with an estimate request. Where an insurance pre-authorisation timeline is committed in the first call, repeat contact drops by more than half.",
  ],
];

export const specialties: Specialty[] = specSeeds.map((s, idx) => {
  const [id, name, enquiries, highIntentPct, requests, confirmed, unresolved, repeatRate, topDoctor, services, questions, barriers, peak, brief] = s;
  const neg = Math.min(28, Math.round(barriers[0]![1] * 0.6));
  return {
    id,
    name,
    short: name.replace("Obstetrics & Gynaecology", "OB-GYN"),
    enquiries,
    highIntentPct,
    requests,
    confirmed,
    unresolved,
    repeatRate,
    sentiment: { positive: 100 - neg - 34, neutral: 34, negative: neg },
    topDoctor,
    topService: services[0]![0],
    services: services.map(([label, value]) => ({ label, value })),
    questions,
    barriers: barriers.map(([label, value]) => ({ label, value })),
    topQuestion: questions[0]!,
    topBarrier: barriers[0]![0],
    peak,
    brief,
    trend: trendFor(enquiries / 12, idx),
  };
});

export const specialtyNames = specialties.map((s) => s.name);
export const specialtyDemand = specialties
  .slice()
  .sort((a, b) => b.enquiries - a.enquiries)
  .slice(0, 8)
  .map((s) => ({ label: s.short, value: s.enquiries }));

/* ------------------------------------------------------------------ */
/* Doctors — DEMAND intelligence only (never clinical performance)     */
/* ------------------------------------------------------------------ */

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  requested: number;
  highIntentPct: number;
  requests: number;
  confirmed: number;
  unresolved: number;
  services: string[];
  preferredTimes: { label: string; value: number }[];
  questions: string[];
  barriers: { label: string; value: number }[];
  note: string;
};

type DocSeed = [string, string, string, number, number, number, number, number, string[], [string, number][], string[], [string, number][], string];

const docSeeds: DocSeed[] = [
  ["ananya-rao", "Dr. Ananya Rao", "Cardiology", 318, 44, 128, 98, 18,
    ["Cardiology Consultation", "Echocardiography", "Angiography", "Cardiac Health Check"],
    [["Mon 9–11 AM", 96], ["Wed 10 AM–12 PM", 74], ["Sat 9–11 AM", 68], ["After 5 PM", 41]],
    ["Is she available this Saturday?", "What is her consultation fee?", "Does she do Echo the same day?", "Is cashless accepted for her consultation?"],
    [["Doctor Availability", 34], ["Insurance / Cashless", 22], ["Appointment Timing", 18], ["Pricing / Estimate", 14]],
    "Highest named-doctor demand in the hospital. Saturday requests exceed offered Saturday capacity by roughly 2×."],
  ["arjun-menon", "Dr. Arjun Menon", "Orthopaedics", 284, 41, 112, 82, 24,
    ["Orthopaedic Consultation", "MRI Knee", "Knee Replacement Counselling", "Physiotherapy"],
    [["Sat 8–11 AM", 118], ["Tue 10 AM–1 PM", 62], ["After 6 PM", 54], ["Thu 11 AM–1 PM", 38]],
    ["Saturday morning availability?", "Knee replacement cost estimate?", "Will insurance cover the surgery?", "Can MRI be done the same day?"],
    [["Doctor Availability", 41], ["Appointment Timing", 21], ["Pricing / Estimate", 19], ["Insurance / Cashless", 12]],
    "Saturday-morning demand is the single largest access bottleneck in the hospital's enquiry data."],
  ["meera-krishnan", "Dr. Meera Krishnan", "Neurology", 196, 38, 74, 54, 16,
    ["Neurology Consultation", "MRI Brain", "EEG", "Headache Clinic"],
    [["Mon 11 AM–2 PM", 61], ["Thu 11 AM–2 PM", 58], ["Sat 10 AM–12 PM", 39], ["After 5 PM", 24]],
    ["When is her next available slot?", "Is MRI needed before the consultation?", "How long is the report wait?", "Is a referral required?"],
    [["Doctor Availability", 28], ["Pricing / Estimate", 22], ["Appointment Timing", 19], ["Information Incomplete", 15]],
    "Frequently requested alongside imaging; unconfirmed MRI slots are the main reason her appointments stall."],
  ["vikram-shah", "Dr. Vikram Shah", "Gastroenterology", 174, 34, 62, 48, 12,
    ["Gastro Consultation", "Endoscopy", "Colonoscopy", "Liver Panel"],
    [["Tue 10 AM–1 PM", 58], ["Thu 10 AM–1 PM", 46], ["Sat 9–11 AM", 34], ["After 5 PM", 21]],
    ["What is the endoscopy preparation?", "How long is fasting required?", "Is it a day-care procedure?", "What is the total estimate?"],
    [["Pricing / Estimate", 24], ["Doctor Availability", 21], ["Information Incomplete", 18], ["Insurance / Cashless", 14]],
    "Procedure preparation questions dominate; written instructions are requested in most conversations."],
  ["nisha-kapoor", "Dr. Nisha Kapoor", "Obstetrics & Gynaecology", 212, 43, 88, 72, 11,
    ["Antenatal Consultation", "Anomaly Scan", "Delivery Package", "Fertility Counselling"],
    [["Wed 10 AM–1 PM", 72], ["Fri 10 AM–1 PM", 64], ["Sat 9 AM–12 PM", 44], ["After 5 PM", 28]],
    ["What does the delivery package include?", "Is the package covered by insurance?", "Which room categories are available?", "When is the next anomaly scan slot?"],
    [["Appointment Timing", 26], ["Pricing / Estimate", 21], ["Insurance / Cashless", 19], ["Doctor Availability", 16]],
    "Package-led demand. Conversations that explain inclusions convert far more reliably."],
  ["rahul-desai", "Dr. Rahul Desai", "Oncology", 158, 47, 68, 44, 19,
    ["Oncology Consultation", "PET-CT", "Chemotherapy Day Care", "Second Opinion"],
    [["Mon 9 AM–12 PM", 54], ["Wed 9 AM–12 PM", 48], ["Fri 10 AM–1 PM", 32], ["Sat 9–11 AM", 18]],
    ["How do I get cashless approval?", "How do I share previous reports?", "What is the treatment estimate?", "How soon can we be seen?"],
    [["Insurance / Cashless", 38], ["Pricing / Estimate", 22], ["Waiting Time", 17], ["Doctor Availability", 13]],
    "Highest appointment intent of any consultant, but the highest insurance-driven stall rate."],
  ["priya-nair", "Dr. Priya Nair", "Paediatrics", 246, 36, 92, 76, 13,
    ["Paediatric Consultation", "Vaccination", "Newborn Check", "Growth Review"],
    [["Daily 5–8 PM", 142], ["Sat 9 AM–12 PM", 52], ["Sun 10 AM–12 PM", 31], ["Weekday morning", 21]],
    ["Is she available this evening?", "Can we walk in?", "When is the next vaccine due?", "What is the consultation fee?"],
    [["Appointment Timing", 31], ["Doctor Availability", 24], ["Waiting Time", 18], ["Pricing / Estimate", 9]],
    "Evening-weighted demand. Vaccination reminders drive most repeat contact."],
  ["mohammed-farooq", "Dr. Mohammed Farooq", "ENT", 148, 30, 48, 40, 8,
    ["ENT Consultation", "Audiometry", "Sinus Evaluation", "Vertigo Clinic"],
    [["Tue 9 AM–12 PM", 48], ["Sat 9 AM–12 PM", 42], ["Thu 11 AM–1 PM", 28], ["After 5 PM", 16]],
    ["Can audiometry be done the same day?", "Is a child ENT slot available?", "What is the procedure cost?", "Is a referral needed?"],
    [["Doctor Availability", 23], ["Appointment Timing", 19], ["Pricing / Estimate", 15], ["Waiting Time", 11]],
    "Same-day audiometry pairing is the main scheduling question in his enquiries."],
  ["kavita-reddy", "Dr. Kavita Reddy", "Dermatology", 162, 27, 52, 45, 7,
    ["Dermatology Consultation", "Laser Procedure", "Hair Loss Clinic", "Acne Programme"],
    [["Thu 11 AM–3 PM", 56], ["Sat 11 AM–3 PM", 48], ["Fri 2–5 PM", 34], ["After 6 PM", 19]],
    ["How many sessions are needed?", "What is the per-session price?", "Are weekend slots available?", "Is there a package discount?"],
    [["Pricing / Estimate", 32], ["Appointment Timing", 20], ["Doctor Availability", 14], ["Information Incomplete", 10]],
    "Price and session-count questions precede clinical discussion in most conversations."],
  ["sanjay-iyer", "Dr. Sanjay Iyer", "Urology", 139, 33, 44, 34, 9,
    ["Urology Consultation", "Ultrasound KUB", "Lithotripsy Counselling", "Prostate Screening"],
    [["Mon 10 AM–1 PM", 44], ["Fri 10 AM–1 PM", 38], ["Sat 10 AM–12 PM", 29], ["After 5 PM", 17]],
    ["What is the stone procedure cost?", "How many days of admission?", "Is pre-authorisation needed?", "Can scans be done the same day?"],
    [["Pricing / Estimate", 26], ["Insurance / Cashless", 22], ["Doctor Availability", 17], ["Appointment Timing", 14]],
    "Admission duration is asked as often as cost; answering both materially improves conversion."],
];

export const doctors: Doctor[] = docSeeds.map((d) => ({
  id: d[0],
  name: d[1],
  specialty: d[2],
  requested: d[3],
  highIntentPct: d[4],
  requests: d[5],
  confirmed: d[6],
  unresolved: d[7],
  services: d[8],
  preferredTimes: d[9].map(([label, value]) => ({ label, value })),
  questions: d[10],
  barriers: d[11].map(([label, value]) => ({ label, value })),
  note: d[12],
}));

export const doctorNames = doctors.map((d) => d.name);

/* ------------------------------------------------------------------ */
/* Enquiry agents                                                      */
/* ------------------------------------------------------------------ */

export const qualityDimensions = [
  { key: "understanding", label: "Enquiry Understanding" },
  { key: "empathy", label: "Empathy & Communication" },
  { key: "routing", label: "Correct Routing" },
  { key: "doctorKnowledge", label: "Doctor / Service Knowledge" },
  { key: "facilitation", label: "Appointment Facilitation" },
  { key: "insurance", label: "Insurance Process Guidance" },
  { key: "accuracy", label: "Information Accuracy" },
  { key: "nextStep", label: "Next-Step Clarity" },
  { key: "escalation", label: "Escalation Compliance" },
] as const;

export type QualityKey = (typeof qualityDimensions)[number]["key"];

export type Agent = {
  id: string;
  name: string;
  role: string;
  enquiries: number;
  quality: number;
  aht: string;
  followUpCompletion: number;
  unresolvedRate: number;
  repeatRate: number;
  requestRate: number;
  inbound: number;
  outbound: number;
  whatsapp: number;
  sentiment: { positive: number; neutral: number; negative: number };
  scores: Record<QualityKey, number>;
  specialties: { label: string; value: number }[];
  activity: { day: string; enquiries: number }[];
  coaching: { tone: "success" | "warning" | "danger" | "info"; text: string }[];
};

type AgentSeed = [string, string, string, number, string, number, number, number, number, number[], [string, number][], ["success" | "warning" | "danger" | "info", string][]];

const agentSeeds: AgentSeed[] = [
  ["Aditi Sharma", "Senior Patient Access Executive", "aditi", 742, "4:12", 94, 2.8, 5.1, 71,
    [92, 90, 91, 88, 89, 84, 90, 88, 95],
    [["Cardiology", 218], ["General Medicine", 164], ["Paediatrics", 122], ["OB-GYN", 96]],
    [["success", "Consistently confirms the patient's preferred day and time before offering slots, which reduces the back-and-forth seen in other agents' calls."],
     ["warning", "On insurance-linked enquiries she confirms acceptance of the insurer but does not always commit a callback time for eligibility, which is the hospital's largest repeat-contact driver."],
     ["info", "Strong escalation discipline: every priority conversation in her sample was routed to the protocol desk within the call."]]],
  ["Rahul Nair", "Patient Access Executive", "rahul", 688, "5:04", 81, 6.4, 9.8, 62,
    [86, 79, 74, 82, 78, 68, 84, 71, 88],
    [["Orthopaedics", 204], ["General Surgery", 138], ["Urology", 112], ["ENT", 88]],
    [["warning", "Identifies the correct specialty quickly but transfers Orthopaedic surgery-estimate enquiries to the billing desk without confirming that the desk picked up — 11 patients in this period called back the same day."],
     ["danger", "Insurance process guidance is his weakest dimension. In 23 conversations he told patients 'we will check and revert' without recording a follow-up action."],
     ["success", "Excellent doctor-schedule knowledge; rarely quotes an unavailable slot."]]],
  ["Sneha Reddy", "Senior Patient Access Executive", "sneha", 714, "4:28", 91, 3.4, 6.2, 69,
    [90, 93, 88, 86, 87, 82, 88, 86, 92],
    [["OB-GYN", 232], ["Paediatrics", 176], ["Dermatology", 118], ["Endocrinology", 74]],
    [["success", "Her delivery-package explanations include inclusions, room category and estimate range in one pass — these conversations confirm appointments at nearly twice the hospital average."],
     ["info", "Handles anxious antenatal callers with clear, unhurried pacing; negative sentiment is the lowest in the team."],
     ["warning", "Occasionally offers a scan slot before verifying diagnostic availability, causing three rescheduling calls this period."]]],
  ["Mohammed Faizal", "Patient Access Executive", "faizal", 656, "5:36", 78, 7.9, 11.4, 58,
    [82, 81, 71, 74, 72, 64, 79, 68, 84],
    [["Oncology", 148], ["Nephrology", 132], ["Neurology", 121], ["Pulmonology", 96]],
    [["danger", "Oncology cashless enquiries are being handled as information calls rather than pre-authorisation workflows. Nine patients contacted the hospital three or more times about the same approval."],
     ["warning", "Next-step clarity is inconsistent — he closes conversations without restating who will call the patient and when."],
     ["success", "Very strong on report-upload guidance for second-opinion enquiries; patients rarely need to ask twice."]]],
  ["Priya Menon", "Patient Access Executive", "priyam", 602, "4:44", 87, 4.6, 7.1, 66,
    [88, 86, 84, 83, 85, 76, 86, 82, 90],
    [["Gastroenterology", 168], ["General Medicine", 152], ["Endocrinology", 104], ["Ophthalmology", 82]],
    [["success", "Explains endoscopy and colonoscopy preparation clearly and offers to send it on WhatsApp — a practice worth standardising across the team."],
     ["warning", "Health-check package pricing is sometimes quoted as a range without naming inclusions, which generates a follow-up call in about one in six cases."],
     ["info", "Reliable at capturing the patient's preferred slot window before checking the schedule."]]],
  ["Arjun Rao", "Patient Access Executive", "arjunr", 574, "5:18", 74, 8.6, 12.2, 54,
    [78, 74, 69, 76, 71, 62, 77, 64, 81],
    [["Orthopaedics", 162], ["Physiotherapy", 98], ["ENT", 94], ["General Surgery", 88]],
    [["danger", "Highest repeat-contact rate in the team. In 18 conversations the promised callback was never logged as an action, so nothing followed."],
     ["warning", "Tends to answer the question asked rather than the need behind it — patients asking about Saturday slots are not offered the waitlist option."],
     ["info", "Routing accuracy improves noticeably on his afternoon shift; consider rebalancing his morning load."]]],
  ["Neha Singh", "Senior Patient Access Executive", "neha", 668, "4:06", 92, 3.1, 5.6, 73,
    [91, 89, 92, 87, 90, 86, 89, 89, 94],
    [["Cardiology", 196], ["Neurology", 148], ["Oncology", 118], ["Nephrology", 92]],
    [["success", "Best appointment-facilitation scores in the team: she checks the consultant's schedule and the linked diagnostic slot in the same conversation."],
     ["success", "Her insurance guidance names the insurer, the document required and the expected turnaround — repeat contact on her insurance enquiries is 60% below team average."],
     ["info", "Good candidate to lead the insurance-guidance refresher for the team."]]],
  ["Vivek Iyer", "Patient Access Executive", "vivek", 518, "5:52", 76, 7.2, 10.6, 56,
    [80, 77, 73, 71, 74, 66, 78, 70, 83],
    [["General Medicine", 174], ["Dermatology", 112], ["Ophthalmology", 96], ["Pulmonology", 76]],
    [["warning", "Longest average handling time in the team, largely from re-reading package inclusions rather than sending them on WhatsApp."],
     ["warning", "Dermatology pricing enquiries are being routed to insurance guidance that is not relevant, extending calls without helping the patient."],
     ["success", "Very accurate on information he does provide — factual error rate is among the lowest."]]],
];

export const agents: Agent[] = agentSeeds.map((a) => {
  const scores = qualityDimensions.reduce(
    (acc, d, i) => ({ ...acc, [d.key]: a[9][i]! }),
    {} as Record<QualityKey, number>,
  );
  const quality = Math.round(a[9].reduce((s, v) => s + v, 0) / a[9].length);
  const neg = Math.max(4, Math.round(a[6] * 1.6));
  return {
    id: a[2],
    name: a[0],
    role: a[1],
    enquiries: a[3],
    quality,
    aht: a[4],
    followUpCompletion: a[5],
    unresolvedRate: a[6],
    repeatRate: a[7],
    requestRate: a[8],
    inbound: Math.round(a[3] * 0.58),
    outbound: Math.round(a[3] * 0.14),
    whatsapp: Math.round(a[3] * 0.28),
    sentiment: { positive: 100 - neg - 33, neutral: 33, negative: neg },
    scores,
    specialties: a[10].map(([label, value]) => ({ label, value })),
    activity: Array.from({ length: 14 }, (_, i) => ({
      day: `D${i + 1}`,
      enquiries: Math.round((a[3] / 14) * (1 + Math.sin((i + a[0].length) / 2.1) * 0.18)),
    })),
    coaching: a[11].map(([tone, text]) => ({ tone, text })),
  };
});

export const agentNames = agents.map((a) => a.name);

export const teamAverages = {
  quality: Math.round(agents.reduce((s, a) => s + a.quality, 0) / agents.length),
  followUp: Math.round(agents.reduce((s, a) => s + a.followUpCompletion, 0) / agents.length),
  repeat: +(agents.reduce((s, a) => s + a.repeatRate, 0) / agents.length).toFixed(1),
  unresolved: +(agents.reduce((s, a) => s + a.unresolvedRate, 0) / agents.length).toFixed(1),
  requestRate: Math.round(agents.reduce((s, a) => s + a.requestRate, 0) / agents.length),
};

export const dimensionSummary = qualityDimensions.map((d) => {
  const vals = agents.map((a) => a.scores[d.key]);
  return {
    key: d.key,
    label: d.label,
    avg: Math.round(vals.reduce((s, v) => s + v, 0) / vals.length),
    best: agents[vals.indexOf(Math.max(...vals))]!.name,
    worst: agents[vals.indexOf(Math.min(...vals))]!.name,
  };
});

/* ------------------------------------------------------------------ */
/* Enquiries                                                           */
/* ------------------------------------------------------------------ */

export const accessStages = [
  "Enquiry Received",
  "Specialty Identified",
  "Doctor Requested",
  "Appointment Intent Detected",
  "Insurance Verification Required",
  "Appointment Pending",
  "Appointment Confirmed",
] as const;

export type AccessStage = (typeof accessStages)[number];

export type Enquiry = {
  id: string;
  patient: string;
  phone: string;
  patientType: "New Patient" | "Existing Patient" | "International Patient" | "Corporate Patient";
  enquiry: string;
  category: string;
  specialty: string;
  doctor: string;
  service: string;
  agent: string;
  channel: "Inbound Call" | "Outbound Call" | "WhatsApp";
  date: string;
  time: string;
  duration: string;
  intent: number;
  intentLevel: "High" | "Medium" | "Low";
  intentReason: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  insurance: string;
  preferredTime: string;
  barrier: string;
  outcome: string;
  status: string;
  priority: boolean;
  stage: AccessStage;
  estimate: string;
  summary: string;
  nextAction: string;
  coaching: string;
  scores: { label: string; value: number }[];
  transcript: { speaker: "agent" | "patient"; name: string; at: string; text: string }[];
};

export const outcomes = [
  "Appointment Confirmed",
  "Appointment Requested",
  "Information Provided",
  "Callback Promised",
  "Insurance Verification Pending",
  "Routed to Department",
  "Unresolved",
];

export const statuses = [
  "Appointment Confirmed",
  "Appointment Pending",
  "Insurance Pending",
  "Follow-Up Required",
  "Resolved",
  "Unresolved",
  "Priority",
];

export const channels: Enquiry["channel"][] = ["Inbound Call", "Outbound Call", "WhatsApp"];
export const patientTypes: Enquiry["patientType"][] = [
  "New Patient",
  "Existing Patient",
  "International Patient",
  "Corporate Patient",
];
export const insurers = [
  "Star Health",
  "HDFC Ergo",
  "Niva Bupa",
  "ICICI Lombard",
  "CGHS",
  "Aditya Birla Health",
  "Self-Pay",
  "Corporate — Infosys",
  "Corporate — Wipro",
];

type Seed = [
  patient: string,
  phone: string,
  type: Enquiry["patientType"],
  specialtyId: string,
  doctorId: string | null,
  category: string,
  service: string,
  agent: string,
  channel: Enquiry["channel"],
  intent: number,
  sentiment: Enquiry["sentiment"],
  insurance: string,
  preferred: string,
  barrier: string,
  outcome: string,
  enquiry: string,
];

const seeds: Seed[] = [
  ["Ananya Sharma", "+91 98450 21847", "New Patient", "orthopaedics", "arjun-menon", "Appointment Booking", "Orthopaedic Consultation", "Aditi Sharma", "Inbound Call", 88, "Positive", "Star Health", "Saturday Morning", "Insurance / Cashless", "Appointment Requested", "Orthopaedic consultation for persistent knee discomfort"],
  ["Rahul Venkatesh", "+91 99001 34562", "Existing Patient", "cardiology", "ananya-rao", "Doctor Availability", "Cardiology Consultation", "Neha Singh", "Inbound Call", 84, "Neutral", "HDFC Ergo", "After 5 PM", "Doctor Availability", "Appointment Requested", "Cardiology consultation for father, evening slot requested"],
  ["Meenakshi Iyer", "+91 98863 77210", "New Patient", "obgyn", "nisha-kapoor", "Pricing / Estimate", "Delivery Package", "Sneha Reddy", "WhatsApp", 76, "Positive", "Niva Bupa", "Weekday Morning", "Pricing / Estimate", "Information Provided", "Delivery package pricing and room category options"],
  ["Suresh Kumar", "+91 97402 18893", "New Patient", "oncology", "rahul-desai", "Insurance / Cashless", "Oncology Consultation", "Mohammed Faizal", "Inbound Call", 82, "Negative", "ICICI Lombard", "Monday Morning", "Insurance / Cashless", "Insurance Verification Pending", "Cashless pre-authorisation for oncology consultation and PET-CT"],
  ["Divya Prasad", "+91 90192 55471", "Existing Patient", "paediatrics", "priya-nair", "Appointment Booking", "Vaccination", "Aditi Sharma", "WhatsApp", 71, "Positive", "Corporate — Infosys", "Evening", "Appointment Timing", "Appointment Confirmed", "Next vaccination due date and evening slot"],
  ["Karthik Subramanian", "+91 98456 90012", "New Patient", "gastroenterology", "vikram-shah", "Treatment / Procedure Information", "Endoscopy", "Priya Menon", "Inbound Call", 68, "Neutral", "Self-Pay", "Tuesday Morning", "Information Incomplete", "Callback Promised", "Endoscopy preparation, fasting and day-care process"],
  ["Fatima Begum", "+91 99863 21109", "New Patient", "neurology", "meera-krishnan", "Doctor Availability", "MRI Brain", "Mohammed Faizal", "Inbound Call", 74, "Neutral", "Star Health", "Thursday Morning", "Doctor Availability", "Appointment Requested", "Neurology consultation with MRI on the same day"],
  ["Vishal Menon", "+91 97318 44562", "Existing Patient", "orthopaedics", "arjun-menon", "Existing Appointment", "Physiotherapy", "Arjun Rao", "Inbound Call", 42, "Negative", "HDFC Ergo", "Saturday Morning", "Appointment Timing", "Unresolved", "Physiotherapy schedule changed without notification"],
  ["Lakshmi Narayan", "+91 98801 66234", "New Patient", "general-medicine", null, "Pricing / Estimate", "Master Health Check", "Vivek Iyer", "WhatsApp", 62, "Neutral", "Self-Pay", "Weekend", "Pricing / Estimate", "Information Provided", "Master health check package price and inclusions"],
  ["Arif Hussain", "+91 90350 78120", "International Patient", "cardiology", "ananya-rao", "Treatment / Procedure Information", "Angiography", "Neha Singh", "WhatsApp", 86, "Positive", "Self-Pay", "Any Weekday", "Location / Travel", "Appointment Requested", "Angiography estimate and travel assistance from Dubai"],
  ["Sneha Gopal", "+91 98452 30017", "New Patient", "dermatology", "kavita-reddy", "Pricing / Estimate", "Laser Procedure", "Vivek Iyer", "Inbound Call", 56, "Neutral", "Self-Pay", "Saturday Afternoon", "Pricing / Estimate", "Information Provided", "Laser procedure session count and package pricing"],
  ["Ganesh Pillai", "+91 99451 20983", "Existing Patient", "nephrology", "meera-krishnan", "Appointment Booking", "Dialysis Enquiry", "Mohammed Faizal", "Inbound Call", 79, "Negative", "CGHS", "Early Morning", "Appointment Timing", "Unresolved", "Recurring dialysis slot not confirmed for next week"],
  ["Anita Desai", "+91 98198 44710", "New Patient", "obgyn", "nisha-kapoor", "Appointment Booking", "Antenatal Consultation", "Sneha Reddy", "Inbound Call", 81, "Positive", "Niva Bupa", "Wednesday Morning", "Appointment Timing", "Appointment Confirmed", "First antenatal consultation booking"],
  ["Prakash Rao", "+91 97400 11256", "New Patient", "urology", "sanjay-iyer", "Pricing / Estimate", "Lithotripsy Counselling", "Rahul Nair", "Inbound Call", 73, "Neutral", "Star Health", "Monday Morning", "Pricing / Estimate", "Callback Promised", "Kidney stone procedure estimate and admission duration"],
  ["Rekha Joshi", "+91 98867 33420", "Existing Patient", "endocrinology", "kavita-reddy", "Reports / Results", "Thyroid Panel", "Priya Menon", "WhatsApp", 48, "Neutral", "Aditya Birla Health", "Any", "Information Incomplete", "Information Provided", "Thyroid panel report collection and follow-up interval"],
  ["Mohan Reddy", "+91 99020 87741", "New Patient", "general-surgery", "sanjay-iyer", "Treatment / Procedure Information", "Hernia Counselling", "Rahul Nair", "Inbound Call", 77, "Neutral", "ICICI Lombard", "Saturday Morning", "Insurance / Cashless", "Insurance Verification Pending", "Hernia surgery estimate and pre-authorisation timeline"],
  ["Kavya Ramesh", "+91 90084 55193", "New Patient", "paediatrics", "priya-nair", "Priority / Emergency Routing", "Paediatric Emergency Advice", "Aditi Sharma", "Inbound Call", 91, "Negative", "Star Health", "Immediate", "Waiting Time", "Routed to Department", "Child with high fever — routed per hospital priority protocol"],
  ["Imran Sheikh", "+91 98450 66327", "New Patient", "ent", "mohammed-farooq", "Appointment Booking", "Audiometry", "Rahul Nair", "Inbound Call", 64, "Positive", "HDFC Ergo", "Tuesday Morning", "Appointment Timing", "Appointment Confirmed", "ENT consultation with same-day audiometry"],
  ["Shalini Bhat", "+91 97417 20038", "Existing Patient", "cardiology", "ananya-rao", "Reports / Results", "Echocardiography", "Neha Singh", "WhatsApp", 52, "Neutral", "Corporate — Wipro", "Any", "Information Incomplete", "Information Provided", "Echo report availability and consultation follow-up"],
  ["Deepak Chandra", "+91 99640 18877", "New Patient", "pulmonology", "vikram-shah", "Treatment / Procedure Information", "Sleep Study", "Vivek Iyer", "Inbound Call", 66, "Neutral", "Self-Pay", "Weekend", "Information Incomplete", "Callback Promised", "Sleep study process, overnight stay and cost"],
  ["Nandini Kulkarni", "+91 98862 90014", "New Patient", "ophthalmology", "mohammed-farooq", "Pricing / Estimate", "Cataract Counselling", "Vivek Iyer", "Inbound Call", 69, "Neutral", "Star Health", "Monday Afternoon", "Pricing / Estimate", "Information Provided", "Cataract package options and lens choices for mother"],
  ["Sanjay Bose", "+91 90350 22461", "Existing Patient", "orthopaedics", "arjun-menon", "Doctor Availability", "MRI Knee", "Arjun Rao", "Inbound Call", 80, "Negative", "Niva Bupa", "Saturday Morning", "Doctor Availability", "Unresolved", "Third call about Saturday orthopaedic slot"],
  ["Pooja Agarwal", "+91 98451 77302", "New Patient", "general-medicine", null, "Appointment Booking", "General Consultation", "Priya Menon", "Inbound Call", 58, "Positive", "Self-Pay", "Morning", "Waiting Time", "Appointment Confirmed", "General physician consultation for recurring fatigue"],
  ["Vikram Choudhary", "+91 99000 45518", "Corporate Patient", "general-medicine", null, "Appointment Booking", "Corporate Health Check", "Aditi Sharma", "WhatsApp", 74, "Positive", "Corporate — Infosys", "Weekend", "Appointment Timing", "Appointment Requested", "Corporate health-check scheduling for 12 employees"],
  ["Aishwarya Nair", "+91 98803 12094", "New Patient", "dermatology", "kavita-reddy", "Appointment Booking", "Hair Loss Clinic", "Vivek Iyer", "WhatsApp", 61, "Positive", "Self-Pay", "Saturday Afternoon", "Appointment Timing", "Appointment Confirmed", "Hair loss consultation and treatment plan enquiry"],
  ["Ramesh Gupta", "+91 97390 66214", "Existing Patient", "oncology", "rahul-desai", "Insurance / Cashless", "Chemotherapy Day Care", "Mohammed Faizal", "Inbound Call", 85, "Negative", "Star Health", "Monday Morning", "Insurance / Cashless", "Unresolved", "Fourth contact about chemotherapy cashless approval"],
  ["Sujatha Varma", "+91 98452 88109", "New Patient", "neurology", "meera-krishnan", "Appointment Booking", "Headache Clinic", "Mohammed Faizal", "Inbound Call", 70, "Neutral", "HDFC Ergo", "Thursday Morning", "Doctor Availability", "Appointment Requested", "Headache clinic consultation booking"],
  ["Naveen Kumar", "+91 90192 30076", "New Patient", "gastroenterology", "vikram-shah", "Diagnostics", "Ultrasound Abdomen", "Priya Menon", "Inbound Call", 59, "Neutral", "Self-Pay", "Any Weekday", "Appointment Timing", "Appointment Confirmed", "Abdominal ultrasound scheduling and preparation"],
  ["Bhavna Shetty", "+91 98866 41220", "Existing Patient", "obgyn", "nisha-kapoor", "Existing Appointment", "Anomaly Scan", "Sneha Reddy", "Inbound Call", 67, "Negative", "Niva Bupa", "Friday Morning", "Appointment Timing", "Follow-Up Required", "Anomaly scan rescheduled by hospital, new slot needed"],
  ["Farhan Ali", "+91 99453 70081", "International Patient", "orthopaedics", "arjun-menon", "Treatment / Procedure Information", "Knee Replacement Counselling", "Rahul Nair", "WhatsApp", 89, "Positive", "Self-Pay", "Any Weekday", "Location / Travel", "Appointment Requested", "Knee replacement estimate and international patient assistance"],
  ["Geetha Krishnan", "+91 98450 39917", "New Patient", "endocrinology", "kavita-reddy", "Treatment / Procedure Information", "Diabetes Programme", "Priya Menon", "Inbound Call", 72, "Positive", "Aditya Birla Health", "Tuesday Morning", "Pricing / Estimate", "Appointment Requested", "Diabetes programme inclusions and follow-up frequency"],
  ["Ajay Malhotra", "+91 97418 55603", "New Patient", "cardiology", "ananya-rao", "Diagnostics", "Cardiac Health Check", "Neha Singh", "Inbound Call", 78, "Positive", "Corporate — Wipro", "Saturday Morning", "Doctor Availability", "Appointment Requested", "Cardiac health check package with consultation"],
  ["Sarita Desai", "+91 99001 92238", "Existing Patient", "paediatrics", "priya-nair", "Doctor Availability", "Paediatric Consultation", "Aditi Sharma", "Inbound Call", 63, "Neutral", "Star Health", "Evening", "Doctor Availability", "Callback Promised", "Evening paediatric slot for follow-up visit"],
  ["Harish Bhandari", "+91 98862 10475", "New Patient", "urology", "sanjay-iyer", "Appointment Booking", "Prostate Screening", "Rahul Nair", "Inbound Call", 65, "Neutral", "CGHS", "Friday Morning", "Insurance / Cashless", "Insurance Verification Pending", "Prostate screening package and CGHS coverage"],
  ["Nithya Raghavan", "+91 90084 21160", "New Patient", "ent", "mohammed-farooq", "Treatment / Procedure Information", "Tonsillectomy Counselling", "Rahul Nair", "WhatsApp", 71, "Neutral", "HDFC Ergo", "Saturday Morning", "Pricing / Estimate", "Callback Promised", "Child tonsillectomy day-care process and cost"],
  ["Manoj Tiwari", "+91 98456 30928", "New Patient", "pulmonology", "vikram-shah", "Diagnostics", "Pulmonary Function Test", "Vivek Iyer", "Inbound Call", 54, "Neutral", "Self-Pay", "Wednesday Morning", "Information Incomplete", "Information Provided", "PFT preparation requirements and report timing"],
  ["Radha Menon", "+91 99640 77341", "Existing Patient", "general-medicine", null, "Reports / Results", "Master Health Check", "Priya Menon", "WhatsApp", 44, "Neutral", "Corporate — Infosys", "Any", "Information Incomplete", "Information Provided", "Health check report delivery and doctor review"],
  ["Zubair Ahmed", "+91 98450 88264", "New Patient", "oncology", "rahul-desai", "Treatment / Procedure Information", "Second Opinion", "Mohammed Faizal", "WhatsApp", 83, "Neutral", "ICICI Lombard", "Wednesday Morning", "Information Incomplete", "Appointment Requested", "Second opinion process and report upload guidance"],
  ["Vandana Rao", "+91 97402 66019", "New Patient", "obgyn", "nisha-kapoor", "Treatment / Procedure Information", "Fertility Counselling", "Sneha Reddy", "Inbound Call", 75, "Positive", "Niva Bupa", "Friday Morning", "Pricing / Estimate", "Appointment Requested", "Fertility counselling first consultation and workup cost"],
  ["Srinivas Murthy", "+91 98801 30447", "Existing Patient", "nephrology", "meera-krishnan", "Insurance / Cashless", "Dialysis Enquiry", "Mohammed Faizal", "Outbound Call", 68, "Neutral", "CGHS", "Early Morning", "Insurance / Cashless", "Insurance Verification Pending", "Outbound update on dialysis package CGHS approval"],
  ["Priyanka Jain", "+91 99453 12278", "New Patient", "dermatology", "kavita-reddy", "Appointment Booking", "Acne Programme", "Vivek Iyer", "Inbound Call", 57, "Positive", "Self-Pay", "Thursday Afternoon", "Appointment Timing", "Appointment Confirmed", "Acne programme consultation booking"],
  ["Ashok Pandey", "+91 98866 90332", "New Patient", "general-surgery", "sanjay-iyer", "Pricing / Estimate", "Laparoscopy Estimate", "Rahul Nair", "Inbound Call", 76, "Neutral", "Star Health", "Tuesday Morning", "Pricing / Estimate", "Callback Promised", "Laparoscopic procedure estimate and stay duration"],
  ["Leela Sundaram", "+91 90350 44190", "Existing Patient", "ophthalmology", "mohammed-farooq", "Existing Appointment", "Retina Clinic", "Vivek Iyer", "Inbound Call", 49, "Negative", "Star Health", "Monday Afternoon", "Waiting Time", "Follow-Up Required", "Long waiting time at previous retina clinic visit"],
  ["Ravi Shankar", "+91 98452 11803", "New Patient", "cardiology", "ananya-rao", "Appointment Booking", "ECG", "Neha Singh", "Inbound Call", 80, "Positive", "HDFC Ergo", "Monday Morning", "Doctor Availability", "Appointment Confirmed", "Cardiology consultation with ECG for chest tightness review"],
  ["Tanvi Kapoor", "+91 99020 37715", "New Patient", "paediatrics", "priya-nair", "Appointment Booking", "Newborn Check", "Aditi Sharma", "WhatsApp", 79, "Positive", "Niva Bupa", "Evening", "Appointment Timing", "Appointment Confirmed", "Newborn check-up scheduling and vaccination plan"],
  ["Balaji Krishnan", "+91 97318 60024", "Existing Patient", "orthopaedics", "arjun-menon", "Insurance / Cashless", "Knee Replacement Counselling", "Arjun Rao", "Inbound Call", 87, "Negative", "ICICI Lombard", "Saturday Morning", "Insurance / Cashless", "Insurance Verification Pending", "Knee replacement pre-authorisation status, second contact"],
  ["Meera Pillai", "+91 98450 55291", "New Patient", "gastroenterology", "vikram-shah", "Appointment Booking", "Gastro Consultation", "Priya Menon", "Inbound Call", 66, "Positive", "Aditya Birla Health", "Thursday Morning", "Appointment Timing", "Appointment Confirmed", "Gastroenterology consultation for recurring acidity"],
  ["Dinesh Varma", "+91 99001 70862", "New Patient", "neurology", "meera-krishnan", "Diagnostics", "EEG", "Mohammed Faizal", "Inbound Call", 61, "Neutral", "Self-Pay", "Monday Morning", "Appointment Timing", "Callback Promised", "EEG scheduling and pre-test instructions"],
  ["Shweta Nambiar", "+91 98863 24408", "Corporate Patient", "general-medicine", null, "Appointment Booking", "Corporate Health Check", "Aditi Sharma", "Outbound Call", 70, "Positive", "Corporate — Wipro", "Weekend", "Appointment Timing", "Appointment Confirmed", "Outbound corporate health-check slot confirmation"],
  ["Yusuf Khan", "+91 90192 88530", "International Patient", "oncology", "rahul-desai", "Insurance / Cashless", "PET-CT", "Mohammed Faizal", "WhatsApp", 84, "Neutral", "Self-Pay", "Any Weekday", "Pricing / Estimate", "Appointment Requested", "PET-CT and oncology consultation package for overseas patient"],
  ["Anjali Deshpande", "+91 98456 44127", "Existing Patient", "endocrinology", "kavita-reddy", "Existing Appointment", "Endocrine Consultation", "Priya Menon", "Inbound Call", 53, "Neutral", "Star Health", "Tuesday Morning", "Information Incomplete", "Follow-Up Required", "Reschedule endocrinology follow-up appointment"],
  ["Kiran Patil", "+91 97400 92285", "New Patient", "ent", "mohammed-farooq", "Doctor Availability", "Vertigo Clinic", "Rahul Nair", "Inbound Call", 62, "Neutral", "HDFC Ergo", "Saturday Morning", "Doctor Availability", "Callback Promised", "Vertigo clinic consultation availability"],
  ["Padma Iyengar", "+91 98801 21763", "Existing Patient", "urology", "sanjay-iyer", "Reports / Results", "Ultrasound KUB", "Rahul Nair", "WhatsApp", 46, "Neutral", "CGHS", "Any", "Information Incomplete", "Information Provided", "Ultrasound report collection and consultant review"],
  ["Nikhil Saxena", "+91 99640 30154", "New Patient", "pulmonology", "vikram-shah", "Appointment Booking", "Pulmonology Consultation", "Vivek Iyer", "Inbound Call", 64, "Positive", "Niva Bupa", "Saturday Morning", "Doctor Availability", "Appointment Requested", "Pulmonology consultation for persistent cough review"],
  ["Rohini Chatterjee", "+91 98452 66019", "New Patient", "obgyn", "nisha-kapoor", "Insurance / Cashless", "Delivery Package", "Sneha Reddy", "Inbound Call", 82, "Neutral", "ICICI Lombard", "Wednesday Morning", "Insurance / Cashless", "Insurance Verification Pending", "Delivery package insurance coverage and room upgrade cost"],
  ["Girish Hegde", "+91 90084 77236", "New Patient", "general-surgery", "sanjay-iyer", "Appointment Booking", "Surgical Consultation", "Rahul Nair", "Inbound Call", 69, "Neutral", "Star Health", "Saturday Morning", "Doctor Availability", "Appointment Requested", "General surgery consultation booking"],
  ["Swathi Rajan", "+91 99453 55840", "Existing Patient", "cardiology", "ananya-rao", "Existing Appointment", "Cardiology Consultation", "Neha Singh", "Outbound Call", 74, "Positive", "HDFC Ergo", "After 5 PM", "Appointment Timing", "Appointment Confirmed", "Outbound confirmation for rescheduled cardiology review"],
  ["Abdul Rahman", "+91 98866 12207", "International Patient", "neurology", "meera-krishnan", "Treatment / Procedure Information", "Neurology Consultation", "Mohammed Faizal", "WhatsApp", 81, "Neutral", "Self-Pay", "Any Weekday", "Location / Travel", "Appointment Requested", "Neurology opinion and travel/visa letter assistance"],
  ["Kalyani Sharma", "+91 97417 88093", "New Patient", "paediatrics", "priya-nair", "Pricing / Estimate", "Vaccination", "Aditi Sharma", "Inbound Call", 55, "Neutral", "Self-Pay", "Evening", "Pricing / Estimate", "Information Provided", "Vaccination schedule pricing for 6-month-old"],
  ["Mahesh Gowda", "+91 98450 74412", "Existing Patient", "orthopaedics", "arjun-menon", "Reports / Results", "MRI Knee", "Arjun Rao", "Inbound Call", 58, "Negative", "Niva Bupa", "Saturday Morning", "Information Incomplete", "Unresolved", "MRI report not received, second contact"],
];

const dates = ["12 Aug", "12 Aug", "11 Aug", "11 Aug", "10 Aug", "10 Aug", "9 Aug", "9 Aug", "8 Aug"];
const times = ["09:14", "10:21", "11:05", "11:48", "12:32", "14:07", "15:26", "16:41", "17:18", "18:02"];

const intentReasonFor = (e: { intent: number; specialty: string; doctor: string; preferredTime: string }) =>
  e.intent >= 75
    ? `Patient named a specific consultant (${e.doctor}), stated a preferred window (${e.preferredTime}) and asked how to complete the booking.`
    : e.intent >= 55
      ? `Patient explored ${e.specialty} options and pricing but did not commit to a slot in this conversation.`
      : "Patient sought information only; no scheduling language or slot preference was expressed.";

const stageFor = (outcome: string, barrier: string): AccessStage => {
  if (outcome === "Appointment Confirmed") return "Appointment Confirmed";
  if (outcome === "Insurance Verification Pending") return "Insurance Verification Required";
  if (outcome === "Appointment Requested") return barrier === "Insurance / Cashless" ? "Insurance Verification Required" : "Appointment Pending";
  if (outcome === "Callback Promised" || outcome === "Follow-Up Required") return "Appointment Intent Detected";
  if (outcome === "Routed to Department") return "Specialty Identified";
  if (outcome === "Unresolved") return "Doctor Requested";
  return "Specialty Identified";
};

const statusFor = (outcome: string): string => {
  switch (outcome) {
    case "Appointment Confirmed":
      return "Appointment Confirmed";
    case "Appointment Requested":
      return "Appointment Pending";
    case "Insurance Verification Pending":
      return "Insurance Pending";
    case "Callback Promised":
    case "Follow-Up Required":
      return "Follow-Up Required";
    case "Unresolved":
      return "Unresolved";
    case "Routed to Department":
      return "Priority";
    default:
      return "Resolved";
  }
};

const estimateFor = (service: string, i: number) => {
  const base: Record<string, number> = {
    "Knee Replacement Counselling": 285000,
    "Delivery Package": 145000,
    Angiography: 62000,
    "PET-CT": 28500,
    "Chemotherapy Day Care": 48000,
    "Laparoscopy Estimate": 96000,
    "Lithotripsy Counselling": 78000,
    "Hernia Counselling": 88000,
    "Cataract Counselling": 54000,
    "Tonsillectomy Counselling": 62000,
    Endoscopy: 9500,
    Colonoscopy: 14500,
    "MRI Brain": 8500,
    "MRI Knee": 7800,
    "Sleep Study": 12500,
    "Master Health Check": 7200,
    "Corporate Health Check": 5400,
    "Cardiac Health Check": 9800,
    "Laser Procedure": 15500,
    "Diabetes Programme": 18500,
  };
  const v = base[service];
  if (v) return `₹${v.toLocaleString("en-IN")}`;
  return `₹${(700 + (i % 5) * 150).toLocaleString("en-IN")} consultation`;
};

const coachingFor = (s: Seed, agent: string, doctorName: string) => {
  const barrier = s[13];
  if (barrier === "Insurance / Cashless")
    return `${agent} identified the specialty and the requested consultant quickly and confirmed that ${s[11]} is empanelled. However, the cashless verification process was not explained end-to-end — no document list and no callback time were committed, which is the pattern most strongly associated with an additional patient contact.`;
  if (barrier === "Doctor Availability")
    return `${agent} correctly captured the patient's preferred window before checking the schedule. When ${doctorName}'s slot was unavailable, no waitlist or alternative consultant in the same specialty was offered, so the conversation ended without an access path.`;
  if (barrier === "Pricing / Estimate")
    return `${agent} answered the estimate question accurately but quoted a range without naming inclusions. Patients in this pattern typically call again to ask what the figure covers; sending the itemised estimate on WhatsApp during the call would close it in one contact.`;
  if (barrier === "Appointment Timing")
    return `${agent} handled the scheduling request efficiently and confirmed the patient's preference. The alternative slots offered were all inside the window the patient had already declined, which extended the conversation unnecessarily.`;
  if (barrier === "Waiting Time")
    return `${agent} acknowledged the patient's frustration well and did not become defensive. The expected wait was not restated with a concrete figure, so the patient left the conversation without a clear expectation.`;
  if (barrier === "Location / Travel")
    return `${agent} handled the international-patient enquiry courteously and shared the estimate. The international desk hand-off was mentioned but not completed within the conversation, leaving the patient to initiate the next step.`;
  return `${agent} understood the enquiry correctly and provided accurate information. Next-step clarity was weak — the conversation closed without stating who would contact the patient and by when.`;
};

const scoresFor = (agentName: string, barrier: string) => {
  const a = agents.find((x) => x.name === agentName)!;
  const adj = (k: QualityKey, penalty = 0) => Math.max(4, Math.min(10, Math.round(a.scores[k] / 10) - penalty));
  return [
    { label: "Enquiry Understanding", value: adj("understanding") },
    { label: "Empathy & Communication", value: adj("empathy") },
    { label: "Correct Routing", value: adj("routing") },
    { label: "Doctor / Service Knowledge", value: adj("doctorKnowledge") },
    { label: "Appointment Facilitation", value: adj("facilitation", barrier === "Doctor Availability" ? 2 : 0) },
    { label: "Insurance Process Guidance", value: adj("insurance", barrier === "Insurance / Cashless" ? 2 : 0) },
    { label: "Information Accuracy", value: adj("accuracy") },
    { label: "Next-Step Clarity", value: adj("nextStep", barrier === "Information Incomplete" ? 2 : 0) },
    { label: "Escalation Compliance", value: adj("escalation") },
  ];
};

const transcriptFor = (s: Seed, doctorName: string, spec: Specialty): Enquiry["transcript"] => {
  const patient = s[0].split(" ")[0]!;
  const agent = s[7];
  const service = s[6];
  const barrier = s[13];
  const t: Enquiry["transcript"] = [
    { speaker: "agent", name: agent, at: "00:00", text: `Good morning, thank you for calling Marhaba Multispecialty Hospital. This is ${agent.split(" ")[0]}. How may I help you?` },
    { speaker: "patient", name: s[0], at: "00:06", text: `Hello. I wanted to ask about ${service.toLowerCase()} — ${s[15].toLowerCase()}.` },
    { speaker: "agent", name: agent, at: "00:18", text: `Certainly. That would be our ${spec.name} department. Have you consulted with us before?` },
    { speaker: "patient", name: s[0], at: "00:26", text: s[2] === "New Patient" ? "No, this would be my first visit." : "Yes, I have a UHID with the hospital already." },
    { speaker: "agent", name: agent, at: "00:34", text: doctorName === "Any Available Doctor" ? "Understood. I can check the next available consultant in that department for you." : `Understood. Did you have a preferred consultant, or shall I check ${doctorName}'s schedule?` },
    { speaker: "patient", name: s[0], at: "00:44", text: doctorName === "Any Available Doctor" ? `Whoever is available. I would prefer ${s[12].toLowerCase()} if possible.` : `${doctorName}, if possible. I can come ${s[12].toLowerCase()}.` },
  ];

  if (barrier === "Insurance / Cashless") {
    t.push(
      { speaker: "patient", name: s[0], at: "01:02", text: `One more thing — I have ${s[11]}. Is cashless accepted here for this?` },
      { speaker: "agent", name: agent, at: "01:12", text: `Yes, ${s[11]} is empanelled with us. For cashless we will need to raise a pre-authorisation, so the eligibility has to be verified first.` },
      { speaker: "patient", name: s[0], at: "01:24", text: "How long does that usually take? I would like to confirm the appointment only after that is clear." },
      { speaker: "agent", name: agent, at: "01:33", text: "I will check with our insurance desk and get back to you. Your enquiry is noted." },
      { speaker: "patient", name: s[0], at: "01:41", text: "Please do call back. I am ready to book as soon as this is confirmed." },
    );
  } else if (barrier === "Doctor Availability") {
    t.push(
      { speaker: "agent", name: agent, at: "01:04", text: `Let me check. ${doctorName} does not have a slot in that window — the next opening is later in the week.` },
      { speaker: "patient", name: s[0], at: "01:14", text: `That is difficult for me. ${s[12]} is really the only time I can come.` },
      { speaker: "agent", name: agent, at: "01:22", text: "I understand. Let me note your preference and check whether an additional slot can be opened." },
      { speaker: "patient", name: s[0], at: "01:30", text: "Alright. Please let me know either way." },
    );
  } else if (barrier === "Pricing / Estimate") {
    t.push(
      { speaker: "patient", name: s[0], at: "01:00", text: "Could you also tell me what this would cost approximately?" },
      { speaker: "agent", name: agent, at: "01:08", text: `The estimate for ${service.toLowerCase()} is around ${estimateFor(service, 3)}, though the final figure depends on what the consultant advises.` },
      { speaker: "patient", name: s[0], at: "01:20", text: "And what does that include? I would like to know before deciding." },
      { speaker: "agent", name: agent, at: "01:28", text: "I can have the detailed breakup shared with you." },
    );
  } else if (barrier === "Waiting Time") {
    t.push(
      { speaker: "patient", name: s[0], at: "01:00", text: "Last time we waited nearly two hours past the appointment time. I want to avoid that." },
      { speaker: "agent", name: agent, at: "01:10", text: "I am sorry about that experience. I will note it and request the department to plan the slot accordingly." },
      { speaker: "patient", name: s[0], at: "01:20", text: "Please. Otherwise the appointment time means nothing." },
    );
  } else if (barrier === "Location / Travel") {
    t.push(
      { speaker: "patient", name: s[0], at: "01:00", text: "I am travelling from outside India, so I need the estimate and a letter for my visa application." },
      { speaker: "agent", name: agent, at: "01:10", text: "Understood. Our international patient desk handles the estimate letter and airport assistance. I will share your details with them." },
      { speaker: "patient", name: s[0], at: "01:22", text: "Thank you. Please ask them to message me on WhatsApp." },
    );
  } else {
    t.push(
      { speaker: "patient", name: s[0], at: "01:00", text: "Also, is there anything I need to prepare or bring along?" },
      { speaker: "agent", name: agent, at: "01:08", text: "I will confirm the exact requirement and share it with you." },
      { speaker: "patient", name: s[0], at: "01:16", text: "Please send it in writing if possible." },
    );
  }

  t.push({ speaker: "agent", name: agent, at: "02:04", text: "Thank you for calling Marhaba Multispecialty Hospital. Your enquiry reference has been recorded." });
  return t;
};

const buildEnquiries = (): Enquiry[] =>
  seeds.map((s, i) => {
    const spec = specialties.find((x) => x.id === s[3])!;
    const doc = s[4] ? doctors.find((d) => d.id === s[4])! : null;
    const doctorName = doc ? doc.name : "Any Available Doctor";
    const intent = s[9];
    const intentLevel: Enquiry["intentLevel"] = intent >= 75 ? "High" : intent >= 55 ? "Medium" : "Low";
    const outcome = s[14];
    const barrier = s[13];
    const priority = s[5] === "Priority / Emergency Routing" || (outcome === "Unresolved" && intent >= 80);
    const preferred = s[12];
    const first = s[0].split(" ")[0]!;

    const summary =
      `${first} is ${s[2] === "New Patient" ? "a new patient" : s[2] === "International Patient" ? "an international patient" : s[2] === "Corporate Patient" ? "a corporate-empanelled patient" : "an existing patient"} contacting the hospital about ${s[15].toLowerCase()}. ` +
      `${doc ? `${doctorName} was requested by name and ${preferred.toLowerCase()} was stated as the preferred window. ` : `No specific consultant was requested; ${preferred.toLowerCase()} was stated as the preferred window. `}` +
      `${barrier === "Insurance / Cashless" ? `The enquiry agent confirmed that ${s[11]} is empanelled but explained that cashless eligibility requires verification before the appointment can be finalised. ` : barrier === "Doctor Availability" ? "The requested slot was unavailable and no alternative inside the patient's window could be offered during the conversation. " : barrier === "Pricing / Estimate" ? `An estimate of approximately ${estimateFor(s[6], i)} was shared without an itemised breakup. ` : barrier === "Waiting Time" ? "The patient raised a previous waiting-time experience, which the agent acknowledged and logged. " : barrier === "Location / Travel" ? "Travel, estimate documentation and international desk assistance were discussed. " : "Preparation and next-step information was requested but not fully provided in the conversation. "}` +
      `Outcome: ${outcome.toLowerCase()}. ${intentLevel === "High" ? "Appointment intent is high and the patient is ready to proceed once the outstanding item is closed." : intentLevel === "Medium" ? "Appointment intent is moderate; the patient is still comparing options." : "This was an information-seeking contact with no scheduling commitment."}`;

    const nextAction =
      barrier === "Insurance / Cashless"
        ? `Verify ${s[11]} cashless eligibility with the insurance desk and call ${first} back with the document list and a confirmed ${spec.name} slot.`
        : barrier === "Doctor Availability"
          ? `Check whether an additional ${preferred.toLowerCase()} slot can be opened with ${doctorName}, or offer the next available ${spec.name} consultant, and call ${first} back today.`
          : barrier === "Pricing / Estimate"
            ? `Send ${first} the itemised ${s[6]} estimate on WhatsApp and call back to confirm whether they wish to proceed with a ${spec.name} appointment.`
            : barrier === "Waiting Time"
              ? `Flag the previous waiting-time complaint to the ${spec.name} department and confirm a specific appointment time with ${first} in writing.`
              : barrier === "Location / Travel"
                ? `Route ${first} to the international patient desk with the estimate letter and confirm the hand-off was completed within 24 hours.`
                : `Send ${first} the written preparation instructions for ${s[6]} and confirm the ${spec.name} appointment slot.`;

    return {
      id: `ENQ-${String(9120 + i)}`,
      patient: s[0],
      phone: s[1],
      patientType: s[2],
      enquiry: s[15],
      category: s[5],
      specialty: spec.name,
      doctor: doctorName,
      service: s[6],
      agent: s[7],
      channel: s[8],
      date: dates[i % dates.length]!,
      time: times[i % times.length]!,
      duration: `${3 + (i % 6)}:${String(10 + ((i * 7) % 48)).padStart(2, "0")}`,
      intent,
      intentLevel,
      intentReason: intentReasonFor({ intent, specialty: spec.name, doctor: doctorName, preferredTime: preferred }),
      sentiment: s[10],
      insurance: s[11],
      preferredTime: preferred,
      barrier,
      outcome,
      status: statusFor(outcome),
      priority,
      stage: stageFor(outcome, barrier),
      estimate: estimateFor(s[6], i),
      summary,
      nextAction,
      coaching: coachingFor(s, s[7], doctorName),
      scores: scoresFor(s[7], barrier),
      transcript: transcriptFor(s, doctorName, spec),
    };
  });

export const enquiries = buildEnquiries();
export const heroEnquiry = enquiries[0]!;
export const priorityEnquiries = enquiries.filter((e) => e.priority);

export const serviceDemand = (() => {
  const m = new Map<string, number>();
  specialties.forEach((s) => s.services.forEach((v) => m.set(v.label, (m.get(v.label) ?? 0) + v.value)));
  return [...m.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
})();

/* ------------------------------------------------------------------ */
/* Patients                                                            */
/* ------------------------------------------------------------------ */

export type Patient = {
  id: string;
  name: string;
  phone: string;
  patientType: Enquiry["patientType"];
  interactions: number;
  primaryEnquiry: string;
  specialty: string;
  doctor: string;
  service: string;
  intent: number;
  intentLevel: "High" | "Medium" | "Low";
  accessStatus: string;
  nextAction: string;
  agent: string;
  insurance: string;
  preferredTime: string;
  firstContact: string;
  lastContact: string;
  questions: string[];
  barriers: string[];
  summary: string;
  journey: { at: string; type: "Inbound Call" | "Outbound Call" | "WhatsApp" | "Appointment"; text: string }[];
  actions: { text: string; due: string; status: "Pending" | "In Progress" | "Done" }[];
  notes: { author: string; at: string; text: string; auto?: boolean }[];
  enquiryIds: string[];
};

const questionBank: Record<string, string[]> = {
  "Insurance / Cashless": ["Is my insurer empanelled?", "How long does pre-authorisation take?", "What documents are required?"],
  "Doctor Availability": ["When is the consultant next free?", "Is a Saturday slot possible?", "Can I be added to a waitlist?"],
  "Pricing / Estimate": ["What is the total estimate?", "What does the package include?", "Is there a payment plan?"],
  "Appointment Timing": ["Is an evening slot available?", "Can I come on a weekend?", "How early should I arrive?"],
  "Waiting Time": ["How long is the typical wait?", "Will the doctor be on time?", "Can I get the first slot?"],
  "Information Incomplete": ["What preparation is needed?", "When will the report be ready?", "Who will call me back?"],
  "Location / Travel": ["Which block and floor?", "Is airport assistance available?", "Can you send a visa letter?"],
};

const buildPatients = (): Patient[] => {
  const byName = new Map<string, Enquiry[]>();
  enquiries.forEach((e) => byName.set(e.patient, [...(byName.get(e.patient) ?? []), e]));

  return [...byName.entries()].map(([name, list], i) => {
    const lead = list.slice().sort((a, b) => b.intent - a.intent)[0]!;
    const first = name.split(" ")[0]!;
    const repeat = lead.status === "Unresolved" || lead.status === "Follow-Up Required" || lead.status === "Insurance Pending";
    const interactions = repeat ? 2 + (i % 3) : 1 + (i % 2);
    const questions = questionBank[lead.barrier] ?? questionBank["Information Incomplete"]!;

    const journey: Patient["journey"] = [
      { at: `${lead.date} · ${lead.time}`, type: lead.channel, text: `${first} contacted the hospital about ${lead.enquiry.toLowerCase()}.` },
    ];
    if (interactions > 1) {
      journey.push({
        at: `${lead.date} · ${times[(i + 3) % times.length]}`,
        type: "WhatsApp",
        text: lead.doctor === "Any Available Doctor" ? `Hospital shared ${lead.specialty} consultant availability on WhatsApp.` : `Hospital shared ${lead.doctor}'s availability and consultation fee on WhatsApp.`,
      });
    }
    if (interactions > 2) {
      journey.push({
        at: `${dates[(i + 2) % dates.length]} · ${times[(i + 5) % times.length]}`,
        type: "Inbound Call",
        text: lead.barrier === "Insurance / Cashless" ? `${first} called again to ask whether ${lead.insurance} cashless approval had come through.` : `${first} called again as no callback had been received.`,
      });
    }
    if (lead.status === "Appointment Confirmed") {
      journey.push({ at: `${dates[(i + 1) % dates.length]} · ${times[(i + 7) % times.length]}`, type: "Outbound Call", text: `Enquiry team confirmed the ${lead.specialty} appointment and shared arrival instructions.` });
      journey.push({ at: `${dates[(i + 1) % dates.length]} · ${times[(i + 8) % times.length]}`, type: "Appointment", text: `Appointment confirmed with ${lead.doctor} — ${lead.preferredTime}.` });
    } else {
      journey.push({
        at: `${dates[(i + 1) % dates.length]} · ${times[(i + 6) % times.length]}`,
        type: "Outbound Call",
        text: lead.status === "Insurance Pending" ? "Enquiry team attempted a callback with an insurance status update; call not answered." : "Enquiry team callback logged as pending.",
      });
    }

    const summary =
      `${first} has contacted the hospital ${interactions === 1 ? "once" : interactions === 2 ? "twice" : `${interactions} times`} regarding ${lead.enquiry.toLowerCase()}. ` +
      `${lead.doctor === "Any Available Doctor" ? `No specific consultant has been requested so far.` : `${lead.doctor} has been requested by name.`} ` +
      `Their main concerns are ${questions.slice(0, 2).map((q) => q.replace(/\?$/, "").toLowerCase()).join(" and ")}. ` +
      `They prefer ${lead.preferredTime.toLowerCase()} and their insurance is recorded as ${lead.insurance}. ` +
      `${lead.intentLevel === "High" ? `Intent to book is strong once ${lead.barrier.toLowerCase()} is resolved.` : lead.intentLevel === "Medium" ? "Intent is moderate; the patient is still weighing options." : "The contact has been informational so far."}`;

    return {
      id: `PAT-${String(4210 + i)}`,
      name,
      phone: lead.phone,
      patientType: lead.patientType,
      interactions,
      primaryEnquiry: lead.enquiry,
      specialty: lead.specialty,
      doctor: lead.doctor,
      service: lead.service,
      intent: lead.intent,
      intentLevel: lead.intentLevel,
      accessStatus: lead.status,
      nextAction: lead.nextAction,
      agent: lead.agent,
      insurance: lead.insurance,
      preferredTime: lead.preferredTime,
      firstContact: lead.date,
      lastContact: dates[(i + 1) % dates.length]!,
      questions,
      barriers: [lead.barrier, ...(interactions > 2 ? ["No Callback"] : [])],
      summary,
      journey,
      actions: [
        { text: lead.nextAction, due: "Today", status: lead.status === "Appointment Confirmed" ? "Done" : interactions > 2 ? "Pending" : "In Progress" },
        { text: `Send ${lead.service} information pack on WhatsApp`, due: "Today", status: interactions > 1 ? "Done" : "Pending" },
        { text: `Confirm ${lead.preferredTime.toLowerCase()} slot availability with ${lead.specialty}`, due: "Tomorrow", status: "Pending" },
      ],
      notes: [
        { author: "Marhaba AI", at: `${lead.date} · ${lead.time}`, text: `Access stage detected: ${lead.stage}. Primary barrier: ${lead.barrier}.`, auto: true },
        { author: lead.agent, at: `${lead.date} · ${times[(i + 4) % times.length]}`, text: `Patient prefers ${lead.preferredTime.toLowerCase()}. Insurance noted as ${lead.insurance}.` },
      ],
      enquiryIds: list.map((e) => e.id),
    };
  });
};

export const patients = buildPatients();
export const heroPatient = patients.find((p) => p.interactions >= 3) ?? patients[0]!;

/* ------------------------------------------------------------------ */
/* Action centre                                                       */
/* ------------------------------------------------------------------ */

export type ActionSection =
  | "Priority"
  | "Follow-Up Due"
  | "Insurance Pending"
  | "Appointment Pending"
  | "Unresolved"
  | "Completed";

export type Action = {
  id: string;
  section: ActionSection;
  text: string;
  patient: string;
  phone: string;
  specialty: string;
  doctor: string;
  owner: string;
  due: string;
  age: string;
  intent: number;
  source: string;
};

const sectionFor = (e: Enquiry): ActionSection => {
  if (e.priority) return "Priority";
  if (e.status === "Insurance Pending") return "Insurance Pending";
  if (e.status === "Unresolved") return "Unresolved";
  if (e.status === "Appointment Pending") return "Appointment Pending";
  if (e.status === "Follow-Up Required") return "Follow-Up Due";
  return "Completed";
};

const actionText = (e: Enquiry): string => {
  switch (e.barrier) {
    case "Insurance / Cashless":
      return `Verify ${e.insurance} cashless eligibility for ${e.service}`;
    case "Doctor Availability":
      return e.doctor === "Any Available Doctor"
        ? `Offer next available ${e.specialty} slot`
        : `Open or waitlist a ${e.preferredTime.toLowerCase()} slot with ${e.doctor}`;
    case "Pricing / Estimate":
      return `Share itemised ${e.service} estimate (${e.estimate})`;
    case "Appointment Timing":
      return `Confirm ${e.preferredTime.toLowerCase()} appointment for ${e.service}`;
    case "Waiting Time":
      return `Flag waiting-time complaint to ${e.specialty} and confirm a firm slot`;
    case "Location / Travel":
      return `Route international patient to the international desk`;
    default:
      return `Send written ${e.service} instructions and confirm next step`;
  }
};

export const actions: Action[] = enquiries.map((e, i) => ({
  id: `ACT-${String(7310 + i)}`,
  section: sectionFor(e),
  text: e.priority ? `Escalate priority enquiry to supervisor — ${e.specialty}` : actionText(e),
  patient: e.patient,
  phone: e.phone,
  specialty: e.specialty,
  doctor: e.doctor,
  owner: e.agent,
  due: i % 5 === 0 ? "Overdue" : i % 3 === 0 ? "Today" : "Tomorrow",
  age: `${1 + (i % 4)}d`,
  intent: e.intent,
  source: e.id,
}));

export const actionSections: ActionSection[] = [
  "Priority",
  "Follow-Up Due",
  "Insurance Pending",
  "Appointment Pending",
  "Unresolved",
  "Completed",
];

export const actionCounts = actionSections.map((s) => ({
  section: s,
  count: actions.filter((a) => a.section === s).length,
}));

/* ------------------------------------------------------------------ */
/* Filter option helpers                                               */
/* ------------------------------------------------------------------ */

export const enquiryFilterOptions = {
  channel: ["All Channels", ...channels],
  specialty: ["All Specialties", ...specialtyNames],
  doctor: ["All Doctors", ...doctorNames, "Any Available Doctor"],
  service: ["All Services", ...[...new Set(enquiries.map((e) => e.service))].sort()],
  patientType: ["All Patient Types", ...patientTypes],
  intent: ["All Intent Levels", "High", "Medium", "Low"],
  outcome: ["All Outcomes", ...outcomes],
  sentiment: ["All Sentiment", "Positive", "Neutral", "Negative"],
  agent: ["All Agents", ...agentNames],
  priority: ["All Enquiries", "Priority Only"],
  date: ["All Dates", ...[...new Set(enquiries.map((e) => e.date))]],
  category: ["All Reasons", ...reasonCategories],
};
