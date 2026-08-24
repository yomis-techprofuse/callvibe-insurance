import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Activity,
  BarChart3,
  Coins,
  FileText,
  LifeBuoy,
  MessageSquareWarning,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { HBarList, KpiCard, Panel, PanelHead, Pill, type Tone } from "@/components/mi/kit";
import { Legend, TrendLines } from "@/components/mi/charts";
import {
  COMMERCIAL_SIGNALS,
  COMPETITOR_MENTIONS,
  DASHBOARD_KPIS,
  OPERATIONAL_SIGNALS,
  RISK_SIGNALS,
  WEEKLY_INSIGHTS,
  volumeSeries,
} from "@/data/callvibe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Insurance Intelligence Overview — CallVibe" },
      {
        name: "description",
        content:
          "CallVibe turns Harbour Insurance customer conversations into commercial, operational and risk intelligence across quotes, renewals, claims and complaints.",
      },
      { property: "og:title", content: "Insurance Intelligence Overview — CallVibe" },
      {
        property: "og:description",
        content: "Conversation intelligence for Australian insurance: quotes, renewals, claims, complaints and risk signals.",
      },
    ],
  }),
  component: DashboardPage,
});

const KPI_ICONS = [Activity, FileText, RefreshCcw, LifeBuoy, MessageSquareWarning, Coins];
const KPI_TONES: Tone[] = ["primary", "info", "warning", "danger", "danger", "success"];

function SignalGroup({
  title,
  subtitle,
  icon,
  items,
  to,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: { label: string; value: number; sub: string; tone: Tone }[];
  to: string;
}) {
  return (
    <Panel>
      <PanelHead
        title={title}
        subtitle={subtitle}
        icon={icon}
        right={
          <Link to={to} className="text-[11.5px] font-medium text-primary hover:underline">
            View
          </Link>
        }
      />
      <div className="space-y-2 px-4 py-3.5">
        {items.map((i) => (
          <div key={i.label} className="flex items-start justify-between gap-3 rounded-lg border border-border px-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium">{i.label}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{i.sub}</p>
            </div>
            <Pill tone={i.tone}>{i.value.toLocaleString()}</Pill>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-warning/25 bg-warning-soft px-3.5 py-2">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-warning" />
        <p className="text-[11.5px] text-warning">
          Demonstration environment — all customers, policies, claims, employees and figures are fictional. Currency is
          shown in USD.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {DASHBOARD_KPIS.map((k, i) => {
          const Icon = KPI_ICONS[i]!;
          return (
            <KpiCard
              key={k.label}
              label={k.label}
              value={k.value}
              delta={k.delta}
              up={k.up}
              sub={k.sub}
              tone={KPI_TONES[i]}
              icon={<Icon className="h-3.5 w-3.5" />}
            />
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel>
          <PanelHead
            title="Conversation Volume and Signal Trend"
            subtitle="Daily analysed conversations against detected commercial and operational signals"
            icon={<BarChart3 className="h-3.5 w-3.5" />}
            right={<Pill tone="info">Last 14 days</Pill>}
          />
          <div className="px-3 py-3">
            <TrendLines
              data={volumeSeries}
              xKey="day"
              height={250}
              series={[
                { key: "conversations", color: "var(--color-primary)" },
                { key: "quoteLeakage", color: "var(--color-info)" },
                { key: "renewalRisk", color: "var(--color-warning)" },
                { key: "claimsFrustration", color: "var(--color-danger)" },
              ]}
            />
            <div className="mt-2 px-1">
              <Legend
                items={[
                  { label: "Conversations", color: "var(--color-primary)" },
                  { label: "Quote leakage", color: "var(--color-info)" },
                  { label: "Renewal risk", color: "var(--color-warning)" },
                  { label: "Claims frustration", color: "var(--color-danger)" },
                ]}
              />
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="What Changed This Week"
            subtitle="Executive insight cards generated from conversation analysis"
            icon={<Sparkles className="h-3.5 w-3.5" />}
            right={
              <Link to="/executive-intelligence" className="text-[11.5px] font-medium text-primary hover:underline">
                All insights
              </Link>
            }
          />
          <div className="scroll-slim max-h-[300px] space-y-2.5 overflow-y-auto px-4 py-3.5">
            {WEEKLY_INSIGHTS.map((i) => (
              <div key={i.id} className="rounded-lg border border-border px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <Pill tone={i.tone}>Signal</Pill>
                  <p className="min-w-0 text-[12.5px] leading-[1.5] font-semibold">{i.title}</p>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-[1.55] text-muted-foreground">{i.matters}</p>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  <span className="font-medium text-foreground/80">Cohort:</span> {i.cohort}
                </p>
                <p className="mt-1 text-[11px] font-medium text-primary">{i.action}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SignalGroup
          title="Commercial Signals"
          subtitle="Revenue opportunities detected in conversations"
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          items={COMMERCIAL_SIGNALS}
          to="/quotes"
        />
        <SignalGroup
          title="Operational Signals"
          subtitle="Service friction and effort indicators"
          icon={<Activity className="h-3.5 w-3.5" />}
          items={OPERATIONAL_SIGNALS}
          to="/claims"
        />
        <SignalGroup
          title="Risk Signals"
          subtitle="Detected for qualified human review only"
          icon={<ShieldAlert className="h-3.5 w-3.5" />}
          items={RISK_SIGNALS}
          to="/risk-review"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHead
            title="Competitor Mentions"
            subtitle="Named alternatives raised by customers during conversations"
            icon={<BarChart3 className="h-3.5 w-3.5" />}
          />
          <div className="px-4 py-3.5">
            <HBarList items={COMPETITOR_MENTIONS} tone="info" />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Signal Composition"
            subtitle="Detected signals by category across the analysed period"
            icon={<Activity className="h-3.5 w-3.5" />}
          />
          <div className="px-4 py-3.5">
            <HBarList
              items={[
                { label: "Price and premium objections", value: 2846 },
                { label: "Coverage and excess confusion", value: 1924 },
                { label: "Claims process friction", value: 1146 },
                { label: "Cancellation language", value: 1126 },
                { label: "Cross-sell signals", value: 612 },
                { label: "Potential complaint signals", value: 392 },
              ]}
              tone="primary"
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
