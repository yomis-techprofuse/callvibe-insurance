import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RefreshCcw, Sparkles, TrendingDown } from "lucide-react";
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
} from "@/components/mi/kit";
import { DonutChart, Legend, TrendLines } from "@/components/mi/charts";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { ConversationModal } from "@/components/mi/conversation-modal";
import {
  CANCELLATION_DRIVERS,
  CANCELLATION_DRIVER_DATA,
  PRODUCTS,
  RENEWAL_KPIS,
  RENEWAL_RISK_BY_PRODUCT,
  RENEWAL_RISK_BY_TENURE,
  SAVE_OUTCOMES,
  conversations,
  renewalRiskTrend,
  usd,
  type Conversation,
} from "@/data/callvibe";

export const Route = createFileRoute("/renewals")({
  head: () => ({
    meta: [
      { title: "Renewals and Retention — CallVibe" },
      {
        name: "description",
        content:
          "Cancellation drivers, at-risk insurance renewals, competitor pressure and save opportunities detected in customer conversations.",
      },
      { property: "og:title", content: "Renewals and Retention — CallVibe" },
      { property: "og:description", content: "At-risk renewals, cancellation drivers and retention save opportunities." },
    ],
  }),
  component: RenewalsPage,
});

const TABS = ["All Renewals", "Critical Risk", "Competitor Pressure", "No Save Attempt"];

const renewalConversations = conversations.filter((c) => c.type === "Policy Renewal" || c.type === "Cancellation");

function RenewalsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [product, setProduct] = useState("All Products");
  const [driver, setDriver] = useState("All Drivers");
  const [risk, setRisk] = useState("All Risk Levels");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [conv, setConv] = useState<Conversation | null>(null);

  const reset = () => {
    setQ("");
    setProduct("All Products");
    setDriver("All Drivers");
    setRisk("All Risk Levels");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      renewalConversations.filter((c) => {
        const needle = q.trim().toLowerCase();
        if (needle && !`${c.customer} ${c.policyId}`.toLowerCase().includes(needle)) return false;
        if (product !== "All Products" && c.product !== product) return false;
        if (driver !== "All Drivers" && c.objection !== driver) return false;
        if (risk !== "All Risk Levels" && c.risk !== risk) return false;
        if (tab === "Critical Risk" && c.risk !== "Critical") return false;
        if (tab === "Competitor Pressure" && c.competitor === "—") return false;
        if (tab === "No Save Attempt" && c.followUp === "Confirmed") return false;
        return true;
      }),
    [q, product, driver, risk, tab],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {RENEWAL_KPIS.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelHead
            title="Renewal Risk Trend"
            subtitle="At-risk renewals against saved renewals by week"
            icon={<TrendingDown className="h-3.5 w-3.5" />}
          />
          <div className="px-3 py-3">
            <TrendLines
              data={renewalRiskTrend}
              xKey="week"
              height={230}
              series={[
                { key: "atRisk", color: "var(--color-danger)" },
                { key: "saved", color: "var(--color-success)" },
              ]}
            />
            <div className="mt-2 px-1">
              <Legend
                items={[
                  { label: "At risk", color: "var(--color-danger)" },
                  { label: "Saved", color: "var(--color-success)" },
                ]}
              />
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Illustrative Save Outcomes" subtitle="Simulated distribution of at-risk renewal outcomes" />
          <div className="px-4 py-3">
            <DonutChart data={SAVE_OUTCOMES} centerValue="42%" centerLabel="illustrative save rate" />
            <div className="mt-1">
              <Legend items={SAVE_OUTCOMES.map((s) => ({ label: s.name, color: s.color, value: `${s.value}%` }))} />
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel>
          <PanelHead title="Cancellation Drivers" subtitle="Detected reasons for cancellation intent" />
          <div className="px-4 py-3.5">
            <HBarList items={CANCELLATION_DRIVER_DATA} tone="danger" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Renewal Risk by Product" subtitle="At-risk renewals by product line" />
          <div className="px-4 py-3.5">
            <HBarList items={RENEWAL_RISK_BY_PRODUCT} tone="warning" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Renewal Risk by Tenure" subtitle="At-risk renewals by customer tenure band" />
          <div className="px-4 py-3.5">
            <HBarList items={RENEWAL_RISK_BY_TENURE} tone="primary" />
          </div>
        </Panel>
      </div>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer or policy number…" />
        <Select label="All Products" value={product} onChange={(v) => { setProduct(v); setPage(1); }} options={["All Products", ...PRODUCTS]} className="w-[180px]" />
        <Select label="All Drivers" value={driver} onChange={(v) => { setDriver(v); setPage(1); }} options={["All Drivers", ...CANCELLATION_DRIVERS]} className="w-[195px]" />
        <Select label="All Risk Levels" value={risk} onChange={(v) => { setRisk(v); setPage(1); }} options={["All Risk Levels", "Critical", "High", "Moderate", "Low"]} className="w-[155px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any renewal to open the full conversation analysis
        </p>
      </div>

      <Panel>
        <PanelHead
          title="At-Risk Renewals"
          subtitle="Renewal and cancellation conversations ranked by detected risk"
          icon={<RefreshCcw className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Policy</Th>
                <Th>Product</Th>
                <Th>Previous Premium</Th>
                <Th>Renewal Premium</Th>
                <Th>Change</Th>
                <Th>Cancellation Driver</Th>
                <Th>Competitor</Th>
                <Th>Risk</Th>
                <Th>Save Attempt</Th>
                <Th>Agent</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const delta = Math.round(((c.premium - c.previousPremium) / c.previousPremium) * 100);
                return (
                  <tr
                    key={c.id}
                    onClick={() => setConv(c)}
                    className="cursor-pointer transition-colors hover:bg-primary-soft/50"
                  >
                    <Td>
                      <p className="font-medium">{c.customer}</p>
                      <p className="text-[11px] text-muted-foreground">{c.date}</p>
                    </Td>
                    <Td className="tabular-nums text-muted-foreground">{c.policyId}</Td>
                    <Td className="text-muted-foreground">{c.product}</Td>
                    <Td className="tabular-nums text-muted-foreground">{usd(c.previousPremium)}</Td>
                    <Td className="tabular-nums font-medium">{usd(c.premium)}</Td>
                    <Td>
                      <span className={delta > 0 ? "font-semibold text-danger tabular-nums" : "font-semibold text-success tabular-nums"}>
                        {delta > 0 ? "+" : ""}
                        {delta}%
                      </span>
                    </Td>
                    <Td className="text-muted-foreground">{c.objection}</Td>
                    <Td className="text-muted-foreground">{c.competitor}</Td>
                    <Td>
                      <Pill tone={riskTone(c.risk)} dot>
                        {c.risk}
                      </Pill>
                    </Td>
                    <Td>
                      <Pill tone={c.followUp === "Confirmed" ? "success" : "danger"}>
                        {c.followUp === "Confirmed" ? "Attempted" : "Not detected"}
                      </Pill>
                    </Td>
                    <Td>{c.agent}</Td>
                  </tr>
                );
              })}
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
