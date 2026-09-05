import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Headphones, Sparkles } from "lucide-react";
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
  scoreCellTone,
} from "@/components/mi/kit";
import { MiniBars } from "@/components/mi/charts";
import { ObservedNote } from "@/components/mi/hospital-viz";
import { agents, dimensionSummary, qualityDimensions, teamAverages } from "@/data/hospital";

export const Route = createFileRoute("/demo/enquiry-team")({
  head: () => ({
    meta: [
      { title: "Enquiry Team — CallVibe Hospital" },
      {
        name: "description",
        content:
          "How effectively the hospital enquiry desk understands, routes and resolves patient conversations: quality dimensions, follow-up completion and operational coaching.",
      },
      { property: "og:title", content: "Enquiry Team — CallVibe Hospital" },
      { property: "og:description", content: "Enquiry-handling quality measured against patient access outcomes, not sales targets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EnquiryTeam,
});

function EnquiryTeam() {
  const [selected, setSelected] = useState(agents[0]!.id);
  const active = agents.find((a) => a.id === selected)!;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricTile label="Enquiries Handled" value={agents.reduce((s, a) => s + a.enquiries, 0).toLocaleString("en-IN")} sub="last 30 days" />
        <MetricTile label="Avg Enquiry Quality" value={`${teamAverages.quality}%`} sub="across nine handling dimensions" />
        <MetricTile label="Follow-Up Completion" value={`${teamAverages.followUp}%`} sub="promised actions completed" />
        <MetricTile label="Unresolved Rate" value={`${teamAverages.unresolved}%`} sub="enquiries with no outcome" />
        <MetricTile label="Repeat Contact Rate" value={`${teamAverages.repeat}%`} sub="patients forced to contact again" />
      </div>

      <Panel className="px-4 py-3">
        <ObservedNote>
          The enquiry desk is measured on patient access outcomes — understanding, routing, facilitation and follow-through —
          not on sales conversion. Scores describe how a conversation was handled, and are always paired with the patient
          consequence they produced.
        </ObservedNote>
      </Panel>

      <Panel>
        <PanelHead
          title="Enquiry Team"
          subtitle="Select an executive to open their handling profile"
          icon={<Headphones className="h-3.5 w-3.5" />}
        />
        <TableWrap>
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr>
                <Th>Executive</Th>
                <Th>Role</Th>
                <Th>Total Enquiries</Th>
                <Th>Avg Handling Time</Th>
                <Th>Enquiry Quality</Th>
                <Th>Follow-Up Completion</Th>
                <Th>Appointment Request Rate</Th>
                <Th>Unresolved Rate</Th>
                <Th>Repeat Contact Rate</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelected(a.id)}
                  className={`cursor-pointer transition-colors hover:bg-muted/40 ${selected === a.id ? "bg-primary-soft/60" : ""}`}
                >
                  <Td className="font-medium">{a.name}</Td>
                  <Td className="text-muted-foreground">{a.role}</Td>
                  <Td className="tabular-nums">{a.enquiries}</Td>
                  <Td className="tabular-nums">{a.aht}</Td>
                  <Td>
                    <Pill tone={a.quality >= 88 ? "success" : a.quality >= 78 ? "primary" : "warning"}>{a.quality}%</Pill>
                  </Td>
                  <Td className="tabular-nums">{a.followUpCompletion}%</Td>
                  <Td className="tabular-nums">{a.requestRate}%</Td>
                  <Td>
                    <Pill tone={a.unresolvedRate > 6 ? "danger" : "neutral"}>{a.unresolvedRate}%</Pill>
                  </Td>
                  <Td>
                    <Pill tone={a.repeatRate > 8 ? "warning" : "neutral"}>{a.repeatRate}%</Pill>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] font-medium text-primary">View</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <Panel>
        <PanelHead title="Enquiry Handling Quality Matrix" subtitle="Nine hospital-specific handling dimensions, scored per executive" />
        <TableWrap>
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr>
                <Th>Executive</Th>
                {qualityDimensions.map((d) => (
                  <Th key={d.key}>{d.label}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-muted/40">
                  <Td className="font-medium">{a.name}</Td>
                  {qualityDimensions.map((d) => (
                    <Td key={d.key}>
                      <span className={`inline-flex h-6 w-9 items-center justify-center rounded-md text-[11.5px] font-semibold tabular-nums ${scoreCellTone(a.scores[d.key])}`}>
                        {a.scores[d.key]}
                      </span>
                    </Td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1.1fr]">
        <Panel>
          <PanelHead title={active.name} subtitle={`${active.role} · ${active.enquiries} enquiries`} />
          <div className="space-y-3 px-4 py-3.5">
            {qualityDimensions.map((d) => (
              <ScoreBar key={d.key} label={d.label} value={active.scores[d.key]} />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Channel & Specialty Mix" subtitle={`How ${active.name.split(" ")[0]}'s conversations are distributed`} />
          <div className="space-y-3 px-4 py-3.5">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-border px-2.5 py-2 text-center">
                <p className="text-[15px] font-semibold tabular-nums">{active.inbound}</p>
                <p className="text-[10.5px] text-muted-foreground">Inbound</p>
              </div>
              <div className="rounded-lg border border-border px-2.5 py-2 text-center">
                <p className="text-[15px] font-semibold tabular-nums">{active.outbound}</p>
                <p className="text-[10.5px] text-muted-foreground">Outbound</p>
              </div>
              <div className="rounded-lg border border-border px-2.5 py-2 text-center">
                <p className="text-[15px] font-semibold tabular-nums">{active.whatsapp}</p>
                <p className="text-[10.5px] text-muted-foreground">WhatsApp</p>
              </div>
            </div>
            <HBarList items={active.specialties} tone="info" />
            <div className="pt-1">
              <MiniBars data={active.activity} dataKey="enquiries" xKey="day" height={140} />
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Operational Coaching" subtitle="Behaviour connected to patient consequence" icon={<GraduationCap className="h-3.5 w-3.5" />} />
          <div className="space-y-2.5 px-4 py-3.5">
            {active.coaching.map((c, i) => (
              <InsightCard key={i} tone={c.tone} title={c.tone === "success" ? "Strength" : c.tone === "info" ? "Observation" : "Improvement opportunity"} body={c.text} />
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Where the Team Is Strong and Weak" subtitle="Average score by dimension across the enquiry desk" icon={<Sparkles className="h-3.5 w-3.5" />} />
        <TableWrap>
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                <Th>Dimension</Th>
                <Th>Team Average</Th>
                <Th>Strongest</Th>
                <Th>Needs Support</Th>
              </tr>
            </thead>
            <tbody>
              {dimensionSummary.map((d) => (
                <tr key={d.key} className="transition-colors hover:bg-muted/40">
                  <Td className="font-medium">{d.label}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <span className="w-9 text-[12px] font-semibold tabular-nums">{d.avg}</span>
                      <span className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                        <span className="block h-full rounded-full bg-primary" style={{ width: `${d.avg}%` }} />
                      </span>
                    </div>
                  </Td>
                  <Td className="text-muted-foreground">{d.best}</Td>
                  <Td className="text-muted-foreground">{d.worst}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </div>
  );
}
