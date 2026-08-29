import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListChecks } from "lucide-react";
import { EmptyRow, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, intentTone, statusTone } from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { actionItems, advisors, destinationNames, scheduledFollowUps } from "@/data/marhaba";

export const Route = createFileRoute("/action-items")({
  head: () => ({
    meta: [
      { title: "Action Items — CallVibe" },
      { name: "description", content: "AI-extracted follow-ups for high-intent travellers: revised quotes, itineraries, visa checklists and hotel options, with owners and due dates." },
      { property: "og:title", content: "Action Items — CallVibe" },
      { property: "og:description", content: "Follow-up actions extracted automatically from traveller conversations." },
    ],
  }),
  component: ActionItemsPage,
});

const TABS = ["All Actions", "Overdue", "Pending", "In Progress", "Done", "Scheduled Follow-Ups"];

function ActionItemsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [project, setProject] = useState("All Destinations");
  const [advisor, setAdvisor] = useState("All Advisors");
  const [priority, setPriority] = useState("All Priorities");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return actionItems.filter((a) => {
      if (needle && !`${a.traveller} ${a.item} ${a.id}`.toLowerCase().includes(needle)) return false;
      if (project !== "All Destinations" && a.destination !== project) return false;
      if (advisor !== "All Advisors" && a.advisor !== advisor) return false;
      if (priority !== "All Priorities" && a.priority !== priority.replace(" Priority", "")) return false;
      if (["Overdue", "Pending", "In Progress", "Done"].includes(tab) && a.status !== tab) return false;
      return true;
    });
  }, [q, project, advisor, priority, tab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);
  const count = (s: string) => actionItems.filter((a) => a.status === s).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Open Actions" value={String(count("Pending") + count("In Progress"))} sub="Awaiting completion" />
        <MetricTile label="Overdue" value={String(count("Overdue"))} sub="Past due date" />
        <MetricTile label="In Progress" value={String(count("In Progress"))} sub="Being worked" />
        <MetricTile label="Completed" value={String(count("Done"))} sub="This period" />
        <MetricTile label="High Priority" value={String(actionItems.filter((a) => a.priority === "High").length)} sub="High-intent travellers" />
        <MetricTile label="Booking Calls" value={String(scheduledFollowUps.filter((f) => f.type === "Itinerary").length)} sub="Next 5 days" />
      </div>

      <FilterBar onReset={() => { setQ(""); setProject("All Destinations"); setAdvisor("All Advisors"); setPriority("All Priorities"); setTab(TABS[0]!); setPage(1); }}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search traveller or action…" />
        <Select label="All Destinations" value={project} onChange={(v) => { setProject(v); setPage(1); }} options={["All Destinations", ...destinationNames]} className="w-[180px]" />
        <Select label="All Advisors" value={advisor} onChange={(v) => { setAdvisor(v); setPage(1); }} options={["All Advisors", ...advisors.map((a) => a.name)]} className="w-[150px]" />
        <Select label="All Priorities" value={priority} onChange={(v) => { setPriority(v); setPage(1); }} options={["All Priorities", "High Priority", "Medium Priority", "Low Priority"]} className="w-[155px]" />
      </FilterBar>

      <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />

      {tab === "Scheduled Follow-Ups" ? (
        <Panel>
          <PanelHead title="Scheduled Follow-Ups" subtitle="Confirmed calls, chats and itineraries" icon={<ListChecks className="h-3.5 w-3.5" />} />
          <TableWrap>
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr>
                  <Th>Traveller</Th>
                  <Th>Destination</Th>
                  <Th>Type</Th>
                  <Th>When</Th>
                  <Th>Intent</Th>
                  <Th>Advisor</Th>
                </tr>
              </thead>
              <tbody>
                {scheduledFollowUps.map((f) => (
                  <tr key={f.id} className="hover:bg-muted/40">
                    <Td className="font-medium">{f.traveller}</Td>
                    <Td className="text-muted-foreground">{f.destination.replace("Marhaba ", "")}</Td>
                    <Td>
                      <Pill tone={f.type === "Itinerary" ? "success" : "info"}>{f.type}</Pill>
                    </Td>
                    <Td className="tabular-nums">{f.when}</Td>
                    <Td>
                      <Pill tone={intentTone(f.intent >= 75 ? "High" : "Medium")} dot>{f.intent}</Pill>
                    </Td>
                    <Td>{f.advisor}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>
      ) : (
        <Panel>
          <PanelHead title="Action Items" subtitle="Extracted automatically from traveller conversations" icon={<ListChecks className="h-3.5 w-3.5" />} right={<Pill tone="info">{filtered.length} items</Pill>} />
          <TableWrap>
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr>
                  <Th>Action</Th>
                  <Th>Traveller</Th>
                  <Th>Destination</Th>
                  <Th>Status</Th>
                  <Th>Priority</Th>
                  <Th>Due</Th>
                  <Th>Intent</Th>
                  <Th>Advisor</Th>
                  <Th>Source Call</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.id} className="hover:bg-muted/40">
                    <Td className="font-medium">{a.item}</Td>
                    <Td>{a.traveller}</Td>
                    <Td className="text-muted-foreground">{a.destination.replace("Marhaba ", "")}</Td>
                    <Td><Pill tone={statusTone(a.status)}>{a.status}</Pill></Td>
                    <Td><Pill tone={a.priority === "High" ? "danger" : a.priority === "Medium" ? "warning" : "neutral"}>{a.priority}</Pill></Td>
                    <Td className="tabular-nums text-muted-foreground">{a.due}</Td>
                    <Td><Pill tone={intentTone(a.intent >= 75 ? "High" : a.intent >= 50 ? "Medium" : "Low")} dot>{a.intent}</Pill></Td>
                    <Td>{a.advisor}</Td>
                    <Td className="text-muted-foreground tabular-nums">{a.source}</Td>
                  </tr>
                ))}
                {rows.length === 0 ? <EmptyRow span={9} /> : null}
              </tbody>
            </table>
          </TableWrap>
          <Pagination page={current} pageCount={pageCount} perPage={perPage} total={filtered.length} onPage={setPage} onPerPage={(n) => { setPerPage(n); setPage(1); }} />
        </Panel>
      )}
    </div>
  );
}
