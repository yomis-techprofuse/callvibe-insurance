import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Filter, Sparkles, TrendingUp } from "lucide-react";
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
  intentTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  COMPETITOR_MENTIONS,
  PRODUCTS,
  PURCHASE_BARRIERS,
  QUOTE_BARRIERS,
  QUOTE_CONVERSION_BY_PRODUCT,
  QUOTE_FUNNEL,
  QUOTE_KPIS,
  conversationById,
  quotes,
  usd,
  type Conversation,
} from "@/data/callvibe";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title: "Quotes and Sales Intelligence — CallVibe" },
      {
        name: "description",
        content:
          "Insurance quote demand, purchase barriers, competitor mentions, follow-up gaps and illustrative conversion value from customer conversations.",
      },
      { property: "og:title", content: "Quotes and Sales Intelligence — CallVibe" },
      { property: "og:description", content: "Quote conversion funnel, purchase barriers and follow-up gaps." },
    ],
  }),
  component: QuotesPage,
});

const TABS = ["All Quotes", "High Intent", "Follow-up Gaps", "Competitor Mentioned"];

function QuotesPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [product, setProduct] = useState("All Products");
  const [barrier, setBarrier] = useState("All Barriers");
  const [intent, setIntent] = useState("All Intent Levels");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [conv, setConv] = useState<Conversation | null>(null);

  const reset = () => {
    setQ("");
    setProduct("All Products");
    setBarrier("All Barriers");
    setIntent("All Intent Levels");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      quotes.filter((r) => {
        const needle = q.trim().toLowerCase();
        if (needle && !`${r.customer} ${r.id}`.toLowerCase().includes(needle)) return false;
        if (product !== "All Products" && r.product !== product) return false;
        if (barrier !== "All Barriers" && r.barrier !== barrier) return false;
        if (intent !== "All Intent Levels" && r.intent !== intent) return false;
        if (tab === "High Intent" && r.intent !== "High") return false;
        if (tab === "Follow-up Gaps" && r.followUp === "Confirmed") return false;
        if (tab === "Competitor Mentioned" && r.competitor === "—") return false;
        return true;
      }),
    [q, product, barrier, intent, tab],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);
  const maxFunnel = QUOTE_FUNNEL[0]!.value;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {QUOTE_KPIS.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelHead
            title="Quote Conversion Funnel"
            subtitle="Illustrative progression from quote conversation to conversion"
            icon={<TrendingUp className="h-3.5 w-3.5" />}
          />
          <div className="space-y-2.5 px-4 py-3.5">
            {QUOTE_FUNNEL.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] text-foreground/90">{s.label}</span>
                  <span className="text-[11.5px] font-semibold tabular-nums text-muted-foreground">
                    {s.value.toLocaleString()} · {Math.round((s.value / maxFunnel) * 100)}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(s.value / maxFunnel) * 100}%`, opacity: 1 - i * 0.11 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Illustrative Conversion by Product"
            subtitle="Percentage of quote conversations reaching a converted outcome"
            icon={<FileText className="h-3.5 w-3.5" />}
          />
          <div className="px-4 py-3.5">
            <HBarList items={QUOTE_CONVERSION_BY_PRODUCT} suffix="%" tone="success" max={100} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHead title="Purchase Barriers" subtitle="Reasons customers gave for not proceeding" icon={<Filter className="h-3.5 w-3.5" />} />
          <div className="px-4 py-3.5">
            <HBarList items={QUOTE_BARRIERS} tone="warning" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Competitor Mentions in Quotes" subtitle="Named alternatives raised during quote conversations" />
          <div className="px-4 py-3.5">
            <HBarList items={COMPETITOR_MENTIONS} tone="info" />
          </div>
        </Panel>
      </div>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer or quote reference…" />
        <Select label="All Products" value={product} onChange={(v) => { setProduct(v); setPage(1); }} options={["All Products", ...PRODUCTS]} className="w-[180px]" />
        <Select label="All Barriers" value={barrier} onChange={(v) => { setBarrier(v); setPage(1); }} options={["All Barriers", ...PURCHASE_BARRIERS]} className="w-[190px]" />
        <Select label="All Intent Levels" value={intent} onChange={(v) => { setIntent(v); setPage(1); }} options={["All Intent Levels", "High", "Medium", "Low"]} className="w-[155px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any quote to open the originating conversation
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Quote Conversations"
          subtitle="Open and closed quote opportunities extracted from conversations"
          icon={<FileText className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr>
                <Th>Quote</Th>
                <Th>Customer</Th>
                <Th>Product</Th>
                <Th>State</Th>
                <Th>Quoted Premium</Th>
                <Th>Intent</Th>
                <Th>Purchase Barrier</Th>
                <Th>Competitor</Th>
                <Th>Follow-up</Th>
                <Th>Agent</Th>
                <Th>Opportunity</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setConv(conversationById(r.conversationId) ?? null)}
                  className="cursor-pointer transition-colors hover:bg-primary-soft/50"
                >
                  <Td>
                    <p className="font-medium tabular-nums">{r.id}</p>
                    <p className="text-[11px] text-muted-foreground">{r.date}</p>
                  </Td>
                  <Td>{r.customer}</Td>
                  <Td className="text-muted-foreground">{r.product}</Td>
                  <Td className="text-muted-foreground">{r.state}</Td>
                  <Td className="tabular-nums font-medium">{usd(r.quoted)}</Td>
                  <Td>
                    <Pill tone={intentTone(r.intent)} dot>
                      {r.intent}
                    </Pill>
                  </Td>
                  <Td className="text-muted-foreground">{r.barrier}</Td>
                  <Td className="text-muted-foreground">{r.competitor}</Td>
                  <Td>
                    <Pill tone={r.followUp === "Confirmed" ? "success" : r.followUp === "Overdue" ? "danger" : "warning"}>
                      {r.followUp}
                    </Pill>
                  </Td>
                  <Td>{r.agent}</Td>
                  <Td className="tabular-nums text-muted-foreground">{usd(r.opportunity)}</Td>
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
