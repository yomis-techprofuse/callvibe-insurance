import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HelpCircle, Package } from "lucide-react";
import {
  HBarList,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  ScoreBar,
  TableWrap,
  Td,
  Th,
  scoreCellTone,
} from "@/components/mi/kit";
import { TabBar } from "@/components/mi/controls";
import { productProfiles } from "@/data/callvibe";

export const Route = createFileRoute("/product-intelligence")({
  head: () => ({
    meta: [
      { title: "Product Intelligence — CallVibe" },
      {
        name: "description",
        content:
          "Objections, coverage questions, competitor pressure and cross-sell signals by insurance product across Harbour Insurance conversations.",
      },
      { property: "og:title", content: "Product Intelligence — CallVibe" },
      { property: "og:description", content: "What customers actually say about each insurance product." },
    ],
  }),
  component: ProductIntelligencePage,
});

function ProductIntelligencePage() {
  const [product, setProduct] = useState(productProfiles[0]!.name);
  const p = productProfiles.find((x) => x.name === product)!;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Products Analysed" value={String(productProfiles.length)} sub="Active product lines" />
        <MetricTile
          label="Conversations Analysed"
          value={productProfiles.reduce((s, x) => s + x.conversations, 0).toLocaleString()}
          sub="Rolling 90 days"
        />
        <MetricTile
          label="Competitor Mentions"
          value={productProfiles.reduce((s, x) => s + x.competitorMentions, 0).toLocaleString()}
          sub="Across all products"
        />
        <MetricTile
          label="Cross-Sell Signals"
          value={productProfiles.reduce((s, x) => s + x.crossSell, 0).toLocaleString()}
          sub="Detected in conversation"
        />
      </div>

      <Panel>
        <PanelHead
          title="Product Comparison"
          subtitle="Conversation-derived performance indicators by product line"
          icon={<Package className="h-3.5 w-3.5" />}
        />
        <TableWrap>
          <table className="w-full min-w-[1040px] border-collapse">
            <thead>
              <tr>
                <Th>Product</Th>
                <Th>Conversations</Th>
                <Th>Quote Intent</Th>
                <Th>Conversion</Th>
                <Th>Renewal Risk</Th>
                <Th>Claims Friction</Th>
                <Th>Complaint Signals</Th>
                <Th>Competitor Mentions</Th>
                <Th>Cross-Sell</Th>
              </tr>
            </thead>
            <tbody>
              {productProfiles.map((x) => (
                <tr
                  key={x.name}
                  onClick={() => setProduct(x.name)}
                  className={`cursor-pointer transition-colors hover:bg-primary-soft/50 ${x.name === product ? "bg-primary-soft/60" : ""}`}
                >
                  <Td className="font-medium">{x.name}</Td>
                  <Td className="tabular-nums text-muted-foreground">{x.conversations.toLocaleString()}</Td>
                  <Td className="tabular-nums text-muted-foreground">{x.quoteIntent}%</Td>
                  <Td className={`tabular-nums font-medium ${scoreCellTone(x.conversion)}`}>{x.conversion}%</Td>
                  <Td className="tabular-nums text-muted-foreground">{x.renewalRisk}</Td>
                  <Td className="tabular-nums text-muted-foreground">{x.claimsFriction}%</Td>
                  <Td className="tabular-nums text-muted-foreground">{x.complaintSignals}</Td>
                  <Td className="tabular-nums text-muted-foreground">{x.competitorMentions.toLocaleString()}</Td>
                  <Td className="tabular-nums text-muted-foreground">{x.crossSell}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <TabBar tabs={productProfiles.map((x) => x.name)} value={product} onChange={setProduct} />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelHead title={`${p.name} — Top Objections`} subtitle="Detected purchase and renewal barriers" />
          <div className="px-4 py-3.5">
            <HBarList items={p.objections} tone="warning" />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Product Signal Profile" subtitle="Relative strength of detected signals" />
          <div className="space-y-2.5 px-4 py-3.5">
            <ScoreBar label="Quote intent" value={p.quoteIntent} />
            <ScoreBar label="Quote conversion" value={p.conversion} />
            <ScoreBar label="Claims friction" value={p.claimsFriction} />
            <ScoreBar label="Cross-sell interest" value={Math.min(100, Math.round((p.crossSell / p.conversations) * 1000))} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Panel>
          <PanelHead
            title="Most Frequent Coverage Questions"
            subtitle="Questions customers repeatedly ask about this product"
            icon={<HelpCircle className="h-3.5 w-3.5" />}
          />
          <ul className="divide-y divide-border">
            {p.questions.map((q) => (
              <li key={q} className="flex items-start gap-2.5 px-4 py-3 text-[12.5px]">
                <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHead title="What This Means" subtitle="Observed pattern across analysed conversations" />
          <div className="space-y-3 px-4 py-3.5">
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">{p.note}</p>
            <div className="flex flex-wrap gap-1.5">
              <Pill tone="info">{p.conversations.toLocaleString()} conversations</Pill>
              <Pill tone="warning">{p.renewalRisk} at-risk renewals</Pill>
              <Pill tone="danger">{p.complaintSignals} complaint signals</Pill>
              <Pill tone="success">{p.crossSell} cross-sell signals</Pill>
            </div>
            <p className="text-[11.5px] leading-relaxed text-muted-foreground">
              Figures are illustrative and derived from simulated conversation analysis. Commercial decisions remain the
              responsibility of the insurer.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
