import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Panel, PanelHead, TableWrap, Td, Th } from "@/components/mi/kit";
import { BarRow, DemoBadge, InsightBanner, PageHead } from "@/components/mi/ui";
import { DonutChart, Legend, chartColors } from "@/components/mi/charts";
import {
  effortJourneys,
  growingReasons,
  indiaIssues,
  indiaKpis,
  languageMatrix,
  languageSplit,
  languages,
  repeatJourneys,
  topConcerns,
  driverByName,
} from "@/data/techtar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/applicant-intelligence")({
  head: () => ({
    meta: [
      { title: "Applicant Intelligence — TechTar Intelligence" },
      { name: "description", content: "What applicants are actually saying: top concerns, highest-effort journeys, repeat-contact journeys and the fastest growing contact reasons." },
      { property: "og:title", content: "Applicant Intelligence — TechTar Intelligence" },
      { property: "og:description", content: "Voice of the applicant across Hayya support conversations. Simulated demo data." },
    ],
  }),
  component: ApplicantIntelligence,
});

const TABS = ["Overview", "India Market View"] as const;

function ApplicantIntelligence() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");

  return (
    <div className="space-y-4">
      <PageHead
        title="Applicant Intelligence"
        subtitle="Aggregated applicant language, effort and recontact behaviour across conversations — beyond the disposition selected by the agent."
        right={
          <div className="flex rounded-lg border border-border bg-card p-0.5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors",
                  tab === t ? "bg-primary-soft text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      {tab === "Overview" ? <Overview /> : <IndiaView />}
    </div>
  );
}

function Overview() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel>
          <PanelHead title="Top Applicant Concerns" subtitle="Share of conversations mentioning the theme" />
          <div className="space-y-2.5 p-4">
            {topConcerns.map((c) => (
              <BarRow key={c.label} label={c.label} value={c.pct} max={35} right={`${c.pct}% · ${c.trend}`} />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Highest Customer Effort Journeys" subtitle="Relative applicant effort index" />
          <div className="space-y-2.5 p-4">
            {effortJourneys.map((c) => (
              <BarRow key={c.label} label={c.label} value={c.effort} tone="danger" right={`${c.effort}`} />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Most Common Repeat Contact Journeys" subtitle="Share of repeat contacts" />
          <div className="space-y-2.5 p-4">
            {repeatJourneys.map((c) => (
              <BarRow
                key={c.label}
                label={c.label}
                value={c.pct}
                max={35}
                tone="warning"
                to="/demo/conversations"
                search={{ driver: driverByName(c.label)?.name ?? "All" }}
              />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Fastest Growing Contact Reasons" subtitle="Week-on-week movement" />
          <div className="space-y-2.5 p-4">
            {growingReasons.map((c) => (
              <BarRow key={c.label} label={c.label} value={c.pct} max={20} tone="classify" right={`+${c.pct}%`} />
            ))}
            <Link to="/demo/emerging-issues" className="inline-flex items-center gap-1 pt-1 text-[12px] font-semibold text-primary hover:underline">
              Open emerging issues <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Panel>
      </div>

      <InsightBanner body="Applicant language across conversations is dominated by uncertainty rather than dissatisfaction with a decision: processing time, missing-document ambiguity and status visibility together account for the majority of stated concerns." />
    </>
  );
}

function IndiaView() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {indiaKpis.map((k) => (
          <Panel key={k.label} className="px-4 py-3">
            <p className="text-[11.5px] text-muted-foreground">{k.label}</p>
            <p className="mt-1.5 text-[20px] leading-none font-semibold tabular-nums">{k.value}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel>
          <PanelHead title="Conversations by Language" subtitle="India applicant support" right={<DemoBadge />} />
          <div className="p-4">
            <DonutChart data={languageSplit.map((l) => ({ name: l.label, value: l.pct }))} centerValue="18,642" centerLabel="conversations" />
            <div className="mt-3">
              <Legend items={languageSplit.map((l, i) => ({ label: l.label, color: chartColors[i % chartColors.length]!, value: `${l.pct}%` }))} />
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Common Issues — India" subtitle="Leading contact drivers for this market" />
          <div className="space-y-1 p-3">
            {indiaIssues.map((i) => {
              const d = driverByName(i) ?? driverByName(`${i} / Visa Type`);
              return (
                <Link
                  key={i}
                  to="/demo/conversations"
                  search={{ driver: d?.name ?? "All" }}
                  className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[12.5px] transition-colors hover:bg-muted"
                >
                  <span>{i}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Multilingual Coverage" subtitle="Configurable language support in TechTar" />
          <div className="p-4">
            <p className="text-[12.5px] leading-[1.6] text-muted-foreground">
              This demonstration classifies conversations across English, Hindi, Malayalam, Tamil and Arabic. Classification quality varies by
              language and audio conditions; multilingual outputs should be validated during onboarding.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["English", "Hindi", "Malayalam", "Tamil", "Arabic"].map((l) => (
                <span key={l} className="rounded-md bg-muted px-2 py-1 text-[11.5px] font-medium">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Language × Contact Driver" subtitle="Share of conversations within each language (simulated)" right={<DemoBadge label="Illustrative" />} />
        <TableWrap>
          <table className="w-full min-w-[680px]">
            <thead>
              <tr>
                <Th>Contact Driver</Th>
                {languages.map((l) => (
                  <Th key={l}>{l}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {languageMatrix.map((row) => (
                <tr key={row.driver} className="transition-colors hover:bg-muted/50">
                  <Td className="font-medium">{row.driver}</Td>
                  {row.values.map((v, i) => (
                    <Td key={i}>
                      <span
                        className={cn(
                          "inline-block rounded-md px-1.5 py-[2px] text-[11.5px] font-semibold tabular-nums",
                          v >= 22 ? "bg-primary text-primary-foreground" : v >= 15 ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {v}%
                      </span>
                    </Td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <InsightBanner body="Application-status and document conversations dominate in every language, but Hindi and Malayalam conversations show a slightly higher document-requirement share — a useful signal for language-specific guidance content." />
    </>
  );
}
