import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Panel, PanelHead, Pill, ScoreBar } from "@/components/mi/kit";
import { AiCaveat, DemoBadge, InsightBanner, PageHead } from "@/components/mi/ui";
import {
  coachingOpportunities,
  conversationById,
  heroIntel,
  heroTranscript,
  heroWhyAgain,
  qaOverall,
  qaScorecard,
} from "@/data/techtar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/conversations/$id")({
  loader: ({ params }) => {
    const conversation = conversationById(params.id);
    if (!conversation) throw notFound();
    return { conversation };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Conversation unavailable — TechTar Intelligence" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.conversation;
    const title = `${c.id} — Conversation Intelligence | TechTar Intelligence`;
    const description = `${c.driver} · ${c.subDriver} · ${c.resolution}. Transcript, intelligence signals, root cause and QA scorecard for a simulated applicant conversation.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ConversationDetail,
});

function ConversationDetail() {
  const { conversation: c } = Route.useLoaderData();

  return (
    <div className="space-y-4">
      <Link to="/demo/conversations" className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All conversations
      </Link>

      <PageHead
        title={`Conversation ${c.id}`}
        subtitle={`${c.market} · ${c.language} · ${c.datetime} · Duration ${c.duration} · Agent ${c.agent}`}
        right={
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone={c.repeat ? "danger" : "neutral"} dot>{c.repeat ? "Repeat Contact" : "First Contact"}</Pill>
            <Pill tone={c.resolution === "Resolved" ? "success" : c.resolution === "Partially Resolved" ? "warning" : "danger"}>{c.resolution}</Pill>
            <Link to="/demo/contact-drivers/$id" params={{ id: c.driverId }} className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
              {c.driver} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Panel>
            <PanelHead title="Transcript" subtitle="Simulated conversation — no real applicant data" right={<DemoBadge label="Illustrative" />} />
            <div className="scroll-slim max-h-[560px] space-y-3 overflow-y-auto p-4">
              {heroTranscript.map((t, i) => (
                <div key={i} className={cn("flex gap-3", t.speaker === "Agent" ? "" : "flex-row-reverse")}>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                      t.speaker === "Agent" ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {t.speaker === "Agent" ? "AG" : "AP"}
                  </span>
                  <div className={cn("max-w-[78%] rounded-xl border border-border px-3 py-2", t.speaker === "Agent" ? "bg-card" : "bg-muted/40")}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase">{t.speaker}</span>
                      <span className="text-[10.5px] text-muted-foreground tabular-nums">{t.t}</span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.6]">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Conversation Summary" subtitle="AI-generated summary of the interaction" icon={<Sparkles className="h-3.5 w-3.5" />} />
            <div className="p-4">
              <p className="text-[12.5px] leading-[1.65]">{c.summary}</p>
              <AiCaveat text="AI-generated summary — illustrative demo output." />
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Why This Applicant Called Again" subtitle="Root-cause attribution for this conversation" />
            <div className="grid gap-2.5 p-4 md:grid-cols-2">
              {heroWhyAgain.map((r) => (
                <div key={r.label} className="rounded-lg border border-border px-3 py-2.5">
                  <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{r.label}</p>
                  <p className="mt-1 text-[12.5px] font-medium">{r.value}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHead
              title="QA Scorecard"
              subtitle="Configurable scorecard applied to this conversation"
              right={<DemoBadge label="Demo QA framework" />}
            />
            <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto]">
              <div className="space-y-2.5">
                {qaScorecard.map((s) => (
                  <ScoreBar key={s.label} label={s.label} value={s.score} />
                ))}
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-muted/30 px-6 py-4">
                <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">Overall</span>
                <span className="mt-1 text-[30px] leading-none font-semibold tabular-nums">{qaOverall}</span>
                <span className="mt-1 text-[11px] text-muted-foreground">out of 100</span>
              </div>
            </div>
            <div className="border-t border-border p-4">
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">Coaching Opportunities</p>
              <div className="mt-2 grid gap-2.5 md:grid-cols-3">
                {coachingOpportunities.map((o) => (
                  <div key={o.title} className="rounded-lg border border-border px-3 py-2.5">
                    <p className="text-[12.5px] font-semibold">{o.title}</p>
                    <p className="mt-1 text-[12px] leading-[1.55] text-muted-foreground">{o.body}</p>
                  </div>
                ))}
              </div>
              <AiCaveat />
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHead title="Conversation Intelligence" subtitle="Extracted signals" />
            <div className="divide-y divide-border">
              {heroIntel.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-3 px-4 py-2.5">
                  <span className="text-[10.5px] font-semibold tracking-widest text-muted-foreground uppercase">{s.label}</span>
                  <span className="max-w-[58%] text-right text-[12px] font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <InsightBanner
            label="Operational signal"
            body="This conversation matches a pattern observed across 428 application-status conversations this period: the applicant is not blocked by a missing document, but by uncertainty about whether any action is required."
          >
            <Link to="/demo/emerging-issues" className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
              View the pattern <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </InsightBanner>

          <Panel>
            <PanelHead title="Agent" subtitle="Coaching context" />
            <div className="p-4">
              <p className="text-[13px] font-semibold">{c.agent}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">Leading coaching opportunity for this agent is resolution confirmation.</p>
              <Link to="/demo/agents" className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
                Open agent coaching <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
