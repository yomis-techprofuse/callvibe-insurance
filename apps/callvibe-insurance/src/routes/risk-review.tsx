import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShieldAlert, Sparkles } from "lucide-react";
import {
  EmptyRow,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  TableWrap,
  Td,
  Th,
  reviewTone,
  severityTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  PRODUCTS,
  REVIEW_STATUSES,
  RISK_SIGNAL_TYPES,
  SEVERITIES,
  conversationById,
  riskItems,
  type Conversation,
} from "@/data/callvibe";

export const Route = createFileRoute("/risk-review")({
  head: () => ({
    meta: [
      { title: "Risk and Review Queue — CallVibe" },
      {
        name: "description",
        content:
          "Detected risk signals from insurance conversations queued for qualified human review, with supporting evidence and review status.",
      },
      { property: "og:title", content: "Risk and Review Queue — CallVibe" },
      { property: "og:description", content: "Detected risk signals queued for qualified human review." },
    ],
  }),
  component: RiskReviewPage,
});

const TABS = ["All Signals", "New", "Under Review", "Escalated", "Closed"];

function RiskReviewPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [signal, setSignal] = useState("All Signal Types");
  const [severity, setSeverity] = useState("All Severities");
  const [product, setProduct] = useState("All Products");
  const [status, setStatus] = useState("All Statuses");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [conv, setConv] = useState<Conversation | null>(null);

  const reset = () => {
    setQ("");
    setSignal("All Signal Types");
    setSeverity("All Severities");
    setProduct("All Products");
    setStatus("All Statuses");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      riskItems.filter((r) => {
        const needle = q.trim().toLowerCase();
        if (needle && !`${r.customer} ${r.id} ${r.conversationId}`.toLowerCase().includes(needle)) return false;
        if (signal !== "All Signal Types" && r.signal !== signal) return false;
        if (severity !== "All Severities" && r.severity !== severity) return false;
        if (product !== "All Products" && r.product !== product) return false;
        if (status !== "All Statuses" && r.status !== status) return false;
        if (tab === "New" && r.status !== "New") return false;
        if (tab === "Under Review" && r.status !== "Under Review") return false;
        if (tab === "Escalated" && r.status !== "Escalated") return false;
        if (tab === "Closed" && r.status !== "Closed" && r.status !== "Dismissed") return false;
        return true;
      }),
    [q, signal, severity, product, status, tab],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);
  const count = (s: string) => riskItems.filter((r) => r.status === s).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-info/25 bg-info-soft px-3.5 py-2">
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-info" />
        <p className="text-[11.5px] text-info">
          CallVibe surfaces detected signals for human review. It does not make regulatory determinations, and all review
          decisions remain with qualified employees of the insurer.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricTile label="Signals in Queue" value={String(riskItems.length)} sub="Detected this period" />
        <MetricTile label="Awaiting Review" value={String(count("New"))} sub="No reviewer assigned yet" />
        <MetricTile label="Under Review" value={String(count("Under Review"))} sub="Currently with reviewer" />
        <MetricTile label="Escalated" value={String(count("Escalated"))} sub="Referred for escalation" />
        <MetricTile
          label="Critical Severity"
          value={String(riskItems.filter((r) => r.severity === "Critical").length)}
          sub="Highest priority signals"
        />
      </div>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer, signal or conversation ID…" />
        <Select label="All Signal Types" value={signal} onChange={(v) => { setSignal(v); setPage(1); }} options={["All Signal Types", ...RISK_SIGNAL_TYPES]} className="w-[240px]" />
        <Select label="All Severities" value={severity} onChange={(v) => { setSeverity(v); setPage(1); }} options={["All Severities", ...SEVERITIES]} className="w-[160px]" />
        <Select label="All Products" value={product} onChange={(v) => { setProduct(v); setPage(1); }} options={["All Products", ...PRODUCTS]} className="w-[180px]" />
        <Select label="All Statuses" value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={["All Statuses", ...REVIEW_STATUSES]} className="w-[165px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any signal to open the supporting conversation
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Review Queue"
          subtitle="Detected signals with supporting conversation evidence"
          icon={<ShieldAlert className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr>
                <Th>Reference</Th>
                <Th>Customer</Th>
                <Th>Detected Signal</Th>
                <Th>Product</Th>
                <Th>Severity</Th>
                <Th className="min-w-[320px]">Supporting Evidence</Th>
                <Th>Reviewer</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setConv(conversationById(r.conversationId) ?? null)}
                  className="cursor-pointer transition-colors hover:bg-primary-soft/50"
                >
                  <Td className="tabular-nums font-medium">{r.id}</Td>
                  <Td>
                    <p className="font-medium">{r.customer}</p>
                    <p className="text-[11px] text-muted-foreground">{r.conversationId}</p>
                  </Td>
                  <Td className="text-muted-foreground">{r.signal}</Td>
                  <Td className="text-muted-foreground">{r.product}</Td>
                  <Td>
                    <Pill tone={severityTone(r.severity)} dot>
                      {r.severity}
                    </Pill>
                  </Td>
                  <Td className="max-w-[380px] text-[12px] italic text-muted-foreground">{r.evidence}</Td>
                  <Td className="text-muted-foreground">{r.reviewer}</Td>
                  <Td>
                    <Pill tone={reviewTone(r.status)}>{r.status}</Pill>
                  </Td>
                  <Td className="whitespace-nowrap tabular-nums text-muted-foreground">{r.date}</Td>
                </tr>
              ))}
              {rows.length === 0 ? <EmptyRow span={9} /> : null}
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
