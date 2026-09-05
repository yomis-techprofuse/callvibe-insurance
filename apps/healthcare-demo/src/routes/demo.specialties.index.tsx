import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Activity, Stethoscope } from "lucide-react";
import { HBarList, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, EmptyRow } from "@/components/mi/kit";
import { SearchBox } from "@/components/mi/controls";
import { ObservedNote } from "@/components/mi/hospital-viz";
import { serviceDemand, specialties } from "@/data/hospital";

export const Route = createFileRoute("/demo/specialties/")({
  head: () => ({
    meta: [
      { title: "Specialties & Services — CallVibe Hospital" },
      {
        name: "description",
        content:
          "Specialty and service demand intelligence: enquiry volume, appointment intent, most requested doctors, top questions, access barriers and repeat contact rates.",
      },
      { property: "og:title", content: "Specialties & Services — CallVibe Hospital" },
      { property: "og:description", content: "What patients are actually asking for, specialty by specialty." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Specialties,
});

function Specialties() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return specialties.filter((x) => !s || x.name.toLowerCase().includes(s) || x.topDoctor.toLowerCase().includes(s));
  }, [q]);

  const totals = useMemo(
    () => ({
      enq: specialties.reduce((s, x) => s + x.enquiries, 0),
      req: specialties.reduce((s, x) => s + x.requests, 0),
      unres: specialties.reduce((s, x) => s + x.unresolved, 0),
      conf: specialties.reduce((s, x) => s + x.confirmed, 0),
    }),
    [],
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Specialties Tracked" value={String(specialties.length)} sub="from conversation classification" />
        <MetricTile label="Classified Enquiries" value={totals.enq.toLocaleString("en-IN")} sub="specialty identified in conversation" />
        <MetricTile label="Appointment Requests" value={totals.req.toLocaleString("en-IN")} sub={`${totals.conf.toLocaleString("en-IN")} confirmed`} />
        <MetricTile label="Unresolved Enquiries" value={String(totals.unres)} sub="no documented outcome" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <PanelHead title="Top Specialty Demand" subtitle="Enquiries, last 30 days" icon={<Stethoscope className="h-3.5 w-3.5" />} />
          <div className="px-4 py-3.5">
            <HBarList items={specialties.slice().sort((a, b) => b.enquiries - a.enquiries).slice(0, 8).map((s) => ({ label: s.short, value: s.enquiries }))} />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Most Discussed Services" subtitle="Mentions across analysed conversations" icon={<Activity className="h-3.5 w-3.5" />} />
          <div className="px-4 py-3.5">
            <HBarList items={serviceDemand} tone="info" />
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead
          title="Specialty Demand Intelligence"
          subtitle="Click a specialty to open its full demand, question and barrier profile"
          right={<SearchBox value={q} onChange={setQ} placeholder="Search specialty or doctor…" />}
        />
        <div className="px-4 pt-3">
          <ObservedNote>
            Every figure here is derived from patient conversations, not from the hospital information system. It reflects
            demand as patients express it — including demand the hospital never converted into a booking.
          </ObservedNote>
        </div>
        <TableWrap>
          <table className="w-full min-w-[1280px] border-collapse">
            <thead>
              <tr>
                <Th>Specialty</Th>
                <Th>Enquiries</Th>
                <Th>High Intent</Th>
                <Th>Requests</Th>
                <Th>Most Requested Doctor</Th>
                <Th>Most Discussed Service</Th>
                <Th>Top Question</Th>
                <Th>Top Access Barrier</Th>
                <Th>Repeat Rate</Th>
                <Th>Unresolved</Th>
                <Th>Sentiment</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <EmptyRow span={12} />
              ) : (
                rows.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-muted/40">
                    <Td className="font-medium">{s.name}</Td>
                    <Td className="tabular-nums">{s.enquiries.toLocaleString("en-IN")}</Td>
                    <Td>
                      <Pill tone={s.highIntentPct >= 40 ? "success" : s.highIntentPct >= 32 ? "primary" : "neutral"}>
                        {s.highIntentPct}%
                      </Pill>
                    </Td>
                    <Td className="tabular-nums">{s.requests}</Td>
                    <Td className="text-muted-foreground">{s.topDoctor}</Td>
                    <Td className="text-muted-foreground">{s.topService}</Td>
                    <Td className="max-w-[210px] truncate text-muted-foreground">{s.topQuestion}</Td>
                    <Td>
                      <Pill tone="warning">{s.topBarrier}</Pill>
                    </Td>
                    <Td className="tabular-nums">{s.repeatRate}%</Td>
                    <Td>
                      <Pill tone={s.unresolved > 28 ? "danger" : "neutral"}>{s.unresolved}</Pill>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 rounded-full bg-success" style={{ width: `${s.sentiment.positive * 0.5}px` }} />
                        <span className="h-1.5 rounded-full bg-muted-foreground/40" style={{ width: `${s.sentiment.neutral * 0.5}px` }} />
                        <span className="h-1.5 rounded-full bg-danger" style={{ width: `${s.sentiment.negative * 0.5}px` }} />
                      </div>
                    </Td>
                    <Td>
                      <Link to="/demo/specialties/$id" params={{ id: s.id }} className="text-[11.5px] font-medium text-primary hover:underline">
                        Open
                      </Link>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </div>
  );
}
