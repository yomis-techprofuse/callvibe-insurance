import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import {
  HBarList,
  InsightCard,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  ScoreBar,
  TableWrap,
  Td,
  Th,
} from "@/components/mi/kit";
import { Legend, TrendLines } from "@/components/mi/charts";
import { TabBar } from "@/components/mi/controls";
import { travellers, calls, destinations } from "@/data/marhaba";

export const Route = createFileRoute("/destinations/$id")({
  loader: ({ params }) => {
    const destination = destinations.find((p) => p.id === params.id);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Destination unavailable — CallVibe" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.destination;
    return {
      meta: [
        { title: `${p.name} — CallVibe` },
        { name: "description", content: `Traveller demand intelligence for ${p.name} in ${p.region}: intent, objections, competitor mentions and advisor performance.` },
        { property: "og:title", content: `${p.name} — CallVibe` },
        { property: "og:description", content: `Demand and traveller intent intelligence for ${p.name}.` },
      ],
    };
  },
  component: DestinationDetail,
});

const TABS = ["Demand", "Traveller Profile", "Advisors", "Travellers"];

function DestinationDetail() {
  const { destination: p } = Route.useLoaderData();
  const [tab, setTab] = useState(TABS[0]!);

  const destinationCalls = calls.filter((c) => c.destination === p.name).slice(0, 8);
  const destinationTravellers = travellers.filter((b) => b.destination === p.name).slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/destinations" className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" />
          All destinations
        </Link>
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill tone="primary">{p.type}</Pill>
          <Pill tone="info">From {p.from}</Pill>
          <Pill tone="classify">Best Season {p.bestWindow}</Pill>
        </div>
      </div>

      <Panel>
        <PanelHead
          title={p.name}
          subtitle={
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {p.region} · {p.nights}
            </span>
          }
          icon={<Building2 className="h-3.5 w-3.5" />}
          right={<Pill tone="success">{p.highIntentRate}% high intent</Pill>}
        />
        <div className="px-4 py-3.5">
          <p className="text-[12.5px] leading-[1.65] text-foreground/90">{p.brief}</p>
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Conversations" value={p.conversations.toLocaleString()} sub="Last 30 days" />
        <MetricTile label="Qualified Rate" value={`${p.qualifiedRate}%`} sub="Of conversations" />
        <MetricTile label="High Intent" value={`${p.highIntentRate}%`} sub="Score 75+" />
        <MetricTile label="Itineraries Sent" value={String(p.itinerariesSent)} sub="Requested" />
        <MetricTile label="Booking Intent" value={String(p.bookingIntent)} sub="Signals" />
        <MetricTile label="Median Budget" value={p.medianBudget} sub={`Top party ${p.topParty}`} />
      </div>

      <TabBar tabs={TABS} value={tab} onChange={setTab} />

      {tab === "Demand" ? (
        <>
          <Panel>
            <PanelHead title="Conversation & Intent Trend" subtitle="Last 12 weeks" />
            <div className="px-2 pt-3">
              <TrendLines
                data={p.trend}
                xKey="day"
                series={[
                  { key: "conversations", color: "var(--color-primary)" },
                  { key: "intent", color: "var(--color-success)" },
                ]}
              />
            </div>
            <div className="border-t border-border px-4 py-2.5">
              <Legend
                items={[
                  { label: "Conversations", color: "var(--color-primary)" },
                  { label: "Avg intent score", color: "var(--color-success)" },
                ]}
              />
            </div>
          </Panel>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Panel>
              <PanelHead title="Conversation Drivers" />
              <div className="px-4 py-3.5">
                <HBarList items={p.drivers} />
              </div>
            </Panel>
            <Panel>
              <PanelHead title="Objections" />
              <div className="px-4 py-3.5">
                <HBarList items={p.objections} tone="danger" />
              </div>
            </Panel>
            <Panel>
              <PanelHead title="Competitor Mentions" />
              <div className="px-4 py-3.5">
                <HBarList items={p.competitors} tone="classify" />
              </div>
            </Panel>
            <Panel>
              <PanelHead title="Lead Sources" />
              <div className="px-4 py-3.5">
                <HBarList items={p.sourceMix} suffix="%" tone="info" max={50} />
              </div>
            </Panel>
          </div>

          <Panel>
            <PanelHead title="Departure Cities" subtitle="Share of enquiries by origin city" />
            <div className="px-4 py-3.5">
              <HBarList items={p.departureMix} suffix="%" max={50} />
            </div>
          </Panel>
        </>
      ) : null}


      {tab === "Traveller Profile" ? (
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <Panel>
            <PanelHead title="Traveller Profile" subtitle="Who is enquiring about this destination" />
            <div className="grid grid-cols-2 gap-2.5 px-4 py-3.5">
              {[
                ["Dominant Trip Type", p.dominantTripType],
                ["Top Party Size", p.topParty],
                ["Median Budget", p.medianBudget],
                ["Trip Duration", p.nights],
                ["Best Season", p.bestWindow],
                ["Starting Price", p.from],
                ["Visa", p.visa],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{l}</p>
                  <p className="mt-1 text-[12.5px] font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <PanelHead title="Recent Conversations" subtitle="Latest analysed traveller calls" />
            <TableWrap>
              <table className="w-full min-w-[520px] border-collapse">
                <thead>
                  <tr>
                    <Th>Traveller</Th>
                    <Th>Intent</Th>
                    <Th>Stage</Th>
                    <Th>Objection</Th>
                  </tr>
                </thead>
                <tbody>
                  {destinationCalls.map((c) => (
                    <tr key={c.id} className="hover:bg-muted/40">
                      <Td className="font-medium">{c.traveller}</Td>
                      <Td>
                        <Pill tone={c.intentLevel === "High" ? "success" : c.intentLevel === "Medium" ? "warning" : "neutral"}>
                          {c.intent}
                        </Pill>
                      </Td>
                      <Td className="text-muted-foreground">{c.stage}</Td>
                      <Td className="text-muted-foreground">{c.objection}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </Panel>
        </div>
      ) : null}

      {tab === "Advisors" ? (
        <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
          <Panel>
            <PanelHead title="Advisors on this Destination" subtitle="Conversation volume and quality" />
            <TableWrap>
              <table className="w-full min-w-[520px] border-collapse">
                <thead>
                  <tr>
                    <Th>Advisor</Th>
                    <Th>Conversations</Th>
                    <Th>Quality</Th>
                    <Th>Itineraries Sent</Th>
                  </tr>
                </thead>
                <tbody>
                  {p.advisors.map((a: { name: string; calls: number; quality: number; itineraries: number }) => (
                    <tr key={a.name} className="hover:bg-muted/40">
                      <Td className="font-medium">{a.name}</Td>
                      <Td className="tabular-nums">{a.calls}</Td>
                      <Td>
                        <Pill tone={a.quality >= 82 ? "success" : a.quality >= 74 ? "info" : "warning"}>{a.quality}%</Pill>
                      </Td>
                      <Td className="tabular-nums">{a.itineraries}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </Panel>
          <Panel>
            <PanelHead title="Quality Comparison" />
            <div className="space-y-2.5 px-4 py-3.5">
              {p.advisors.map((a: { name: string; calls: number; quality: number; itineraries: number }) => (
                <ScoreBar key={a.name} label={a.name} value={a.quality} />
              ))}
            </div>
            <div className="border-t border-border px-4 py-3">
              <InsightCard
                tone="warning"
                title="Destination coaching focus"
                body={`${p.objections[0]?.label ?? "Price"} is the leading objection on ${p.short}. Advisors below 78% quality should rehearse the ${(p.objections[0]?.label ?? "price").toLowerCase()} response with the payment-plan comparison sheet.`}
                meta={`${p.name} · last 30 days`}
              />
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === "Travellers" ? (
        <Panel>
          <PanelHead title="Travellers Interested in this Destination" subtitle="Highest intent first" />
          <TableWrap>
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr>
                  <Th>Traveller</Th>
                  <Th>AI Status</Th>
                  <Th>Intent</Th>
                  <Th>Party</Th>
                  <Th>Budget</Th>
                  <Th>Advisor</Th>
                  <Th>Next Action</Th>
                </tr>
              </thead>
              <tbody>
                {[...destinationTravellers].sort((a, b) => b.intent - a.intent).map((b) => (
                  <tr key={b.id} className="hover:bg-muted/40">
                    <Td className="font-medium">{b.name}</Td>
                    <Td>
                      <Pill tone="classify">{b.aiStatus}</Pill>
                    </Td>
                    <Td>
                      <Pill tone={b.intentLevel === "High" ? "success" : b.intentLevel === "Medium" ? "warning" : "neutral"}>
                        {b.intent}
                      </Pill>
                    </Td>
                    <Td>{b.party}</Td>
                    <Td className="tabular-nums">{b.budget}</Td>
                    <Td>{b.advisor}</Td>
                    <Td className="text-muted-foreground">{b.nextAction}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>
      ) : null}
    </div>
  );
}
