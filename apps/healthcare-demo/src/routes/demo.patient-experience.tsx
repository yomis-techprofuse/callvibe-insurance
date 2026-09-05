import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartPulse, Repeat2, Sparkles } from "lucide-react";
import { HBarList, InsightCard, MetricTile, Panel, PanelHead, Pill } from "@/components/mi/kit";
import { Legend, TrendLines } from "@/components/mi/charts";
import { ObservedNote } from "@/components/mi/hospital-viz";
import { PatientDrawer } from "@/components/mi/patient-drawer";
import {
  experienceInsights,
  heroPatient,
  patientStruggles,
  patients,
  repeatBreakdown,
  repeatInsight,
  repeatReasons,
  sentimentTrend,
} from "@/data/hospital";

export const Route = createFileRoute("/demo/patient-experience")({
  head: () => ({
    meta: [
      { title: "Patient Experience — CallVibe Hospital" },
      {
        name: "description",
        content:
          "What frustrates patients, why enquiries stay unresolved and why patients contact the hospital again — including repeat-contact intelligence and cross-channel journeys.",
      },
      { property: "og:title", content: "Patient Experience — CallVibe Hospital" },
      { property: "og:description", content: "Friction, repeat contacts and unresolved need, heard directly in patient conversations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PatientExperience,
});

function PatientExperience() {
  const [open, setOpen] = useState<typeof heroPatient | null>(null);
  const repeatPatients = patients.filter((p) => p.interactions > 1).slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Repeat Contacts" value="286" sub="patients who contacted us more than once about the same issue" />
        <MetricTile label="Unresolved Enquiries" value="184" sub="closed with no documented outcome" />
        <MetricTile label="Negative Sentiment" value="16%" sub="of analysed conversations" />
        <MetricTile label="Friction Mentions" value="2,190" sub="explicit patient friction statements" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelHead
            title="What Are Patients Struggling With?"
            subtitle="Explicit friction detected in patient conversations"
            icon={<HeartPulse className="h-3.5 w-3.5" />}
          />
          <div className="space-y-2 px-4 py-3.5">
            {patientStruggles.map((s) => (
              <div key={s.label} className="rounded-lg border border-border px-3 py-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[12.5px] font-medium">{s.label}</p>
                  <span className="text-[13px] font-semibold tabular-nums">{s.value}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.detail}</p>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-danger/70" style={{ width: `${(s.value / 412) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelHead title="Why Are Patients Calling Again?" subtitle="Share of repeat contacts by root cause" icon={<Repeat2 className="h-3.5 w-3.5" />} />
            <div className="px-4 py-3.5">
              <HBarList items={repeatReasons} suffix="%" tone="warning" max={30} />
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Repeat Contacts" subtitle="286 patients contacted the hospital more than once about the same enquiry" />
            <div className="space-y-3 px-4 py-3.5">
              <div className="grid grid-cols-3 gap-2">
                {repeatBreakdown.map((r) => (
                  <div key={r.label} className="rounded-lg border border-border px-3 py-2.5 text-center">
                    <p className="text-[18px] leading-none font-semibold tabular-nums">{r.value}</p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">{r.label}</p>
                    <p className="text-[10.5px] font-medium text-primary">{r.share}%</p>
                  </div>
                ))}
              </div>
              <InsightCard tone="danger" title="Insurance is the disproportionate repeat driver" body={repeatInsight} meta="Repeat Contact Intelligence" />
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelHead title="Sentiment Trend" subtitle="Weekly share of patient sentiment across analysed conversations" />
          <div className="px-2 pt-3">
            <TrendLines
              data={sentimentTrend}
              xKey="week"
              height={220}
              series={[
                { key: "positive", color: "var(--color-success)" },
                { key: "neutral", color: "var(--color-chart-3)" },
                { key: "negative", color: "var(--color-danger)" },
              ]}
            />
          </div>
          <div className="border-t border-border px-4 py-2.5">
            <Legend
              items={[
                { label: "Positive", color: "var(--color-success)" },
                { label: "Neutral", color: "var(--color-chart-3)" },
                { label: "Negative", color: "var(--color-danger)" },
              ]}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Experience Intelligence" subtitle="Patterns visible only across thousands of conversations" icon={<Sparkles className="h-3.5 w-3.5" />} />
          <div className="space-y-2.5 px-4 py-3.5">
            {experienceInsights.map((i) => (
              <InsightCard key={i.title} tone={i.tone} title={i.title} body={i.body} meta={i.meta} />
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead
          title="Patient Journeys With Repeat Contact"
          subtitle="Open a patient to see every interaction across channels and the AI journey summary"
          right={<Pill tone="warning">{patients.filter((p) => p.interactions > 1).length} patients</Pill>}
        />
        <div className="px-4 pt-3">
          <ObservedNote>
            Repeat contact is measured by matching patients across calls and WhatsApp on mobile number and enquiry
            context. It reflects effort the patient had to spend, not their clinical condition.
          </ObservedNote>
        </div>
        <div className="grid gap-2.5 px-4 py-3.5 md:grid-cols-2 xl:grid-cols-3">
          {repeatPatients.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpen(p)}
              className="rounded-lg border border-border px-3.5 py-3 text-left transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[12.5px] font-semibold">{p.name}</p>
                <Pill tone="warning">{p.interactions} contacts</Pill>
              </div>
              <p className="mt-1 truncate text-[11.5px] text-muted-foreground">{p.primaryEnquiry}</p>
              <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.5] text-muted-foreground/90">{p.summary}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Pill tone="neutral">{p.specialty}</Pill>
                <Pill tone="danger">{p.barriers[0] ?? "Follow-up"}</Pill>
              </div>
            </button>
          ))}
        </div>
      </Panel>

      <PatientDrawer patient={open} onClose={() => setOpen(null)} />
    </div>
  );
}
