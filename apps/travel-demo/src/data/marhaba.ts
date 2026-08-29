// Fictional demo dataset for the CallVibe prototype,
// configured for GT Holidays (India outbound & domestic holidays).
// All figures are mock data for demonstration purposes only.

export const WORKSPACE = "GT Holidays · India Holidays";
export const BRAND = "GT Holidays";

/* ------------------------------------------------------------------ */
/* Destinations (product portfolio)                                    */
/* ------------------------------------------------------------------ */

export type Destination = {
  id: string;
  name: string;
  short: string;
  region: string;
  type: string;
  from: string;
  bestWindow: string;
  nights: string;
  visa: string;
  conversations: number;
  qualifiedRate: number;
  highIntentRate: number;
  itinerariesSent: number;
  bookingIntent: number;
  dominantTripType: string;
  topParty: string;
  medianBudget: string;
  drivers: { label: string; value: number }[];
  objections: { label: string; value: number }[];
  competitors: { label: string; value: number }[];
  sourceMix: { label: string; value: number }[];
  departureMix: { label: string; value: number }[];
  trend: { day: string; conversations: number; intent: number }[];
  brief: string;
  advisors: { name: string; calls: number; quality: number; itineraries: number }[];
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

export const destinations: Destination[] = [
  {
    id: "bali",
    name: "Bali Honeymoon & Couples",
    short: "Bali",
    region: "Southeast Asia",
    type: "Beach & Island",
    from: "₹1.15L pp",
    bestWindow: "Sep – Mar",
    nights: "6N / 7D",
    visa: "Visa on arrival",
    conversations: 1042,
    qualifiedRate: 34,
    highIntentRate: 27,
    itinerariesSent: 268,
    bookingIntent: 62,
    dominantTripType: "Honeymoon",
    topParty: "2 Adults",
    medianBudget: "₹2.6L",
    drivers: [
      { label: "Private Pool Villa", value: 318 },
      { label: "Honeymoon Inclusions", value: 264 },
      { label: "Ubud + Seminyak Split Stay", value: 206 },
      { label: "Value for Money", value: 151 },
      { label: "Photoshoot / Candlelight Dinner", value: 96 },
    ],
    objections: [
      { label: "Package Price", value: 241 },
      { label: "Flight Cost from Metro", value: 168 },
      { label: "Competitor Quote", value: 132 },
      { label: "Hotel Category", value: 88 },
      { label: "Long Layover", value: 54 },
    ],
    competitors: [
      { label: "MakeMyTrip Holidays", value: 188 },
      { label: "Pickyourtrail", value: 74 },
      { label: "Thomas Cook", value: 61 },
      { label: "Local Agent (Bengaluru)", value: 33 },
    ],
    sourceMix: [
      { label: "Meta / Instagram", value: 36 },
      { label: "Google Search", value: 26 },
      { label: "WhatsApp Enquiry", value: 18 },
      { label: "Referral", value: 12 },
      { label: "Walk-in", value: 8 },
    ],
    departureMix: [
      { label: "Bengaluru", value: 31 },
      { label: "Hyderabad", value: 22 },
      { label: "Mumbai", value: 19 },
      { label: "Delhi NCR", value: 16 },
      { label: "Chennai", value: 12 },
    ],
    trend: trendFor(88, 0),
    brief:
      "Bali remains the strongest honeymoon engine in the portfolio, with demand concentrated in ₹2.4L–₹3L couple packages departing from Bengaluru and Hyderabad. Private pool villas and a Ubud + Seminyak split stay are the dominant positive drivers. Price and Bengaluru flight cost are the most common blockers, and MakeMyTrip Holidays is the most-quoted comparison — usually on flight-inclusive pricing rather than hotel quality.",
    advisors: [
      { name: "Neha Reddy", calls: 214, quality: 88, itineraries: 61 },
      { name: "Priya Sharma", calls: 176, quality: 86, itineraries: 54 },
      { name: "Sneha Kapoor", calls: 152, quality: 81, itineraries: 38 },
      { name: "Rohan Mehta", calls: 141, quality: 74, itineraries: 24 },
    ],
  },
  {
    id: "dubai",
    name: "Dubai Family Holiday",
    short: "Dubai",
    region: "Middle East",
    type: "City & Theme Parks",
    from: "₹78K pp",
    bestWindow: "Oct – Mar",
    nights: "5N / 6D",
    visa: "e-Visa · 3–5 working days",
    conversations: 934,
    qualifiedRate: 32,
    highIntentRate: 25,
    itinerariesSent: 246,
    bookingIntent: 58,
    dominantTripType: "Family Holiday",
    topParty: "2 Adults + 2 Children",
    medianBudget: "₹3.4L",
    drivers: [
      { label: "Theme Parks & Attractions", value: 288 },
      { label: "Child-Friendly Hotels", value: 214 },
      { label: "Indian Restaurants Nearby", value: 178 },
      { label: "Short Flight Time", value: 132 },
      { label: "Desert Safari", value: 108 },
    ],
    objections: [
      { label: "Package Price", value: 196 },
      { label: "Attraction Pass Add-Ons", value: 154 },
      { label: "Hotel Location", value: 121 },
      { label: "Visa Timeline", value: 92 },
      { label: "School Holiday Availability", value: 64 },
    ],
    competitors: [
      { label: "Thomas Cook", value: 152 },
      { label: "MakeMyTrip Holidays", value: 141 },
      { label: "SOTC", value: 62 },
      { label: "Yatra Holidays", value: 41 },
    ],
    sourceMix: [
      { label: "Google Search", value: 32 },
      { label: "Meta / Instagram", value: 28 },
      { label: "WhatsApp Enquiry", value: 17 },
      { label: "Referral", value: 14 },
      { label: "Walk-in", value: 9 },
    ],
    departureMix: [
      { label: "Hyderabad", value: 27 },
      { label: "Delhi NCR", value: 24 },
      { label: "Mumbai", value: 21 },
      { label: "Bengaluru", value: 17 },
      { label: "Kochi", value: 11 },
    ],
    trend: trendFor(78, 2),
    brief:
      "Dubai is the portfolio's family engine and is heavily school-holiday driven. Demand peaks for the December and April windows from Hyderabad and Delhi NCR. Theme-park inclusions and child-friendly hotels near Indian restaurants drive positive sentiment, while attraction add-ons pushing the quote past ₹3.5L are the leading objection. Visa-timeline questions rise sharply within four weeks of departure.",
    advisors: [
      { name: "Vikram Singh", calls: 198, quality: 82, itineraries: 52 },
      { name: "Rahul Verma", calls: 181, quality: 84, itineraries: 49 },
      { name: "Kavya Menon", calls: 148, quality: 79, itineraries: 33 },
      { name: "Arjun Rao", calls: 122, quality: 76, itineraries: 26 },
    ],
  },
  {
    id: "maldives",
    name: "Maldives Luxury & Anniversary",
    short: "Maldives",
    region: "Indian Ocean",
    type: "Luxury Resort",
    from: "₹1.65L pp",
    bestWindow: "Nov – Apr",
    nights: "4N / 5D",
    visa: "Free visa on arrival",
    conversations: 604,
    qualifiedRate: 38,
    highIntentRate: 31,
    itinerariesSent: 182,
    bookingIntent: 54,
    dominantTripType: "Anniversary",
    topParty: "2 Adults",
    medianBudget: "₹4.2L",
    drivers: [
      { label: "Overwater Villa", value: 221 },
      { label: "All-Inclusive Meal Plan", value: 194 },
      { label: "Seaplane Transfer", value: 141 },
      { label: "Privacy / Adults-Only", value: 108 },
      { label: "Indian Meal Options", value: 74 },
    ],
    objections: [
      { label: "Package Price", value: 198 },
      { label: "Seaplane Transfer Cost", value: 132 },
      { label: "Meal Plan Upgrade", value: 74 },
      { label: "Resort Choice Confusion", value: 61 },
      { label: "Payment in Instalments", value: 28 },
    ],
    competitors: [
      { label: "Pickyourtrail", value: 98 },
      { label: "MakeMyTrip Holidays", value: 72 },
      { label: "Thomas Cook", value: 44 },
      { label: "Direct Resort Booking", value: 27 },
    ],
    sourceMix: [
      { label: "Meta / Instagram", value: 34 },
      { label: "Google Search", value: 29 },
      { label: "Referral", value: 18 },
      { label: "WhatsApp Enquiry", value: 13 },
      { label: "Walk-in", value: 6 },
    ],
    departureMix: [
      { label: "Mumbai", value: 29 },
      { label: "Bengaluru", value: 24 },
      { label: "Delhi NCR", value: 20 },
      { label: "Hyderabad", value: 15 },
      { label: "Chennai", value: 12 },
    ],
    trend: trendFor(52, 4),
    brief:
      "Maldives carries the highest ticket size and the highest qualified rate in the portfolio. Anniversary and milestone-birthday couples dominate, mostly from Mumbai and Bengaluru. Overwater villa and all-inclusive meal plans convert quickly; seaplane transfer cost is the single most common objection and is frequently the reason quotes are re-worked. EMI and instalment questions appear in roughly one in five conversations.",
    advisors: [
      { name: "Neha Reddy", calls: 168, quality: 88, itineraries: 51 },
      { name: "Priya Sharma", calls: 142, quality: 86, itineraries: 44 },
      { name: "Vikram Singh", calls: 96, quality: 82, itineraries: 24 },
      { name: "Sneha Kapoor", calls: 88, quality: 81, itineraries: 21 },
    ],
  },
  {
    id: "thailand",
    name: "Thailand Couples & Friends",
    short: "Thailand",
    region: "Southeast Asia",
    type: "Beach & Nightlife",
    from: "₹62K pp",
    bestWindow: "Nov – Feb",
    nights: "5N / 6D",
    visa: "Visa-free entry",
    conversations: 868,
    qualifiedRate: 27,
    highIntentRate: 19,
    itinerariesSent: 214,
    bookingIntent: 41,
    dominantTripType: "Friends Trip",
    topParty: "4 Adults",
    medianBudget: "₹1.7L",
    drivers: [
      { label: "Entry Price", value: 268 },
      { label: "Visa-Free Entry", value: 214 },
      { label: "Phuket + Krabi Combo", value: 148 },
      { label: "Island Hopping", value: 96 },
      { label: "Long-Weekend Feasibility", value: 78 },
    ],
    objections: [
      { label: "Flight Price", value: 202 },
      { label: "Hotel Quality", value: 158 },
      { label: "Competitor Quote", value: 146 },
      { label: "Group Room Sharing", value: 91 },
      { label: "Transfer Timings", value: 44 },
    ],
    competitors: [
      { label: "MakeMyTrip Holidays", value: 118 },
      { label: "Local Agent (Delhi NCR)", value: 88 },
      { label: "Yatra Holidays", value: 51 },
      { label: "Booking Direct + DIY", value: 38 },
    ],
    sourceMix: [
      { label: "Meta / Instagram", value: 41 },
      { label: "Google Search", value: 22 },
      { label: "WhatsApp Enquiry", value: 19 },
      { label: "Referral", value: 11 },
      { label: "Walk-in", value: 7 },
    ],
    departureMix: [
      { label: "Delhi NCR", value: 28 },
      { label: "Mumbai", value: 22 },
      { label: "Bengaluru", value: 19 },
      { label: "Pune", value: 16 },
      { label: "Kolkata", value: 15 },
    ],
    trend: trendFor(66, 6),
    brief:
      "Thailand is the most price-sensitive destination in the portfolio and generates the largest share of friends-group enquiries, typically four adults sharing rooms. Long-weekend feasibility drives volume from Delhi NCR and Pune. Flight price is the dominant objection and hotel-quality doubts convert enquiries away when only 3-star options are quoted. Competitor quotes are raised in 17% of conversations.",
    advisors: [
      { name: "Rohan Mehta", calls: 186, quality: 74, itineraries: 32 },
      { name: "Arjun Rao", calls: 168, quality: 76, itineraries: 36 },
      { name: "Kavya Menon", calls: 132, quality: 79, itineraries: 31 },
      { name: "Rahul Verma", calls: 108, quality: 84, itineraries: 29 },
    ],
  },
  {
    id: "europe",
    name: "Europe Multi-Country",
    short: "Europe",
    region: "Europe",
    type: "Multi-Country Tour",
    from: "₹2.35L pp",
    bestWindow: "Apr – Sep",
    nights: "10N / 11D",
    visa: "Schengen · 3–4 weeks",
    conversations: 712,
    qualifiedRate: 29,
    highIntentRate: 21,
    itinerariesSent: 168,
    bookingIntent: 34,
    dominantTripType: "Family Holiday",
    topParty: "2 Adults + 1 Child",
    medianBudget: "₹5.8L",
    drivers: [
      { label: "Switzerland Inclusions", value: 232 },
      { label: "Indian Meals on Tour", value: 186 },
      { label: "Guided Group Departure", value: 148 },
      { label: "Multi-Country Coverage", value: 121 },
      { label: "Rail Passes", value: 88 },
    ],
    objections: [
      { label: "Schengen Visa Concern", value: 226 },
      { label: "Total Package Price", value: 188 },
      { label: "Walking / Pace for Parents", value: 112 },
      { label: "Appointment Availability", value: 94 },
      { label: "Payment in Instalments", value: 61 },
    ],
    competitors: [
      { label: "Veena World", value: 164 },
      { label: "SOTC", value: 96 },
      { label: "Thomas Cook", value: 88 },
      { label: "Kesari Tours", value: 57 },
    ],
    sourceMix: [
      { label: "Google Search", value: 34 },
      { label: "Referral", value: 22 },
      { label: "Meta / Instagram", value: 20 },
      { label: "Walk-in", value: 14 },
      { label: "WhatsApp Enquiry", value: 10 },
    ],
    departureMix: [
      { label: "Mumbai", value: 26 },
      { label: "Delhi NCR", value: 22 },
      { label: "Kochi", value: 18 },
      { label: "Ahmedabad", value: 18 },
      { label: "Bengaluru", value: 16 },
    ],
    trend: trendFor(58, 8),
    brief:
      "Europe has the longest decision cycle and the highest ticket in the portfolio. Schengen visa confidence — not price — is the number-one blocker, with appointment availability raised in 13% of conversations. Families travelling with parents ask consistently about walking pace and Indian meals; conversations where the advisor confirms Jain or vegetarian catering upfront convert 1.4x better. Veena World is the most-referenced comparison.",
    advisors: [
      { name: "Vikram Singh", calls: 192, quality: 82, itineraries: 44 },
      { name: "Priya Sharma", calls: 154, quality: 86, itineraries: 41 },
      { name: "Rahul Verma", calls: 138, quality: 84, itineraries: 38 },
      { name: "Kavya Menon", calls: 96, quality: 79, itineraries: 21 },
    ],
  },
  {
    id: "vietnam",
    name: "Vietnam Explorer",
    short: "Vietnam",
    region: "Southeast Asia",
    type: "Culture & Adventure",
    from: "₹71K pp",
    bestWindow: "Oct – Apr",
    nights: "6N / 7D",
    visa: "e-Visa · 3 working days",
    conversations: 546,
    qualifiedRate: 30,
    highIntentRate: 22,
    itinerariesSent: 138,
    bookingIntent: 28,
    dominantTripType: "Friends Trip",
    topParty: "4 Adults",
    medianBudget: "₹3.2L",
    drivers: [
      { label: "Ha Long Bay Cruise", value: 188 },
      { label: "Value for Money", value: 166 },
      { label: "Da Nang + Hoi An", value: 121 },
      { label: "New Destination Appeal", value: 98 },
      { label: "Easy e-Visa", value: 76 },
    ],
    objections: [
      { label: "Itinerary Comparison", value: 164 },
      { label: "Connecting Flight Duration", value: 128 },
      { label: "Package Price", value: 96 },
      { label: "Vegetarian Food Availability", value: 84 },
      { label: "Internal Flights", value: 52 },
    ],
    competitors: [
      { label: "Pickyourtrail", value: 88 },
      { label: "MakeMyTrip Holidays", value: 72 },
      { label: "TravelTriangle", value: 58 },
      { label: "Local Agent (Bengaluru)", value: 31 },
    ],
    sourceMix: [
      { label: "Meta / Instagram", value: 38 },
      { label: "Google Search", value: 27 },
      { label: "WhatsApp Enquiry", value: 18 },
      { label: "Referral", value: 11 },
      { label: "Walk-in", value: 6 },
    ],
    departureMix: [
      { label: "Bengaluru", value: 30 },
      { label: "Hyderabad", value: 21 },
      { label: "Chennai", value: 18 },
      { label: "Mumbai", value: 17 },
      { label: "Pune", value: 14 },
    ],
    trend: trendFor(46, 10),
    brief:
      "Vietnam is the fastest-growing destination in the portfolio, driven by young friends groups from Bengaluru and Hyderabad. Enquiries are highly comparison-led: travellers arrive with a competitor itinerary and ask for a line-by-line match. Vegetarian food availability is a recurring pre-booking concern and connecting-flight duration is the most common reason a quote stalls.",
    advisors: [
      { name: "Arjun Rao", calls: 148, quality: 76, itineraries: 33 },
      { name: "Sneha Kapoor", calls: 132, quality: 81, itineraries: 31 },
      { name: "Rohan Mehta", calls: 108, quality: 74, itineraries: 19 },
      { name: "Kavya Menon", calls: 92, quality: 79, itineraries: 22 },
    ],
  },
  {
    id: "singapore",
    name: "Singapore & Malaysia Family",
    short: "Singapore",
    region: "Southeast Asia",
    type: "City & Theme Parks",
    from: "₹88K pp",
    bestWindow: "Year-round",
    nights: "6N / 7D",
    visa: "e-Visa · 5–7 working days",
    conversations: 588,
    qualifiedRate: 31,
    highIntentRate: 23,
    itinerariesSent: 152,
    bookingIntent: 36,
    dominantTripType: "Family Holiday",
    topParty: "2 Adults + 2 Children",
    medianBudget: "₹3.6L",
    drivers: [
      { label: "Universal Studios", value: 214 },
      { label: "Safe for Children", value: 168 },
      { label: "Indian Food Availability", value: 142 },
      { label: "Twin-City Combo", value: 112 },
      { label: "Clean & Easy Transport", value: 84 },
    ],
    objections: [
      { label: "Hotel Location", value: 172 },
      { label: "Package Price", value: 141 },
      { label: "Attraction Ticket Add-Ons", value: 98 },
      { label: "Room Occupancy for 4", value: 88 },
      { label: "Visa Timeline", value: 46 },
    ],
    competitors: [
      { label: "Thomas Cook", value: 121 },
      { label: "MakeMyTrip Holidays", value: 96 },
      { label: "SOTC", value: 58 },
      { label: "Yatra Holidays", value: 34 },
    ],
    sourceMix: [
      { label: "Google Search", value: 33 },
      { label: "Meta / Instagram", value: 26 },
      { label: "Referral", value: 19 },
      { label: "WhatsApp Enquiry", value: 14 },
      { label: "Walk-in", value: 8 },
    ],
    departureMix: [
      { label: "Pune", value: 24 },
      { label: "Chennai", value: 22 },
      { label: "Bengaluru", value: 21 },
      { label: "Mumbai", value: 18 },
      { label: "Kolkata", value: 15 },
    ],
    trend: trendFor(48, 12),
    brief:
      "Singapore is a repeat-family destination with a short decision cycle. Hotel location — specifically proximity to an MRT station and Indian restaurants — is a bigger objection than price. Families of four consistently raise room-occupancy limits, and quotes that lead with a family-room option instead of two twin rooms hold 1.3x better.",
    advisors: [
      { name: "Rahul Verma", calls: 162, quality: 84, itineraries: 42 },
      { name: "Kavya Menon", calls: 141, quality: 79, itineraries: 34 },
      { name: "Sneha Kapoor", calls: 118, quality: 81, itineraries: 29 },
      { name: "Vikram Singh", calls: 96, quality: 82, itineraries: 24 },
    ],
  },
  {
    id: "kashmir",
    name: "Kashmir & Himalayan Escapes",
    short: "Kashmir",
    region: "Domestic India",
    type: "Domestic Escape",
    from: "₹28K pp",
    bestWindow: "Mar – Oct",
    nights: "5N / 6D",
    visa: "Not required",
    conversations: 692,
    qualifiedRate: 25,
    highIntentRate: 18,
    itinerariesSent: 164,
    bookingIntent: 31,
    dominantTripType: "Family Holiday",
    topParty: "4 Adults",
    medianBudget: "₹1.5L",
    drivers: [
      { label: "Entry Price", value: 246 },
      { label: "Houseboat Stay", value: 188 },
      { label: "Gulmarg & Pahalgam", value: 152 },
      { label: "Comfortable for Parents", value: 118 },
      { label: "No Visa Needed", value: 92 },
    ],
    objections: [
      { label: "Hotel Quality", value: 208 },
      { label: "Road Travel Time", value: 141 },
      { label: "Package Price", value: 96 },
      { label: "Weather Uncertainty", value: 82 },
      { label: "Cab / Private Transfer Cost", value: 58 },
    ],
    competitors: [
      { label: "Local Agent (Srinagar)", value: 132 },
      { label: "MakeMyTrip Holidays", value: 88 },
      { label: "Veena World", value: 51 },
      { label: "TravelTriangle", value: 42 },
    ],
    sourceMix: [
      { label: "Meta / Instagram", value: 37 },
      { label: "WhatsApp Enquiry", value: 24 },
      { label: "Google Search", value: 19 },
      { label: "Referral", value: 12 },
      { label: "Walk-in", value: 8 },
    ],
    departureMix: [
      { label: "Chennai", value: 24 },
      { label: "Ahmedabad", value: 21 },
      { label: "Kolkata", value: 20 },
      { label: "Hyderabad", value: 19 },
      { label: "Bengaluru", value: 16 },
    ],
    trend: trendFor(54, 14),
    brief:
      "Kashmir is the highest-volume domestic product and the most quality-sensitive. Travellers repeatedly ask for verified hotel photographs and are wary of houseboat standards after competitor experiences. Multi-generational groups travelling with parents ask about road-travel time between Srinagar, Gulmarg and Pahalgam more than about price.",
    advisors: [
      { name: "Sneha Kapoor", calls: 176, quality: 81, itineraries: 41 },
      { name: "Arjun Rao", calls: 154, quality: 76, itineraries: 34 },
      { name: "Rohan Mehta", calls: 141, quality: 74, itineraries: 27 },
      { name: "Neha Reddy", calls: 98, quality: 88, itineraries: 28 },
    ],
  },
];

export const destinationNames = destinations.map((d) => d.name);
export const destinationShorts = destinations.map((d) => d.short);

/* ------------------------------------------------------------------ */
/* Portfolio KPIs                                                      */
/* ------------------------------------------------------------------ */

export const topKpis = [
  { label: "Traveller Conversations", value: "5,986", delta: "+9.2%", up: true, tone: "primary" },
  { label: "Qualified Enquiries", value: "1,741", delta: "+6.4%", up: true, tone: "info" },
  { label: "High-Intent Travellers", value: "428", delta: "+12.1%", up: true, tone: "success" },
  { label: "Itineraries Sent", value: "1,532", delta: "+5.8%", up: true, tone: "classify" },
  { label: "Booking Intent Detected", value: "344", delta: "+10.4%", up: true, tone: "warning" },
  { label: "Opportunities at Risk", value: "71", delta: "+13.0%", up: false, tone: "danger" },
] as const;

export const secondaryKpis = [
  { label: "Avg Sales Quality", value: "80%", sub: "Across 8 advisors" },
  { label: "Avg Conversation", value: "6:12", sub: "Duration" },
  { label: "Answer Rate", value: "74%", sub: "Inbound + outbound" },
  { label: "Quote → Booking", value: "22%", sub: "Itinerary conversion" },
  { label: "Avg Ticket Size", value: "₹2.9L", sub: "Per confirmed booking" },
  { label: "WhatsApp Share", value: "46%", sub: "Of all conversations" },
] as const;

export const volumeTrend = Array.from({ length: 30 }, (_, i) => {
  const base = 132 + Math.sin(i / 3.4) * 24 + (i > 20 ? 16 : 0);
  const weekend = i % 7 === 5 || i % 7 === 6 ? 18 : 0;
  return {
    day: `${String(((i + 8) % 30) + 1).padStart(2, "0")} ${i < 22 ? "Jul" : "Aug"}`,
    calls: Math.round(base + weekend),
    whatsapp: Math.round((base + weekend) * 0.82 + (i % 4) * 4),
  };
});

export const intentDistribution = [
  { name: "High", value: 24, color: "var(--color-success)" },
  { name: "Medium", value: 48, color: "var(--color-warning)" },
  { name: "Low", value: 28, color: "var(--color-muted-foreground)" },
];

export const sentimentDistribution = [
  { name: "Positive", value: 57, color: "var(--color-success)" },
  { name: "Neutral", value: 31, color: "var(--color-warning)" },
  { name: "Negative", value: 12, color: "var(--color-danger)" },
];

export const destinationDemand = destinations
  .map((d) => ({ label: d.short, value: Math.round((d.conversations * d.qualifiedRate) / 100) }))
  .sort((a, b) => b.value - a.value);

export const tripTypeSplit = [
  { label: "Family Holiday", value: 34 },
  { label: "Honeymoon", value: 21 },
  { label: "Friends Trip", value: 17 },
  { label: "Couple Holiday", value: 14 },
  { label: "Anniversary", value: 8 },
  { label: "Multi-Generational", value: 6 },
];

export const partyMix = [
  { label: "2 Adults", value: 38 },
  { label: "2 Adults + 1 Child", value: 14 },
  { label: "2 Adults + 2 Children", value: 21 },
  { label: "4 Adults", value: 19 },
  { label: "6+ (Group)", value: 8 },
];

export const budgetBands = [
  { label: "Under ₹1L", value: 8 },
  { label: "₹1L – ₹2L", value: 21 },
  { label: "₹2L – ₹3L", value: 28 },
  { label: "₹3L – ₹4.5L", value: 24 },
  { label: "₹4.5L – ₹6L", value: 12 },
  { label: "₹6L+", value: 7 },
];

export const departureCityDemand = [
  { label: "Bengaluru", value: 1284 },
  { label: "Mumbai", value: 1046 },
  { label: "Delhi NCR", value: 968 },
  { label: "Hyderabad", value: 892 },
  { label: "Chennai", value: 561 },
  { label: "Pune", value: 448 },
  { label: "Kolkata", value: 331 },
  { label: "Ahmedabad", value: 268 },
  { label: "Kochi", value: 188 },
];

export const travelWindowDemand = [
  { label: "Sep 2026", value: 412 },
  { label: "Oct 2026 (Diwali)", value: 688 },
  { label: "Nov 2026", value: 596 },
  { label: "Dec 2026 (School Break)", value: 1042 },
  { label: "Jan 2027", value: 604 },
  { label: "Feb 2027", value: 488 },
  { label: "Apr 2027 (Summer Break)", value: 742 },
  { label: "Flexible", value: 414 },
];

export const requirementSignals = [
  { label: "Vegetarian meals", value: 741 },
  { label: "Travelling with children", value: 688 },
  { label: "Visa assistance", value: 604 },
  { label: "Private transfers", value: 486 },
  { label: "Travelling with parents", value: 412 },
  { label: "Indian restaurants nearby", value: 388 },
  { label: "EMI / instalment payment", value: 341 },
  { label: "Jain meals", value: 214 },
  { label: "Early check-in", value: 188 },
  { label: "Extra baggage", value: 162 },
  { label: "Travel insurance", value: 148 },
];

export const topObjections = [
  { label: "Package Price", value: 1146 },
  { label: "Flight Cost", value: 812 },
  { label: "Competitor Quote", value: 664 },
  { label: "Hotel Quality / Category", value: 588 },
  { label: "Visa Concern", value: 502 },
  { label: "Hotel Location", value: 411 },
  { label: "Itinerary Pace", value: 288 },
  { label: "Payment Terms", value: 214 },
];

export const executiveBrief = [
  {
    tone: "danger" as const,
    title: "December departures are being lost on flight cost",
    body: "Flight-cost objections on December departures rose 24% in the last 30 days, concentrated on Bengaluru–Bali and Delhi NCR–Bangkok routes where travellers are comparing our flight-inclusive quote against DIY bookings.",
    meta: "Portfolio · last 30 days",
  },
  {
    tone: "success" as const,
    title: "WhatsApp itineraries convert faster",
    body: "Travellers who receive the itinerary on WhatsApp within 30 minutes of the call are 1.8x more likely to reach quote-negotiation stage than those who receive it by email later the same day.",
    meta: "1,532 itineraries analysed",
  },
  {
    tone: "warning" as const,
    title: "71 high-intent travellers awaiting follow-up",
    body: "23 of these have already received a quote and asked for one revision that has not been sent. Bali and Dubai account for 58% of the backlog.",
    meta: "Opportunity leakage",
  },
  {
    tone: "info" as const,
    title: "Schengen visa anxiety is the Europe blocker",
    body: "Visa concern now leads price as the top Europe objection. Conversations where the advisor confirms appointment support in the first call show a 19-point higher qualified rate.",
    meta: "Europe · emerging pattern",
  },
  {
    tone: "classify" as const,
    title: "Family holidays are the portfolio engine",
    body: "Family holidays account for 34% of qualified conversations and 41% of booking intent, with 2 adults + 2 children the single largest party composition.",
    meta: "Trip-type demand",
  },
];

export type Leak = {
  traveller: string;
  destination: string;
  reason: string;
  intent: number;
  lastContact: string;
  advisor: string;
  value: string;
  risk: "High" | "Medium" | "Low";
};

export const opportunityLeakage: Leak[] = [
  { traveller: "Arjun Mehta", destination: "Bali Honeymoon & Couples", reason: "Revised quote promised, not sent", intent: 89, lastContact: "2h ago", advisor: "Neha Reddy", value: "₹2.8L", risk: "High" },
  { traveller: "Neha & Rohan Shah", destination: "Maldives Luxury & Anniversary", reason: "Hotel upgrade options pending", intent: 91, lastContact: "4d ago", advisor: "Priya Sharma", value: "₹4.2L", risk: "High" },
  { traveller: "Vikram Reddy Family", destination: "Dubai Family Holiday", reason: "Theme-park pass pricing not shared", intent: 88, lastContact: "3d ago", advisor: "Vikram Singh", value: "₹3.6L", risk: "High" },
  { traveller: "Siddharth Rao", destination: "Bali Honeymoon & Couples", reason: "Competitor quote unanswered", intent: 84, lastContact: "2d ago", advisor: "Rohan Mehta", value: "₹2.3L", risk: "High" },
  { traveller: "Karthik & Divya Menon", destination: "Europe Multi-Country", reason: "Visa documentation checklist not sent", intent: 82, lastContact: "5d ago", advisor: "Rahul Verma", value: "₹5.9L", risk: "High" },
  { traveller: "Rohit Agarwal", destination: "Thailand Couples & Friends", reason: "Flight-inclusive option not re-quoted", intent: 78, lastContact: "1d ago", advisor: "Arjun Rao", value: "₹1.8L", risk: "Medium" },
  { traveller: "Pooja Mehta Family", destination: "Singapore & Malaysia Family", reason: "Family-room option not offered", intent: 74, lastContact: "3d ago", advisor: "Kavya Menon", value: "₹3.4L", risk: "Medium" },
  { traveller: "Aditi Rao", destination: "Vietnam Explorer", reason: "Itinerary comparison not addressed", intent: 71, lastContact: "4d ago", advisor: "Sneha Kapoor", value: "₹3.2L", risk: "Medium" },
  { traveller: "Nikhil Verma", destination: "Dubai Family Holiday", reason: "Group quote for 4 adults pending", intent: 69, lastContact: "6d ago", advisor: "Rohan Mehta", value: "₹3.3L", risk: "Medium" },
  { traveller: "Divya Krishnan", destination: "Kashmir & Himalayan Escapes", reason: "Hotel photographs requested, not shared", intent: 77, lastContact: "2d ago", advisor: "Sneha Kapoor", value: "₹1.5L", risk: "Medium" },
  { traveller: "Ananya Sharma", destination: "Maldives Luxury & Anniversary", reason: "EMI option not explained", intent: 66, lastContact: "5d ago", advisor: "Priya Sharma", value: "₹3.9L", risk: "Low" },
  { traveller: "Harish Shetty", destination: "Thailand Couples & Friends", reason: "Long inactivity after quote", intent: 61, lastContact: "8d ago", advisor: "Arjun Rao", value: "₹1.6L", risk: "Low" },
];

/* ------------------------------------------------------------------ */
/* Sales advisors                                                      */
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
    destination: number;
    budget: number;
    itinerary: number;
    objection: number;
    competitor: number;
    upsell: number;
    followUp: number;
  };
  topDestinations: { label: string; value: number }[];
  drivers: { label: string; value: number }[];
  activity: { day: string; calls: number }[];
  coaching: { tone: "success" | "warning" | "danger" | "info"; text: string }[];
};

const activity = (base: number) =>
  Array.from({ length: 14 }, (_, i) => ({
    day: `D${i + 1}`,
    calls: Math.max(4, Math.round(base + Math.sin(i / 1.6) * base * 0.35 - (i % 7 === 6 ? base * 0.4 : 0))),
  }));

export const advisors: Advisor[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Senior Holiday Advisor · Bali, Maldives & Europe",
    calls: 612,
    quality: 86,
    avgDuration: "6:38",
    answerRate: 78,
    inbound: 344,
    outbound: 268,
    recorded: 598,
    sentiment: { positive: 61, neutral: 30, negative: 9 },
    scores: { needs: 89, destination: 92, budget: 84, itinerary: 87, objection: 79, competitor: 71, upsell: 82, followUp: 85 },
    topDestinations: [
      { label: "Bali", value: 176 },
      { label: "Maldives", value: 142 },
      { label: "Europe", value: 154 },
      { label: "Singapore", value: 68 },
    ],
    drivers: [
      { label: "Destination Enquiry", value: 188 },
      { label: "Package Pricing", value: 141 },
      { label: "Hotel Options", value: 118 },
      { label: "Honeymoon Inclusions", value: 96 },
      { label: "Visa Assistance", value: 75 },
    ],
    activity: activity(22),
    coaching: [
      { tone: "success", text: "Outstanding destination knowledge — resort-level detail on Bali and Maldives is quoted accurately in 92% of calls." },
      { tone: "success", text: "Needs discovery is a team benchmark: travel window, party composition and budget captured in 89% of first calls." },
      { tone: "warning", text: "Competitor handling is her weakest dimension (71%). When MakeMyTrip flight-inclusive quotes are raised, she defends on hotel quality rather than rebuilding the total-cost comparison." },
    ],
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    role: "Holiday Advisor · Dubai, Singapore & Europe",
    calls: 589,
    quality: 84,
    avgDuration: "6:04",
    answerRate: 75,
    inbound: 322,
    outbound: 267,
    recorded: 571,
    sentiment: { positive: 56, neutral: 33, negative: 11 },
    scores: { needs: 90, destination: 91, budget: 82, itinerary: 86, objection: 76, competitor: 74, upsell: 78, followUp: 66 },
    topDestinations: [
      { label: "Dubai", value: 181 },
      { label: "Singapore", value: 162 },
      { label: "Europe", value: 138 },
      { label: "Thailand", value: 108 },
    ],
    drivers: [
      { label: "Destination Enquiry", value: 178 },
      { label: "Itinerary Detail", value: 138 },
      { label: "Attraction Tickets", value: 121 },
      { label: "Package Pricing", value: 106 },
      { label: "Visa Assistance", value: 84 },
    ],
    activity: activity(21),
    coaching: [
      { tone: "success", text: "Strongest needs discovery in the team — captures children's ages, school-holiday dates and meal preference almost every call." },
      { tone: "success", text: "Package knowledge on Dubai and Singapore attraction combos is accurate and confidently quoted." },
      { tone: "danger", text: "Follow-up commitment is the team's lowest (66%). Ends 4 in 10 qualified calls without a stated date and time for the next contact." },
    ],
  },
  {
    id: "neha-reddy",
    name: "Neha Reddy",
    role: "Senior Holiday Advisor · Honeymoon & Luxury Desk",
    calls: 544,
    quality: 88,
    avgDuration: "7:02",
    answerRate: 80,
    inbound: 302,
    outbound: 242,
    recorded: 536,
    sentiment: { positive: 68, neutral: 26, negative: 6 },
    scores: { needs: 87, destination: 90, budget: 85, itinerary: 91, objection: 88, competitor: 80, upsell: 89, followUp: 84 },
    topDestinations: [
      { label: "Bali", value: 214 },
      { label: "Maldives", value: 168 },
      { label: "Kashmir", value: 98 },
      { label: "Thailand", value: 64 },
    ],
    drivers: [
      { label: "Honeymoon Inclusions", value: 186 },
      { label: "Destination Enquiry", value: 152 },
      { label: "Hotel Upgrade", value: 141 },
      { label: "Package Pricing", value: 108 },
      { label: "Anniversary Add-Ons", value: 82 },
    ],
    activity: activity(20),
    coaching: [
      { tone: "success", text: "Best objection handling in the team (88%) — reframes price into per-couple, per-night value before offering any discount." },
      { tone: "success", text: "Highest customer sentiment at 68% positive; honeymoon and anniversary couples consistently ask for her by name on repeat contact." },
      { tone: "info", text: "Use her Maldives seaplane-versus-speedboat explanation as the team coaching benchmark." },
    ],
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    role: "Holiday Advisor · International Long-Haul Desk",
    calls: 501,
    quality: 82,
    avgDuration: "6:21",
    answerRate: 72,
    inbound: 276,
    outbound: 225,
    recorded: 488,
    sentiment: { positive: 54, neutral: 34, negative: 12 },
    scores: { needs: 81, destination: 90, budget: 78, itinerary: 84, objection: 74, competitor: 76, upsell: 72, followUp: 71 },
    topDestinations: [
      { label: "Europe", value: 192 },
      { label: "Dubai", value: 198 },
      { label: "Maldives", value: 96 },
      { label: "Singapore", value: 96 },
    ],
    drivers: [
      { label: "Visa Assistance", value: 168 },
      { label: "Destination Enquiry", value: 152 },
      { label: "Itinerary Detail", value: 124 },
      { label: "Flight Options", value: 98 },
      { label: "Package Pricing", value: 88 },
    ],
    activity: activity(18),
    coaching: [
      { tone: "success", text: "Deepest international destination knowledge — Schengen routing, rail passes and Dubai attraction sequencing are explained accurately." },
      { tone: "warning", text: "Closing performance is moderate (71% follow-up commitment). Detailed itinerary explanations often run past the point where the traveller is ready to confirm." },
      { tone: "info", text: "Upsell dimension at 72% — insurance and private transfers are mentioned but rarely priced in the same call." },
    ],
  },
  {
    id: "sneha-kapoor",
    name: "Sneha Kapoor",
    role: "Holiday Advisor · Vietnam, Kashmir & Domestic",
    calls: 486,
    quality: 81,
    avgDuration: "5:44",
    answerRate: 73,
    inbound: 268,
    outbound: 218,
    recorded: 472,
    sentiment: { positive: 53, neutral: 35, negative: 12 },
    scores: { needs: 84, destination: 83, budget: 80, itinerary: 82, objection: 75, competitor: 69, upsell: 74, followUp: 79 },
    topDestinations: [
      { label: "Kashmir", value: 176 },
      { label: "Vietnam", value: 132 },
      { label: "Bali", value: 152 },
      { label: "Singapore", value: 118 },
    ],
    drivers: [
      { label: "Hotel Quality", value: 158 },
      { label: "Destination Enquiry", value: 141 },
      { label: "Package Pricing", value: 112 },
      { label: "Private Transfers", value: 88 },
      { label: "Meal Preference", value: 71 },
    ],
    activity: activity(17),
    coaching: [
      { tone: "success", text: "Handles hotel-quality doubts well on Kashmir by sending verified property photographs during the call." },
      { tone: "warning", text: "Competitor handling at 69% — TravelTriangle and Pickyourtrail itineraries are acknowledged but not compared inclusion by inclusion." },
      { tone: "info", text: "Vegetarian and Jain meal confirmation should be captured in discovery, not at quote stage." },
    ],
  },
  {
    id: "arjun-rao",
    name: "Arjun Rao",
    role: "Holiday Advisor · Thailand, Vietnam & Groups",
    calls: 462,
    quality: 76,
    avgDuration: "5:12",
    answerRate: 68,
    inbound: 258,
    outbound: 204,
    recorded: 441,
    sentiment: { positive: 47, neutral: 37, negative: 16 },
    scores: { needs: 76, destination: 80, budget: 72, itinerary: 77, objection: 68, competitor: 64, upsell: 70, followUp: 72 },
    topDestinations: [
      { label: "Thailand", value: 168 },
      { label: "Vietnam", value: 148 },
      { label: "Kashmir", value: 154 },
      { label: "Dubai", value: 122 },
    ],
    drivers: [
      { label: "Flight Price", value: 162 },
      { label: "Package Pricing", value: 138 },
      { label: "Group Rooming", value: 104 },
      { label: "Destination Enquiry", value: 96 },
      { label: "Itinerary Detail", value: 74 },
    ],
    activity: activity(16),
    coaching: [
      { tone: "danger", text: "Objection handling at 68% — flight-price objections on Thailand are conceded with a discount instead of re-quoted on an alternate carrier or date." },
      { tone: "warning", text: "Average call at 5:12 — group enquiries are being quoted before rooming and budget-per-head are confirmed." },
      { tone: "info", text: "Shadow Neha Reddy on two price-objection calls per week." },
    ],
  },
  {
    id: "kavya-menon",
    name: "Kavya Menon",
    role: "Holiday Advisor · Family Desk · Singapore & Dubai",
    calls: 447,
    quality: 79,
    avgDuration: "5:56",
    answerRate: 71,
    inbound: 252,
    outbound: 195,
    recorded: 432,
    sentiment: { positive: 51, neutral: 36, negative: 13 },
    scores: { needs: 82, destination: 81, budget: 77, itinerary: 80, objection: 72, competitor: 68, upsell: 76, followUp: 77 },
    topDestinations: [
      { label: "Singapore", value: 141 },
      { label: "Dubai", value: 148 },
      { label: "Thailand", value: 132 },
      { label: "Europe", value: 96 },
    ],
    drivers: [
      { label: "Hotel Location", value: 148 },
      { label: "Attraction Tickets", value: 121 },
      { label: "Destination Enquiry", value: 112 },
      { label: "Child Policy", value: 94 },
      { label: "Package Pricing", value: 86 },
    ],
    activity: activity(15),
    coaching: [
      { tone: "success", text: "Strong with families — child ages and school-holiday dates are captured early and used to shape the itinerary." },
      { tone: "warning", text: "Hotel-location objections on Singapore are answered with map links but rarely with an alternate property in the same quote." },
      { tone: "info", text: "Family-room availability should be checked before quoting two twin rooms." },
    ],
  },
  {
    id: "rohan-mehta",
    name: "Rohan Mehta",
    role: "Holiday Advisor · Bali, Thailand & Kashmir",
    calls: 428,
    quality: 74,
    avgDuration: "4:52",
    answerRate: 65,
    inbound: 236,
    outbound: 192,
    recorded: 402,
    sentiment: { positive: 44, neutral: 38, negative: 18 },
    scores: { needs: 73, destination: 78, budget: 70, itinerary: 74, objection: 65, competitor: 61, upsell: 66, followUp: 68 },
    topDestinations: [
      { label: "Bali", value: 141 },
      { label: "Thailand", value: 186 },
      { label: "Kashmir", value: 141 },
      { label: "Vietnam", value: 108 },
    ],
    drivers: [
      { label: "Package Pricing", value: 146 },
      { label: "Competitor Quote", value: 118 },
      { label: "Flight Price", value: 104 },
      { label: "Destination Enquiry", value: 88 },
      { label: "Hotel Category", value: 62 },
    ],
    activity: activity(14),
    coaching: [
      { tone: "danger", text: "Competitor handling at 61% is the lowest in the team — cheaper Bali quotes are matched on price without comparing villa category or inclusions." },
      { tone: "warning", text: "Discovery is cut short: travel window is confirmed in only 58% of first calls, leading to re-quotes later." },
      { tone: "info", text: "Send the itinerary on WhatsApp before ending the call rather than promising it for later." },
    ],
  },
];

export const scoringDimensions = [
  { key: "needs", label: "Needs Discovery" },
  { key: "destination", label: "Destination Knowledge" },
  { key: "budget", label: "Budget Qualification" },
  { key: "itinerary", label: "Itinerary Fit" },
  { key: "objection", label: "Objection Handling" },
  { key: "competitor", label: "Competitor Handling" },
  { key: "upsell", label: "Upsell & Inclusions" },
  { key: "followUp", label: "Follow-Up Commitment" },
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
  { label: "Destination Enquiry", value: 1486 },
  { label: "Package Pricing", value: 1241 },
  { label: "Hotel Options", value: 964 },
  { label: "Flight & Departure City", value: 812 },
  { label: "Visa Assistance", value: 688 },
  { label: "Itinerary Detail", value: 604 },
  { label: "Meal Preference", value: 421 },
  { label: "Payment & EMI", value: 341 },
];

export const classifications = [
  {
    title: "Traveller Stage",
    values: [
      { label: "Enquiry", value: 29, tone: "info" },
      { label: "Qualification", value: 24, tone: "classify" },
      { label: "Itinerary Shared", value: 21, tone: "warning" },
      { label: "Quote Negotiation", value: 14, tone: "primary" },
      { label: "Booking Confirmation", value: 8, tone: "success" },
      { label: "Post-Booking", value: 4, tone: "success" },
    ],
  },
  {
    title: "Trip Type",
    values: [
      { label: "Family Holiday", value: 34, tone: "primary" },
      { label: "Honeymoon", value: 21, tone: "success" },
      { label: "Friends Trip", value: 17, tone: "info" },
      { label: "Couple Holiday", value: 14, tone: "classify" },
      { label: "Anniversary", value: 8, tone: "warning" },
      { label: "Multi-Generational", value: 6, tone: "danger" },
    ],
  },
  {
    title: "Party Composition",
    values: [
      { label: "2 Adults", value: 38, tone: "primary" },
      { label: "2 Adults + 2 Children", value: 21, tone: "info" },
      { label: "4 Adults", value: 19, tone: "classify" },
      { label: "2 Adults + 1 Child", value: 14, tone: "warning" },
      { label: "6+ Group", value: 8, tone: "danger" },
    ],
  },
  {
    title: "Travel Window",
    values: [
      { label: "Within 30 days", value: 16, tone: "success" },
      { label: "1–2 months", value: 27, tone: "primary" },
      { label: "3–4 months", value: 31, tone: "info" },
      { label: "School holidays", value: 18, tone: "warning" },
      { label: "Flexible / undecided", value: 8, tone: "danger" },
    ],
  },
  {
    title: "Payment Preference",
    values: [
      { label: "Full Payment", value: 41, tone: "success" },
      { label: "Advance + Balance", value: 34, tone: "info" },
      { label: "EMI / Card Instalments", value: 17, tone: "warning" },
      { label: "Undecided", value: 8, tone: "danger" },
    ],
  },
  {
    title: "Intent Level",
    values: [
      { label: "High", value: 24, tone: "success" },
      { label: "Medium", value: 48, tone: "warning" },
      { label: "Low", value: 28, tone: "danger" },
    ],
  },
] as const;

export const recentAiInsights = [
  { tone: "danger" as const, title: "Objection left unresolved", body: "Rohan Mehta matched a cheaper Bali quote on price in 6 of 9 recent calls without comparing villa category or honeymoon inclusions.", meta: "Rohan Mehta · 12 Aug" },
  { tone: "success" as const, title: "Strong value reframing", body: "Neha Reddy converted three ₹4L+ Maldives price objections this week by reframing the quote as per-couple, per-night all-inclusive value.", meta: "Neha Reddy · 12 Aug" },
  { tone: "warning" as const, title: "Emerging traveller trend", body: "Vegetarian and Jain meal confirmation requests rose 28% on Europe and Vietnam enquiries over the last two weeks.", meta: "Market signal · 11 Aug" },
  { tone: "info" as const, title: "Destination issue detected", body: "Hotel-quality doubt is the leading Kashmir objection; 26% of travellers asked for actual property photographs before confirming.", meta: "Kashmir · 11 Aug" },
  { tone: "classify" as const, title: "Competitor pattern", body: "MakeMyTrip Holidays mentions rose 22% among Bali and Thailand travellers; the comparison is almost always on flight-inclusive pricing.", meta: "Market Intelligence · 10 Aug" },
  { tone: "warning" as const, title: "Advisor behaviour", body: "Rahul Verma ended 4 in 10 qualified calls without committing to a specific follow-up time, against a team average of 2 in 10.", meta: "Rahul Verma · 10 Aug" },
  { tone: "success" as const, title: "Follow-up effectiveness", body: "Itineraries sent on WhatsApp within 30 minutes of the call lifted quote-negotiation rate 1.8x across Bali and Dubai.", meta: "Portfolio · 09 Aug" },
  { tone: "info" as const, title: "Traveller trend", body: "EMI and instalment questions appeared in 17% of ₹3L+ conversations, up from 12% last month, strongest in Hyderabad and Chennai.", meta: "Portfolio · 09 Aug" },
];

/* ------------------------------------------------------------------ */
/* Conversations (calls + WhatsApp)                                    */
/* ------------------------------------------------------------------ */

export type Call = {
  id: string;
  traveller: string;
  phone: string;
  advisor: string;
  destination: string;
  departureCity: string;
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
  tripType: string;
  outcome: string;
  party: string;
  budget: string;
  travelWindow: string;
  payment: string;
  objection: string;
  competitor: string;
  visa: string;
  requirements: string[];
  itinerary: string;
  summary: string;
  recommendedAction: string;
  coaching: string;
  scores: { label: string; value: number }[];
  transcript: { speaker: "advisor" | "traveller"; name: string; at: string; text: string }[];
};

export const heroCall: Call = {
  id: "CV-48219",
  traveller: "Arjun Mehta",
  phone: "+91 98450 21187",
  advisor: "Neha Reddy",
  destination: "Bali Honeymoon & Couples",
  departureCity: "Bengaluru",
  intent: 89,
  intentLevel: "High",
  intentReason:
    "Fixed December travel dates, a stated ₹2.5L–₹3L budget, honeymoon occasion confirmed and an explicit request for the itinerary on WhatsApp in the same conversation.",
  stage: "Quote Negotiation",
  stageReason:
    "Traveller has shortlisted Bali, received indicative pricing and is now comparing one competitor quote on flight-inclusive cost.",
  channel: "Call",
  direction: "Outbound",
  date: "12 Aug 2026",
  time: "14:22",
  duration: "7:04",
  sentiment: "Positive",
  tripType: "Honeymoon",
  outcome: "Revised Quote Requested",
  party: "2 Adults",
  budget: "₹2.5L – ₹3L",
  travelWindow: "2nd week of December 2026",
  payment: "Advance + Balance",
  objection: "Package Price",
  competitor: "MakeMyTrip Holidays",
  visa: "Visa on arrival — no action needed",
  requirements: ["Private pool villa", "Vegetarian breakfast", "Candlelight dinner", "Bengaluru departure"],
  itinerary: "Sent on WhatsApp — 12 Aug, 14:36",
  summary:
    "Arjun is planning his honeymoon to Bali in the second week of December for two adults, departing from Bengaluru. His budget is ₹2.5L–₹3L including flights. He is drawn to a private pool villa in Ubud with a Seminyak beach stay for the last two nights, and asked for a candlelight dinner to be included. He received a slightly cheaper quote elsewhere and asked whether the flight cost can be reduced. He asked for the itinerary on WhatsApp and said he can confirm this week if the total works within ₹2.5 lakh.",
  recommendedAction:
    "Send the Ubud + Seminyak split-stay itinerary on WhatsApp with a flight-inclusive ₹2.48L option on an alternate Bengaluru carrier, and call back Thursday evening to close.",
  coaching:
    "Advisor discovered the occasion, dates and budget well and handled the price objection with a value reframe. She did not directly break down the competitor's flight-inclusive quote, which was the traveller's actual comparison point.",
  scores: [
    { label: "Needs Discovery", value: 9 },
    { label: "Destination Knowledge", value: 9 },
    { label: "Budget Qualification", value: 9 },
    { label: "Itinerary Fit", value: 9 },
    { label: "Objection Handling", value: 8 },
    { label: "Competitor Handling", value: 6 },
    { label: "Upsell & Inclusions", value: 8 },
    { label: "Follow-Up Commitment", value: 9 },
  ],
  transcript: [
    { speaker: "advisor", name: "Neha Reddy", at: "0:00", text: "Good afternoon Arjun, this is Neha from GT Holidays, calling about your Bali enquiry. Is this a good time to talk?" },
    { speaker: "traveller", name: "Arjun Mehta", at: "0:08", text: "Yes, please go ahead. I filled the form on Sunday." },
    { speaker: "advisor", name: "Neha Reddy", at: "0:13", text: "Thank you. Can I confirm a few basics — when are you planning to travel, and how many of you?" },
    { speaker: "traveller", name: "Arjun Mehta", at: "0:21", text: "It's just the two of us, it's our honeymoon. We're planning to travel sometime in the second week of December." },
    { speaker: "advisor", name: "Neha Reddy", at: "0:31", text: "Congratulations. December is a lovely time in Bali. And you'd be flying out of Bengaluru?" },
    { speaker: "traveller", name: "Arjun Mehta", at: "0:38", text: "Yes, Bengaluru. Does the package include the flights from Bengaluru?" },
    { speaker: "advisor", name: "Neha Reddy", at: "0:45", text: "It can, yes — I'll quote you a flight-inclusive package so there are no surprises later. What is the overall budget you have in mind?" },
    { speaker: "traveller", name: "Arjun Mehta", at: "0:56", text: "Our overall budget is around ₹2.5 lakh to ₹3 lakh including flights. We'd like it to be nice, but we don't want to overspend." },
    { speaker: "advisor", name: "Neha Reddy", at: "1:08", text: "That's a comfortable range for a six-night honeymoon. Most couples in that budget do three nights in Ubud in a private pool villa and then three nights near Seminyak beach. Would that suit you?" },
    { speaker: "traveller", name: "Arjun Mehta", at: "1:24", text: "The pool villa is definitely something my wife wants. She's seen photos of the ones in Ubud with the jungle view." },
    { speaker: "advisor", name: "Neha Reddy", at: "1:35", text: "Then I'd suggest a valley-facing villa in Ubud. I can also include a candlelight dinner and a flower-bath setup on the first evening as honeymoon inclusions." },
    { speaker: "traveller", name: "Arjun Mehta", at: "1:48", text: "That sounds good. One thing — we're both vegetarian, at least for breakfast we'd want proper options." },
    { speaker: "advisor", name: "Neha Reddy", at: "1:56", text: "Noted. Both the properties I'm considering have a full vegetarian breakfast spread, and I'll list two Indian restaurants near Seminyak in the itinerary." },
    { speaker: "traveller", name: "Arjun Mehta", at: "2:08", text: "Okay. Honestly, we got another quotation which is slightly cheaper — around ₹2.3 lakh with flights." },
    { speaker: "advisor", name: "Neha Reddy", at: "2:18", text: "May I ask what villa category that quote had? Most quotes at that level use a garden-view room rather than a private pool villa, and the airport transfers are usually shared." },
    { speaker: "traveller", name: "Arjun Mehta", at: "2:31", text: "I'm not sure honestly. It just said pool villa in the PDF." },
    { speaker: "advisor", name: "Neha Reddy", at: "2:38", text: "I'll send you our itinerary with the exact property names and room categories so you can compare like for like. On our side both transfers are private and the honeymoon inclusions are complimentary." },
    { speaker: "traveller", name: "Arjun Mehta", at: "2:52", text: "That's fair. Can you send the itinerary on WhatsApp? I'll go through it with my wife tonight." },
    { speaker: "advisor", name: "Neha Reddy", at: "3:01", text: "Of course, I'll send it on this number within the next fifteen minutes. Would you also like me to check flight options that reduce the layover in Kuala Lumpur?" },
    { speaker: "traveller", name: "Arjun Mehta", at: "3:14", text: "Yes please, the one you mentioned had almost a five-hour wait. And if everything works within ₹2.5 lakh, we can probably confirm this week." },
    { speaker: "advisor", name: "Neha Reddy", at: "3:27", text: "Understood. I'll work the package to ₹2.5 lakh all-inclusive with a shorter connection and share it today. Can I call you Thursday evening around 7 to take it forward?" },
    { speaker: "traveller", name: "Arjun Mehta", at: "3:41", text: "Thursday after 7 is fine. Thank you, Neha." },
  ],
};

/* ---- traveller pool (predominantly Indian, few international) ----- */

const travellerPool: [string, string, string][] = [
  ["Arjun Mehta", "+91 98450 21187", "Bengaluru"],
  ["Neha & Rohan Shah", "+91 98200 44127", "Mumbai"],
  ["Vikram Reddy Family", "+91 98490 77122", "Hyderabad"],
  ["Aditi Rao", "+91 98860 31904", "Bengaluru"],
  ["Karthik & Divya Menon", "+91 98470 66218", "Kochi"],
  ["Rohit Agarwal", "+91 98110 42298", "Delhi NCR"],
  ["Pooja Mehta Family", "+91 98220 71145", "Pune"],
  ["Siddharth Rao", "+91 99490 18863", "Hyderabad"],
  ["Divya Krishnan", "+91 98400 29917", "Chennai"],
  ["Nikhil Verma", "+91 98180 33471", "Delhi NCR"],
  ["Rahul Kapoor", "+91 98330 12240", "Mumbai"],
  ["Ananya Sharma", "+91 98450 66710", "Bengaluru"],
  ["Aditya Nair", "+91 98470 21158", "Kochi"],
  ["Sneha Kapoor Iyer", "+91 98670 40182", "Mumbai"],
  ["Karan Malhotra", "+91 98100 55823", "Delhi NCR"],
  ["Meera Joshi", "+91 98230 61147", "Pune"],
  ["Akash Patel", "+91 98250 33096", "Ahmedabad"],
  ["Varun Iyer", "+91 98410 78823", "Chennai"],
  ["Ritika Shah", "+91 98690 21140", "Ahmedabad"],
  ["Abhishek Jain", "+91 98300 44718", "Kolkata"],
  ["Sanjay Kulkarni", "+91 98220 99416", "Pune"],
  ["Nandini Bhat", "+91 98860 71234", "Bengaluru"],
  ["Harish Shetty", "+91 98450 88217", "Bengaluru"],
  ["Ankit Gupta", "+91 98180 62294", "Delhi NCR"],
  ["Pranav Desai", "+91 98250 71408", "Ahmedabad"],
  ["Aman Khanna", "+91 98110 90352", "Delhi NCR"],
  ["Deepak Sharma", "+91 98730 41128", "Delhi NCR"],
  ["Priya Iyer", "+91 98400 63317", "Chennai"],
  ["Shreya Menon", "+91 98470 55029", "Kochi"],
  ["Nisha Patel", "+91 98250 18874", "Ahmedabad"],
  ["Ishita Verma", "+91 98100 27743", "Delhi NCR"],
  ["Rhea Malhotra", "+91 98210 34490", "Mumbai"],
  ["Swati Kulkarni", "+91 98220 55613", "Pune"],
  ["Tanvi Desai", "+91 98250 90072", "Ahmedabad"],
  ["Aishwarya Shetty", "+91 98860 12285", "Bengaluru"],
  ["Simran Khanna", "+91 98110 76640", "Delhi NCR"],
  ["Shruti Agarwal", "+91 98300 21197", "Kolkata"],
  ["Siddharth & Nisha Kapoor", "+91 99490 66218", "Hyderabad"],
  ["Aditi Rao Family", "+91 98860 44031", "Bengaluru"],
  ["Vivek Bhat", "+91 98450 71129", "Bengaluru"],
  ["Rohan Shah", "+91 98210 88146", "Mumbai"],
  ["Kavya Nair", "+91 98470 33218", "Kochi"],
  ["Sneha Kapoor", "+91 98330 41172", "Mumbai"],
  ["Vikram Reddy", "+91 99490 28840", "Hyderabad"],
  ["Neha Reddy Iyer", "+91 98490 61123", "Hyderabad"],
  ["Rohit & Meera Agarwal", "+91 98110 55208", "Delhi NCR"],
  ["Karthik Menon", "+91 98470 12297", "Kochi"],
  ["Pooja Mehta", "+91 98220 34418", "Pune"],
  ["Arjun & Neha Mehta", "+91 98450 90067", "Bengaluru"],
  ["Nikhil & Shruti Verma", "+91 98180 71129", "Delhi NCR"],
  ["Ravi Deshmukh", "+91 98220 66104", "Pune"],
  ["Manish Agrawal", "+91 98300 77218", "Kolkata"],
  ["Sunita Iyer", "+91 98400 41185", "Chennai"],
  ["Gaurav Bhatia", "+91 98110 33297", "Delhi NCR"],
  ["Anjali Rao", "+91 99490 41176", "Hyderabad"],
  ["Prateek Sinha", "+91 98300 55142", "Kolkata"],
  ["Lakshmi Narayanan", "+91 98400 71160", "Chennai"],
  ["Sameer Qureshi", "+91 98210 22384", "Mumbai"],
  ["Ritu Chandran", "+91 98470 88213", "Kochi"],
  ["Yogesh Pandey", "+91 98180 41129", "Delhi NCR"],
  ["Bhavna Trivedi", "+91 98250 66317", "Ahmedabad"],
  ["Naveen Kumar", "+91 98860 22147", "Bengaluru"],
  ["Sarita Deshpande", "+91 98220 41180", "Pune"],
  ["Imran Sheikh", "+91 98330 71226", "Mumbai"],
  ["Anand Subramanian", "+91 98400 55291", "Chennai"],
  ["Ruchi Bansal", "+91 98110 66172", "Delhi NCR"],
  ["Tarun Chatterjee", "+91 98300 12248", "Kolkata"],
  ["Megha Saxena", "+91 98180 55036", "Delhi NCR"],
  ["Vinay Hegde", "+91 98450 33128", "Bengaluru"],
  ["James Fernandes", "+91 98220 71263", "Pune"],
  ["Sarah Whitfield", "+44 7700 900312", "London (NRI enquiry)"],
  ["Daniel Fischer", "+49 151 2345 6789", "Frankfurt (NRI enquiry)"],
  ["Aarav Chopra", "+971 50 442 8891", "Dubai (NRI enquiry)"],
];

const tripTypes = ["Honeymoon", "Family Holiday", "Friends Trip", "Couple Holiday", "Anniversary", "Multi-Generational"];
const parties = ["2 Adults", "2 Adults", "2 Adults + 2 Children", "4 Adults", "2 Adults + 1 Child", "6 Adults", "2 Adults + 2 Seniors"];
const budgetOptions = ["Under ₹1L", "₹1L – ₹2L", "₹2L – ₹3L", "₹2L – ₹3L", "₹3L – ₹4.5L", "₹4.5L – ₹6L", "₹6L+"];
const travelWindows = [
  "Within 30 days",
  "October 2026 (Diwali)",
  "2nd week of December 2026",
  "December 2026 (school break)",
  "January 2027",
  "April 2027 (summer break)",
  "Flexible",
];
const payments = ["Full Payment", "Advance + Balance", "EMI / Card Instalments", "Undecided"];
const objectionPool = [
  "Package Price",
  "Flight Cost",
  "Competitor Quote",
  "Hotel Quality / Category",
  "Hotel Location",
  "Visa Concern",
  "Itinerary Pace",
  "Payment Terms",
  "Connecting Flight Duration",
];
const competitorPool = [
  "MakeMyTrip Holidays",
  "Thomas Cook",
  "Veena World",
  "SOTC",
  "Pickyourtrail",
  "TravelTriangle",
  "Yatra Holidays",
  "Local Agent",
  "—",
];
const requirementPool = [
  "Vegetarian meals",
  "Jain meals",
  "Travelling with parents",
  "Travelling with children",
  "Private transfers",
  "Indian restaurants nearby",
  "Early check-in",
  "Extra baggage",
  "Travel insurance",
  "Sightseeing inclusions",
  "Hotel near city centre",
  "Departure-city flexibility",
];
const outcomes = [
  "Itinerary Sent",
  "Revised Quote Requested",
  "Hotel Options Shared",
  "Follow-Up Scheduled",
  "Booking Intent",
  "Advance Payment Discussed",
  "Discussing with Family",
  "Lost / Booked Elsewhere",
];
const stages = ["Enquiry", "Qualification", "Itinerary Shared", "Quote Negotiation", "Booking Confirmation", "Post-Booking"];

/* Hero traveller profiles — consistent across every screen */
const featuredProfiles: Record<string, {
  destinationId: string; tripType: string; party: string; budget: string; window: string;
  intent: number; objection: string; competitor: string; requirements: string[];
}> = {
  "Neha & Rohan Shah": { destinationId: "maldives", tripType: "Anniversary", party: "2 Adults", budget: "₹3.5L – ₹4.5L", window: "January 2027", intent: 91, objection: "Hotel Quality / Category", competitor: "Pickyourtrail", requirements: ["Overwater villa", "All-inclusive meal plan"] },
  "Vikram Reddy Family": { destinationId: "dubai", tripType: "Family Holiday", party: "2 Adults + 2 Children", budget: "₹3L – ₹4.5L", window: "December 2026 (school break)", intent: 88, objection: "Attraction Pass Add-Ons", competitor: "Thomas Cook", requirements: ["Travelling with children", "Indian restaurants nearby"] },
  "Aditi Rao": { destinationId: "vietnam", tripType: "Friends Trip", party: "4 Adults", budget: "₹3L – ₹4.5L", window: "October 2026 (Diwali)", intent: 71, objection: "Itinerary Comparison", competitor: "TravelTriangle", requirements: ["Vegetarian meals", "Sightseeing inclusions"] },
  "Karthik & Divya Menon": { destinationId: "europe", tripType: "Family Holiday", party: "2 Adults + 1 Child", budget: "₹4.5L – ₹6L", window: "April 2027 (summer break)", intent: 82, objection: "Visa Concern", competitor: "Veena World", requirements: ["Jain meals", "Travelling with children"] },
  "Rohit Agarwal": { destinationId: "thailand", tripType: "Couple Holiday", party: "2 Adults", budget: "₹1L – ₹2L", window: "Within 30 days", intent: 78, objection: "Flight Cost", competitor: "MakeMyTrip Holidays", requirements: ["Early check-in", "Private transfers"] },
  "Pooja Mehta Family": { destinationId: "singapore", tripType: "Family Holiday", party: "2 Adults + 2 Children", budget: "₹3L – ₹4.5L", window: "December 2026 (school break)", intent: 74, objection: "Hotel Location", competitor: "Thomas Cook", requirements: ["Travelling with children", "Vegetarian meals"] },
  "Siddharth Rao": { destinationId: "bali", tripType: "Honeymoon", party: "2 Adults", budget: "₹2L – ₹3L", window: "2nd week of December 2026", intent: 84, objection: "Competitor Quote", competitor: "MakeMyTrip Holidays", requirements: ["Private pool villa", "Candlelight dinner"] },
  "Divya Krishnan": { destinationId: "kashmir", tripType: "Family Holiday", party: "4 Adults", budget: "₹1L – ₹2L", window: "April 2027 (summer break)", intent: 77, objection: "Hotel Quality / Category", competitor: "Local Agent", requirements: ["Travelling with parents", "Vegetarian meals"] },
  "Nikhil Verma": { destinationId: "dubai", tripType: "Friends Trip", party: "4 Adults", budget: "₹3L – ₹4.5L", window: "November 2026", intent: 69, objection: "Package Price", competitor: "Yatra Holidays", requirements: ["Extra baggage", "Sightseeing inclusions"] },
};

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---- transcript templates keyed by the dominant objection -------- */

type Ctx = {
  traveller: string;
  first: string;
  advisor: string;
  short: string;
  city: string;
  tripType: string;
  party: string;
  budget: string;
  window: string;
  competitor: string;
  requirement: string;
};

function transcriptFor(ctx: Ctx, objection: string): Call["transcript"] {
  const a = (at: string, text: string) => ({ speaker: "advisor" as const, name: ctx.advisor, at, text });
  const t = (at: string, text: string) => ({ speaker: "traveller" as const, name: ctx.traveller, at, text });

  const open = [
    a("0:00", `Hello ${ctx.first}, this is ${ctx.advisor.split(" ")[0]} from GT Holidays regarding your ${ctx.short} enquiry. Is this a good time?`),
    t("0:07", "Yes, tell me."),
    a("0:11", `Thank you. Can I confirm the travel dates and how many people are travelling?`),
    t("0:18", `We're looking at ${ctx.window.toLowerCase()}, and it's ${ctx.party.toLowerCase()} — ${ctx.tripType.toLowerCase()}.`),
    a("0:28", `Noted. And you'd be departing from ${ctx.city}?`),
    t("0:33", `Yes, ${ctx.city}. Does the package include the flights?`),
    a("0:39", "I'll quote it flight-inclusive so there's nothing hidden later. What budget range are you working with?"),
    t("0:47", `Our overall budget is around ${ctx.budget.replace(/₹/g, "₹").toLowerCase().replace("l", " lakh")} including flights.`),
  ];

  const middle: Record<string, Call["transcript"]> = {
    "Package Price": [
      a("0:58", `For ${ctx.short} in that window, a comfortable ${ctx.party.toLowerCase()} package sits slightly above that with 4-star hotels and private transfers.`),
      t("1:12", "That's a bit more than we had planned. Can something be done on the price?"),
      a("1:20", "I can look at a same-category hotel slightly outside the main strip, or shift the dates by two days which usually reduces the airfare."),
      t("1:33", "Let's see both options. Please WhatsApp me the details and I'll check with my wife."),
    ],
    "Flight Cost": [
      a("0:58", `The land package is comfortably within your budget — most of the cost is the ${ctx.city} flight in that season.`),
      t("1:10", "Yes, the flights are what's pushing it up. Can you check a cheaper option?"),
      a("1:18", "I'll check an alternate carrier and a one-stop option. Would you consider flying out a day earlier if it saves around ₹18,000 for the two of you?"),
      t("1:32", "If it saves that much, yes. Send both options on WhatsApp."),
    ],
    "Competitor Quote": [
      a("0:58", `Based on that, I'd recommend our ${ctx.short} package with 4-star stays and private transfers throughout.`),
      t("1:09", `We got another quotation which is slightly cheaper — from ${ctx.competitor === "—" ? "another agency" : ctx.competitor}.`),
      a("1:18", "May I ask which hotels and which transfer type that quote had? Most cheaper quotes use shared transfers and a lower room category."),
      t("1:31", "I'll have to check the PDF again. It didn't mention transfers clearly."),
      a("1:38", "I'll send ours with exact property names and room categories so you can compare line by line."),
    ],
    "Hotel Quality / Category": [
      a("0:58", `That budget works well. I have two hotel options for ${ctx.short} — one is a newer 4-star, the other is an older property but better located.`),
      t("1:12", "Can you give us another hotel option? We've had a bad experience with older properties."),
      a("1:21", "Absolutely. I'll send actual photographs and recent guest reviews for three properties rather than just the names."),
      t("1:33", "That would help. Send it on WhatsApp please."),
    ],
    "Hotel Location": [
      a("0:58", `For that budget I'd suggest a hotel that's about fifteen minutes from the main sightseeing area.`),
      t("1:10", "We're travelling with two children, so we'd prefer something family-friendly and closer to the centre."),
      a("1:20", "Understood. I'll look at properties within walking distance of the metro and list the Indian restaurants nearby."),
      t("1:32", "Perfect. Also please check if we get a family room instead of two rooms."),
    ],
    "Visa Concern": [
      a("0:58", `The package itself fits your budget. The main thing to plan early is the visa.`),
      t("1:08", "Is visa included or do we have to apply separately?"),
      a("1:15", "We handle the documentation and the appointment. The processing takes around three weeks, so we should start once you confirm the dates."),
      t("1:28", "Okay. Please send the document checklist along with the itinerary."),
    ],
    "Itinerary Pace": [
      a("0:58", `The standard itinerary covers three cities, but that involves early starts on most days.`),
      t("1:10", "My parents are travelling with us, so too much travelling every day won't work."),
      a("1:19", "Then I'd suggest a slower version — two cities, longer stays, and a rest day in the middle."),
      t("1:31", "Yes, do that. And please confirm vegetarian meal availability."),
    ],
    "Payment Terms": [
      a("0:58", `Based on your requirements the total works out slightly above your range, but the inclusions are complete.`),
      t("1:10", "Can we do this in instalments? Or is EMI possible on the card?"),
      a("1:18", "Yes — 30% advance to confirm and the balance 21 days before departure, and we support no-cost EMI on most cards for up to six months."),
      t("1:32", "Good. Send the payment schedule with the itinerary."),
    ],
    "Connecting Flight Duration": [
      a("0:58", `The package fits your budget, and the flight I've considered has one stop.`),
      t("1:09", "How long is the layover? Last time we had almost six hours and it was very tiring."),
      a("1:18", "This one is a two-hour connection. There is also a direct option, around ₹9,000 more per person."),
      t("1:30", "Send both. We'd probably pay more for the direct one."),
    ],
  };

  const close = [
    a("2:02", `I'll also note your requirement for ${ctx.requirement.toLowerCase()} in the itinerary.`),
    t("2:10", "Yes please. We're still discussing it with the family, so give us a day or two."),
    a("2:18", `Of course. I'll send everything on WhatsApp within the hour and call you back day after tomorrow at 6pm. Does that work?`),
    t("2:29", "That works. Thank you."),
  ];

  return [...open, ...(middle[objection] ?? middle["Package Price"]!), ...close];
}

function buildCalls(): Call[] {
  const rnd = mulberry(42);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)]!;
  const list: Call[] = [heroCall];

  for (let i = 0; i < 79; i++) {
    const [traveller, phone, city] = travellerPool[(i + 1) % travellerPool.length]!;
    const featured = featuredProfiles[traveller!];
    const advisor = advisors[Math.floor(rnd() * advisors.length)]!;
    const destination = featured
      ? destinations.find((d) => d.id === featured.destinationId)!
      : destinations[Math.floor(rnd() * destinations.length)]!;
    const intent = featured?.intent ?? Math.round(28 + rnd() * 66);
    const intentLevel = intent >= 75 ? "High" : intent >= 50 ? "Medium" : "Low";
    const channel: Call["channel"] = rnd() > 0.5 ? "WhatsApp" : "Call";
    const sentiment: Call["sentiment"] =
      intent >= 70 ? "Positive" : intent >= 45 ? (rnd() > 0.5 ? "Neutral" : "Positive") : rnd() > 0.5 ? "Neutral" : "Negative";
    const tripType = featured?.tripType ??
      (destination.id === "bali" && rnd() > 0.5
        ? "Honeymoon"
        : destination.id === "dubai" || destination.id === "singapore"
          ? rnd() > 0.3
            ? "Family Holiday"
            : pick(tripTypes)
          : pick(tripTypes));
    const party = featured?.party ??
      (tripType === "Honeymoon" || tripType === "Anniversary" || tripType === "Couple Holiday"
        ? "2 Adults"
        : tripType === "Family Holiday"
          ? pick(["2 Adults + 2 Children", "2 Adults + 1 Child", "2 Adults + 2 Seniors"])
          : pick(parties));
    const budget = featured?.budget ?? pick(budgetOptions);
    const travelWindow = featured?.window ?? pick(travelWindows);
    const payment = pick(payments);
    const objection = featured?.objection ??
      (destination.id === "europe" && rnd() > 0.5
        ? "Visa Concern"
        : destination.id === "thailand" && rnd() > 0.5
          ? "Flight Cost"
          : destination.id === "kashmir" && rnd() > 0.5
            ? "Hotel Quality / Category"
            : pick(objectionPool));
    const competitor = featured?.competitor ?? pick(competitorPool);
    const requirements = featured?.requirements ?? Array.from(new Set([pick(requirementPool), pick(requirementPool)]));
    const day = 12 - Math.floor(i / 7);
    const mins = 3 + Math.floor(rnd() * 7);
    const secs = Math.floor(rnd() * 60);
    const outcome =
      intent >= 75
        ? pick(["Itinerary Sent", "Revised Quote Requested", "Booking Intent", "Advance Payment Discussed"])
        : pick(outcomes);
    const stage =
      intent >= 80
        ? pick(["Quote Negotiation", "Booking Confirmation", "Itinerary Shared"])
        : intent >= 55
          ? pick(["Qualification", "Itinerary Shared", "Quote Negotiation"])
          : pick(["Enquiry", "Qualification"]);
    const visa =
      destination.visa === "Not required"
        ? "Not required — domestic"
        : intent >= 60
          ? `${destination.visa} — assistance requested`
          : `${destination.visa} — not yet discussed`;
    const first = traveller!.split(" ")[0]!;

    list.push({
      id: `CV-${48220 + i}`,
      traveller: traveller!,
      phone: phone!,
      advisor: advisor.name,
      destination: destination.name,
      departureCity: city!,
      intent,
      intentLevel,
      intentReason: `${intentLevel} intent: ${travelWindow.toLowerCase()} travel window, ${payment.toLowerCase()} preference and a stated budget of ${budget} for ${party.toLowerCase()} confirmed in conversation.`,
      stage,
      stageReason: `Assigned ${stage} — traveller discussed ${objection.toLowerCase()} on the ${destination.short} package and the conversation ended with ${outcome.toLowerCase()}.`,
      channel,
      direction: rnd() > 0.42 ? "Inbound" : "Outbound",
      date: `${String(Math.max(1, day)).padStart(2, "0")} Aug 2026`,
      time: `${String(9 + Math.floor(rnd() * 11)).padStart(2, "0")}:${String(Math.floor(rnd() * 60)).padStart(2, "0")}`,
      duration: `${mins}:${String(secs).padStart(2, "0")}`,
      sentiment,
      tripType,
      outcome,
      party,
      budget,
      travelWindow,
      payment,
      objection,
      competitor,
      visa,
      requirements,
      itinerary: outcome === "Itinerary Sent" || intent >= 70 ? "Sent on WhatsApp" : "Not yet sent",
      summary: `${first} enquired about the ${destination.short} package for ${party.toLowerCase()} departing from ${city}, travelling ${travelWindow.toLowerCase()}. The trip is a ${tripType.toLowerCase()} with a budget of ${budget}. ${objection} was the main point of friction${competitor !== "—" ? `, with ${competitor} mentioned as a comparison` : ""}. Requirements captured: ${requirements.join(", ").toLowerCase()}. Outcome: ${outcome.toLowerCase()}.`,
      recommendedAction:
        objection === "Flight Cost"
          ? `Re-quote the ${destination.short} package with an alternate ${city} carrier and share the saving on WhatsApp today.`
          : objection === "Visa Concern"
            ? "Send the visa document checklist and confirm appointment support before quoting again."
            : objection === "Competitor Quote"
              ? `Send a line-by-line inclusion comparison against ${competitor === "—" ? "the competing quote" : competitor} with exact hotel names.`
              : objection === "Hotel Quality / Category"
                ? "Share actual property photographs and recent reviews for three alternative hotels."
                : objection === "Payment Terms"
                  ? "Send the instalment schedule and no-cost EMI options along with the itinerary."
                  : `Send the ${destination.short} itinerary on WhatsApp and call back with a confirmed follow-up slot.`,
      coaching:
        intent >= 75
          ? "Traveller signalled strong intent early; advisor should have asked for the advance payment date rather than leaving the follow-up open."
          : `Discovery captured dates and party size, but ${objection.toLowerCase()} was acknowledged without a concrete alternative in the same call.`,
      scores: [
        { label: "Needs Discovery", value: Math.max(4, Math.round(advisor.scores.needs / 10 + (rnd() - 0.5))) },
        { label: "Destination Knowledge", value: Math.max(4, Math.round(advisor.scores.destination / 10 + (rnd() - 0.5))) },
        { label: "Budget Qualification", value: Math.max(4, Math.round(advisor.scores.budget / 10 + (rnd() - 0.5))) },
        { label: "Itinerary Fit", value: Math.max(4, Math.round(advisor.scores.itinerary / 10 + (rnd() - 0.5))) },
        { label: "Objection Handling", value: Math.max(3, Math.round(advisor.scores.objection / 10 + (rnd() - 0.5))) },
        { label: "Competitor Handling", value: Math.max(3, Math.round(advisor.scores.competitor / 10 + (rnd() - 0.5))) },
        { label: "Upsell & Inclusions", value: Math.max(3, Math.round(advisor.scores.upsell / 10 + (rnd() - 0.5))) },
        { label: "Follow-Up Commitment", value: Math.max(3, Math.round(advisor.scores.followUp / 10 + (rnd() - 0.5))) },
      ],
      transcript: transcriptFor(
        {
          traveller: traveller!,
          first,
          advisor: advisor.name,
          short: destination.short,
          city: city!,
          tripType,
          party,
          budget,
          window: travelWindow,
          competitor,
          requirement: requirements[0]!,
        },
        objection,
      ),
    });
  }
  return list;
}

export const calls = buildCalls();
export const phoneCalls = calls.filter((c) => c.channel === "Call");
export const whatsappThreads = calls.filter((c) => c.channel === "WhatsApp");

/* ------------------------------------------------------------------ */
/* Travellers                                                          */
/* ------------------------------------------------------------------ */

export type Traveller = {
  id: string;
  name: string;
  phone: string;
  created: string;
  conversations: number;
  destination: string;
  departureCity: string;
  aiStatus: string;
  humanStatus: string;
  intent: number;
  intentLevel: "High" | "Medium" | "Low";
  nextAction: string;
  advisor: string;
  tripType: string;
  party: string;
  budget: string;
  travelWindow: string;
  payment: string;
  visa: string;
  source: string;
  requirements: string[];
  summary: string;
  topics: string[];
  objections: string[];
  competitors: string[];
  timeline_events: { at: string; type: "Call" | "WhatsApp" | "Itinerary" | "Email"; text: string }[];
  actions: { text: string; due: string; status: "Pending" | "In Progress" | "Done" }[];
  notes: { author: string; at: string; text: string; auto?: boolean }[];
};

const aiStatuses = [
  "New / Cold",
  "Attempting Contact",
  "Connected / Warm",
  "Qualified",
  "Itinerary Shared",
  "Quote Negotiation",
  "Booking Ready",
  "Nurturing",
  "Lost",
];
const sources = ["Google Search", "Meta / Instagram", "WhatsApp Enquiry", "Referral", "Walk-in", "Travel Expo"];

function buildTravellers(): Traveller[] {
  const rnd = mulberry(7);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)]!;

  return travellerPool.map(([name, phone, city], i) => {
    const related = calls.filter((c) => c.traveller === name);
    const firstCall = related[0];
    const destination = firstCall?.destination ?? pick(destinationNames);
    const intent = firstCall?.intent ?? Math.round(30 + rnd() * 60);
    const intentLevel = intent >= 75 ? "High" : intent >= 50 ? "Medium" : "Low";
    const advisor = firstCall?.advisor ?? pick(advisors).name;
    const tripType = firstCall?.tripType ?? pick(tripTypes);
    const party = firstCall?.party ?? pick(parties);
    const budget = firstCall?.budget ?? pick(budgetOptions);
    const travelWindow = firstCall?.travelWindow ?? pick(travelWindows);
    const payment = firstCall?.payment ?? pick(payments);
    const requirements = firstCall?.requirements ?? [pick(requirementPool)];
    const short = destinations.find((d) => d.name === destination)?.short ?? "the destination";
    const aiStatus =
      intent >= 85
        ? "Booking Ready"
        : intent >= 75
          ? "Quote Negotiation"
          : intent >= 62
            ? "Itinerary Shared"
            : intent >= 50
              ? "Qualified"
              : intent >= 40
                ? "Connected / Warm"
                : intent >= 33
                  ? "Nurturing"
                  : pick(aiStatuses);

    return {
      id: `TR-${9100 + i}`,
      name: name!,
      phone: phone!,
      created: `${String(1 + (i % 28)).padStart(2, "0")} Aug 2026`,
      conversations: Math.max(1, related.length + Math.floor(rnd() * 3)),
      destination,
      departureCity: city!,
      aiStatus,
      humanStatus: intent >= 75 ? "Working" : intent >= 50 ? "Contacted" : "New",
      intent,
      intentLevel,
      nextAction:
        intent >= 85
          ? "Send payment link and hold the booking"
          : intent >= 75
            ? "Share revised quote and close"
            : intent >= 62
              ? "Follow up on itinerary feedback"
              : intent >= 50
                ? "Send hotel options and pricing"
                : "Nurture with seasonal offer",
      advisor,
      tripType,
      party,
      budget,
      travelWindow,
      payment,
      visa: firstCall?.visa ?? "Not yet discussed",
      source: pick(sources),
      requirements,
      summary: `${name!.split(" ")[0]} has engaged across ${Math.max(1, related.length)} conversation(s) about a ${tripType.toLowerCase()} to ${short} for ${party.toLowerCase()}, departing from ${city}. Travel window is ${travelWindow.toLowerCase()} with a budget of ${budget} and a ${payment.toLowerCase()} preference. Requirements noted: ${requirements.join(", ").toLowerCase()}. Intent is currently ${intentLevel.toLowerCase()} at ${intent}.`,
      topics: [
        pick(["Package Pricing", "Hotel Options", "Flight Timings", "Visa Assistance", "Sightseeing Inclusions", "Honeymoon Inclusions"]),
        pick(["Itinerary Detail", "Meal Preference", "Private Transfers", "Travel Insurance", "EMI Options"]),
        pick(["Departure City", "Child Policy", "Early Check-In", "Extra Baggage"]),
      ],
      objections: [firstCall?.objection ?? pick(objectionPool)],
      competitors: [
        firstCall?.competitor && firstCall.competitor !== "—"
          ? firstCall.competitor
          : pick(["MakeMyTrip Holidays", "Thomas Cook", "Veena World", "Pickyourtrail"]),
      ],
      timeline_events: [
        { at: "12 Aug · 14:22", type: "Call", text: `Discussed ${short} package for ${party.toLowerCase()}; ${(firstCall?.objection ?? "package price").toLowerCase()} raised as the main concern.` },
        { at: "12 Aug · 14:41", type: "Itinerary", text: `Day-wise ${short} itinerary and hotel options sent on WhatsApp.` },
        { at: "11 Aug · 10:04", type: "WhatsApp", text: "Asked for the quotation to be shared on WhatsApp to discuss with family." },
        { at: "09 Aug · 16:41", type: "Call", text: `Initial enquiry; travel dates, departure city (${city}) and party size captured.` },
        { at: "08 Aug · 09:12", type: "Email", text: `${short} brochure and indicative pricing sent automatically.` },
      ],
      actions: [
        { text: intent >= 75 ? "Send revised flight-inclusive quote" : "Share hotel options with photographs", due: "13 Aug 2026", status: "Pending" },
        { text: `Confirm ${requirements[0]?.toLowerCase() ?? "meal preference"} with the hotel`, due: "14 Aug 2026", status: "In Progress" },
        { text: "Share payment schedule and EMI options", due: "11 Aug 2026", status: "Done" },
      ],
      notes: [
        {
          author: "GT Holidays AI",
          at: "12 Aug 2026",
          text: `Traveller mentioned ${(firstCall?.objection ?? "package price").toLowerCase()} twice in the last conversation. Lead the next call with a revised inclusion-matched quote rather than a discount.`,
          auto: true,
        },
        { author: advisor, at: "11 Aug 2026", text: "Prefers WhatsApp over calls; decision is taken jointly with family in the evening." },
      ],
    };
  });
}

export const travellers = buildTravellers();

export const pipelineStages = ["Qualified", "Itinerary Shared", "Quote Negotiation", "Booking Ready", "Nurturing"];

export const scheduledFollowUps = travellers
  .filter((t) => t.intent >= 55)
  .slice(0, 14)
  .map((t, i) => ({
    id: t.id,
    traveller: t.name,
    destination: t.destination,
    advisor: t.advisor,
    when: `${13 + (i % 5)} Aug 2026 · ${String(9 + (i % 8)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
    type: i % 3 === 0 ? "Booking Call" : i % 3 === 1 ? "Follow-Up Call" : "WhatsApp Follow-Up",
    intent: t.intent,
  }));

/* ------------------------------------------------------------------ */
/* Action items                                                        */
/* ------------------------------------------------------------------ */

export type ActionItem = {
  id: string;
  traveller: string;
  destination: string;
  item: string;
  status: "Pending" | "In Progress" | "Done" | "Overdue";
  due: string;
  intent: number;
  advisor: string;
  source: string;
  priority: "High" | "Medium" | "Low";
};

const actionTemplates = [
  "Send revised flight-inclusive quote",
  "Share day-wise itinerary on WhatsApp",
  "Send visa document checklist",
  "Share hotel photographs and reviews",
  "Confirm vegetarian meal arrangement",
  "Check family-room availability",
  "Send EMI and instalment schedule",
  "Re-quote with shorter connection",
  "Hold booking for 48 hours",
  "Confirm Jain meal with airline",
  "Share attraction pass pricing",
  "Follow up after family discussion",
  "Send travel-insurance quote",
  "Arrange private airport transfer quote",
];

export const actionItems: ActionItem[] = travellers.slice(0, 38).map((t, i) => {
  const statusPool: ActionItem["status"][] = ["Pending", "In Progress", "Done", "Overdue", "Pending", "In Progress"];
  const status = statusPool[i % statusPool.length]!;
  return {
    id: `AC-${3300 + i}`,
    traveller: t.name,
    destination: t.destination,
    item: actionTemplates[i % actionTemplates.length]!,
    status,
    due: `${9 + (i % 8)} Aug 2026`,
    intent: t.intent,
    advisor: t.advisor,
    source: `CV-${48219 + (i % 60)}`,
    priority: t.intent >= 78 ? "High" : t.intent >= 55 ? "Medium" : "Low",
  };
});

/* ------------------------------------------------------------------ */
/* Market intelligence                                                 */
/* ------------------------------------------------------------------ */

export const competitorMentions = [
  { name: "MakeMyTrip Holidays", mentions: 612, change: 22, reasons: ["Flight-inclusive price", "Brand trust", "App convenience"] },
  { name: "Thomas Cook", mentions: 284, change: 7, reasons: ["Brand trust", "Visa handling", "Group departures"] },
  { name: "Veena World", mentions: 241, change: 14, reasons: ["Indian meals", "Guided tours", "Senior-friendly pace"] },
  { name: "Pickyourtrail", mentions: 196, change: 19, reasons: ["Customisation", "Price transparency"] },
  { name: "SOTC", mentions: 152, change: -4, reasons: ["Group departures", "Europe expertise"] },
  { name: "TravelTriangle", mentions: 138, change: 11, reasons: ["Multiple quotes", "Entry price"] },
  { name: "Yatra Holidays", mentions: 104, change: -6, reasons: ["Price", "Domestic packages"] },
  { name: "Local Agents", mentions: 188, change: 16, reasons: ["Personal relationship", "Cash flexibility", "Entry price"] },
];

export const comparisonReasons = [
  { label: "Flight-inclusive price", value: 27 },
  { label: "Total package price", value: 21 },
  { label: "Hotel category", value: 15 },
  { label: "Brand trust", value: 12 },
  { label: "Visa handling", value: 9 },
  { label: "Indian meal availability", value: 7 },
  { label: "Customisation", value: 6 },
  { label: "Payment flexibility", value: 3 },
];

export const competitorTrend = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  MakeMyTrip: Math.round(36 + i * 2.1 + Math.sin(i / 1.4) * 5),
  ThomasCook: Math.round(19 + Math.sin(i / 2) * 4),
  VeenaWorld: Math.round(13 + i * 0.5 + Math.cos(i / 1.7) * 3),
  Pickyourtrail: Math.round(9 + i * 0.6 + Math.sin(i / 2.4) * 2),
}));

export const emergingTrends = [
  { label: "Vegetarian / Jain meal requests", value: 28, direction: "up" },
  { label: "Vietnam interest", value: 41, direction: "up" },
  { label: "EMI / instalment questions", value: 17, direction: "up" },
  { label: "Schengen visa anxiety", value: 24, direction: "up" },
  { label: "Multi-generational trips", value: 15, direction: "up" },
  { label: "Long-weekend short haul", value: 22, direction: "up" },
  { label: "Direct-flight preference", value: 19, direction: "up" },
];

export const leadSources = [
  { source: "Meta / Instagram", leads: 2140, qualifiedRate: 22, highIntentRate: 13, avgBudget: "₹2.1L" },
  { source: "Google Search", leads: 1482, qualifiedRate: 34, highIntentRate: 22, avgBudget: "₹3.2L" },
  { source: "WhatsApp Enquiry", leads: 986, qualifiedRate: 31, highIntentRate: 19, avgBudget: "₹2.6L" },
  { source: "Referral", leads: 604, qualifiedRate: 46, highIntentRate: 31, avgBudget: "₹3.8L" },
  { source: "Walk-in", leads: 288, qualifiedRate: 49, highIntentRate: 34, avgBudget: "₹3.4L" },
  { source: "Travel Expo", leads: 186, qualifiedRate: 38, highIntentRate: 24, avgBudget: "₹4.1L" },
];

export const marketInsights = [
  { tone: "danger" as const, title: "MakeMyTrip pressure on flight-inclusive pricing", body: "MakeMyTrip Holidays mentions rose 22%, and in 7 of 10 cases the comparison is on the flight-inclusive total, not the land package. Advisors defending on hotel quality alone lose these conversations.", meta: "Bali & Thailand · last 30 days" },
  { tone: "warning" as const, title: "Veena World winning multi-generational Europe", body: "Veena World mentions up 14%, concentrated in Europe enquiries where parents are travelling. Indian meals and a slower pace are the stated reasons, ahead of price.", meta: "Europe · senior travellers" },
  { tone: "success" as const, title: "Referral and walk-in produce the best travellers", body: "Referrals convert to qualified enquiries at 46% and walk-ins at 49%, both far above paid social, and carry a ₹1.5L higher average budget.", meta: "Lead-source quality" },
  { tone: "info" as const, title: "Rebalance spend toward intent, not volume", body: "Meta generates 45% of leads but only 13% high intent. Google Search and WhatsApp enquiries produce a 69% higher share of high-intent travellers per lead.", meta: "Marketing recommendation" },
];

/* ------------------------------------------------------------------ */
/* WhatsApp                                                            */
/* ------------------------------------------------------------------ */

export const whatsappKpis = [
  { label: "WhatsApp Conversations", value: "2,754", sub: "46% of all conversations" },
  { label: "Response Rate", value: "88%", sub: "Within 30 minutes" },
  { label: "Itineraries Shared", value: "1,204", sub: "79% of all itineraries" },
  { label: "Bookings from Chat", value: "186", sub: "+14% vs last period" },
];
