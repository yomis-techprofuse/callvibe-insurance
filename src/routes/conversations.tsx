import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Clock, Headphones, Sparkles } from "lucide-react";
import {
  EmptyRow,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  TableWrap,
  Td,
  Th,
  sentimentTone,
  riskTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  AGENT_NAMES,
  BUSINESS_FUNCTIONS,
  CONVERSATION_TYPES,
  PRODUCTS,
  STATES,
  conversations,
  type Conversation,
} from "@/data/callvibe";

export const Route = createFileRoute("/conversations")({
  head: () => ({
    meta: [
      { title: "Conversations — CallVibe Insurance Intelligence" },
      {
        name: "description",
        content:
          "Every Harbour Insurance conversation classified by type, product, risk and outcome, with quality scoring and full tagged transcripts.",
      },
      { property: "og:title", content: "Conversations — CallVibe Insurance Intelligence" },
      { property: "og:description", content: "Classified insurance conversations with risk signals and full transcripts." },
    ],
  }),
  component: ConversationsPage,
});

const TABS = [
  "All Conversations",
  "Cancellation Risk",
  "Complaint Signals",
  "Claims Friction",
  "Sales Opportunity",
  "Requires Review",
];

function ConversationsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [type, setType] = useState("All Types");
  const [product, setProduct] = useState("All Products");
  const [state, setState] = useState("All States");
  const [agent, setAgent] = useState("All Agents");
  const [fn, setFn] = useState("All Functions");
  const [risk, setRisk] = useState("All Risk Levels");
  const [sentiment, setSentiment] = useState("All Sentiment");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState<Conversation | null>(null);

  const reset = () => {
    setQ("");
    setType("All Types");
    setProduct("All Products");
    setState("All States");
    setAgent("All Agents");
    setFn("All Functions");
    setRisk("All Risk Levels");
    setSentiment("All Sentiment");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return conversations.filter((c) => {
      if (needle && !`${c.customer} ${c.id} ${c.policyId} ${c.customerId}`.toLowerCase().includes(needle)) return false;
      if (type !== "All Types" && c.type !== type) return false;
      if (product !== "All Products" && c.product !== product) return false;
      if (state !== "All States" && c.state !== state) return false;
      if (agent !== "All Agents" && c.agent !== agent) return false;
      if (fn !== "All Functions" && c.fn !== fn) return false;
      if (risk !== "All Risk Levels" && c.risk !== risk) return false;
      if (sentiment !== "All Sentiment" && c.sentiment !== sentiment) return false;
      if (tab === "Cancellation Risk" && !(c.risk === "Critical" || c.risk === "High") ) return false;
      if (tab === "Complaint Signals" && c.type !== "Complaint" && c.primarySignal !== "Expression of dissatisfaction")
        return false;
      if (tab === "Claims Friction" && c.fn !== "Claims") return false;
      if (tab === "Sales Opportunity" && c.fn !== "Sales") return false;
      if (tab === "Requires Review" && c.reviewStatus !== "New" && c.reviewStatus !== "Under Review") return false;
      return true;
    });
  }, [q, type, product, state, agent, fn, risk, sentiment, tab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  const atRisk = filtered.filter((c) => c.risk === "Critical" || c.risk === "High").length;
  const complaints = filtered.filter((c) => c.type === "Complaint").length;
  const competitor = filtered.filter((c) => c.competitor !== "—").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Conversations in View" value={filtered.length.toLocaleString()} sub={`of ${conversations.length} analysed`} />
        <MetricTile label="Elevated Risk" value={String(atRisk)} sub="Critical or high risk signal" />
        <MetricTile label="Complaint Conversations" value={String(complaints)} sub="Pending human review" />
        <MetricTile label="Competitor Mentions" value={String(competitor)} sub="Named alternative discussed" />
      </div>

      <FilterBar onReset={reset}>
        <SearchBox
          value={q}
          onChange={(v) => {
            setQ(v);
            setPage(1);
          }}
          placeholder="Search customer, policy or conversation ID…"
        />
        <Select label="All Types" value={type} onChange={(v) => { setType(v); setPage(1); }} options={["All Types", ...CONVERSATION_TYPES]} className="w-[165px]" />
        <Select label="All Products" value={product} onChange={(v) => { setProduct(v); setPage(1); }} options={["All Products", ...PRODUCTS]} className="w-[175px]" />
        <Select label="All States" value={state} onChange={(v) => { setState(v); setPage(1); }} options={["All States", ...STATES]} className="w-[175px]" />
        <Select label="All Agents" value={agent} onChange={(v) => { setAgent(v); setPage(1); }} options={["All Agents", ...AGENT_NAMES]} className="w-[155px]" />
        <Select label="All Functions" value={fn} onChange={(v) => { setFn(v); setPage(1); }} options={["All Functions", ...BUSINESS_FUNCTIONS]} className="w-[145px]" />
        <Select label="All Risk Levels" value={risk} onChange={(v) => { setRisk(v); setPage(1); }} options={["All Risk Levels", "Critical", "High", "Moderate", "Low"]} className="w-[150px]" />
        <Select label="All Sentiment" value={sentiment} onChange={(v) => { setSentiment(v); setPage(1); }} options={["All Sentiment", "Positive", "Neutral", "Negative"]} className="w-[140px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any row to open the full conversation analysis
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Customer Conversations"
          subtitle="Classified, scored and tagged automatically for human review"
          icon={<Headphones className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1280px] border-collapse">
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Type</Th>
                <Th>Product</Th>
                <Th>Agent</Th>
                <Th>Date / Time</Th>
                <Th>Dir.</Th>
                <Th>Duration</Th>
                <Th>Sentiment</Th>
                <Th>Risk</Th>
                <Th>Primary Signal</Th>
                <Th>Outcome</Th>
                <Th>Review</Th>
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
                    <p className="font-medium">{c.customer}</p>
                    <p className="text-[11px] tabular-nums text-muted-foreground">{c.policyId}</p>
                  </Td>
                  <Td>
                    <Pill tone="classify">{c.type}</Pill>
                  </Td>
                  <Td className="text-muted-foreground">{c.product}</Td>
                  <Td>{c.agent}</Td>
                  <Td className="whitespace-nowrap tabular-nums text-muted-foreground">
                    {c.date} · {c.time}
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
                      {c.direction === "Inbound" ? (
                        <ArrowDownLeft className="h-3 w-3 text-success" />
                      ) : (
                        <ArrowUpRight className="h-3 w-3 text-info" />
                      )}
                      {c.direction}
                    </span>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1 tabular-nums text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {c.duration}
                    </span>
                  </Td>
                  <Td>
                    <Pill tone={sentimentTone(c.sentiment)}>{c.sentiment}</Pill>
                  </Td>
                  <Td>
                    <Pill tone={riskTone(c.risk)} dot>
                      {c.risk}
                    </Pill>
                  </Td>
                  <Td className="text-muted-foreground">{c.primarySignal}</Td>
                  <Td className="text-muted-foreground">{c.outcome}</Td>
                  <Td>
                    <Pill tone={c.reviewStatus === "New" ? "warning" : c.reviewStatus === "Escalated" ? "danger" : "neutral"}>
                      {c.reviewStatus}
                    </Pill>
                  </Td>
                </tr>
              ))}
              {rows.length === 0 ? <EmptyRow span={12} /> : null}
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

      <ConversationModal conv={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
