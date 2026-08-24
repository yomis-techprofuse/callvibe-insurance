import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles, Users, X } from "lucide-react";
import {
  EmptyRow,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  TableWrap,
  Td,
  Th,
  riskTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  PRODUCTS,
  SEGMENTS,
  STATES,
  conversationById,
  conversations,
  customers,
  usd,
  type Conversation,
  type Customer,
} from "@/data/callvibe";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers — CallVibe Insurance Intelligence" },
      {
        name: "description",
        content:
          "Customer-level insurance intelligence: policies held, annual premium, retention risk, complaint history and open actions.",
      },
      { property: "og:title", content: "Customers — CallVibe Insurance Intelligence" },
      { property: "og:description", content: "Policyholder intelligence, retention risk and conversation history." },
    ],
  }),
  component: CustomersPage,
});

const TABS = ["All Customers", "Retention Risk", "Multi-Policy", "Open Actions"];

function Drawer({ customer, onClose }: { customer: Customer | null; onClose: () => void }) {
  const [conv, setConv] = useState<Conversation | null>(null);
  if (!customer) return null;
  const list = customer.conversationIds.map((id) => conversationById(id)!).filter(Boolean);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <aside className="fixed inset-y-0 right-0 z-40 flex w-full max-w-[560px] flex-col border-l border-border bg-card shadow-[var(--shadow-pop)]">
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-semibold tracking-tight">{customer.name}</h2>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">
              {customer.id} · {customer.city}, {customer.state} · {customer.tenure} tenure
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Close customer details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="scroll-slim flex-1 space-y-4 overflow-y-auto bg-canvas p-5">
          <div className="flex flex-wrap gap-1.5">
            <Pill tone={riskTone(customer.retentionRisk)} dot>
              {customer.retentionRisk} retention risk
            </Pill>
            <Pill tone="classify">{customer.segment}</Pill>
            <Pill tone="info">{customer.preference} preferred</Pill>
            {customer.openActions > 0 ? <Pill tone="warning">{customer.openActions} open actions</Pill> : null}
          </div>

          <Panel>
            <PanelHead title="Customer Intelligence Summary" icon={<Sparkles className="h-3.5 w-3.5" />} />
            <div className="px-4 py-3">
              <p className="text-[12.5px] leading-[1.65] text-foreground/90">{customer.summary}</p>
            </div>
          </Panel>

          <div className="grid grid-cols-2 gap-2.5">
            <MetricTile label="Annual Premium" value={usd(customer.annualPremium)} sub="all policies" />
            <MetricTile label="Renewal Date" value={customer.renewalDate} sub="next renewal" />
            <MetricTile label="Products Held" value={String(customer.products.length)} sub={customer.products.join(", ")} />
            <MetricTile label="Conversations" value={String(customer.conversations)} sub="recorded and analysed" />
            <MetricTile label="Claims" value={String(customer.claims)} sub="lodged historically" />
            <MetricTile label="Complaints" value={String(customer.complaints)} sub="recorded" />
            <MetricTile label="Competitor" value={customer.competitor} sub="mentioned by customer" />
            <MetricTile label="Cross-sell Signal" value={customer.crossSell} sub="held elsewhere or discussed" />
          </div>

          <Panel>
            <PanelHead title="Conversation History" subtitle="Click a conversation to open the full analysis" />
            <div className="divide-y divide-border">
              {list.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setConv(c)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-primary-soft/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium">{c.type}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {c.date} · {c.agent} · {c.duration}
                    </p>
                  </div>
                  <Pill tone={riskTone(c.risk)}>{c.risk}</Pill>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </aside>
      <ConversationModal conv={conv} onClose={() => setConv(null)} />
    </>
  );
}

function CustomersPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [state, setState] = useState("All States");
  const [product, setProduct] = useState("All Products");
  const [segment, setSegment] = useState("All Segments");
  const [risk, setRisk] = useState("All Risk Levels");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState<Customer | null>(null);

  const reset = () => {
    setQ("");
    setState("All States");
    setProduct("All Products");
    setSegment("All Segments");
    setRisk("All Risk Levels");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return customers.filter((c) => {
      if (needle && !`${c.name} ${c.id}`.toLowerCase().includes(needle)) return false;
      if (state !== "All States" && c.state !== state) return false;
      if (product !== "All Products" && !c.products.includes(product)) return false;
      if (segment !== "All Segments" && c.segment !== segment) return false;
      if (risk !== "All Risk Levels" && c.retentionRisk !== risk) return false;
      if (tab === "Retention Risk" && !(c.retentionRisk === "Critical" || c.retentionRisk === "High")) return false;
      if (tab === "Multi-Policy" && c.products.length < 2) return false;
      if (tab === "Open Actions" && c.openActions === 0) return false;
      return true;
    });
  }, [q, state, product, segment, risk, tab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Customers in View" value={filtered.length.toLocaleString()} sub={`of ${customers.length} analysed`} />
        <MetricTile label="Retention Risk" value={String(filtered.filter((c) => c.retentionRisk === "Critical" || c.retentionRisk === "High").length)} sub="critical or high" />
        <MetricTile label="Multi-Policy Customers" value={String(filtered.filter((c) => c.products.length > 1).length)} sub="two or more products" />
        <MetricTile label="Conversations Linked" value={conversations.length.toLocaleString()} sub="across all customers" />
      </div>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer name or ID…" />
        <Select label="All States" value={state} onChange={(v) => { setState(v); setPage(1); }} options={["All States", ...STATES]} className="w-[175px]" />
        <Select label="All Products" value={product} onChange={(v) => { setProduct(v); setPage(1); }} options={["All Products", ...PRODUCTS]} className="w-[175px]" />
        <Select label="All Segments" value={segment} onChange={(v) => { setSegment(v); setPage(1); }} options={["All Segments", ...SEGMENTS]} className="w-[160px]" />
        <Select label="All Risk Levels" value={risk} onChange={(v) => { setRisk(v); setPage(1); }} options={["All Risk Levels", "Critical", "High", "Moderate", "Low"]} className="w-[150px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any customer to open their intelligence profile
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Policyholders"
          subtitle="Customer-level intelligence aggregated from every analysed conversation"
          icon={<Users className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1150px] border-collapse">
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Location</Th>
                <Th>Segment</Th>
                <Th>Tenure</Th>
                <Th>Products</Th>
                <Th>Annual Premium</Th>
                <Th>Renewal</Th>
                <Th>Retention Risk</Th>
                <Th>Current Intent</Th>
                <Th>Open Actions</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="cursor-pointer transition-colors hover:bg-primary-soft/50"
                >
                  <Td>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-[11px] tabular-nums text-muted-foreground">{c.id}</p>
                  </Td>
                  <Td className="text-muted-foreground">{c.city}, {c.state}</Td>
                  <Td>
                    <Pill tone="classify">{c.segment}</Pill>
                  </Td>
                  <Td className="tabular-nums text-muted-foreground">{c.tenure}</Td>
                  <Td className="text-muted-foreground">{c.products.join(", ")}</Td>
                  <Td className="tabular-nums font-medium">{usd(c.annualPremium)}</Td>
                  <Td className="whitespace-nowrap tabular-nums text-muted-foreground">{c.renewalDate}</Td>
                  <Td>
                    <Pill tone={riskTone(c.retentionRisk)} dot>
                      {c.retentionRisk}
                    </Pill>
                  </Td>
                  <Td className="text-muted-foreground">{c.currentIntent}</Td>
                  <Td>
                    <Pill tone={c.openActions > 0 ? "warning" : "neutral"}>{c.openActions}</Pill>
                  </Td>
                </tr>
              ))}
              {rows.length === 0 ? <EmptyRow span={10} /> : null}
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

      <Drawer customer={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
