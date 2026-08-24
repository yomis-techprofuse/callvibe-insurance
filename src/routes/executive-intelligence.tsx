import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Target } from "lucide-react";
import { MetricTile, Panel, PanelHead, Pill } from "@/components/mi/kit";
import { TabBar } from "@/components/mi/controls";
import { EXEC_INSIGHTS, WEEKLY_INSIGHTS } from "@/data/callvibe";

export const Route = createFileRoute("/executive-intelligence")({
  head: () => ({
    meta: [
      { title: "Executive Intelligence — CallVibe" },
      {
        name: "description",
        content:
          "Portfolio-level insurance conversation findings: retention pressure, quote leakage, claims delays, complaint risk and product opportunities.",
      },
      { property: "og:title", content: "Executive Intelligence — CallVibe" },
      { property: "og:description", content: "What changed, why it matters and what to do next across the insurance portfolio." },
    ],
  }),
  component: ExecutivePage,
});

const SECTIONS = ["All Intelligence", ...Array.from(new Set(EXEC_INSIGHTS.map((i) => i.section)))];

function ExecutivePage() {
  const [tab, setTab] = useState(SECTIONS[0]!);
  const items = tab === SECTIONS[0] ? EXEC_INSIGHTS : EXEC_INSIGHTS.filter((i) => i.section === tab);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Findings This Period" value="6" sub="across five intelligence domains" />
        <MetricTile label="Highest Impact Domain" value="Retention" sub="motor renewal price pressure" />
        <MetricTile label="Illustrative Opportunity" value="$2.84M" sub="simulated value at stake" />
        <MetricTile label="Requiring Human Review" value="392" sub="potential complaint signals" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={SECTIONS} value={tab} onChange={setTab} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Each finding states what changed, why it matters and the recommended action
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((i) => (
          <Panel key={i.id}>
            <PanelHead
              title={i.title}
              subtitle={i.section}
              icon={<Target className="h-3.5 w-3.5" />}
              right={<Pill tone={i.tone}>{i.metric}</Pill>}
            />
            <div className="space-y-2.5 px-4 py-3.5">
              <div>
                <p className="text-[10.5px] font-semibold tracking-widest text-muted-foreground uppercase">What changed</p>
                {i.body.map((b) => (
                  <p key={b} className="mt-1 text-[12.5px] leading-[1.6] text-foreground/90">
                    {b}
                  </p>
                ))}
              </div>
              <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{i.metricLabel}</p>
                <p className="mt-1 text-[18px] leading-none font-semibold tabular-nums">{i.metric}</p>
              </div>
              <div className="rounded-lg border border-primary/25 bg-primary-soft px-3 py-2.5">
                <p className="text-[10.5px] font-semibold tracking-widest text-primary uppercase">Recommended action</p>
                <p className="mt-1 text-[12.5px] leading-[1.55] font-medium text-primary">{i.action}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel>
        <PanelHead
          title="What Changed This Week"
          subtitle="Movement detected against the previous analysed period"
          icon={<Sparkles className="h-3.5 w-3.5" />}
        />
        <div className="grid gap-2.5 px-4 py-3.5 lg:grid-cols-2">
          {WEEKLY_INSIGHTS.map((i) => (
            <div key={i.id} className="rounded-lg border border-border px-3.5 py-3">
              <div className="flex items-start gap-2">
                <Pill tone={i.tone}>Change</Pill>
                <p className="min-w-0 text-[12.5px] leading-[1.5] font-semibold">{i.changed}</p>
              </div>
              <p className="mt-2 text-[12px] leading-[1.55] text-muted-foreground">{i.matters}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground/80">Affected cohort:</span> {i.cohort}
              </p>
              <p className="mt-1.5 text-[11.5px] font-medium text-primary">{i.action}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
