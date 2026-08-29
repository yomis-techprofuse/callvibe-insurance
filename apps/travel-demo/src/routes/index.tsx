import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CalendarCheck,
  MessageSquare,
  PlaneTakeoff,
  Utensils,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  HBarList,
  InsightCard,
  KpiCard,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  Td,
  Th,
  TableWrap,
  intentTone,
  statusTone,
} from "@/components/mi/kit";
import { DonutChart, Legend, VolumeChart } from "@/components/mi/charts";
import { Select } from "@/components/mi/controls";
import {
  budgetBands,
  departureCityDemand,
  travelWindowDemand,
  requirementSignals,
  tripTypeSplit,
  partyMix,
  executiveBrief,
  intentDistribution,
  opportunityLeakage,
  destinationDemand,
  destinationNames,
  destinations,
  secondaryKpis,
  topKpis,
  topObjections,
  volumeTrend,
} from "@/data/marhaba";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — CallVibe" },
      {
        name: "description",
        content:
          "Destination demand, traveller intent, itinerary conversion and opportunity leakage across GT Holidays holiday enquiries.",
      },
      { property: "og:title", content: "Executive Dashboard — CallVibe" },
      {
        property: "og:description",
        content: "Holiday enquiries turned into destination-level sales intelligence for GT Holidays.",
      },
    ],
  }),
  component: Dashboard,
});

const icons = [Users, Target, TrendingUp, CalendarCheck, Building2, AlertTriangle];

function Dashboard() {
  const [destination, setProject] = useState("All Destinations");
  const [risk, setRisk] = useState("All Risk Levels");

  const trend = useMemo(() => {
    if (destination === "All Destinations") return volumeTrend;
    const idx = destinationNames.indexOf(destination);
    const factor = 0.42 - idx * 0.05;
    return volumeTrend.map((d) => ({
      ...d,
      calls: Math.round(d.calls * factor),
      whatsapp: Math.round(d.whatsapp * factor),
    }));
  }, [destination]);

  const leaks = useMemo(
    () =>
      opportunityLeakage.filter(
        (l) =>
          (destination === "All Destinations" || l.destination === destination) &&
          (risk === "All Risk Levels" || l.risk === risk.replace(" Risk", "")),
      ),
    [destination, risk],
  );

  return (
    <div className="space-y-4">
      {/* Top KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {topKpis.map((k, i) => {
          const Icon = icons[i]!;
          return (
            <KpiCard
              key={k.label}
              label={k.label}
              value={k.value}
              delta={k.delta}
              up={k.up}
              tone={k.tone}
              sub="vs prev 30d"
              icon={<Icon className="h-3.5 w-3.5" />}
            />
          );
        })}
      </div>

      {/* Secondary metric cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {secondaryKpis.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      {/* Volume + intent */}
      <div className="grid gap-4 xl:grid-cols-[1.75fr_1fr]">
        <Panel>
          <PanelHead
            title="Conversation Volume — Last 30 Days"
            subtitle="Daily traveller calls and WhatsApp conversations"
            icon={<MessageSquare className="h-3.5 w-3.5" />}
            right={
              <Select
                label="All Destinations"
                value={destination}
                onChange={setProject}
                options={["All Destinations", ...destinationNames]}
                className="w-[190px]"
              />
            }
          />
          <div className="px-2 pt-3 pb-2">
            <VolumeChart data={trend} />
          </div>
          <div className="border-t border-border px-4 py-2.5">
            <Legend
              items={[
                { label: "Calls", color: "var(--color-primary)" },
                { label: "WhatsApp", color: "var(--color-chart-3)" },
              ]}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Traveller Intent Distribution" subtitle="Across analysed conversations" icon={<Target className="h-3.5 w-3.5" />} />
          <div className="px-4 pt-2">
            <DonutChart data={intentDistribution} centerValue="428" centerLabel="High-intent travellers" />
          </div>
          <div className="border-t border-border px-4 py-3">
            <div className="space-y-2">
              {intentDistribution.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-sm" style={{ background: d.color }} />
                    <span className="text-[12px]">{d.name} intent</span>
                  </div>
                  <span className="text-[12px] font-semibold tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Compact intelligence cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel>
          <PanelHead
            title="Destination Demand"
            subtitle="Qualified conversation share"
            right={
              <Link to="/destinations" className="text-[11.5px] font-medium text-primary hover:underline">
                View all
              </Link>
            }
          />
          <div className="px-4 py-3.5">
            <HBarList items={destinationDemand} />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Party Composition" subtitle="Share of qualified conversations" />
          <div className="px-4 py-3.5">
            <HBarList items={partyMix} suffix="%" tone="info" max={50} />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Budget Bands" subtitle="Discussed budget, INR" />
          <div className="px-4 py-3.5">
            <HBarList items={budgetBands} suffix="%" tone="classify" max={50} />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Top Objections" subtitle="Mentions across conversations" />
          <div className="px-4 py-3.5">
            <HBarList items={topObjections} tone="danger" />
          </div>
        </Panel>
      </div>

      {/* Travel-specific demand signals */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Panel>
          <PanelHead
            title="Departure City Demand"
            subtitle="Enquiries by origin city"
            icon={<PlaneTakeoff className="h-3.5 w-3.5" />}
          />
          <div className="px-4 py-3.5">
            <HBarList items={departureCityDemand} />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Travel Window Demand"
            subtitle="When travellers intend to depart"
            icon={<CalendarCheck className="h-3.5 w-3.5" />}
          />
          <div className="px-4 py-3.5">
            <HBarList items={travelWindowDemand} tone="info" />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Traveller Requirement Signals"
            subtitle="Detected automatically in conversations"
            icon={<Utensils className="h-3.5 w-3.5" />}
          />
          <div className="px-4 py-3.5">
            <HBarList items={requirementSignals} tone="classify" />
          </div>
        </Panel>
      </div>


      {/* Traveller type + brief */}
      <div className="grid gap-4 xl:grid-cols-[1fr_2fr]">
        <Panel>
          <PanelHead title="Trip Type" subtitle="Portfolio-wide classification" icon={<Users className="h-3.5 w-3.5" />} />
          <div className="px-4 py-3.5">
            <HBarList items={tripTypeSplit} suffix="%" max={60} />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {destinations.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-lg border border-border bg-muted/30 px-2.5 py-2">
                  <p className="truncate text-[10.5px] text-muted-foreground">{p.short}</p>
                  <p className="mt-0.5 text-[11.5px] font-semibold">{p.dominantTripType}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="AI Executive Brief"
            subtitle="Generated from 5,986 traveller conversations"
            icon={<Sparkles className="h-3.5 w-3.5" />}
            right={<Pill tone="info">Updated 10 min ago</Pill>}
          />
          <div className="grid gap-2.5 px-4 py-3.5 lg:grid-cols-2">
            {executiveBrief.map((b) => (
              <InsightCard key={b.title} tone={b.tone} title={b.title} body={b.body} meta={b.meta} />
            ))}
          </div>
        </Panel>
      </div>

      {/* Opportunity leakage table */}
      <Panel>
        <PanelHead
          title="Opportunity Leakage"
          subtitle="High-intent travellers requiring immediate follow-up"
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          right={
            <div className="flex items-center gap-2">
              <Select
                label="All Risk Levels"
                value={risk}
                onChange={setRisk}
                options={["All Risk Levels", "High Risk", "Medium Risk", "Low Risk"]}
                className="w-[150px]"
              />
              <Link to="/action-items" className="text-[11.5px] font-medium text-primary hover:underline">
                Action items
              </Link>
            </div>
          }
        />
        <TableWrap>
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr>
                <Th>Traveller</Th>
                <Th>Destination</Th>
                <Th>Leakage Reason</Th>
                <Th>Intent</Th>
                <Th>Est. Value</Th>
                <Th>Last Contact</Th>
                <Th>Advisor</Th>
                <Th>Risk</Th>
              </tr>
            </thead>
            <tbody>
              {leaks.map((l) => (
                <tr key={l.traveller + l.reason} className="transition-colors hover:bg-muted/40">
                  <Td className="font-medium">{l.traveller}</Td>
                  <Td className="text-muted-foreground">{l.destination}</Td>
                  <Td>{l.reason}</Td>
                  <Td>
                    <Pill tone={intentTone(l.intent >= 75 ? "High" : l.intent >= 50 ? "Medium" : "Low")} dot>
                      {l.intent}
                    </Pill>
                  </Td>
                  <Td className="font-semibold tabular-nums">{l.value}</Td>
                  <Td className="text-muted-foreground tabular-nums">{l.lastContact}</Td>
                  <Td>{l.advisor}</Td>
                  <Td>
                    <Pill tone={l.risk === "High" ? "danger" : l.risk === "Medium" ? "warning" : "neutral"}>
                      {l.risk}
                    </Pill>
                  </Td>
                </tr>
              ))}
              {leaks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-[12.5px] text-muted-foreground">
                    No leakage detected for this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </TableWrap>
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
          <p className="text-[11px] text-muted-foreground">
            Showing {leaks.length} of {opportunityLeakage.length} flagged opportunities · fictional demo data
          </p>
          <Pill tone={statusTone("Pending")}>Requires follow-up</Pill>
        </div>
      </Panel>
    </div>
  );
}
