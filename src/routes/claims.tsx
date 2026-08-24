import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LifeBuoy, Sparkles } from "lucide-react";
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
  riskTone,
  sentimentTone,
} from "@/components/mi/kit";
import { Legend, TrendLines } from "@/components/mi/charts";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  CLAIMS_ESCALATION_DRIVERS,
  CLAIMS_KPIS,
  CLAIMS_ROOT_CAUSE_DATA,
  CLAIMS_STAGE_VOLUME,
  CLAIMS_SUPPLIER_MENTIONS,
  CLAIM_ROOT_CAUSES,
  CLAIM_STAGES,
  PRODUCTS,
  claimsFrustrationTrend,
  conversations,
  type Conversation,
} from "@/data/callvibe";

export const Route = createFileRoute("/claims")({
  head: () => ({
    meta: [
      { title: "Claims Experience Intelligence — CallVibe" },
      {
        name: "description",
        content:
          "Claim-stage friction, repeat contact, escalation drivers and root causes detected across Harbour Insurance claims conversations.",
      },
      { property: "og:title", content: "Claims Experience Intelligence — CallVibe" },
      { property: "og:description", content: "Where claims conversations create friction, repeat contact and escalation." },
    ],
  }),
  component: ClaimsPage,
});

const TABS = ["All Claims Conversations", "Requires Attention", "Repeat Contact", "Escalation Signals"];

const claimsConversations = conversations.filter((c) => c.fn === "Claims");

function ClaimsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("All Stages");
  const [product, setProduct] = useState("All Products");
  const [cause, setCause] = useState("All Root Causes");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [conv, setConv] = useState<Conversation | null>(null);

  const reset = () => {
    setQ("");
    setStage("All Stages");
    setProduct("All Products");
    setCause("All Root Causes");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      claimsConversations.filter((c) => {
        const needle = q.trim().toLowerCase();
        if (needle && !`${c.customer} ${c.policyId} ${c.id}`.toLowerCase().includes(needle)) return false;
        if (stage !== "All Stages" && c.claimStage !== stage) return false;
        if (product !== "All Products" && c.product !== product) return false;
        if (cause !== "All Root Causes" && c.rootCause !== cause) return false;
        if (tab === "Requires Attention" && !(c.risk === "Critical" || c.risk === "High")) return false;
        if (tab === "Repeat Contact" && c.primarySignal !== "Repeat contact") return false;
        if (tab === "Escalation Signals" && c.outcome !== "Escalation created") return false;
        return true;
      }),
    [q, stage, product, cause, tab],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {CLAIMS_KPIS.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelHead
            title="Claims Frustration and Repeat Contact Trend"
            subtitle="Detected frustration language against repeat contact by week"
            icon={<LifeBuoy className="h-3.5 w-3.5" />}
          />
          <div className="px-3 py-3">
            <TrendLines
              data={claimsFrustrationTrend}
              xKey="week"
              height={230}
              series={[
                { key: "frustration", color: "var(--color-danger)" },
                { key: "repeatContact", color: "var(--color-warning)" },
              ]}
            />
            <div className="mt-2 px-1">
              <Legend
                items={[
                  { label: "Frustration signals", color: "var(--color-danger)" },
                  { label: "Repeat contact", color: "var(--color-warning)" },
                ]}
              />
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Conversation Volume by Claim Stage" subtitle="Where claims conversations concentrate" />
          <div className="px-4 py-3.5">
            <HBarList items={CLAIMS_STAGE_VOLUME} tone="primary" />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel>
          <PanelHead title="Root Causes of Claims Contact" subtitle="Detected reason the customer made contact" />
          <div className="px-4 py-3.5">
            <HBarList items={CLAIMS_ROOT_CAUSE_DATA} tone="warning" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Escalation Drivers" subtitle="Signals preceding escalation language" />
          <div className="px-4 py-3.5">
            <HBarList items={CLAIMS_ESCALATION_DRIVERS} tone="danger" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Supplier and Repairer Mentions" subtitle="Third parties named by customers" />
          <div className="px-4 py-3.5">
            <HBarList items={CLAIMS_SUPPLIER_MENTIONS} tone="info" />
          </div>
        </Panel>
      </div>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer, policy or conversation ID…" />
        <Select label="All Stages" value={stage} onChange={(v) => { setStage(v); setPage(1); }} options={["All Stages", ...CLAIM_STAGES]} className="w-[200px]" />
        <Select label="All Products" value={product} onChange={(v) => { setProduct(v); setPage(1); }} options={["All Products", ...PRODUCTS]} className="w-[180px]" />
        <Select label="All Root Causes" value={cause} onChange={(v) => { setCause(v); setPage(1); }} options={["All Root Causes", ...CLAIM_ROOT_CAUSES]} className="w-[215px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any conversation to open the full claim analysis
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Claims Conversations"
          subtitle="Claim notifications, status enquiries and settlement discussions"
          icon={<LifeBuoy className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1140px] border-collapse">
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Policy</Th>
                <Th>Product</Th>
                <Th>Claim Stage</Th>
                <Th>Root Cause</Th>
                <Th>Date</Th>
                <Th>Duration</Th>
                <Th>Sentiment</Th>
                <Th>Risk</Th>
                <Th>Outcome</Th>
                <Th>Agent</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} onClick={() => setConv(c)} className="cursor-pointer transition-colors hover:bg-primary-soft/50">
                  <Td className="font-medium">{c.customer}</Td>
                  <Td className="tabular-nums text-muted-foreground">{c.policyId}</Td>
                  <Td className="text-muted-foreground">{c.product}</Td>
                  <Td>
                    <Pill tone="classify">{c.claimStage}</Pill>
                  </Td>
                  <Td className="text-muted-foreground">{c.rootCause}</Td>
                  <Td className="whitespace-nowrap tabular-nums text-muted-foreground">{c.date}</Td>
                  <Td className="tabular-nums text-muted-foreground">{c.duration}</Td>
                  <Td>
                    <Pill tone={sentimentTone(c.sentiment)}>{c.sentiment}</Pill>
                  </Td>
                  <Td>
                    <Pill tone={riskTone(c.risk)} dot>
                      {c.risk}
                    </Pill>
                  </Td>
                  <Td className="text-muted-foreground">{c.outcome}</Td>
                  <Td>{c.agent}</Td>
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
