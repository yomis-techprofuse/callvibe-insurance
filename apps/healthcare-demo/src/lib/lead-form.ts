/**
 * Posts the pre-login lead capture form to a Google Form.
 *
 * Google Forms returns an opaque response under no-cors, so this is a
 * best-effort, fire-and-forget submission — failures are swallowed by
 * design and never block access past the gate.
 */
const ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfFmz2t64QKdqNCgIGfVKUldxLCmzK7ToJ1W2wPHOTolhPHsA/formResponse";

const ENTRIES = {
  name: "entry.952906179",
  email: "entry.929615029",
  phone: "entry.1596897641",
  company: "entry.547828760",
  source: "entry.2018847920",
};

// Tags which app this submission came from, so rows from different demos
// sharing this one Sheet can be told apart.
const SOURCE = "Marhaba Multispecialty Hospital";

export async function submitLead(data: { name: string; email: string; phone: string; company: string }) {
  const body = new URLSearchParams();
  body.append(ENTRIES.name, data.name);
  body.append(ENTRIES.email, data.email);
  body.append(ENTRIES.phone, data.phone);
  body.append(ENTRIES.company, data.company);
  body.append(ENTRIES.source, SOURCE);
  try {
    await fetch(ACTION, { method: "POST", mode: "no-cors", body });
  } catch {
    // ignore: nothing meaningful to recover from under no-cors anyway
  }
}
