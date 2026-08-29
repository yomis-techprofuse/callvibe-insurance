import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageSquareWarning, ShieldAlert, Sparkles } from "lucide-react";
import {
  EmptyRow,
  HBarList,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  TableWrap,
  Td,
  Th,
  reviewTone,
  riskTone,
} from "@/components/mi/kit";
import { DonutChart, Legend } from "@/components/mi/charts";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  COMPLAINTS_BY_PRODUCT,
  COMPLAINT_KPIS,
  COMPLAINT_REVIEW_SPLIT,
  COMPLAINT_THEMES,
  COMPLAINT_THEME_DATA,
  PRODUCTS,
  REVIEW_STATUSES,
  TIME_TO_REVIEW,
  conversations,
  type Conversation,
} from "@/data/callvibe";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints and Escalations — CallVibe" },
      {
        name: "description",
        content:
          "Potential complaint signals detected in insurance conversations, grouped by theme and product, presented for qualified human review.",
      },
      { property: "og:title", content: "Complaints and Escalations — CallVibe" },
      { property: "og:description", content: "Detected complaint signals and emerging themes for human review." },
    ],
  }),
  component: ComplaintsPage,
});

const TABS = ["All Signals", "Awaiting Review", "Confirmed", "Escalated"];

const complaintConversations = conversations.filter(
  (c) => c.type === "Complaint" || c.risk === "Critical" || c.primarySignal === "Expression of dissatisfaction",
);

function ComplaintsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [theme, setTheme] = useState("All Themes");
  const [product, setProduct] = useState("All Products");
  const [status, setStatus] = useState("All Review Statuses");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [conv, setConv] = useState<Conversation | null>(null);

  const reset = () => {
    setQ("");
    setTheme("All Themes");
    setProduct("All Products");
    setStatus("All Review Statuses");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      complaintConversations.filter((c, i) => {
        const needle = q.trim().toLowerCase();
        const themeFor = COMPLAINT_THEMES[i % COMPLAINT_THEMES.length]!;
        if (needle && !`${c.customer} ${c.id}`.toLowerCase().includes(needle)) return false;
        if (theme !== "All Themes" && themeFor !== theme) return false;
        if (product !== "All Products" && c.product !== product) return false;
        if (status !== "All Review Statuses" && c.reviewStatus !== status) return false;
        if (tab === "Awaiting Review" && c.reviewStatus !== "New" && c.reviewStatus !== "Under Review") return false;
        if (tab === "Confirmed" && c.reviewStatus !== "Confirmed") return false;
        if (tab === "Escalated" && c.reviewStatus !== "Escalated") return false;
        return true;
      }),
    [q, theme, product, status, tab],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-info/25 bg-info-soft px-3.5 py-2">
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-info" />
        <p className="text-[11.5px] text-info">
          Signals shown are detected indicators only. Complaint identification, recording and resolution remain the
          responsibility of the insurer's own processes and qualified employees.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {COMPLAINT_KPIS.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel>
          <PanelHead title="Complaint Themes" subtitle="Grouped drivers of dissatisfaction" icon={<MessageSquareWarning className="h-3.5 w-3.5" />} />
          <div className="px-4 py-3.5">
            <HBarList items={COMPLAINT_THEME_DATA} tone="danger" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Signals by Product" subtitle="Where complaint signals concentrate" />
          <div className="px-4 py-3.5">
            <HBarList items={COMPLAINTS_BY_PRODUCT} tone="warning" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Review Outcomes" subtitle="Human review outcome distribution" />
          <div className="px-4 py-3">
            <DonutChart data={COMPLAINT_REVIEW_SPLIT} centerValue="61%" centerLabel="confirmed after review" />
            <div className="mt-1">
              <Legend items={COMPLAINT_REVIEW_SPLIT.map((s) => ({ label: s.name, color: s.color, value: `${s.value}%` }))} />
            </div>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead title="Time to Human Review" subtitle="Elapsed time between detection and review decision" />
        <div className="px-4 py-3.5">
          <HBarList items={TIME_TO_REVIEW} tone="info" />
        </div>
      </Panel>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer or conversation ID…" />
        <Select label="All Themes" value={theme} onChange={(v) => { setTheme(v); setPage(1); }} options={["All Themes", ...COMPLAINT_THEMES]} className="w-[215px]" />
        <Select label="All Products" value={product} onChange={(v) => { setProduct(v); setPage(1); }} options={["All Products", ...PRODUCTS]} className="w-[180px]" />
        <Select label="All Review Statuses" value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={["All Review Statuses", ...REVIEW_STATUSES]} className="w-[180px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any signal to review the supporting conversation evidence
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Potential Complaint Signals"
          subtitle="Detected expressions of dissatisfaction pending or completed review"
          icon={<MessageSquareWarning className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1120px] border-collapse">
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Conversation</Th>
                <Th>Product</Th>
                <Th>Theme</Th>
                <Th>Detected Signal</Th>
                <Th>Date</Th>
                <Th>Severity</Th>
                <Th>Review Status</Th>
                <Th>Agent</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={c.id} onClick={() => setConv(c)} className="cursor-pointer transition-colors hover:bg-primary-soft/50">
                  <Td className="font-medium">{c.customer}</Td>
                  <Td className="tabular-nums text-muted-foreground">{c.id}</Td>
                  <Td className="text-muted-foreground">{c.product}</Td>
                  <Td>
                    <Pill tone="classify">{COMPLAINT_THEMES[i % COMPLAINT_THEMES.length]}</Pill>
                  </Td>
                  <Td className="text-muted-foreground">{c.primarySignal}</Td>
                  <Td className="whitespace-nowrap tabular-nums text-muted-foreground">{c.date}</Td>
                  <Td>
                    <Pill tone={riskTone(c.risk)} dot>
                      {c.risk}
                    </Pill>
                  </Td>
                  <Td>
                    <Pill tone={reviewTone(c.reviewStatus)}>{c.reviewStatus}</Pill>
                  </Td>
                  <Td>{c.agent}</Td>
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
