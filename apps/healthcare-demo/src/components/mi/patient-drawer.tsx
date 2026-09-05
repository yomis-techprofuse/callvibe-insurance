import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Clock,
  MessageSquare,
  PhoneCall,
  PhoneOutgoing,
  Sparkles,
  StickyNote,
  X,
} from "lucide-react";
import type { Patient } from "@/data/hospital";
import { InsightCard, Panel, PanelHead, Pill, intentTone, statusTone } from "./kit";
import { TabBar } from "./controls";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Journey", "Actions", "Intelligence", "Notes"];

function Field({ label, value, tone }: { label: string; value: string; tone?: "primary" | "danger" | "success" | "warning" }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
      <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      <p
        className={cn(
          "mt-1 text-[12.5px] font-semibold",
          tone === "primary" && "text-primary",
          tone === "danger" && "text-danger",
          tone === "success" && "text-success",
          tone === "warning" && "text-warning",
        )}
      >
        {value}
      </p>
    </div>
  );
}

const journeyIcon = {
  "Inbound Call": PhoneCall,
  "Outbound Call": PhoneOutgoing,
  WhatsApp: MessageSquare,
  Appointment: CalendarCheck,
};

export function PatientDrawer({ patient, onClose }: { patient: Patient | null; onClose: () => void }) {
  const [tab, setTab] = useState("Overview");

  useEffect(() => {
    if (!patient) return;
    setTab("Overview");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [patient, onClose]);

  if (!patient) return null;
  const p = patient;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <aside className="relative z-10 flex h-full w-full max-w-[620px] flex-col border-l border-border bg-canvas shadow-[var(--shadow-pop)]">
        <div className="flex items-start justify-between gap-3 border-b border-border bg-card px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-classify-soft text-[11px] font-semibold text-classify">
                {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
              <h2 className="truncate text-[15px] font-semibold tracking-tight">{p.name}</h2>
              <Pill tone={intentTone(p.intentLevel)} dot>
                Intent {p.intent}
              </Pill>
            </div>
            <p className="mt-1 text-[11.5px] text-muted-foreground">
              {p.id} · {p.phone} · {p.patientType} · {p.interactions} interactions
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Close patient drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-border bg-card px-5 py-2.5">
          <TabBar tabs={tabs} value={tab} onChange={setTab} />
        </div>

        <div className="scroll-slim flex-1 space-y-4 overflow-y-auto p-5">
          {tab === "Overview" ? (
            <>
              <Panel>
                <PanelHead title="Access Snapshot" right={<Pill tone={statusTone(p.accessStatus)}>{p.accessStatus}</Pill>} />
                <div className="grid gap-2.5 px-4 py-3.5 sm:grid-cols-2">
                  <Field label="Primary Enquiry" value={p.primaryEnquiry} />
                  <Field label="Specialty" value={p.specialty} tone="primary" />
                  <Field label="Doctor Requested" value={p.doctor} />
                  <Field label="Service" value={p.service} />
                  <Field label="Insurance" value={p.insurance} />
                  <Field label="Preferred Time" value={p.preferredTime} />
                  <Field label="Assigned Agent" value={p.agent} />
                  <Field label="Last Contact" value={p.lastContact} />
                </div>
              </Panel>
              <Panel>
                <PanelHead title="Next Action" icon={<Clock className="h-3.5 w-3.5" />} />
                <div className="px-4 py-3">
                  <div className="rounded-lg border border-primary/30 bg-primary-soft px-3 py-2.5">
                    <p className="text-[12.5px] leading-[1.55] font-medium text-primary">{p.nextAction}</p>
                  </div>
                </div>
              </Panel>
            </>
          ) : null}

          {tab === "Journey" ? (
            <Panel>
              <PanelHead
                title="Patient Journey Timeline"
                subtitle="Every interaction across channels, aggregated for this patient"
                icon={<CalendarCheck className="h-3.5 w-3.5" />}
              />
              <div className="space-y-0 px-4 py-3.5">
                {p.journey.map((j, i) => {
                  const Icon = journeyIcon[j.type];
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                            j.type === "Appointment" ? "bg-success-soft text-success" : "bg-primary-soft text-primary",
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        {i < p.journey.length - 1 ? <span className="my-1 w-px flex-1 bg-border" /> : null}
                      </div>
                      <div className="min-w-0 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">{j.at}</span>
                          <Pill tone={j.type === "Appointment" ? "success" : "info"}>{j.type}</Pill>
                        </div>
                        <p className="mt-1 text-[12.5px] leading-[1.55] text-foreground/90">{j.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border px-4 py-3">
                <InsightCard tone="primary" title="AI Journey Summary" body={p.summary} meta={`${p.interactions} interactions · ${p.firstContact} – ${p.lastContact}`} />
              </div>
            </Panel>
          ) : null}

          {tab === "Actions" ? (
            <Panel>
              <PanelHead title="Operational Actions" subtitle="Extracted from this patient's conversations" />
              <div className="space-y-2 px-4 py-3.5">
                {p.actions.map((a) => (
                  <div key={a.text} className="flex items-start gap-2.5 rounded-lg border border-border px-3 py-2.5">
                    {a.status === "Done" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] leading-[1.5]">{a.text}</p>
                      <p className="mt-0.5 text-[10.5px] text-muted-foreground">Due {a.due}</p>
                    </div>
                    <Pill tone={statusTone(a.status)}>{a.status}</Pill>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {tab === "Intelligence" ? (
            <>
              <Panel>
                <PanelHead title="Patient Intelligence Summary" icon={<Sparkles className="h-3.5 w-3.5" />} subtitle="Across all conversations with this patient" />
                <div className="px-4 py-3.5">
                  <p className="text-[12.5px] leading-[1.65] text-foreground/90">{p.summary}</p>
                </div>
                <div className="grid gap-2.5 border-t border-border px-4 py-3.5 sm:grid-cols-2">
                  <Field label="Specialty" value={p.specialty} tone="primary" />
                  <Field label="Doctor" value={p.doctor} />
                  <Field label="Patient Type" value={p.patientType} />
                  <Field label="Appointment Intent" value={`${p.intent} — ${p.intentLevel}`} tone="success" />
                  <Field label="Insurance" value={p.insurance} />
                  <Field label="Preferred Time" value={p.preferredTime} />
                </div>
              </Panel>
              <Panel>
                <PanelHead title="Questions Asked" />
                <div className="flex flex-wrap gap-1.5 px-4 py-3.5">
                  {p.questions.map((q) => (
                    <Pill key={q} tone="info">
                      {q}
                    </Pill>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-3.5">
                  <p className="mb-2 text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase">Access Barriers</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.barriers.map((b) => (
                      <Pill key={b} tone="danger">
                        {b}
                      </Pill>
                    ))}
                  </div>
                </div>
              </Panel>
            </>
          ) : null}

          {tab === "Notes" ? (
            <Panel>
              <PanelHead title="Notes" icon={<StickyNote className="h-3.5 w-3.5" />} />
              <div className="space-y-2.5 px-4 py-3.5">
                {p.notes.map((n, i) => (
                  <div key={i} className="rounded-lg border border-border px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] font-semibold">{n.author}</span>
                      {n.auto ? <Pill tone="classify">Auto</Pill> : null}
                      <span className="ml-auto text-[10.5px] text-muted-foreground">{n.at}</span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.55] text-foreground/90">{n.text}</p>
                  </div>
                ))}
                <textarea
                  placeholder="Add an operational note…"
                  className="h-20 w-full rounded-lg border border-border bg-card px-3 py-2 text-[12.5px] outline-none placeholder:text-muted-foreground/70 focus:border-primary"
                />
              </div>
            </Panel>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
