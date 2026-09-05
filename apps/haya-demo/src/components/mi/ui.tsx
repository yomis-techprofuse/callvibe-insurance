import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Panel, type Tone } from "./kit";

export function DemoBadge({ label = "Demo data", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-warning-soft px-1.5 py-[2px] text-[9.5px] font-semibold tracking-widest text-warning uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function PageHead({
  title,
  subtitle,
  right,
  badge = "Demo data",
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  badge?: string | null;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-[17px] font-semibold tracking-tight">{title}</h2>
          {badge ? <DemoBadge label={badge} /> : null}
        </div>
        {subtitle ? <p className="mt-1 max-w-3xl text-[12.5px] text-muted-foreground">{subtitle}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function DeltaKpi({
  label,
  value,
  delta,
  up,
  good,
  sub,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  good?: boolean;
  sub?: string;
}) {
  return (
    <Panel className="px-4 py-3">
      <p className="text-[11.5px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-[22px] leading-none font-semibold tracking-tight tabular-nums">{value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {delta ? (
          <span className={cn("inline-flex items-center gap-0.5 text-[11px] font-semibold", good ? "text-success" : "text-danger")}>
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        ) : null}
        {sub ? <span className="text-[11px] text-muted-foreground">{sub}</span> : null}
      </div>
    </Panel>
  );
}

export function FilterBar({ filters }: { filters: { label: string; options: string[] }[] }) {
  return (
    <Panel className="mb-4 flex flex-wrap items-center gap-2.5 px-3.5 py-2.5">
      {filters.map((f) => (
        <label key={f.label} className="flex items-center gap-1.5">
          <span className="text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase">{f.label}</span>
          <select
            defaultValue={f.options[0]}
            className="h-7 rounded-lg border border-border bg-card px-2 text-[12px] font-medium outline-none focus:border-primary"
          >
            {f.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      ))}
      <span className="ml-auto text-[11px] text-muted-foreground">All figures simulated for demonstration</span>
    </Panel>
  );
}

const sevMap = {
  critical: { dot: "bg-danger", chip: "bg-danger-soft text-danger", ring: "border-danger/30" },
  elevated: { dot: "bg-warning", chip: "bg-warning-soft text-warning", ring: "border-warning/30" },
  new: { dot: "bg-info", chip: "bg-info-soft text-info", ring: "border-info/30" },
};

export function AlertCard({
  severity,
  kind,
  title,
  body,
  cta,
  to,
  params,
  search,
  meta,
}: {
  severity: "critical" | "elevated" | "new";
  kind: string;
  title: string;
  body: string;
  cta: string;
  to: string;
  params?: Record<string, string> | undefined;
  search?: Record<string, string> | undefined;
  meta?: string[] | undefined;
}) {
  const s = sevMap[severity];
  return (
    <Link
      to={to}
      params={params as never}
      search={search as never}
      className={cn("card-surface block border px-4 py-3.5 transition-shadow hover:shadow-pop", s.ring)}
    >
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", s.dot)} />
        <span className={cn("rounded-md px-1.5 py-[2px] text-[9.5px] font-semibold tracking-widest uppercase", s.chip)}>{kind}</span>
      </div>
      <p className="mt-2 text-[13px] font-semibold tracking-tight">{title}</p>
      <p className="mt-1 text-[12px] leading-[1.55] text-muted-foreground">{body}</p>
      {meta?.length ? (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {meta.map((m) => (
            <span key={m} className="text-[11px] text-muted-foreground">
              {m}
            </span>
          ))}
        </div>
      ) : null}
      <span className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-primary">
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function InsightBanner({ label = "Intelligence", body, children }: { label?: string; body: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/25 bg-primary-soft/50 px-4 py-3.5">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">{label}</span>
      </div>
      <p className="mt-1.5 text-[12.5px] leading-[1.6] text-foreground/90">{body}</p>
      {children ? <div className="mt-2.5">{children}</div> : null}
    </div>
  );
}

export function BarRow({
  label,
  value,
  suffix = "%",
  max,
  tone = "primary",
  to,
  params,
  search,
  right,
}: {
  label: string;
  value: number;
  suffix?: string;
  max?: number;
  tone?: Tone;
  to?: string;
  params?: Record<string, string> | undefined;
  search?: Record<string, string> | undefined;
  right?: ReactNode;
}) {
  const fill: Record<string, string> = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    classify: "bg-classify",
    neutral: "bg-muted-foreground",
  };
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[12px] text-foreground/90">{label}</span>
        <span className="shrink-0 text-[11.5px] font-semibold tabular-nums text-muted-foreground">
          {right ?? `${value}${suffix}`}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-all", fill[tone])} style={{ width: `${Math.max(3, (value / (max ?? 100)) * 100)}%` }} />
      </div>
    </>
  );

  if (!to) return <div>{inner}</div>;
  return (
    <Link to={to} params={params as never} search={search as never} className="block rounded-md py-0.5 transition-colors hover:bg-muted/60">
      {inner}
    </Link>
  );
}

export function AiCaveat({ text = "AI-assisted evaluation — subject to QA validation." }: { text?: string }) {
  return <p className="mt-2 text-[10.5px] text-muted-foreground/80">{text}</p>;
}
