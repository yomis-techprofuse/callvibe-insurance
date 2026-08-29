import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarClock,
  ChevronRight,
  Clock,
  Download,
  FileText,
  HeartHandshake,
  Headphones,
  ListChecks,
  Pause,
  Play,
  ShieldAlert,
  Sparkles,
  Target,
  User,
  Users,
  X,
} from "lucide-react";
import type { Conversation } from "@/data/callvibe";
import { TRANSCRIPT_TAGS, usd } from "@/data/callvibe";
import { InsightCard, Panel, PanelHead, Pill, ScoreBar, riskTone, sentimentTone, type Tone } from "./kit";
import { cn } from "@/lib/utils";

function tagTone(t: string): Tone {
  const s = t.toLowerCase();
  if (s.includes("cancel") || s.includes("complaint") || s.includes("risk")) return "danger";
  if (s.includes("price") || s.includes("care") || s.includes("review") || s.includes("coach")) return "warning";
  if (s.includes("competitor")) return "info";
  if (s.includes("cross-sell") || s.includes("opportunity")) return "success";
  return "classify";
}

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
  const [pos, setPos] = useState(0);

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

export function ConversationModal({ conv, onClose }: { conv: Conversation | null; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  useEffect(() => {
    if (!conv) return;
    setTagFilter(null);
    scrollRef.current?.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [conv, onClose]);

  if (!conv) return null;

  const overall = Math.round(conv.scores.reduce((s, x) => s + x.value, 0) / conv.scores.length);
  const overallLabel = overall >= 85 ? "Strong" : overall >= 70 ? "Solid" : overall >= 55 ? "Needs Work" : "Below Standard";
  const delta = conv.previousPremium ? Math.round(((conv.premium - conv.previousPremium) / conv.previousPremium) * 100) : 0;
  const turns = tagFilter ? conv.transcript.filter((t) => t.tag === tagFilter) : conv.transcript;
  const isRenewal = conv.type === "Policy Renewal" || conv.type === "Cancellation";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-6 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative z-10 my-2 w-full max-w-[1100px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-pop)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Headphones className="h-3.5 w-3.5" />
              </span>
              <h2 className="truncate text-[15px] font-semibold tracking-tight">{conv.customer}</h2>
              <Pill tone={riskTone(conv.risk)} dot>
                {conv.risk} risk
              </Pill>
              <Pill tone="classify">{conv.type}</Pill>
            </div>
            <p className="mt-1 text-[11.5px] text-muted-foreground">
              {conv.id} · Customer {conv.customerId} · Policy {conv.policyId} · {conv.date} at {conv.time} · Agent{" "}
              {conv.agent}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Close conversation details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Classification strip */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/30 px-5 py-2.5">
          {conv.tags.map((t) => (
            <Pill key={t} tone={tagTone(t)}>
              {t}
            </Pill>
          ))}
          <Pill tone={sentimentTone(conv.sentiment)} dot>
            Sentiment: {conv.sentiment}
          </Pill>
          <Pill tone="info">
            <Clock className="h-3 w-3" /> {conv.duration}
          </Pill>
          <Pill tone="neutral">
            {conv.direction === "Inbound" ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
            {conv.direction}
          </Pill>
        </div>

        <div ref={scrollRef} className="scroll-slim max-h-[calc(100vh-190px)] space-y-4 overflow-y-auto bg-canvas p-5">
          {/* Participants */}
          <Panel>
            <PanelHead title="Participants" icon={<Users className="h-3.5 w-3.5" />} />
            <div className="grid gap-3 px-4 py-3 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                  {conv.agent.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold">{conv.agent}</p>
                  <p className="text-[11px] text-muted-foreground">{conv.fn} Agent · Harbour Insurance Australia</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-classify-soft text-[11px] font-semibold text-classify">
                  {conv.customer.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold">{conv.customer}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Policyholder · {conv.city}, {conv.state} · {conv.segment}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
              <span>
                Conversation ID: <span className="font-medium text-foreground">{conv.id}</span>
              </span>
              <span>
                Business function: <span className="font-medium text-foreground">{conv.fn}</span>
              </span>
              <span>
                Analysis status: <span className="font-medium text-success">Analysed</span>
              </span>
              <span>
                Review status: <span className="font-medium text-foreground">{conv.reviewStatus}</span>
              </span>
            </div>
          </Panel>

          {/* Recording */}
          <Panel>
            <PanelHead
              title="Conversation Recording"
              icon={<Play className="h-3.5 w-3.5" />}
              subtitle="Demonstration player — no audio file is streamed in this prototype"
            />
            <div className="px-4 py-3">
              <RecordingPlayer duration={conv.duration} />
            </div>
          </Panel>

          {/* Summary + recommended action */}
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Panel>
              <PanelHead
                title="Conversation Summary"
                icon={<Sparkles className="h-3.5 w-3.5" />}
                right={<Pill tone="neutral">Subject to human review</Pill>}
              />
              <div className="space-y-2.5 px-4 py-3">
                {conv.summary.split("\n\n").map((p) => (
                  <p key={p} className="text-[12.5px] leading-[1.65] text-foreground/90">
                    {p}
                  </p>
                ))}
              </div>
            </Panel>

            <Panel>
              <PanelHead
                title="Recommended Next Action"
                icon={<ListChecks className="h-3.5 w-3.5" />}
                right={<Pill tone={riskTone(conv.risk)}>{conv.risk === "Critical" ? "Priority" : "Review"}</Pill>}
              />
              <div className="space-y-2 px-4 py-3">
                <div className="rounded-lg border border-primary/30 bg-primary-soft px-3 py-2.5">
                  <p className="text-[12.5px] leading-[1.55] font-medium text-primary">{conv.recommendedAction}</p>
                </div>
                <div className="space-y-1.5">
                  {[
                    { t: "Review available retention options", d: "Today" },
                    { t: "Confirm follow-up owner and time", d: "Today" },
                    { t: "Route additional-care indicator for review", d: conv.date },
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

          {/* Renewal / commercial intelligence */}
          <Panel>
            <PanelHead
              title={isRenewal ? "Renewal Intelligence" : "Commercial Intelligence"}
              icon={<Target className="h-3.5 w-3.5" />}
              subtitle="Extracted automatically from this conversation"
            />
            <div className="grid gap-2.5 px-4 py-3.5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Product" value={conv.product} tone="primary" />
              <Field label="Policy Number" value={conv.policyId} />
              <Field label="Previous Premium" value={usd(conv.previousPremium)} />
              <Field label="Renewal Premium" value={usd(conv.premium)} tone="danger" />
              <Field label="Premium Change" value={`${delta > 0 ? "+" : ""}${delta}%`} tone={delta > 0 ? "danger" : "success"} />
              <Field label="Competitor Mentioned" value={conv.competitor} tone="warning" />
              <Field label="Primary Objection" value={conv.objection} tone="danger" />
              <Field label="Cancellation Risk" value={conv.risk} tone={conv.risk === "Critical" ? "danger" : "warning"} />
              <Field label="Save Opportunity" value={usd(conv.opportunity)} tone="success" />
              <Field label="Cross-sell Signal" value={conv.hero ? "Home Insurance held elsewhere" : conv.primarySignal} tone="success" />
              <Field label="Follow-up" value={conv.followUp} tone={conv.followUp === "Confirmed" ? "success" : "danger"} />
              <Field label="Business Outcome" value={conv.outcome} />
            </div>
            <div className="grid gap-2.5 border-t border-border px-4 py-3 md:grid-cols-2">
              <InsightCard
                tone="danger"
                title="Why cancellation risk is elevated"
                body={`Cancellation language was detected alongside a competitor comparison and a ${delta}% premium change. No follow-up time was confirmed.`}
                meta="Retention model · simulated"
              />
              <InsightCard
                tone="warning"
                title="Additional-care indicator detected"
                body="The customer referred to reduced working hours and difficulty managing household costs. This is an indicator only and requires review by a qualified employee."
                meta="Customer care review recommended"
              />
            </div>
          </Panel>

          {/* Scorecard */}
          <Panel>
            <PanelHead
              title="Conversation Quality Scorecard"
              icon={<Target className="h-3.5 w-3.5" />}
              right={
                <Pill tone={overall >= 85 ? "success" : overall >= 70 ? "primary" : "warning"}>
                  Overall {overall}% · {overallLabel}
                </Pill>
              }
            />
            <div className="grid gap-x-6 gap-y-3 px-4 py-3.5 md:grid-cols-2">
              {conv.scores.map((s) => (
                <ScoreBar key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
            <div className="grid gap-2.5 border-t border-border px-4 py-3 md:grid-cols-2">
              {conv.coaching.map((c) => (
                <InsightCard key={c.title} tone="warning" title={c.title} body={c.body} meta={`${conv.agent} · ${conv.date}`} />
              ))}
            </div>
          </Panel>

          {/* Risk and compliance */}
          <Panel>
            <PanelHead
              title="Risk and Review Signals"
              icon={<ShieldAlert className="h-3.5 w-3.5" />}
              subtitle="Detection supports human review. It does not replace the insurer's own processes."
            />
            <div className="grid gap-2.5 px-4 py-3.5 md:grid-cols-3">
              <div className="rounded-lg border border-danger/25 bg-danger-soft px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-danger uppercase">
                  <AlertTriangle className="h-3 w-3" /> Potential complaint signal
                </p>
                <p className="mt-1.5 text-[12px] leading-[1.55] text-foreground/85">
                  Expression of dissatisfaction detected regarding premium increase and perceived value of loyalty.
                </p>
              </div>
              <div className="rounded-lg border border-warning/25 bg-warning-soft px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-warning uppercase">
                  <HeartHandshake className="h-3 w-3" /> Additional-care indicator
                </p>
                <p className="mt-1.5 text-[12px] leading-[1.55] text-foreground/85">
                  Financial-pressure language detected. Route to qualified employees for appropriate customer treatment.
                </p>
              </div>
              <div className="rounded-lg border border-info/25 bg-info-soft px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-info uppercase">
                  <ShieldAlert className="h-3 w-3" /> Process adherence
                </p>
                <p className="mt-1.5 text-[12px] leading-[1.55] text-foreground/85">
                  Identity verification completed correctly. Documentation commitment recorded without a confirmed owner.
                </p>
              </div>
            </div>
          </Panel>

          {/* Transcript */}
          <Panel>
            <PanelHead
              title="Full Transcript"
              icon={<FileText className="h-3.5 w-3.5" />}
              subtitle={`${conv.transcript.length} turns · auto-transcribed · tagged for review`}
              right={
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CalendarClock className="h-3 w-3" /> {conv.date} · {conv.time}
                </span>
              }
            />
            <div className="flex flex-wrap gap-1.5 border-b border-border px-4 py-2.5">
              <button
                onClick={() => setTagFilter(null)}
                className={cn(
                  "rounded-md px-2 py-[3px] text-[11px] font-medium transition-colors",
                  tagFilter === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                All turns
              </button>
              {TRANSCRIPT_TAGS.map((t) => (
                <button key={t} onClick={() => setTagFilter(tagFilter === t ? null : t)}>
                  <Pill tone={tagFilter === t ? "primary" : tagTone(t)}>{t}</Pill>
                </button>
              ))}
            </div>
            <div className="scroll-slim max-h-[460px] space-y-3 overflow-y-auto px-4 py-3.5">
              {turns.map((t, i) => (
                <div key={i} className={cn("flex gap-2.5", t.speaker === "customer" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                      t.speaker === "agent" ? "bg-primary-soft text-primary" : "bg-classify-soft text-classify",
                    )}
                  >
                    {t.speaker === "agent" ? <Headphones className="h-3 w-3" /> : <User className="h-3 w-3" />}
                  </span>
                  <div
                    className={cn(
                      "max-w-[78%] rounded-lg border px-3 py-2",
                      t.speaker === "agent" ? "border-border bg-muted/40" : "border-primary/20 bg-primary-soft/60",
                    )}
                  >
                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold">{t.name}</span>
                      <span className="text-[10px] tabular-nums text-muted-foreground">{t.at}</span>
                      {t.tag ? <Pill tone={tagTone(t.tag)}>{t.tag}</Pill> : null}
                    </div>
                    <p className="text-[12.5px] leading-[1.6] text-foreground/90">{t.text}</p>
                  </div>
                </div>
              ))}
              {turns.length === 0 ? (
                <p className="py-8 text-center text-[12.5px] text-muted-foreground">No turns carry this tag.</p>
              ) : null}
            </div>
          </Panel>

          <p className="px-1 pb-1 text-[10.5px] text-muted-foreground">
            All customers, policies, claims, employees and figures shown are fictional and generated for demonstration
            purposes. Currency is shown in USD.
          </p>
        </div>
      </div>
    </div>
  );
}
