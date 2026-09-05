/**
 * CallVibe — Hayya Applicant Support
 * ALL DATA IN THIS FILE IS SIMULATED / ILLUSTRATIVE DEMO DATA.
 * No real applicant, agent or operational data is represented.
 */

export const PRODUCT = "CallVibe";
export const CONFIG_LABEL = "Hayya Applicant Support";
export const DESCRIPTOR = "Conversation Intelligence for Applicant Support";

export type Tone = "primary" | "success" | "warning" | "danger" | "info" | "classify" | "neutral";

/* ---------------------------------- KPIs --------------------------------- */

export const commandKpis = [
  { label: "Conversations", value: "18,642", delta: "+6.4%", up: true, good: true, sub: "vs previous period" },
  { label: "First Contact Resolution", value: "74%", delta: "-3.1pp", up: false, good: false, sub: "vs previous period" },
  { label: "Repeat Contact Rate", value: "21%", delta: "+2.7pp", up: true, good: false, sub: "vs previous period" },
  { label: "Average Handle Time", value: "7:42", delta: "+0:38", up: true, good: false, sub: "vs previous period" },
  { label: "Escalation Rate", value: "8.6%", delta: "+1.2pp", up: true, good: false, sub: "vs previous period" },
  { label: "Average QA Score", value: "87", delta: "+2 pts", up: true, good: true, sub: "vs previous period" },
];

/* ------------------------------- Alerts ---------------------------------- */

export type Alert = {
  id: string;
  severity: "critical" | "elevated";
  kind: string;
  title: string;
  body: string;
  cta: string;
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
};

export const alerts: Alert[] = [
  {
    id: "a1",
    severity: "critical",
    kind: "Repeat Contact Spike",
    title: "Application Status contacts +29%",
    body: "Repeat contacts related to application-status enquiries have increased significantly over the last 7 days.",
    cta: "Investigate",
    to: "/contact-drivers/$id",
    params: { id: "application-status" },
  },
  {
    id: "a2",
    severity: "elevated",
    kind: "Emerging Issue",
    title: "Document upload failures increasing",
    body: "Applicant mentions of rejected or failed document uploads have increased 18% week-on-week.",
    cta: "View Conversations",
    to: "/conversations",
    search: { driver: "Document Requirements" },
  },
  {
    id: "a3",
    severity: "critical",
    kind: "Resolution Gap",
    title: "28% repeat contact rate for Pending Application enquiries",
    body: "Applicants contacting about pending applications show materially higher recontact behaviour than the overall queue.",
    cta: "Analyse Root Causes",
    to: "/resolution",
  },
  {
    id: "a4",
    severity: "elevated",
    kind: "Quality Signal",
    title: "Inconsistent guidance detected",
    body: "46 conversations were flagged where applicants appear to have received potentially inconsistent guidance regarding supporting documents.",
    cta: "Review QA Cases",
    to: "/quality",
  },
];

/* ---------------------------- Contact drivers ---------------------------- */

export type SubDriver = { label: string; pct: number };
export type RootCause = { label: string; pct: number };

export type Driver = {
  id: string;
  name: string;
  share: number;
  conversations: number;
  fcr: number;
  repeat: number;
  aht: string;
  escalation: number;
  trend: string;
  trendUp: boolean;
  rootCauses: RootCause[];
  subDrivers: SubDriver[];
  insight: string;
  phrases?: string[];
  emerging?: string;
};

export const drivers: Driver[] = [
  {
    id: "application-status",
    name: "Application Status",
    share: 26,
    conversations: 4847,
    fcr: 61,
    repeat: 28,
    aht: "8:34",
    escalation: 11,
    trend: "+29% repeat contacts",
    trendUp: true,
    rootCauses: [
      { label: "Application pending longer than applicant expected", pct: 31 },
      { label: "Applicant unsure whether further action is required", pct: 23 },
      { label: "Status unchanged after document submission", pct: 18 },
      { label: "Applicant did not understand portal status", pct: 12 },
      { label: "Previous agent advised applicant to wait", pct: 9 },
      { label: "Other", pct: 7 },
    ],
    subDrivers: [
      { label: "Pending Application", pct: 44 },
      { label: "Status After Submission", pct: 21 },
      { label: "Portal Status Unclear", pct: 16 },
      { label: "Processing Time Expectation", pct: 12 },
      { label: "Other", pct: 7 },
    ],
    insight:
      "Application-status conversations represent the largest contact driver and have one of the highest repeat-contact rates. A significant proportion of recontacts are associated with applicants being uncertain whether they need to take additional action.",
    phrases: [
      "It still says pending, has something gone wrong?",
      "Do I need to do anything else or just wait?",
      "I submitted everything last week and nothing has changed.",
    ],
  },
  {
    id: "document-requirements",
    name: "Document Requirements",
    share: 18,
    conversations: 3356,
    fcr: 73,
    repeat: 19,
    aht: "7:12",
    escalation: 8,
    trend: "+18% upload-failure mentions",
    trendUp: true,
    rootCauses: [
      { label: "Applicant unclear which document is required", pct: 28 },
      { label: "Document rejected without understood reason", pct: 24 },
      { label: "Upload attempt failed in portal", pct: 19 },
      { label: "Photo does not meet stated requirements", pct: 15 },
      { label: "Format or file-size restriction", pct: 8 },
      { label: "Other", pct: 6 },
    ],
    subDrivers: [
      { label: "Passport copy", pct: 27 },
      { label: "Photo requirements", pct: 22 },
      { label: "Supporting document unclear", pct: 19 },
      { label: "Document rejected", pct: 14 },
      { label: "Unable to upload document", pct: 11 },
      { label: "Document format / size", pct: 7 },
    ],
    insight:
      "Document-related conversations resolve at a higher rate than application-status contacts, but upload failure language is increasing and is frequently associated with a follow-up contact within 72 hours.",
    emerging: "Document upload failure mentions increased 18% this week.",
    phrases: [
      "The document keeps getting rejected.",
      "I uploaded it yesterday but it still shows required.",
      "I don't know which document is missing.",
    ],
  },
  {
    id: "submission-issues",
    name: "Application Submission / Portal Issues",
    share: 14,
    conversations: 2610,
    fcr: 69,
    repeat: 23,
    aht: "8:02",
    escalation: 9,
    trend: "+7% conversations",
    trendUp: true,
    rootCauses: [
      { label: "Submission did not complete in portal", pct: 30 },
      { label: "Applicant unsure whether submission registered", pct: 25 },
      { label: "Form validation error not understood", pct: 18 },
      { label: "Session timeout during submission", pct: 14 },
      { label: "Browser / device issue", pct: 8 },
      { label: "Other", pct: 5 },
    ],
    subDrivers: [
      { label: "Submission not confirmed", pct: 31 },
      { label: "Form validation error", pct: 24 },
      { label: "Session timeout", pct: 19 },
      { label: "Page not loading", pct: 15 },
      { label: "Other", pct: 11 },
    ],
    insight:
      "A quarter of submission conversations involve applicants who cannot confirm whether their submission registered. Confirmation visibility appears to be a recurring upstream contributor.",
  },
  {
    id: "eligibility",
    name: "Eligibility / Visa Type",
    share: 11,
    conversations: 2051,
    fcr: 89,
    repeat: 7,
    aht: "6:05",
    escalation: 3,
    trend: "-2% conversations",
    trendUp: false,
    rootCauses: [
      { label: "Applicant unsure which application type applies", pct: 34 },
      { label: "Question about accompanying family members", pct: 22 },
      { label: "Question about validity period", pct: 19 },
      { label: "Confusion between application categories", pct: 15 },
      { label: "Other", pct: 10 },
    ],
    subDrivers: [
      { label: "Which application type", pct: 34 },
      { label: "Family / dependants", pct: 22 },
      { label: "Validity period", pct: 19 },
      { label: "Category confusion", pct: 15 },
      { label: "Other", pct: 10 },
    ],
    insight:
      "Eligibility conversations are largely informational and resolve on first contact. They are the healthiest driver in the queue and a useful benchmark for resolution quality.",
  },
  {
    id: "payment",
    name: "Payment / Fee Issues",
    share: 8,
    conversations: 1491,
    fcr: 77,
    repeat: 16,
    aht: "7:28",
    escalation: 7,
    trend: "+11% mentions",
    trendUp: true,
    rootCauses: [
      { label: "Payment confirmation not received", pct: 32 },
      { label: "Payment deducted but application not updated", pct: 26 },
      { label: "Card declined / gateway error", pct: 17 },
      { label: "Refund enquiry", pct: 14 },
      { label: "Other", pct: 11 },
    ],
    subDrivers: [
      { label: "Payment confirmation", pct: 32 },
      { label: "Deducted, not reflected", pct: 26 },
      { label: "Gateway error", pct: 17 },
      { label: "Refund enquiry", pct: 14 },
      { label: "Other", pct: 11 },
    ],
    insight:
      "Payment conversations show deteriorating sentiment even where the outcome is resolved, driven mostly by confirmation delay rather than transaction failure.",
  },
  {
    id: "accommodation",
    name: "Accommodation Requirements",
    share: 7,
    conversations: 1305,
    fcr: 82,
    repeat: 12,
    aht: "6:41",
    escalation: 4,
    trend: "+3% conversations",
    trendUp: true,
    rootCauses: [
      { label: "Unclear what accommodation proof is accepted", pct: 36 },
      { label: "Booking details do not match application", pct: 24 },
      { label: "Host / relative accommodation question", pct: 21 },
      { label: "Other", pct: 19 },
    ],
    subDrivers: [
      { label: "Accepted proof types", pct: 36 },
      { label: "Details mismatch", pct: 24 },
      { label: "Staying with relatives", pct: 21 },
      { label: "Other", pct: 19 },
    ],
    insight:
      "Accommodation questions are concentrated around what evidence is accepted, suggesting a content clarity opportunity rather than a process failure.",
  },
  {
    id: "rejection-resubmission",
    name: "Application Rejection / Resubmission",
    share: 6,
    conversations: 1119,
    fcr: 58,
    repeat: 31,
    aht: "9:56",
    escalation: 17,
    trend: "+9% conversations",
    trendUp: true,
    rootCauses: [
      { label: "Reason for rejection not understood", pct: 38 },
      { label: "Unsure how to resubmit", pct: 24 },
      { label: "Resubmission still pending", pct: 18 },
      { label: "Disagreement with outcome", pct: 12 },
      { label: "Other", pct: 8 },
    ],
    subDrivers: [
      { label: "Rejection reason unclear", pct: 38 },
      { label: "How to resubmit", pct: 24 },
      { label: "Resubmission pending", pct: 18 },
      { label: "Outcome dispute", pct: 12 },
      { label: "Other", pct: 8 },
    ],
    insight:
      "Rejection and resubmission conversations are the highest-effort journeys in the queue, with the lowest FCR and the highest escalation rate.",
  },
  {
    id: "passport-details",
    name: "Passport / Personal Details",
    share: 4,
    conversations: 746,
    fcr: 84,
    repeat: 10,
    aht: "5:52",
    escalation: 5,
    trend: "flat",
    trendUp: true,
    rootCauses: [
      { label: "Name spelling mismatch", pct: 34 },
      { label: "Passport expiry question", pct: 27 },
      { label: "Details correction request", pct: 24 },
      { label: "Other", pct: 15 },
    ],
    subDrivers: [
      { label: "Name mismatch", pct: 34 },
      { label: "Passport expiry", pct: 27 },
      { label: "Correction request", pct: 24 },
      { label: "Other", pct: 15 },
    ],
    insight:
      "Detail-correction conversations are short and largely resolved, but a small share progress to escalation where corrections cannot be made in-channel.",
  },
  {
    id: "login-otp",
    name: "Technical Login / OTP Issues",
    share: 3,
    conversations: 559,
    fcr: 81,
    repeat: 13,
    aht: "5:31",
    escalation: 5,
    trend: "+4% conversations",
    trendUp: true,
    rootCauses: [
      { label: "OTP not received", pct: 41 },
      { label: "Account locked", pct: 22 },
      { label: "Password reset failure", pct: 20 },
      { label: "Other", pct: 17 },
    ],
    subDrivers: [
      { label: "OTP not received", pct: 41 },
      { label: "Account locked", pct: 22 },
      { label: "Password reset", pct: 20 },
      { label: "Other", pct: 17 },
    ],
    insight:
      "Login issues resolve quickly but a persistent OTP-delivery cluster is generating short repeat contacts within the same day.",
  },
  {
    id: "other",
    name: "Other",
    share: 3,
    conversations: 558,
    fcr: 79,
    repeat: 14,
    aht: "6:20",
    escalation: 6,
    trend: "flat",
    trendUp: true,
    rootCauses: [
      { label: "General enquiry", pct: 46 },
      { label: "Misrouted contact", pct: 27 },
      { label: "Feedback / complaint", pct: 18 },
      { label: "Other", pct: 9 },
    ],
    subDrivers: [
      { label: "General enquiry", pct: 46 },
      { label: "Misrouted contact", pct: 27 },
      { label: "Feedback", pct: 18 },
      { label: "Other", pct: 9 },
    ],
    insight: "Residual category retained for completeness of the contact taxonomy.",
  },
];

export const driverById = (id: string) => drivers.find((d) => d.id === id);
export const driverByName = (name: string) => drivers.find((d) => d.name === name);

/* --------------------------- Resolution intelligence --------------------- */

export const resolutionRows = [
  { id: "application-status", driver: "Application Status", fcr: 61, repeat: 28, escalation: 11 },
  { id: "document-requirements", driver: "Documents", fcr: 73, repeat: 19, escalation: 8 },
  { id: "submission-issues", driver: "Submission Issues", fcr: 69, repeat: 23, escalation: 9 },
  { id: "eligibility", driver: "Eligibility", fcr: 89, repeat: 7, escalation: 3 },
  { id: "payment", driver: "Payment", fcr: 77, repeat: 16, escalation: 7 },
  { id: "login-otp", driver: "Portal / Login", fcr: 81, repeat: 13, escalation: 5 },
];

export const repeatRootCauses = [
  { label: "Previous issue not fully resolved", pct: 29 },
  { label: "Applicant unsure of next action", pct: 23 },
  { label: "Application status unchanged", pct: 19 },
  { label: "Additional documents requested", pct: 12 },
  { label: "Conflicting / unclear information", pct: 8 },
  { label: "Technical issue persists", pct: 6 },
  { label: "Other", pct: 3 },
];

/* ---------------------------- Applicant intelligence --------------------- */

export const topConcerns = [
  { label: "Application processing time", pct: 31, trend: "+6pp" },
  { label: "Missing-document uncertainty", pct: 24, trend: "+4pp" },
  { label: "Status visibility", pct: 19, trend: "+3pp" },
  { label: "Portal upload problems", pct: 15, trend: "+5pp" },
  { label: "Eligibility questions", pct: 11, trend: "-2pp" },
];

export const effortJourneys = [
  { label: "Rejected application / resubmission", effort: 92 },
  { label: "Pending application", effort: 84 },
  { label: "Document correction", effort: 76 },
  { label: "Payment issue", effort: 64 },
  { label: "Accommodation-related query", effort: 51 },
];

export const repeatJourneys = [
  { label: "Pending Application", pct: 31 },
  { label: "Document Rejection", pct: 24 },
  { label: "Application Status", pct: 18 },
  { label: "Payment Confirmation", pct: 15 },
  { label: "Portal Issue", pct: 12 },
];

export const growingReasons = [
  { label: "Document upload failure", pct: 18 },
  { label: "Application status confusion", pct: 14 },
  { label: "Payment confirmation", pct: 11 },
  { label: "Photo requirement confusion", pct: 9 },
  { label: "OTP delivery", pct: 4 },
];

/* ------------------------------ India market ----------------------------- */

export const indiaKpis = [
  { label: "Conversations", value: "18,642" },
  { label: "Repeat Contact", value: "21%" },
  { label: "First Contact Resolution", value: "74%" },
  { label: "Escalations", value: "8.6%" },
];

export const languageSplit = [
  { label: "English", pct: 48 },
  { label: "Hindi", pct: 28 },
  { label: "Malayalam", pct: 11 },
  { label: "Tamil", pct: 7 },
  { label: "Other", pct: 6 },
];

export const indiaIssues = [
  "Application Status",
  "Document Requirements",
  "Application Submission",
  "Eligibility",
  "Portal Access",
  "Payment",
];

export const languages = ["English", "Hindi", "Malayalam", "Tamil", "Other"];

export const languageMatrix: { driver: string; values: number[] }[] = [
  { driver: "Application Status", values: [25, 28, 27, 24, 22] },
  { driver: "Document Requirements", values: [17, 19, 21, 18, 16] },
  { driver: "Application Submission", values: [14, 15, 13, 16, 12] },
  { driver: "Eligibility", values: [12, 10, 9, 11, 14] },
  { driver: "Portal Access", values: [9, 8, 10, 9, 11] },
  { driver: "Payment", values: [8, 7, 6, 8, 9] },
];

/* ------------------------------ Conversations ---------------------------- */

export type Conversation = {
  id: string;
  datetime: string;
  market: string;
  language: string;
  driver: string;
  driverId: string;
  subDriver: string;
  resolution: "Resolved" | "Unresolved" | "Partially Resolved";
  repeat: boolean;
  sentiment: "Positive" | "Neutral" | "Negative";
  qa: number;
  risk: "High" | "Medium" | "Low";
  agent: string;
  duration: string;
  summary: string;
};

export const conversations: Conversation[] = [
  {
    id: "HY-IND-18492",
    datetime: "18 Aug 2026 · 09:14",
    market: "India",
    language: "English",
    driver: "Application Status",
    driverId: "application-status",
    subDriver: "Pending Application",
    resolution: "Unresolved",
    repeat: true,
    sentiment: "Negative",
    qa: 78,
    risk: "High",
    agent: "Aisha M.",
    duration: "08:42",
    summary:
      "Applicant contacted Hayya for the second time regarding a pending application. The applicant stated that a previous agent advised that no further action was required, but the portal status remained unchanged. The applicant also resubmitted a passport document. Current agent clarified the next steps, but uncertainty remained regarding expected processing progression.",
  },
  {
    id: "HY-IND-18491",
    datetime: "18 Aug 2026 · 09:02",
    market: "India",
    language: "Hindi",
    driver: "Document Requirements",
    driverId: "document-requirements",
    subDriver: "Passport Document",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 94,
    risk: "Low",
    agent: "Rahul K.",
    duration: "05:18",
    summary:
      "Applicant asked which passport pages were required as supporting documentation. Agent confirmed requirements and applicant confirmed understanding before closure.",
  },
  {
    id: "HY-IND-18490",
    datetime: "18 Aug 2026 · 08:51",
    market: "India",
    language: "English",
    driver: "Document Requirements",
    driverId: "document-requirements",
    subDriver: "Unable to upload document",
    resolution: "Partially Resolved",
    repeat: true,
    sentiment: "Negative",
    qa: 74,
    risk: "High",
    agent: "Sana R.",
    duration: "09:07",
    summary:
      "Applicant reported repeated document upload failures in the portal. Agent captured the issue but could not confirm a resolution timeline during the conversation.",
  },
  {
    id: "HY-IND-18489",
    datetime: "18 Aug 2026 · 08:37",
    market: "India",
    language: "Malayalam",
    driver: "Application Status",
    driverId: "application-status",
    subDriver: "Status After Submission",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 89,
    risk: "Low",
    agent: "Priya N.",
    duration: "06:24",
    summary: "Applicant asked whether the submitted application had been received. Agent confirmed receipt and set processing expectations.",
  },
  {
    id: "HY-IND-18488",
    datetime: "18 Aug 2026 · 08:20",
    market: "India",
    language: "English",
    driver: "Payment / Fee Issues",
    driverId: "payment",
    subDriver: "Payment confirmation",
    resolution: "Unresolved",
    repeat: true,
    sentiment: "Negative",
    qa: 71,
    risk: "High",
    agent: "Omar F.",
    duration: "10:12",
    summary:
      "Applicant stated a fee was debited but the application did not reflect payment. Agent raised an internal check; applicant remained dissatisfied at closure.",
  },
  {
    id: "HY-IND-18487",
    datetime: "17 Aug 2026 · 18:44",
    market: "India",
    language: "Tamil",
    driver: "Eligibility / Visa Type",
    driverId: "eligibility",
    subDriver: "Which application type",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Positive",
    qa: 96,
    risk: "Low",
    agent: "Deepa S.",
    duration: "04:31",
    summary: "Applicant asked which application category applied to a family visit. Agent explained the options and confirmed understanding.",
  },
  {
    id: "HY-IND-18486",
    datetime: "17 Aug 2026 · 17:58",
    market: "India",
    language: "English",
    driver: "Application Rejection / Resubmission",
    driverId: "rejection-resubmission",
    subDriver: "Rejection reason unclear",
    resolution: "Partially Resolved",
    repeat: true,
    sentiment: "Negative",
    qa: 69,
    risk: "High",
    agent: "Aisha M.",
    duration: "11:47",
    summary:
      "Applicant sought clarity on why an application was rejected. Agent provided general guidance on resubmission but the applicant remained unclear on the specific reason.",
  },
  {
    id: "HY-IND-18485",
    datetime: "17 Aug 2026 · 17:12",
    market: "India",
    language: "Hindi",
    driver: "Application Submission / Portal Issues",
    driverId: "submission-issues",
    subDriver: "Submission not confirmed",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 88,
    risk: "Medium",
    agent: "Rahul K.",
    duration: "07:03",
    summary: "Applicant was unsure whether an online submission completed. Agent verified submission and confirmed the application reference.",
  },
  {
    id: "HY-IND-18484",
    datetime: "17 Aug 2026 · 16:35",
    market: "India",
    language: "English",
    driver: "Document Requirements",
    driverId: "document-requirements",
    subDriver: "Photo requirements",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 91,
    risk: "Low",
    agent: "Neha V.",
    duration: "05:44",
    summary: "Applicant asked about photo specifications after a rejected image. Agent explained the accepted format and size.",
  },
  {
    id: "HY-IND-18483",
    datetime: "17 Aug 2026 · 15:50",
    market: "India",
    language: "English",
    driver: "Application Status",
    driverId: "application-status",
    subDriver: "Portal Status Unclear",
    resolution: "Partially Resolved",
    repeat: true,
    sentiment: "Negative",
    qa: 76,
    risk: "Medium",
    agent: "Aisha M.",
    duration: "08:15",
    summary:
      "Applicant did not understand the status label shown in the portal. Agent explained the wording but did not confirm whether any applicant action was required.",
  },
  {
    id: "HY-IND-18482",
    datetime: "17 Aug 2026 · 14:22",
    market: "India",
    language: "Malayalam",
    driver: "Technical Login / OTP Issues",
    driverId: "login-otp",
    subDriver: "OTP not received",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 90,
    risk: "Low",
    agent: "Priya N.",
    duration: "04:09",
    summary: "Applicant could not receive a one-time password. Agent guided a retry and confirmed successful login.",
  },
  {
    id: "HY-IND-18481",
    datetime: "17 Aug 2026 · 13:40",
    market: "India",
    language: "English",
    driver: "Accommodation Requirements",
    driverId: "accommodation",
    subDriver: "Accepted proof types",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Positive",
    qa: 93,
    risk: "Low",
    agent: "Deepa S.",
    duration: "06:12",
    summary: "Applicant asked what accommodation evidence is accepted. Agent explained accepted proof types and confirmed understanding.",
  },
  {
    id: "HY-IND-18480",
    datetime: "17 Aug 2026 · 12:18",
    market: "India",
    language: "Hindi",
    driver: "Application Status",
    driverId: "application-status",
    subDriver: "Pending Application",
    resolution: "Unresolved",
    repeat: true,
    sentiment: "Negative",
    qa: 73,
    risk: "High",
    agent: "Imran A.",
    duration: "09:38",
    summary:
      "Third contact regarding a pending application. Applicant expressed frustration that expectations set in earlier conversations had not been met.",
  },
  {
    id: "HY-IND-18479",
    datetime: "17 Aug 2026 · 11:47",
    market: "India",
    language: "English",
    driver: "Passport / Personal Details",
    driverId: "passport-details",
    subDriver: "Name mismatch",
    resolution: "Partially Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 82,
    risk: "Medium",
    agent: "Neha V.",
    duration: "07:29",
    summary: "Applicant reported a spelling mismatch between passport and application. Agent raised a correction request for review.",
  },
  {
    id: "HY-IND-18478",
    datetime: "17 Aug 2026 · 10:58",
    market: "India",
    language: "Tamil",
    driver: "Document Requirements",
    driverId: "document-requirements",
    subDriver: "Document rejected",
    resolution: "Unresolved",
    repeat: true,
    sentiment: "Negative",
    qa: 70,
    risk: "High",
    agent: "Sana R.",
    duration: "10:41",
    summary:
      "Applicant reported a document rejected twice without an understood reason. Agent could not confirm the rejection detail during the conversation.",
  },
  {
    id: "HY-IND-18477",
    datetime: "17 Aug 2026 · 10:05",
    market: "India",
    language: "English",
    driver: "Application Submission / Portal Issues",
    driverId: "submission-issues",
    subDriver: "Session timeout",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 86,
    risk: "Low",
    agent: "Karan T.",
    duration: "06:50",
    summary: "Applicant lost form progress due to a session timeout. Agent guided resubmission and confirmed completion.",
  },
  {
    id: "HY-IND-18476",
    datetime: "16 Aug 2026 · 19:31",
    market: "India",
    language: "English",
    driver: "Payment / Fee Issues",
    driverId: "payment",
    subDriver: "Gateway error",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 85,
    risk: "Low",
    agent: "Omar F.",
    duration: "05:57",
    summary: "Applicant experienced a declined payment. Agent advised an alternative payment route and confirmed success.",
  },
  {
    id: "HY-IND-18475",
    datetime: "16 Aug 2026 · 18:12",
    market: "India",
    language: "Hindi",
    driver: "Application Status",
    driverId: "application-status",
    subDriver: "Processing Time Expectation",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Neutral",
    qa: 87,
    risk: "Low",
    agent: "Imran A.",
    duration: "05:22",
    summary: "Applicant asked about typical processing timelines. Agent explained expectations without committing to a specific date.",
  },
  {
    id: "HY-IND-18474",
    datetime: "16 Aug 2026 · 16:44",
    market: "India",
    language: "English",
    driver: "Application Rejection / Resubmission",
    driverId: "rejection-resubmission",
    subDriver: "How to resubmit",
    resolution: "Resolved",
    repeat: false,
    sentiment: "Positive",
    qa: 92,
    risk: "Low",
    agent: "Deepa S.",
    duration: "07:16",
    summary: "Applicant needed guidance on resubmitting after a rejection. Agent walked through the steps and confirmed next actions.",
  },
  {
    id: "HY-IND-18473",
    datetime: "16 Aug 2026 · 15:20",
    market: "India",
    language: "Malayalam",
    driver: "Document Requirements",
    driverId: "document-requirements",
    subDriver: "Supporting document unclear",
    resolution: "Partially Resolved",
    repeat: true,
    sentiment: "Negative",
    qa: 75,
    risk: "Medium",
    agent: "Priya N.",
    duration: "08:58",
    summary:
      "Applicant repeated a query about which supporting document remained outstanding after receiving differing guidance in an earlier contact.",
  },
];

export const conversationById = (id: string) => conversations.find((c) => c.id === id);

/* --------------------------- Hero conversation --------------------------- */

export type Turn = { speaker: "Applicant" | "Agent"; text: string; t: string };

export const heroTranscript: Turn[] = [
  { t: "00:04", speaker: "Agent", text: "Thank you for calling Hayya applicant support, this is Aisha. May I take your application reference and confirm your date of birth for verification?" },
  { t: "00:19", speaker: "Applicant", text: "Yes, the reference is the one ending 8492. I'm calling again because my application has been pending for several days. The person I spoke to yesterday told me there was nothing else required, but when I check the portal it still says pending. I uploaded my passport again as well. I just need to understand whether I'm supposed to do something or wait." },
  { t: "00:58", speaker: "Agent", text: "Thank you, I have the application open. I can see the submission and I can also see the passport document you uploaded again this morning." },
  { t: "01:14", speaker: "Applicant", text: "So was the first upload wrong? Nobody told me it was rejected." },
  { t: "01:26", speaker: "Agent", text: "I don't see a rejection recorded against the earlier document. The application is currently at review stage, which is why the portal is showing pending." },
  { t: "01:47", speaker: "Applicant", text: "But it has said pending since last week. My travel is in three weeks and I don't know if I should be worried." },
  { t: "02:05", speaker: "Agent", text: "I understand the concern. Applications at review stage can remain in that status while checks are completed. There is no additional document requested from you at this moment." },
  { t: "02:29", speaker: "Applicant", text: "That is exactly what I was told yesterday, and nothing changed. Is there any way to know how long it will take?" },
  { t: "02:48", speaker: "Agent", text: "I am not able to give a guaranteed date, as processing times vary by application. What I can do is add a note to the case recording that you have contacted us twice on this." },
  { t: "03:12", speaker: "Applicant", text: "Okay. And the second passport upload — will that cause a problem, having two copies?" },
  { t: "03:26", speaker: "Agent", text: "It should not create an issue. The most recent valid document is used during review." },
  { t: "03:41", speaker: "Applicant", text: "So I do nothing now?" },
  { t: "03:49", speaker: "Agent", text: "At this stage there is no action required from you. If anything further is needed, you would be notified through the portal and by email." },
  { t: "04:08", speaker: "Applicant", text: "Alright. I hope I don't have to call a third time." },
  { t: "04:17", speaker: "Agent", text: "I have noted your case. Is there anything else I can help you with today?" },
  { t: "04:26", speaker: "Applicant", text: "No, that's all. Thank you." },
];

export const heroIntel = [
  { label: "Contact Driver", value: "Application Status", tone: "primary" as Tone },
  { label: "Sub-Driver", value: "Pending Application", tone: "neutral" as Tone },
  { label: "Repeat Contact", value: "Yes", tone: "danger" as Tone },
  { label: "Previous Contact", value: "1 day ago", tone: "neutral" as Tone },
  { label: "Resolution Status", value: "Partially Resolved", tone: "warning" as Tone },
  { label: "Customer Effort", value: "High", tone: "danger" as Tone },
  { label: "Sentiment", value: "Negative → Neutral", tone: "warning" as Tone },
  { label: "Escalation Risk", value: "Medium", tone: "warning" as Tone },
  { label: "Document Signal", value: "Passport resubmitted", tone: "info" as Tone },
  { label: "Digital Signal", value: "Portal status unchanged", tone: "info" as Tone },
  { label: "Applicant Question", value: "\"Do I need to take further action?\"", tone: "classify" as Tone },
  { label: "Next Action", value: "Clarify required action / status expectations", tone: "primary" as Tone },
];

export const heroWhyAgain = [
  { label: "Primary cause", value: "Uncertainty after previous interaction" },
  { label: "Contributing factor", value: "Portal status unchanged" },
  { label: "Previous resolution", value: "Applicant advised to wait" },
  { label: "Applicant expectation", value: "Confirmation that no additional action is required" },
  { label: "Potential operational signal", value: "Repeated application-status contact" },
];

export const qaScorecard = [
  { label: "Opening & Verification", score: 95 },
  { label: "Need Identification", score: 88 },
  { label: "Accuracy / Clarity of Information", score: 72 },
  { label: "Ownership", score: 81 },
  { label: "Resolution", score: 68 },
  { label: "Empathy", score: 92 },
  { label: "Process Adherence", score: 90 },
  { label: "Closure", score: 76 },
];

export const qaOverall = 82;

export const coachingOpportunities = [
  {
    title: "Resolution Confirmation",
    body: "Agent provided guidance but did not explicitly confirm that the applicant understood whether further action was required.",
  },
  {
    title: "Expectation Setting",
    body: "Processing expectations could have been communicated more clearly.",
  },
  {
    title: "Closure",
    body: "Agent could have summarised the next action before ending the conversation.",
  },
];

/* --------------------------------- Quality -------------------------------- */

export const qualityKpis = [
  { label: "Average QA", value: "87" },
  { label: "QA Exceptions", value: "312" },
  { label: "Coaching Opportunities", value: "146" },
  { label: "High Priority Reviews", value: "41" },
];

export const qaOpportunities = [
  { label: "Resolution Confirmation", pct: 34 },
  { label: "Expectation Setting", pct: 26 },
  { label: "Process Explanation", pct: 18 },
  { label: "Ownership", pct: 11 },
  { label: "Clear Closure", pct: 7 },
  { label: "Empathy", pct: 4 },
];

/* --------------------------------- Agents --------------------------------- */

export type Agent = {
  id: string;
  name: string;
  calls: number;
  qa: number;
  fcr: number;
  repeat: number;
  aht: string;
  escalation: number;
  coaching: string;
  strong: string[];
  opportunity: string[];
  languages: string[];
};

export const agents: Agent[] = [
  { id: "aisha-m", name: "Aisha M.", calls: 412, qa: 84, fcr: 69, repeat: 24, aht: "8:11", escalation: 10, coaching: "Resolution", strong: ["Empathy", "Verification", "Process adherence"], opportunity: ["Resolution confirmation", "Expectation setting", "Closure"], languages: ["English", "Hindi"] },
  { id: "rahul-k", name: "Rahul K.", calls: 389, qa: 93, fcr: 84, repeat: 11, aht: "6:48", escalation: 5, coaching: "None", strong: ["Resolution", "Clarity", "Closure"], opportunity: ["Call control on long queries"], languages: ["Hindi", "English"] },
  { id: "priya-n", name: "Priya N.", calls: 366, qa: 89, fcr: 79, repeat: 15, aht: "7:02", escalation: 6, coaching: "Expectation setting", strong: ["Empathy", "Language flexibility"], opportunity: ["Expectation setting", "Process explanation"], languages: ["Malayalam", "English"] },
  { id: "sana-r", name: "Sana R.", calls: 341, qa: 79, fcr: 66, repeat: 26, aht: "8:54", escalation: 12, coaching: "Ownership", strong: ["Verification", "Tone"], opportunity: ["Ownership", "Resolution confirmation"], languages: ["English", "Hindi"] },
  { id: "omar-f", name: "Omar F.", calls: 328, qa: 82, fcr: 72, repeat: 20, aht: "7:36", escalation: 9, coaching: "Process explanation", strong: ["Payment handling", "Documentation"], opportunity: ["Process explanation"], languages: ["English", "Arabic"] },
  { id: "deepa-s", name: "Deepa S.", calls: 317, qa: 95, fcr: 86, repeat: 9, aht: "6:21", escalation: 4, coaching: "None", strong: ["Resolution", "Empathy", "Closure"], opportunity: ["Knowledge sharing with peers"], languages: ["Tamil", "English"] },
  { id: "imran-a", name: "Imran A.", calls: 305, qa: 81, fcr: 70, repeat: 22, aht: "8:02", escalation: 9, coaching: "Closure", strong: ["Verification", "Process adherence"], opportunity: ["Closure", "Resolution confirmation"], languages: ["Hindi", "English"] },
  { id: "neha-v", name: "Neha V.", calls: 288, qa: 88, fcr: 78, repeat: 16, aht: "7:14", escalation: 7, coaching: "Expectation setting", strong: ["Document guidance", "Clarity"], opportunity: ["Expectation setting"], languages: ["English", "Hindi"] },
  { id: "karan-t", name: "Karan T.", calls: 274, qa: 86, fcr: 76, repeat: 17, aht: "7:20", escalation: 7, coaching: "Ownership", strong: ["Technical troubleshooting"], opportunity: ["Ownership", "Empathy"], languages: ["English", "Hindi"] },
  { id: "fatima-s", name: "Fatima S.", calls: 259, qa: 90, fcr: 81, repeat: 13, aht: "6:58", escalation: 6, coaching: "None", strong: ["Empathy", "Clarity", "Escalation judgement"], opportunity: ["Handle-time efficiency"], languages: ["English", "Arabic"] },
];

export const agentById = (id: string) => agents.find((a) => a.id === id);

/* ----------------------------- Emerging issues ---------------------------- */

export type EmergingIssue = {
  id: string;
  severity: "critical" | "elevated" | "new";
  title: string;
  mentions: string;
  conversations: number;
  detected: string;
  meta: string[];
  driverId: string;
  driverName: string;
  series: { day: string; value: number }[];
};

export const emergingIssues: EmergingIssue[] = [
  {
    id: "document-upload-failure",
    severity: "critical",
    title: "Document Upload Failure",
    mentions: "+18%",
    conversations: 312,
    detected: "Detected 3 days ago",
    meta: ["Primary market: India", "Repeat contact: 26%"],
    driverId: "document-requirements",
    driverName: "Document Requirements",
    series: [
      { day: "D-13", value: 148 }, { day: "D-11", value: 162 }, { day: "D-9", value: 171 },
      { day: "D-7", value: 189 }, { day: "D-5", value: 224 }, { day: "D-3", value: 271 }, { day: "D-1", value: 312 },
    ],
  },
  {
    id: "application-status-confusion",
    severity: "elevated",
    title: "Application Status Confusion",
    mentions: "+14%",
    conversations: 428,
    detected: "Detected 6 days ago",
    meta: ["Repeat Contact: 31%", "FCR: 61%"],
    driverId: "application-status",
    driverName: "Application Status",
    series: [
      { day: "D-13", value: 302 }, { day: "D-11", value: 318 }, { day: "D-9", value: 331 },
      { day: "D-7", value: 356 }, { day: "D-5", value: 379 }, { day: "D-3", value: 402 }, { day: "D-1", value: 428 },
    ],
  },
  {
    id: "payment-confirmation",
    severity: "elevated",
    title: "Payment Confirmation",
    mentions: "+11%",
    conversations: 176,
    detected: "Detected 5 days ago",
    meta: ["Average sentiment deteriorating", "Escalation: 7%"],
    driverId: "payment",
    driverName: "Payment / Fee Issues",
    series: [
      { day: "D-13", value: 118 }, { day: "D-11", value: 126 }, { day: "D-9", value: 134 },
      { day: "D-7", value: 141 }, { day: "D-5", value: 152 }, { day: "D-3", value: 166 }, { day: "D-1", value: 176 },
    ],
  },
  {
    id: "photo-requirement-confusion",
    severity: "new",
    title: "Photo Requirement Confusion",
    mentions: "New",
    conversations: 83,
    detected: "Detected 2 days ago",
    meta: ["Growing rapidly", "Sub-driver: Photo requirements"],
    driverId: "document-requirements",
    driverName: "Document Requirements",
    series: [
      { day: "D-13", value: 12 }, { day: "D-11", value: 15 }, { day: "D-9", value: 21 },
      { day: "D-7", value: 28 }, { day: "D-5", value: 44 }, { day: "D-3", value: 63 }, { day: "D-1", value: 83 },
    ],
  },
];

export const issueById = (id: string) => emergingIssues.find((i) => i.id === id);

/* ------------------------------- Trend data ------------------------------- */

export const driverTrend = [
  { day: "Wk-6", status: 640, documents: 402, submission: 318, payment: 176 },
  { day: "Wk-5", status: 668, documents: 421, submission: 322, payment: 181 },
  { day: "Wk-4", status: 702, documents: 448, submission: 341, payment: 188 },
  { day: "Wk-3", status: 731, documents: 476, submission: 352, payment: 197 },
  { day: "Wk-2", status: 796, documents: 512, submission: 366, payment: 209 },
  { day: "Wk-1", status: 861, documents: 574, submission: 381, payment: 224 },
];

export const repeatTrend = [
  { day: "Wk-6", value: 17.4 }, { day: "Wk-5", value: 17.9 }, { day: "Wk-4", value: 18.6 },
  { day: "Wk-3", value: 19.4 }, { day: "Wk-2", value: 20.2 }, { day: "Wk-1", value: 21.0 },
];

export const qaTrend = [
  { day: "Wk-6", value: 84 }, { day: "Wk-5", value: 85 }, { day: "Wk-4", value: 85 },
  { day: "Wk-3", value: 86 }, { day: "Wk-2", value: 86 }, { day: "Wk-1", value: 87 },
];

export const escalationByIssue = [
  { label: "Rejection / Resubmission", value: 17 },
  { label: "Application Status", value: 11 },
  { label: "Submission Issues", value: 9 },
  { label: "Documents", value: 8 },
  { label: "Payment", value: 7 },
  { label: "Portal / Login", value: 5 },
];

export const volumeTrend = [
  { day: "Mon", value: 2740 }, { day: "Tue", value: 2892 }, { day: "Wed", value: 2811 },
  { day: "Thu", value: 2965 }, { day: "Fri", value: 3104 }, { day: "Sat", value: 2216 }, { day: "Sun", value: 1914 },
];

/* -------------------------- Management intelligence ----------------------- */

export type ManagementInsight = {
  id: string;
  title: string;
  body: string;
  evidence: string;
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
};

export const managementInsights: ManagementInsight[] = [
  {
    id: "m1",
    title: "Application status is driving disproportionate recontact",
    body: "Application Status represents 26% of conversations but 35% of repeat contacts.",
    evidence: "View driver analysis",
    to: "/contact-drivers/$id",
    params: { id: "application-status" },
  },
  {
    id: "m2",
    title: "Unclear next action is a recurring root cause",
    body: "Applicants frequently contact again because they remain uncertain whether action is required while an application is pending.",
    evidence: "View repeat-contact root causes",
    to: "/resolution",
  },
  {
    id: "m3",
    title: "Document upload issues are increasing",
    body: "Mentions of document-upload problems increased 18% during the selected period.",
    evidence: "View emerging issue",
    to: "/emerging-issues",
  },
  {
    id: "m4",
    title: "Resolution confirmation is the largest QA opportunity",
    body: "Agents frequently provide correct information but do not consistently confirm the applicant understands the next step.",
    evidence: "View quality intelligence",
    to: "/quality",
  },
  {
    id: "m5",
    title: "Portal experience is creating contact demand",
    body: "Multiple conversations indicate applicants calling because online application information does not sufficiently answer their immediate question.",
    evidence: "View submission & portal driver",
    to: "/contact-drivers/$id",
    params: { id: "submission-issues" },
  },
];

/* ---------------------------------- Search -------------------------------- */

export type SearchAnswer = {
  q: string;
  answer: string;
  bullets: string[];
  to: string;
  params?: Record<string, string>;
  ctaLabel: string;
};

export const searchExamples: SearchAnswer[] = [
  {
    q: "Why are applicants calling again?",
    answer:
      "52% of repeat contacts are associated with incomplete resolution or uncertainty about the next action.",
    bullets: [
      "Previous issue not fully resolved — 29%",
      "Applicant unsure of next action — 23%",
      "Application status unchanged — 19%",
    ],
    to: "/resolution",
    ctaLabel: "Open Resolution Intelligence",
  },
  {
    q: "Which issues have increased this week?",
    answer: "Four issue clusters are trending upward, led by document upload failures.",
    bullets: [
      "Document upload failure — mentions +18% (312 conversations)",
      "Application status confusion — +14% (428 conversations)",
      "Payment confirmation — +11% (176 conversations)",
    ],
    to: "/emerging-issues",
    ctaLabel: "Open Emerging Issues",
  },
  {
    q: "Show me calls related to document rejection.",
    answer: "Conversations tagged to the Document Requirements driver with rejection sub-drivers.",
    bullets: [
      "HY-IND-18478 — document rejected twice, unresolved",
      "HY-IND-18490 — upload failure, partially resolved",
      "HY-IND-18473 — supporting document unclear, repeat contact",
    ],
    to: "/conversations",
    ctaLabel: "Open Conversations",
  },
  {
    q: "Which contact driver has the lowest FCR?",
    answer: "Application Rejection / Resubmission at 58%, followed by Application Status at 61%.",
    bullets: [
      "Rejection / Resubmission — FCR 58%, repeat 31%",
      "Application Status — FCR 61%, repeat 28%",
      "Submission Issues — FCR 69%, repeat 23%",
    ],
    to: "/resolution",
    ctaLabel: "Open Resolution Intelligence",
  },
  {
    q: "What is driving escalations from India?",
    answer: "Escalations concentrate in rejection and pending-status journeys where next action is unclear.",
    bullets: [
      "Rejection / Resubmission — 17% escalation rate",
      "Application Status — 11% escalation rate",
      "Submission Issues — 9% escalation rate",
    ],
    to: "/applicant-intelligence",
    ctaLabel: "Open Applicant Intelligence",
  },
  {
    q: "Which agents need coaching on resolution?",
    answer: "Three agents show resolution-confirmation as their leading coaching opportunity.",
    bullets: ["Aisha M. — QA 84, FCR 69%, repeat 24%", "Sana R. — QA 79, FCR 66%, repeat 26%", "Imran A. — QA 81, FCR 70%, repeat 22%"],
    to: "/agents",
    ctaLabel: "Open Agents",
  },
  {
    q: "Show conversations where applicants received unclear next steps.",
    answer: "46 conversations were flagged for potentially inconsistent or unclear guidance.",
    bullets: ["HY-IND-18492 — repeat contact, next action unclear", "HY-IND-18483 — portal status explained, action not confirmed", "HY-IND-18473 — differing guidance across contacts"],
    to: "/quality",
    ctaLabel: "Open Quality & QA",
  },
];

/* --------------------------------- Reports -------------------------------- */

export const reports = [
  { id: "contact-driver", name: "Contact Driver Report", desc: "Volume, share and movement across every contact driver and sub-driver." },
  { id: "repeat-contact", name: "Repeat Contact Analysis", desc: "Recontact rates with root-cause attribution by driver and journey." },
  { id: "fcr", name: "FCR & Resolution Report", desc: "First contact resolution, partial resolution and unresolved outcomes." },
  { id: "qa", name: "QA Performance Report", desc: "Scorecard results, exceptions and coaching opportunities by team." },
  { id: "emerging", name: "Emerging Issues Report", desc: "Newly detected issue clusters with trend and conversation evidence." },
  { id: "india", name: "India Market Report", desc: "Applicant conversations from India by language, driver and outcome." },
  { id: "coaching", name: "Agent Coaching Report", desc: "Per-agent coaching intelligence with supporting conversations." },
  { id: "voa", name: "Voice of Applicant Report", desc: "What applicants are actually saying, beyond agent dispositions." },
];

export const supportedLanguages = ["English", "Hindi", "Malayalam", "Tamil", "Arabic"];
