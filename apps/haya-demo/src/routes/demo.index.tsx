import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ArrowDownRight, MoveRight } from "lucide-react";
import { Panel, PanelHead, TableWrap, Td, Th } from "@/components/mi/kit";
import { AlertCard, BarRow, DeltaKpi, FilterBar, InsightBanner, PageHead } from "@/components/mi/ui";
import { AreaTrend } from "@/components/mi/charts";
import { WorldMap } from "@/components/mi/world-map";
import { languageIntel, markets } from "@/data/geo";
import {
  alerts,
  commandKpis,
  conversations,
  drivers,
  managementInsights,
  repeatRootCauses,
  volumeTrend,
} from "@/data/techtar";

export const Route = createFileRoute("/demo/")({
  head: () => ({
    meta: [
      { title: "Applicant Support Command Center — CallVibe" },
      {
        name: "description",
        content:
          "Global applicant support intelligence for Hayya: operational health, emerging issues, conversation demand by market and language, contact drivers and root causes.",
      },
      { property: "og:title", content: "Applicant Support Command Center — CallVibe" },
      { property: "og:description", content: "Global conversation intelligence for Hayya applicant support. Simulated demo data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommandCenter,
});

const trendIcon = { up: ArrowUpRight, flat: MoveRight, down: ArrowDownRight };
const trendTone = { up: "text-danger", flat: "text-muted-foreground", down: "text-success" };

function CommandCenter() {
  const recent = conversations.slice(0, 6);
  const marketTable = markets.filter((m) => m.id !== "other-markets").slice(0, 6);

  return (
    <div className="space-y-5">
      <PageHead
        title="Applicant Support Command Center"
        subtitle="Understand why applicants are contacting Hayya, what is driving repeat demand, and where support journeys are breaking down."
        badge="Demo data"
      />

      <FilterBar
        filters={[
          { label: "Date", options: ["Last 7 Days", "Last 30 Days", "Custom"] },
          { label: "Channel", options: ["Voice"] },
          { label: "Queue", options: ["All Applicant Support"] },
          { label: "Contact Driver", options: ["All", ...drivers.map((d) => d.name)] },
          { label: "Resolution Status", options: ["All", "Resolved", "Partially Resolved", "Unresolved"] },
        ]}
      />

      {/* 1 — Operational health */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {commandKpis.map((k) => (
          <DeltaKpi key={k.label} {...k} />
        ))}
      </div>

      {/* 2 — What needs attention */}
      <section>
        <div className="mb-2.5 flex items-center justify-between">
          <h3 className="text-[14px] font-semibold tracking-tight">What Needs Attention</h3>
          <span className="text-[11px] text-muted-foreground">4 signals detected in the selected period</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {alerts.map((a) => (
            <AlertCard
              key={a.id}
              severity={a.severity}
              kind={a.kind}
              title={a.title}
              body={a.body}
              cta={a.cta}
              to={a.to}
              params={a.params}
              search={a.search}
            />
          ))}
        </div>
      </section>

      {/* 3 + 4 — Where demand comes from / who we are supporting */}
      <div className="grid gap-4 xl:grid-cols-5">
        <Panel className="xl:col-span-3">
          <PanelHead
            title="Applicant Conversations by Market"
            subtitle="Geographic distribution of incoming applicant-support conversations — click a market to drill down"
          />
          <div className="px-3 py-3">
            <WorldMap />
          </div>
        </Panel>

        <Panel className="xl:col-span-2">
          <PanelHead title="Conversations by Language" subtitle="Language connected to operational performance — click a language to investigate" />
          <TableWrap>
            <table className="w-full min-w-[420px]">
              <thead>
                <tr>
                  <Th>Language</Th>
                  <Th className="text-right">Conversations</Th>
                  <Th className="text-right">%</Th>
                  <Th className="text-right">FCR</Th>
                  <Th className="text-right">Repeat</Th>
                </tr>
              </thead>
              <tbody>
                {languageIntel.map((l) => (
                  <tr key={l.id} className="transition-colors hover:bg-muted/50">
                    <Td>
                      <Link to="/demo/languages/$id" params={{ id: l.id }} className="font-medium text-primary hover:underline">
                        {l.name}
                      </Link>
                    </Td>
                    <Td className="text-right tabular-nums">{l.conversations.toLocaleString()}</Td>
                    <Td className="text-right tabular-nums">{l.share}%</Td>
                    <Td className={`text-right tabular-nums ${l.fcr < 72 ? "text-danger font-semibold" : ""}`}>{l.fcr}%</Td>
                    <Td className={`text-right tabular-nums ${l.repeat >= 24 ? "text-danger font-semibold" : ""}`}>{l.repeat}%</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>
      </div>

      {/* Contact demand by market */}
      <Panel>
        <PanelHead title="Contact Demand by Market" subtitle="Where support problems are emerging — click any market to drill down" />
        <TableWrap>
          <table className="w-full min-w-[720px]">
            <thead>
              <tr>
                <Th>Market</Th>
                <Th className="text-right">Calls</Th>
                <Th>Top Contact Driver</Th>
                <Th className="text-right">FCR</Th>
                <Th className="text-right">Repeat Contact</Th>
                <Th className="text-right">Trend</Th>
              </tr>
            </thead>
            <tbody>
              {marketTable.map((m) => {
                const Icon = trendIcon[m.trend];
                return (
                  <tr key={m.id} className="transition-colors hover:bg-muted/50">
                    <Td>
                      <Link to="/demo/markets/$id" params={{ id: m.id }} className="font-medium text-primary hover:underline">
                        {m.name}
                      </Link>
                    </Td>
                    <Td className="text-right tabular-nums">{m.conversations.toLocaleString()}</Td>
                    <Td>{m.topDriver}</Td>
                    <Td className={`text-right tabular-nums ${m.fcr < 72 ? "text-danger font-semibold" : ""}`}>{m.fcr}%</Td>
                    <Td className={`text-right tabular-nums ${m.repeat >= 23 ? "text-danger font-semibold" : ""}`}>{m.repeat}%</Td>
                    <Td className="text-right">
                      <Icon className={`ml-auto h-3.5 w-3.5 ${trendTone[m.trend]}`} />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      {/* 5 + 6 — Why they are contacting / where resolution breaks */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <PanelHead
            title="Why Applicants Are Contacting Hayya"
            subtitle="Share of conversations by contact driver — click any driver for root-cause analysis"
            right={
              <Link to="/demo/contact-drivers" className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
                All drivers <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="space-y-2 p-4">
            {drivers.map((d) => (
              <BarRow
                key={d.id}
                label={d.name}
                value={d.share}
                max={30}
                to="/demo/contact-drivers/$id"
                params={{ id: d.id }}
                tone={d.repeat >= 25 ? "danger" : d.repeat >= 18 ? "warning" : "primary"}
                right={`${d.share}%`}
              />
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelHead title="Conversation Volume" subtitle="Voice conversations, last 7 days" />
            <div className="px-2 py-3">
              <AreaTrend data={volumeTrend} height={180} name="Conversations" />
            </div>
          </Panel>
          <Panel>
            <PanelHead title="Why Applicants Contact Again" subtitle="Repeat-contact root causes" />
            <div className="space-y-2 p-4">
              {repeatRootCauses.slice(0, 4).map((r) => (
                <BarRow key={r.label} label={r.label} value={r.pct} max={30} tone="danger" />
              ))}
              <Link to="/demo/resolution" className="inline-flex items-center gap-1 pt-1 text-[12px] font-semibold text-primary hover:underline">
                Full resolution intelligence <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <PanelHead
            title="Recent Conversations"
            subtitle="Latest classified applicant conversations"
            right={
              <Link to="/demo/conversations" className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <TableWrap>
            <table className="w-full min-w-[720px]">
              <thead>
                <tr>
                  <Th>Conversation</Th>
                  <Th>Contact Driver</Th>
                  <Th>Resolution</Th>
                  <Th>Repeat</Th>
                  <Th>QA</Th>
                  <Th>Agent</Th>
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-muted/50">
                    <Td>
                      <Link to="/demo/conversations/$id" params={{ id: c.id }} className="font-medium text-primary hover:underline">
                        {c.id}
                      </Link>
                      <span className="block text-[11px] text-muted-foreground">{c.datetime}</span>
                    </Td>
                    <Td>
                      {c.driver}
                      <span className="block text-[11px] text-muted-foreground">{c.subDriver}</span>
                    </Td>
                    <Td>{c.resolution}</Td>
                    <Td>{c.repeat ? "Yes" : "No"}</Td>
                    <Td className="tabular-nums">{c.qa}</Td>
                    <Td>{c.agent}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>

        <Panel>
          <PanelHead title="Management Intelligence" subtitle="Illustrative AI-generated demo insights" />
          <div className="space-y-2.5 p-4">
            {managementInsights.slice(0, 3).map((m, i) => (
              <div key={m.id} className="rounded-lg border border-border px-3 py-2.5">
                <p className="text-[12.5px] font-semibold tracking-tight">
                  {i + 1}. {m.title}
                </p>
                <p className="mt-1 text-[12px] leading-[1.55] text-muted-foreground">{m.body}</p>
                <Link
                  to={m.to}
                  params={m.params as never}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary hover:underline"
                >
                  {m.evidence} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
            <Link to="/demo/reports" className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
              All management insights <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Panel>
      </div>

      <InsightBanner body="Bangladesh represents only 9% of conversations but records the highest repeat-contact rate in the operation, and Malayalam-language conversations resolve on first contact materially less often than Arabic-language conversations." />
    </div>
  );
}
