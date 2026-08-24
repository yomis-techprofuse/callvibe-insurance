import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListChecks, Sparkles } from "lucide-react";
import {
  EmptyRow,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  TableWrap,
  Td,
  Th,
  intentTone,
  statusTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  ACTION_STATUSES,
  ACTION_TYPES,
  OUTCOME_OPTIONS,
  conversationById,
  seedActions,
  type ActionItem,
  type Conversation,
} from "@/data/callvibe";

export const Route = createFileRoute("/action-items")({
  head: () => ({
    meta: [
      { title: "Action Items — CallVibe" },
      {
        name: "description",
        content:
          "Follow-up actions generated from Harbour Insurance conversations: retention reviews, quote follow-ups, complaint reviews and coaching, with owners and outcomes.",
      },
      { property: "og:title", content: "Action Items — CallVibe" },
      { property: "og:description", content: "Suggested next actions extracted from insurance conversations." },
    ],
  }),
  component: ActionItemsPage,
});

const TABS = ["All Actions", "Critical", "Open", "In Progress", "Completed"];
const OWNERS = ["All Owners", "Retention Team", "Sales Team", "Claims Team", "Customer Care", "Compliance", "Quality Team"];

function ActionItemsPage() {
  const [items, setItems] = useState<ActionItem[]>(seedActions);
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [type, setType] = useState("All Types");
  const [owner, setOwner] = useState("All Owners");
  const [priority, setPriority] = useState("All Priorities");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [conv, setConv] = useState<Conversation | null>(null);

  const update = (id: string, patch: Partial<ActionItem>) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((a) => {
      if (needle && !`${a.target} ${a.action} ${a.id}`.toLowerCase().includes(needle)) return false;
      if (type !== "All Types" && a.type !== type) return false;
      if (owner !== "All Owners" && a.owner !== owner) return false;
      if (priority !== "All Priorities" && a.priority !== priority) return false;
      if (tab === "Critical" && a.priority !== "Critical") return false;
      if (["Open", "In Progress", "Completed"].includes(tab) && a.status !== tab) return false;
      return true;
    });
  }, [items, q, type, owner, priority, tab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);
  const count = (s: string) => items.filter((a) => a.status === s).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricTile label="Total Actions" value={String(items.length)} sub="Generated this period" />
        <MetricTile label="Critical Priority" value={String(items.filter((a) => a.priority === "Critical").length)} sub="Immediate attention" />
        <MetricTile label="Open" value={String(count("Open"))} sub="Not yet started" />
        <MetricTile label="In Progress" value={String(count("In Progress"))} sub="Being worked" />
        <MetricTile label="Completed" value={String(count("Completed"))} sub="Outcome recorded" />
      </div>

      <FilterBar
        onReset={() => {
          setQ("");
          setType("All Types");
          setOwner("All Owners");
          setPriority("All Priorities");
          setTab(TABS[0]!);
          setPage(1);
        }}
      >
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer, action or reference…" />
        <Select label="All Types" value={type} onChange={(v) => { setType(v); setPage(1); }} options={["All Types", ...ACTION_TYPES]} className="w-[205px]" />
        <Select label="All Owners" value={owner} onChange={(v) => { setOwner(v); setPage(1); }} options={OWNERS} className="w-[180px]" />
        <Select label="All Priorities" value={priority} onChange={(v) => { setPriority(v); setPage(1); }} options={["All Priorities", "Critical", "High", "Medium", "Low"]} className="w-[160px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Update status and outcome inline, or open the source conversation
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Suggested Next Actions"
          subtitle="Derived from detected signals — each action requires human confirmation"
          icon={<ListChecks className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1320px] border-collapse">
            <thead>
              <tr>
                <Th>Priority</Th>
                <Th>Customer</Th>
                <Th>Type</Th>
                <Th className="min-w-[260px]">Recommended Action</Th>
                <Th className="min-w-[260px]">Reason</Th>
                <Th>Owner</Th>
                <Th>Due</Th>
                <Th>Potential Value</Th>
                <Th>Status</Th>
                <Th>Outcome</Th>
                <Th>Source</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-primary-soft/40">
                  <Td>
                    <Pill tone={a.priority === "Critical" ? "danger" : intentTone(a.priority)} dot>
                      {a.priority}
                    </Pill>
                  </Td>
                  <Td>
                    <p className="font-medium">{a.target}</p>
                    <p className="text-[11px] text-muted-foreground">{a.id}</p>
                  </Td>
                  <Td>
                    <Pill tone="classify">{a.type}</Pill>
                  </Td>
                  <Td>{a.action}</Td>
                  <Td className="text-muted-foreground">{a.reason}</Td>
                  <Td className="text-muted-foreground">{a.owner}</Td>
                  <Td className="whitespace-nowrap tabular-nums text-muted-foreground">{a.due}</Td>
                  <Td className="text-muted-foreground">{a.potential}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Pill tone={statusTone(a.status)}>{a.status}</Pill>
                      <select
                        value={a.status}
                        onChange={(e) => update(a.id, { status: e.target.value })}
                        aria-label={`Status for ${a.id}`}
                        className="h-7 rounded-md border border-border bg-card px-1.5 text-[11.5px] outline-none focus:border-primary"
                      >
                        {ACTION_STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </Td>
                  <Td>
                    <select
                      value={a.outcome}
                      onChange={(e) => update(a.id, { outcome: e.target.value })}
                      aria-label={`Outcome for ${a.id}`}
                      className="h-7 rounded-md border border-border bg-card px-1.5 text-[11.5px] outline-none focus:border-primary"
                    >
                      {OUTCOME_OPTIONS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Td>
                  <Td>
                    <button
                      onClick={() => setConv(conversationById(a.conversationId) ?? null)}
                      className="rounded-md border border-border px-2 py-1 text-[11.5px] font-medium transition-colors hover:border-primary hover:text-primary"
                    >
                      Open conversation
                    </button>
                  </Td>
                </tr>
              ))}
              {rows.length === 0 ? <EmptyRow span={11} /> : null}
            </tbody>
          </table>
        </TableWrap>
        <Pagination
          page={current}
          pageCount={pageCount}
          perPage={perPage}
          total={filtered.length}
          onPage={setPage}
          onPerPage={(n) => {
            setPerPage(n);
            setPage(1);
          }}
        />
      </Panel>

      <ConversationModal conv={conv} onClose={() => setConv(null)} />
    </div>
  );
}
