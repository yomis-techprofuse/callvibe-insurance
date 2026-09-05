import { useEffect, useRef, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarClock,
  ChevronRight,
  Clock,
  Download,
  FileText,
  HeartPulse,
  ListChecks,
  MessageSquare,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  User,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { accessStages, type Enquiry } from "@/data/hospital";
import { InsightCard, Panel, PanelHead, Pill, ScoreBar, intentTone, sentimentTone, statusTone } from "./kit";
import { AccessJourney, ObservedNote } from "./hospital-viz";
import { cn } from "@/lib/utils";

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

function RecordingPlayer({ duration }: { duration: string }) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(18);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setPos((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 100;
        }
        return p + 1;
      });
    }, 260);
    return () => clearInterval(t);
  }, [playing]);

  const totalSec = duration.split(":").reduce((m, s) => m * 60 + Number(s), 0);
  const cur = Math.round((pos / 100) * totalSec);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        aria-label={playing ? "Pause recording" : "Play recording"}
      >
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
      </button>
      <span className="text-[11.5px] font-medium tabular-nums text-muted-foreground">{fmt(cur)}</span>
      <div
        className="relative h-8 flex-1 cursor-pointer"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos(Math.round(((e.clientX - r.left) / r.width) * 100));
        }}
      >
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center gap-[2px]">
          {Array.from({ length: 68 }, (_, i) => {
            const h = 4 + Math.abs(Math.sin(i / 2.6)) * 16 + (i % 5) * 1.2;
            const passed = (i / 68) * 100 <= pos;
            return (
              <span
                key={i}
                className={cn("w-[3px] rounded-full", passed ? "bg-primary" : "bg-border")}
                style={{ height: `${h}px` }}
              />
            );
          })}
        </div>
      </div>
      <span className="text-[11.5px] font-medium tabular-nums text-muted-foreground">{duration}</span>
      <button className="flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2 text-[11.5px] font-medium hover:bg-muted">
        <Download className="h-3 w-3" />
        Transcript
      </button>
    </div>
  );
}

export function EnquiryDetailsModal({ enquiry, onClose }: { enquiry: Enquiry | null; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enquiry) return;
    scrollRef.current?.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [enquiry, onClose]);

  if (!enquiry) return null;
  const e = enquiry;

  const overall = Math.round((e.scores.reduce((s, x) => s + x.value, 0) / (e.scores.length * 10)) * 100);
  const overallLabel = overall >= 80 ? "Strong" : overall >= 65 ? "Solid" : overall >= 50 ? "Needs Work" : "Weak";
  const isChat = e.channel === "WhatsApp";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-6 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative z-10 my-2 w-full max-w-[1040px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-pop)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary">
                {isChat ? <MessageSquare className="h-3.5 w-3.5" /> : <HeartPulse className="h-3.5 w-3.5" />}
              </span>
              <h2 className="truncate text-[15px] font-semibold tracking-tight">{e.patient}</h2>
              <Pill tone={intentTone(e.intentLevel)} dot>
                Appointment Intent {e.intent} · {e.intentLevel}
              </Pill>
              {e.priority ? <Pill tone="danger">Priority / Escalation</Pill> : null}
            </div>
            <p className="mt-1 text-[11.5px] text-muted-foreground">
              {e.id} · {e.specialty} · {e.date} at {e.time} · Enquiry agent {e.agent}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Close enquiry details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Classification strip */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/30 px-5 py-2.5">
          <Pill tone={sentimentTone(e.sentiment)} dot>
            Sentiment: {e.sentiment}
          </Pill>
          <Pill tone="classify">{e.category}</Pill>
          <Pill tone="info">
            <Clock className="h-3 w-3" /> {e.duration}
          </Pill>
          <Pill tone="neutral">
            {e.channel === "Outbound Call" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
            {e.channel}
          </Pill>
          <Pill tone={statusTone(e.stage)}>Access stage: {e.stage}</Pill>
          <Pill tone={statusTone(e.outcome)}>{e.outcome}</Pill>
          <Pill tone="primary">{e.patientType}</Pill>
        </div>

        <div ref={scrollRef} className="scroll-slim max-h-[calc(100vh-190px)] space-y-4 overflow-y-auto bg-canvas p-5">
          {/* Access journey */}
          <Panel>
            <PanelHead
              title="Patient Access Journey"
              icon={<Stethoscope className="h-3.5 w-3.5" />}
              subtitle="Where this patient currently sits in the access journey, reconstructed from the conversation"
              right={<Pill tone={statusTone(e.status)}>{e.status}</Pill>}
            />
            <div className="px-4 pt-4 pb-3">
              <AccessJourney stages={accessStages} current={e.stage} />
            </div>
          </Panel>

          {/* Participants */}
          <Panel>
            <PanelHead title="Participants" icon={<Users className="h-3.5 w-3.5" />} />
            <div className="grid gap-3 px-4 py-3 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                  {e.agent.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold">{e.agent}</p>
                  <p className="text-[11px] text-muted-foreground">Patient Access Executive · Enquiry Desk</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-classify-soft text-[11px] font-semibold text-classify">
                  {e.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold">{e.patient}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {e.patientType} · {e.phone} · {isChat ? "WhatsApp" : "Voice"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
              <span>Enquiry ID: <span className="font-medium text-foreground">{e.id}</span></span>
              <span>Source: <span className="font-medium text-foreground">Hospital Enquiry Desk</span></span>
              <span>Status: <span className="font-medium text-success">Analysed</span></span>
              <span>Recording: <span className="font-medium text-foreground">{isChat ? "Chat transcript" : "Available"}</span></span>
            </div>
          </Panel>

          {/* Recording */}
          {!isChat ? (
            <Panel>
              <PanelHead
                title="Call Recording"
                icon={<Play className="h-3.5 w-3.5" />}
                subtitle="Demo player — no audio file is streamed in this prototype"
              />
              <div className="px-4 py-3">
                <RecordingPlayer duration={e.duration} />
              </div>
            </Panel>
          ) : null}

          {/* AI summary + next best operational action */}
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Panel>
              <PanelHead title="AI Summary" icon={<Sparkles className="h-3.5 w-3.5" />} subtitle="Generated from the conversation only" />
              <div className="space-y-3 px-4 py-3">
                <p className="text-[12.5px] leading-[1.65] text-foreground/90">{e.summary}</p>
                <ObservedNote>
                  CallVibe summarises what was said and what the patient needs operationally. It does not
                  interpret symptoms, diagnose, or make clinical or triage decisions.
                </ObservedNote>
              </div>
            </Panel>

            <Panel>
              <PanelHead
                title="Next Best Operational Action"
                icon={<ListChecks className="h-3.5 w-3.5" />}
                right={<Pill tone={e.priority ? "danger" : "warning"}>{e.priority ? "Priority" : "Due today"}</Pill>}
              />
              <div className="space-y-2 px-4 py-3">
                <div className="rounded-lg border border-primary/30 bg-primary-soft px-3 py-2.5">
                  <p className="text-[12.5px] leading-[1.55] font-medium text-primary">{e.nextAction}</p>
                </div>
                <div className="space-y-1.5">
                  {[
                    { t: `Send ${e.service} information on WhatsApp`, d: "Today" },
                    {
                      t: e.barrier === "Insurance / Cashless" ? `Raise ${e.insurance} pre-authorisation` : `Confirm ${e.preferredTime.toLowerCase()} slot`,
                      d: "Today",
                    },
                    { t: `Update ${e.patient.split(" ")[0]} on the access status`, d: "Tomorrow" },
                  ].map((a) => (
                    <div key={a.t} className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5">
                      <ChevronRight className="h-3 w-3 shrink-0 text-primary" />
                      <span className="min-w-0 flex-1 truncate text-[11.5px]">{a.t}</span>
                      <span className="shrink-0 text-[10.5px] font-medium text-muted-foreground">{a.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </div>

          {/* Patient access intelligence */}
          <Panel>
            <PanelHead
              title="Patient Access Intelligence"
              icon={<UserRound className="h-3.5 w-3.5" />}
              subtitle="Extracted automatically from this conversation"
            />
            <div className="grid gap-2.5 px-4 py-3.5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Patient" value={e.patient} tone="primary" />
              <Field label="Enquiry" value={e.enquiry} />
              <Field label="Patient Type" value={e.patientType} />
              <Field label="Specialty" value={e.specialty} tone="primary" />
              <Field label="Preferred Doctor" value={e.doctor} />
              <Field label="Service Discussed" value={e.service} />
              <Field label="Appointment Intent" value={`${e.intent} — ${e.intentLevel}`} tone="success" />
              <Field label="Preferred Time" value={e.preferredTime} />
              <Field label="Insurance" value={e.insurance} />
              <Field label="Primary Barrier" value={e.barrier} tone="danger" />
              <Field label="Indicative Estimate" value={e.estimate} />
              <Field label="Outcome" value={e.outcome} tone="warning" />
            </div>
            <div className="grid gap-2.5 border-t border-border px-4 py-3 md:grid-cols-2">
              <InsightCard tone="info" title={`Why intent is ${e.intentLevel}`} body={e.intentReason} meta="Appointment intent model" />
              <InsightCard
                tone="classify"
                title={`Why access stage is ${e.stage}`}
                body={`The conversation reached "${e.stage}" because the outcome recorded was ${e.outcome.toLowerCase()} and the open item is ${e.barrier.toLowerCase()}. The enquiry has not progressed further in the access journey.`}
                meta="Access stage classifier"
              />
            </div>
          </Panel>

          {/* Scorecard */}
          <Panel>
            <PanelHead
              title="AI Enquiry Quality Analysis"
              icon={<Target className="h-3.5 w-3.5" />}
              subtitle="Scores the handling of the enquiry — never the clinical care"
              right={
                <Pill tone={overall >= 80 ? "success" : overall >= 65 ? "primary" : "warning"}>
                  Overall {overall}% · {overallLabel}
                </Pill>
              }
            />
            <div className="grid gap-x-6 gap-y-3 px-4 py-3.5 md:grid-cols-2">
              {e.scores.map((s) => (
                <ScoreBar key={s.label} label={s.label} value={s.value} outOf={10} />
              ))}
            </div>
            <div className="border-t border-border px-4 py-3">
              <InsightCard tone="warning" title="Operational Coaching Insight" body={e.coaching} meta={`${e.agent} · ${e.date}`} />
            </div>
          </Panel>

          {/* Insurance strip */}
          {e.barrier === "Insurance / Cashless" || e.status === "Insurance Pending" ? (
            <Panel>
              <PanelHead title="Insurance & Cashless" icon={<ShieldCheck className="h-3.5 w-3.5" />} />
              <div className="grid gap-2.5 px-4 py-3.5 sm:grid-cols-3">
                <Field label="Insurer" value={e.insurance} />
                <Field label="Cashless Status" value="Eligibility not yet verified" tone="warning" />
                <Field label="Committed Callback" value="Not recorded in conversation" tone="danger" />
              </div>
            </Panel>
          ) : null}

          {/* Transcript */}
          <Panel>
            <PanelHead
              title={isChat ? "Full WhatsApp Thread" : "Full Transcript"}
              icon={<FileText className="h-3.5 w-3.5" />}
              subtitle={`${e.transcript.length} turns · auto-transcribed`}
              right={
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CalendarClock className="h-3 w-3" /> {e.date} · {e.time}
                </span>
              }
            />
            <div className="scroll-slim max-h-[420px] space-y-3 overflow-y-auto px-4 py-3.5">
              {e.transcript.map((t, i) => (
                <div key={i} className={cn("flex gap-2.5", t.speaker === "patient" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                      t.speaker === "agent" ? "bg-primary-soft text-primary" : "bg-classify-soft text-classify",
                    )}
                  >
                    {t.speaker === "agent" ? <User className="h-3 w-3" /> : <UserRound className="h-3 w-3" />}
                  </span>
                  <div
                    className={cn(
                      "max-w-[76%] rounded-lg border px-3 py-2",
                      t.speaker === "agent" ? "border-border bg-muted/40" : "border-primary/20 bg-primary-soft/60",
                    )}
                  >
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="text-[11px] font-semibold">{t.name}</span>
                      <span className="text-[10px] tabular-nums text-muted-foreground">{t.at}</span>
                    </div>
                    <p className="text-[12.5px] leading-[1.6] text-foreground/90">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
