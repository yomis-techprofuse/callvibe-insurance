import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Panel, PanelHead, MetricTile, Pill } from "@/components/mi/kit";
import { BarRow, InsightBanner, PageHead, AiCaveat } from "@/components/mi/ui";
import { marketById, languageById, crossSliceCount } from "@/data/geo";

export const Route = createFileRoute("/demo/markets/$id")({
  loader: ({ params }) => {
    const market = marketById(params.id);
    if (!market) throw notFound();
    return { market };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Market unavailable — TechTar Intelligence" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.market.name} Applicant Support Intelligence — TechTar`;
    return {
      meta: [
        { title: t },
        {
          name: "description",
          content: `Conversation volume, first contact resolution, repeat contact, languages and emerging issues for applicants contacting Hayya from ${loaderData.market.name}. Simulated demo data.`,
        },
        { property: "og:title", content: t },
        { property: "og:description", content: `Market-level applicant support intelligence for ${loaderData.market.name}.` },
      ],
    };
  },
  notFoundComponent: MarketNotFound,
  component: MarketPage,
});

function MarketNotFound() {
  return (
    <Panel className="p-6">
      <p className="text-[14px] font-semibold">Market not found</p>
      <Link to="/" className="mt-2 inline-block text-[12.5px] font-semibold text-primary hover:underline">
        Back to Command Center
      </Link>
    </Panel>
  );
}

function MarketPage() {
  const { market: m } = Route.useLoaderData();
  const topLang = m.languages[0]!;
  const topDriverPct = m.drivers[0]!.pct;
  const slice = crossSliceCount(m.share, m.languages.find((l) => l.label === "Malayalam")?.pct ?? topLang.pct, topDriverPct);

  return (
    <div className="space-y-5">
      <PageHead
        title={`${m.name} Applicant Support Intelligence`}
        subtitle={`One market within the global Hayya applicant support operation — ${m.share}% of all conversations in the selected period.`}
        right={
          <Link to="/" className="text-[12px] font-semibold text-primary hover:underline">
            Back to Command Center
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Conversations" value={m.conversations.toLocaleString()} sub={`${m.share}% of global volume`} />
        <MetricTile label="First Contact Resolution" value={`${m.fcr}%`} />
        <MetricTile label="Repeat Contact" value={`${m.repeat}%`} />
        <MetricTile label="Average Handle Time" value={m.aht} />
        <MetricTile label="Escalation Rate" value={`${m.escalation}%`} />
        <MetricTile label="Average QA Score" value={String(m.qa)} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel>
          <PanelHead title="Languages" subtitle="Share of conversations in this market — click to open language intelligence" />
          <div className="space-y-2 p-4">
            {m.languages.map((l) => {
              const li = languageById(l.label.toLowerCase());
              return li ? (
                <BarRow key={l.label} label={l.label} value={l.pct} max={100} to="/demo/languages/$id" params={{ id: li.id }} tone={li.repeat >= 23 ? "danger" : "primary"} />
              ) : (
                <BarRow key={l.label} label={l.label} value={l.pct} max={100} tone="neutral" />
              );
            })}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Top Contact Drivers" subtitle="Why applicants in this market are contacting Hayya" />
          <div className="space-y-2 p-4">
            {m.drivers.map((d) =>
              d.id ? (
                <BarRow key={d.label} label={d.label} value={d.pct} max={40} to="/demo/contact-drivers/$id" params={{ id: d.id }} />
              ) : (
                <BarRow key={d.label} label={d.label} value={d.pct} max={40} tone="neutral" />
              ),
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Emerging Issues" subtitle="Detected in this market during the selected period" />
          <div className="space-y-2 p-4">
            {m.emerging.map((e) => (
              <div key={e} className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
                <span className="text-[12px]">{e}</span>
                <Pill tone="warning">Rising</Pill>
              </div>
            ))}
            <Link to="/demo/emerging-issues" className="inline-flex items-center gap-1 pt-1 text-[12px] font-semibold text-primary hover:underline">
              All emerging issues <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Cross-Dimensional Intelligence" subtitle="Combine market, language, contact driver and repeat-contact behaviour" />
        <div className="flex flex-wrap items-center gap-2 p-4">
          <Chip label="Market" value={m.name} />
          <Chip label="Language" value={m.languages.find((l) => l.label === "Malayalam") ? "Malayalam" : topLang.label} />
          <Chip label="Contact Driver" value={m.drivers[0]!.label} />
          <Chip label="Repeat Contact" value="Yes" />
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[19px] font-semibold tabular-nums">{slice}</span>
            <span className="text-[11.5px] text-muted-foreground">conversations match</span>
            <Link
              to="/demo/conversations"
              search={{ driver: m.drivers[0]!.label }}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground"
            >
              Drill into conversations <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Panel>

      <InsightBanner label="TechTar Insight — Simulated Demo Insight" body={m.insight}>
        <Link to="/demo/resolution" className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
          Investigate Root Causes <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <AiCaveat />
      </InsightBanner>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 py-1.5">
      <span className="text-[9.5px] font-semibold tracking-widest text-muted-foreground uppercase">{label}</span>
      <span className="text-[12px] font-semibold">{value}</span>
    </span>
  );
}
