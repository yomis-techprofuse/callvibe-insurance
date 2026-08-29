import { useEffect, useRef, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  CalendarClock,
  ChevronRight,
  Clock,
  Coins,
  Download,
  FileText,
  ListChecks,
  Pause,
  Phone,
  Play,
  Sparkles,
  Target,
  User,
  Users,
  X,
} from "lucide-react";
import type { Call } from "@/data/marhaba";
import { InsightCard, Panel, PanelHead, Pill, ScoreBar, intentTone, sentimentTone, statusTone } from "./kit";
import { cn } from "@/lib/utils";

function Field({ label, value, tone }: { label: string; value: string; tone?: "primary" | "danger" | "success" }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
      <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      <p
        className={cn(
          "mt-1 text-[12.5px] font-semibold",
          tone === "primary" && "text-primary",
          tone === "danger" && "text-danger",
          tone === "success" && "text-success",
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

export function CallDetailsModal({ call, onClose }: { call: Call | null; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!call) return;
    scrollRef.current?.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [call, onClose]);

  if (!call) return null;

  const overall = Math.round((call.scores.reduce((s, x) => s + x.value, 0) / (call.scores.length * 10)) * 100);
  const overallLabel = overall >= 80 ? "Strong" : overall >= 65 ? "Solid" : overall >= 50 ? "Needs Work" : "Weak";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-6 backdrop-blur-[2px]">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 my-2 w-full max-w-[1040px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-pop)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <h2 className="truncate text-[15px] font-semibold tracking-tight">{call.traveller}</h2>
              <Pill tone={intentTone(call.intentLevel)} dot>
                Intent {call.intent} · {call.intentLevel}
              </Pill>
            </div>
            <p className="mt-1 text-[11.5px] text-muted-foreground">
              {call.id} · {call.destination} · {call.date} at {call.time} · Advisor {call.advisor}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Close call details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Classification strip */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/30 px-5 py-2.5">
          <Pill tone={sentimentTone(call.sentiment)} dot>
            Sentiment: {call.sentiment}
          </Pill>
          <Pill tone="classify">Holiday Enquiry</Pill>
          <Pill tone="info">
            <Clock className="h-3 w-3" /> {call.duration}
          </Pill>
          <Pill tone="neutral">
            {call.direction === "Inbound" ? (
              <ArrowDownLeft className="h-3 w-3" />
            ) : (
              <ArrowUpRight className="h-3 w-3" />
            )}
            {call.direction}
          </Pill>
          <Pill tone={statusTone(call.stage)}>Stage: {call.stage}</Pill>
          <Pill tone={statusTone(call.outcome)}>{call.outcome}</Pill>
          <Pill tone="primary">{call.tripType}</Pill>
        </div>

        <div ref={scrollRef} className="scroll-slim max-h-[calc(100vh-190px)] space-y-4 overflow-y-auto bg-canvas p-5">
          {/* Participants */}
          <Panel>
            <PanelHead title="Participants" icon={<Users className="h-3.5 w-3.5" />} />
            <div className="grid gap-3 px-4 py-3 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                  {call.advisor.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold">{call.advisor}</p>
                  <p className="text-[11px] text-muted-foreground">Holiday Advisor · GT Holidays</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-classify-soft text-[11px] font-semibold text-classify">
                  {call.traveller.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold">{call.traveller}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Traveller · {call.phone} · {call.channel === "Call" ? "Voice" : "WhatsApp"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
              <span>Call ID: <span className="font-medium text-foreground">{call.id}</span></span>
              <span>Source: <span className="font-medium text-foreground">GT Holidays Telephony</span></span>
              <span>Status: <span className="font-medium text-success">Analysed</span></span>
              <span>Recording: <span className="font-medium text-foreground">Available</span></span>
            </div>
          </Panel>

          {/* Recording */}
          <Panel>
            <PanelHead title="Call Recording" icon={<Play className="h-3.5 w-3.5" />} subtitle="Demo player — no audio file is streamed in this prototype" />
            <div className="px-4 py-3">
              <RecordingPlayer duration={call.duration} />
            </div>
          </Panel>

          {/* AI summary + action */}
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Panel>
              <PanelHead title="AI Summary" icon={<Sparkles className="h-3.5 w-3.5" />} />
              <div className="px-4 py-3">
                <p className="text-[12.5px] leading-[1.65] text-foreground/90">{call.summary}</p>
              </div>
            </Panel>

            <Panel>
              <PanelHead
                title="Recommended Next Action"
                icon={<ListChecks className="h-3.5 w-3.5" />}
                right={<Pill tone="danger">Priority</Pill>}
              />
              <div className="space-y-2 px-4 py-3">
                <div className="rounded-lg border border-primary/30 bg-primary-soft px-3 py-2.5">
                  <p className="text-[12.5px] leading-[1.55] font-medium text-primary">{call.recommendedAction}</p>
                </div>
                <div className="space-y-1.5">
                  {[
                    { t: `Send ${call.destination.split(" ")[0]} hotel options for ${call.party}`, d: "Today" },
                    { t: "Send payment schedule + EMI options", d: "Today" },
                    { t: call.itinerary === "Not yet sent" ? "Send day-wise itinerary on WhatsApp" : "Share revised quote with hotel options", d: "Today" },
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

          {/* Scorecard */}
          <Panel>
            <PanelHead
              title="AI Sales Quality Scorecard"
              icon={<Target className="h-3.5 w-3.5" />}
              right={
                <Pill tone={overall >= 80 ? "success" : overall >= 65 ? "primary" : "warning"}>
                  Overall {overall}% · {overallLabel}
                </Pill>
              }
            />
            <div className="grid gap-x-6 gap-y-3 px-4 py-3.5 md:grid-cols-2">
              {call.scores.map((s) => (
                <ScoreBar key={s.label} label={s.label} value={s.value} outOf={10} />
              ))}
            </div>
            <div className="border-t border-border px-4 py-3">
              <InsightCard tone="warning" title="AI Coaching Insight" body={call.coaching} meta={`${call.advisor} · ${call.date}`} />
            </div>
          </Panel>

          {/* Traveller intelligence */}
          <Panel>
            <PanelHead title="Trip Intelligence" icon={<Building2 className="h-3.5 w-3.5" />} subtitle="Extracted automatically from this conversation" />
            <div className="grid gap-2.5 px-4 py-3.5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Destination" value={call.destination} tone="primary" />
              <Field label="Departure City" value={call.departureCity} />
              <Field label="Trip Type" value={call.tripType} tone="primary" />
              <Field label="Party Size" value={call.party} />
              <Field label="Budget" value={call.budget} />
              <Field label="Travel Window" value={call.travelWindow} />
              <Field label="Payment" value={call.payment} />
              <Field label="Intent Score" value={`${call.intent} — ${call.intentLevel}`} tone="success" />
              <Field label="Primary Objection" value={call.objection} tone="danger" />
              <Field label="Competitor Mentioned" value={call.competitor} />
              <Field label="Conversation Outcome" value={call.outcome} />
              <Field label="Visa" value={call.visa} />
              <Field label="Requirements" value={call.requirements.join(", ")} />
              <Field label="Itinerary" value={call.itinerary} tone="success" />
            </div>
            <div className="grid gap-2.5 border-t border-border px-4 py-3 md:grid-cols-2">
              <InsightCard tone="info" title="Why intent is High" body={call.intentReason} meta="Intent model" />
              <InsightCard tone="classify" title={`Why stage is ${call.stage}`} body={call.stageReason} meta="Stage classifier" />
            </div>
          </Panel>

          {/* Transcript */}
          <Panel>
            <PanelHead
              title="Full Transcript"
              icon={<FileText className="h-3.5 w-3.5" />}
              subtitle={`${call.transcript.length} turns · auto-transcribed`}
              right={
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CalendarClock className="h-3 w-3" /> {call.date} · {call.time}
                </span>
              }
            />
            <div className="scroll-slim max-h-[420px] space-y-3 overflow-y-auto px-4 py-3.5">
              {call.transcript.map((t, i) => (
                <div key={i} className={cn("flex gap-2.5", t.speaker === "traveller" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                      t.speaker === "advisor" ? "bg-primary-soft text-primary" : "bg-classify-soft text-classify",
                    )}
                  >
                    {t.speaker === "advisor" ? <User className="h-3 w-3" /> : <Coins className="h-3 w-3" />}
                  </span>
                  <div
                    className={cn(
                      "max-w-[76%] rounded-lg border px-3 py-2",
                      t.speaker === "advisor" ? "border-border bg-muted/40" : "border-primary/20 bg-primary-soft/60",
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
