import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Panel, PanelHead, MetricTile } from "@/components/mi/kit";
import { AiCaveat, BarRow, InsightBanner, PageHead } from "@/components/mi/ui";
import { languageById, marketById } from "@/data/geo";

export const Route = createFileRoute("/demo/languages/$id")({
  loader: ({ params }) => {
    const language = languageById(params.id);
    if (!language) throw notFound();
    return { language };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Language unavailable — TechTar Intelligence" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.language.name} Support Intelligence — TechTar`;
    return {
      meta: [
        { title: t },
        {
          name: "description",
          content: `First contact resolution, repeat contact, handle time and contact drivers for ${loaderData.language.name}-language applicant support conversations. Simulated demo data.`,
        },
        { property: "og:title", content: t },
        { property: "og:description", content: `Language-level applicant support intelligence for ${loaderData.language.name}.` },
      ],
    };
  },
  notFoundComponent: LanguageNotFound,
  component: LanguagePage,
});

function LanguageNotFound() {
  return (
    <Panel className="p-6">
      <p className="text-[14px] font-semibold">Language not found</p>
      <Link to="/" className="mt-2 inline-block text-[12.5px] font-semibold text-primary hover:underline">
        Back to Command Center
      </Link>
    </Panel>
  );
}

function LanguagePage() {
  const { language: l } = Route.useLoaderData();

  return (
    <div className="space-y-5">
      <PageHead
        title={`${l.name} Support Intelligence`}
        subtitle={`${l.share}% of global applicant conversations — language performance connected to contact drivers and repeat demand.`}
        right={
          <Link to="/" className="text-[12px] font-semibold text-primary hover:underline">
            Back to Command Center
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <MetricTile label="Conversations" value={l.conversations.toLocaleString()} sub={`${l.share}% of global volume`} />
        <MetricTile label="First Contact Resolution" value={`${l.fcr}%`} />
        <MetricTile label="Repeat Contact" value={`${l.repeat}%`} />
        <MetricTile label="Average Handle Time" value={l.aht} />
        <MetricTile label="Escalation Rate" value={`${l.escalation}%`} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel>
          <PanelHead title="Top Contact Drivers" subtitle="Share of conversations in this language" />
          <div className="space-y-2 p-4">
            {l.drivers.map((d) =>
              d.id ? (
                <BarRow key={d.label} label={d.label} value={d.pct} max={40} to="/demo/contact-drivers/$id" params={{ id: d.id }} />
              ) : (
                <BarRow key={d.label} label={d.label} value={d.pct} max={40} tone="neutral" />
              ),
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Top Repeat-Contact Drivers" subtitle="Why applicants in this language contact again" />
          <div className="space-y-2 p-4">
            {l.repeatDrivers.map((r) => (
              <BarRow key={r.label} label={r.label} value={r.pct} max={40} tone="danger" />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Markets" subtitle="Where these conversations originate — click to open market intelligence" />
          <div className="space-y-2 p-4">
            {l.markets.map((mk) => {
              const m = marketById(mk.label.toLowerCase().replace(/\s+/g, "-"));
              return m ? (
                <BarRow key={mk.label} label={mk.label} value={mk.pct} max={100} to="/demo/markets/$id" params={{ id: m.id }} />
              ) : (
                <BarRow key={mk.label} label={mk.label} value={mk.pct} max={100} tone="neutral" />
              );
            })}
          </div>
        </Panel>
      </div>

      <InsightBanner label="TechTar Insight — Simulated Demo Insight" body={l.insight}>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/demo/resolution" className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground">
            Investigate Root Causes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/demo/conversations" search={{ driver: l.drivers[0]!.label }} className="text-[12px] font-semibold text-primary hover:underline">
            View related conversations
          </Link>
        </div>
        <AiCaveat />
      </InsightBanner>
    </div>
  );
}
