import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";

export type Tone = "primary" | "success" | "warning" | "danger" | "info" | "classify" | "neutral";

const toneText: Record<Tone, string> = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  classify: "text-classify",
  neutral: "text-muted-foreground",
};

const toneBg: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  classify: "bg-classify-soft text-classify",
  neutral: "bg-muted text-muted-foreground",
};

const toneFill: Record<Tone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  classify: "bg-classify",
  neutral: "bg-muted-foreground",
};

export function Panel({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("card-surface", className)} {...rest}>
      {children}
    </div>
  );
}

export function PanelHead({
  title,
  subtitle,
  right,
  icon,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3 border-b border-border px-4 py-3", className)}>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon ? <span className="text-primary">{icon}</span> : null}
          <h3 className="truncate text-[13px] font-semibold tracking-tight">{title}</h3>
        </div>
        {subtitle ? <p className="mt-0.5 text-[11.5px] text-muted-foreground">{subtitle}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
  dot,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-[3px] text-[11px] font-medium whitespace-nowrap",
        toneBg[tone],
        className,
      )}
    >
      {dot ? <span className={cn("h-1.5 w-1.5 rounded-full", toneFill[tone])} /> : null}
      {children}
    </span>
  );
}

export function intentTone(level: string): Tone {
  return level === "High" ? "success" : level === "Medium" ? "warning" : "neutral";
}

export function sentimentTone(s: string): Tone {
  return s === "Positive" ? "success" : s === "Neutral" ? "warning" : "danger";
}

export function statusTone(s: string): Tone {
  switch (s) {
    case "Booking Ready":
    case "Booking Intent":
    case "Booking Confirmed":
    case "Done":
      return "success";
    case "Quote Negotiation":
    case "Itinerary Requested":
    case "Itinerary Shared":
    case "Itinerary Sent":
    case "Qualified":
      return "primary";
    case "Connected / Warm":
    case "Hotel Options Shared":
    case "Post-Booking":
    case "Information Sent":
    case "In Progress":
    case "Follow-Up Scheduled":
      return "info";
    case "Nurturing":
    case "Attempting Contact":
    case "Discussing with Family":
    case "Revised Quote Requested":
    case "Negotiation":
    case "Pending":
      return "warning";
    case "Lost":
    case "Lost / Booked Elsewhere":
    case "Lost / No Interest":
    case "Overdue":
      return "danger";
    default:
      return "classify";
  }
}

export function KpiCard({
  label,
  value,
  delta,
  up,
  tone = "primary",
  sub,
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  tone?: Tone;
  sub?: string;
  icon?: ReactNode;
}) {
  return (
    <Panel className="px-4 py-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11.5px] font-medium text-muted-foreground">{label}</p>
        {icon ? <span className={cn("rounded-md p-1", toneBg[tone])}>{icon}</span> : null}
      </div>
      <p className="mt-2 text-[22px] leading-none font-semibold tracking-tight tabular-nums">{value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-[11px] font-semibold",
              up ? "text-success" : "text-danger",
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        ) : null}
        {sub ? <span className="text-[11px] text-muted-foreground">{sub}</span> : null}
      </div>
    </Panel>
  );
}

export function MetricTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Panel className="px-3.5 py-3">
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-[17px] leading-none font-semibold tabular-nums">{value}</p>
      {sub ? <p className="mt-1.5 text-[10.5px] text-muted-foreground">{sub}</p> : null}
    </Panel>
  );
}

export function HBarList({
  items,
  suffix,
  tone = "primary",
  max,
}: {
  items: { label: string; value: number }[];
  suffix?: string;
  tone?: Tone;
  max?: number;
}) {
  const top = max ?? Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-2.5">
      {items.map((i) => (
        <div key={i.label} className="group">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[12px] text-foreground/90">{i.label}</span>
            <span className="text-[11.5px] font-semibold tabular-nums text-muted-foreground">
              {i.value.toLocaleString()}
              {suffix}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full transition-all", toneFill[tone])}
              style={{ width: `${Math.max(3, (i.value / top) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScoreBar({ label, value, outOf = 100 }: { label: string; value: number; outOf?: number }) {
  const pct = (value / outOf) * 100;
  const tone: Tone = pct >= 80 ? "success" : pct >= 65 ? "primary" : pct >= 50 ? "warning" : "danger";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[12px] text-foreground/90">{label}</span>
        <span className={cn("text-[11.5px] font-semibold tabular-nums", toneText[tone])}>
          {outOf === 10 ? `${value}/10` : `${value}%`}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", toneFill[tone])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function InsightCard({
  tone,
  title,
  body,
  meta,
}: {
  tone: Tone;
  title: string;
  body: string;
  meta?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3.5 py-3 transition-shadow hover:shadow-card">
      <div className="flex items-start gap-2.5">
        <span className={cn("mt-0.5 rounded-md p-1", toneBg[tone])}>
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold tracking-tight">{title}</p>
          <p className="mt-1 text-[12px] leading-[1.55] text-muted-foreground">{body}</p>
          {meta ? <p className="mt-1.5 text-[10.5px] font-medium text-muted-foreground/80">{meta}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function scoreCellTone(v: number): string {
  if (v >= 85) return "bg-success-soft text-success";
  if (v >= 75) return "bg-info-soft text-info";
  if (v >= 65) return "bg-warning-soft text-warning";
  return "bg-danger-soft text-danger";
}

export function TableWrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("scroll-slim overflow-x-auto", className)}>{children}</div>;
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "border-b border-border bg-muted/40 px-3 py-2 text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase whitespace-nowrap",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <td className={cn("border-b border-border/70 px-3 py-2.5 text-[12.5px] align-middle", className)}>{children}</td>
  );
}

export function EmptyRow({ span, text = "No records match the current filters." }: { span: number; text?: string }) {
  return (
    <tr>
      <td colSpan={span} className="px-3 py-10 text-center text-[12.5px] text-muted-foreground">
        {text}
      </td>
    </tr>
  );
}
