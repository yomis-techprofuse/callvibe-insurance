import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClipboardCheck, ListChecks } from "lucide-react";
import { EmptyRow, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, intentTone, type Tone } from "@/components/mi/kit";
import { SearchBox, Select, TabBar } from "@/components/mi/controls";
import { AttentionRow } from "@/components/mi/hospital-viz";
import { EnquiryDetailsModal } from "@/components/mi/enquiry-details-modal";
import {
  actionCounts,
  actionSections,
  actions,
  agentNames,
  attentionItems,
  enquiries,
  specialtyNames,
  type ActionSection,
  type Enquiry,
} from "@/data/hospital";

export const Route = createFileRoute("/demo/action-centre")({
  head: () => ({
    meta: [
      { title: "Action Centre — CallVibe Hospital" },
      {
        name: "description",
        content:
          "Operational actions extracted from patient conversations: priority escalations, follow-ups due, insurance pending, appointment pending and unresolved enquiries.",
      },
      { property: "og:title", content: "Action Centre — CallVibe Hospital" },
      { property: "og:description", content: "What requires action right now, ranked by operational consequence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ActionCentre,
});

const sectionTone: Record<ActionSection, Tone> = {
  Priority: "danger",
  "Follow-Up Due": "warning",
  "Insurance Pending": "warning",
  "Appointment Pending": "primary",
  Unresolved: "danger",
  Completed: "success",
};

function ActionCentre() {
  const [tab, setTab] = useState<string>("Priority");
  const [q, setQ] = useState("");
  const [owner, setOwner] = useState("All Owners");
  const [spec, setSpec] = useState("All Specialties");
  const [open, setOpen] = useState<Enquiry | null>(null);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return actions.filter(
      (a) =>
        a.section === tab &&
        (!s || a.patient.toLowerCase().includes(s) || a.text.toLowerCase().includes(s)) &&
        (owner === "All Owners" || a.owner === owner) &&
        (spec === "All Specialties" || a.specialty === spec),
    );
  }, [tab, q, owner, spec]);

  const openSource = (id: string) => {
    const e = enquiries.find((x) => x.id === id);
    if (e) setOpen(e);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {actionCounts.map((c) => (
          <MetricTile key={c.section} label={c.section} value={String(c.count)} sub="open actions" />
        ))}
      </div>

      <Panel>
        <PanelHead
          title="Patient Enquiries Requiring Attention"
          subtitle="The six situations with the highest operational consequence right now"
          icon={<ClipboardCheck className="h-3.5 w-3.5" />}
        />
        <div className="grid gap-2 px-4 py-3.5 xl:grid-cols-2">
          {attentionItems.map((a) => (
            <AttentionRow
              key={a.text}
              value={a.value}
              text={a.text}
              tone={a.tone}
              onClick={() => setTab(actionSections.includes(a.filter as ActionSection) ? a.filter : "Priority")}
            />
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title="Action Centre"
          subtitle="Every action below was extracted from a specific patient conversation"
          icon={<ListChecks className="h-3.5 w-3.5" />}
          right={
            <div className="flex flex-wrap items-center gap-2">
              <SearchBox value={q} onChange={setQ} placeholder="Search action or patient…" />
              <Select label="All Owners" value={owner} onChange={setOwner} options={["All Owners", ...agentNames]} className="w-[165px]" />
              <Select label="All Specialties" value={spec} onChange={setSpec} options={["All Specialties", ...specialtyNames]} className="w-[180px]" />
            </div>
          }
        />
        <div className="scroll-slim overflow-x-auto px-4 pt-3">
          <TabBar tabs={actionSections.map((s) => s)} value={tab} onChange={setTab} />
        </div>
        <TableWrap>
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr>
                <Th>Action</Th>
                <Th>Patient</Th>
                <Th>Contact</Th>
                <Th>Specialty</Th>
                <Th>Doctor</Th>
                <Th>Owner</Th>
                <Th>Intent</Th>
                <Th>Due</Th>
                <Th>Age</Th>
                <Th>Source</Th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <EmptyRow span={10} text="No actions in this section match the current filters." />
              ) : (
                rows.map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-muted/40">
                    <Td>
                      <div className="flex items-start gap-2">
                        <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full" style={{ background: `var(--color-${sectionTone[a.section] === "neutral" ? "border" : sectionTone[a.section]})` }} />
                        <span className="text-[12.5px] font-medium">{a.text}</span>
                      </div>
                    </Td>
                    <Td>{a.patient}</Td>
                    <Td className="text-muted-foreground tabular-nums">{a.phone}</Td>
                    <Td className="text-muted-foreground">{a.specialty}</Td>
                    <Td className="text-muted-foreground">{a.doctor}</Td>
                    <Td className="text-muted-foreground">{a.owner}</Td>
                    <Td>
                      <Pill tone={intentTone(a.intent >= 75 ? "High" : a.intent >= 50 ? "Medium" : "Low")} dot>
                        {a.intent}
                      </Pill>
                    </Td>
                    <Td>
                      <Pill tone={a.due === "Overdue" ? "danger" : a.due === "Today" ? "warning" : "neutral"}>{a.due}</Pill>
                    </Td>
                    <Td className="tabular-nums text-muted-foreground">{a.age}</Td>
                    <Td>
                      <button onClick={() => openSource(a.source)} className="text-[11.5px] font-medium text-primary hover:underline">
                        {a.source}
                      </button>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <EnquiryDetailsModal enquiry={open} onClose={() => setOpen(null)} />
    </div>
  );
}
