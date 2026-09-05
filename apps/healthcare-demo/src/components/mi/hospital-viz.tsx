import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ArrowDown, Check, CircleDot, Info } from "lucide-react";
import { Pill, type Tone } from "./kit";

/* ------------------------------------------------------------------ */
/* Patient Access Funnel                                               */
/* ------------------------------------------------------------------ */

export function AccessFunnel({
  steps,
  tail,
  onStep,
}: {
  steps: { label: string; value: number; note: string }[];
  tail?: { label: string; value: number; note: string };
  onStep?: (label: string) => void;
}) {
  const top = steps[0]!.value;
  return (
    <div className="space-y-1.5">
      {steps.map((s, i) => {
        const pct = (s.value / top) * 100;
        const prev = i === 0 ? null : steps[i - 1]!;
        const drop = prev ? prev.value - s.value : 0;
        return (
          <div key={s.label}>
            <button
              type="button"
              onClick={() => onStep?.(s.label)}
              className="group w-full text-left"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-muted/25 transition-colors group-hover:border-primary/40">
                <div
                  className="absolute inset-y-0 left-0 bg-primary/10 transition-all group-hover:bg-primary/15"
                  style={{ width: `${Math.max(14, pct)}%` }}
                />
                <div className="relative flex items-center justify-between gap-3 px-3.5 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold">{s.label}</p>
                    <p className="truncate text-[10.5px] text-muted-foreground">{s.note}</p>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-2">
                    <span className="text-[17px] leading-none font-semibold tabular-nums">
                      {s.value.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10.5px] font-medium text-muted-foreground tabular-nums">
                      {Math.round(pct)}%
                    </span>
                  </div>
                </div>
              </div>
            </button>
            {i < steps.length - 1 ? (
              <div className="flex items-center gap-1.5 py-0.5 pl-3.5">
                <ArrowDown className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10.5px] text-muted-foreground">
                  {steps[i + 1]!.value.toLocaleString("en-IN")} continue ·{" "}
                  <span className="font-medium text-danger">
                    {(s.value - steps[i + 1]!.value).toLocaleString("en-IN")} drop off
                  </span>
                </span>
              </div>
            ) : null}
            {i === 0 && drop ? null : null}
          </div>
        );
      })}

      {tail ? (
        <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-danger/30 bg-danger-soft px-3.5 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-semibold text-danger">{tail.label}</p>
            <p className="truncate text-[10.5px] text-danger/80">{tail.note}</p>
          </div>
          <span className="shrink-0 text-[17px] leading-none font-semibold tabular-nums text-danger">
            {tail.value.toLocaleString("en-IN")}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function ObservedNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-info/25 bg-info-soft px-3 py-2">
      <Info className="mt-[1px] h-3.5 w-3.5 shrink-0 text-info" />
      <p className="text-[11px] leading-[1.5] text-info">{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Access Friction Matrix                                              */
/* ------------------------------------------------------------------ */

function frictionClass(v: number) {
  if (v >= 30) return "bg-danger text-white";
  if (v >= 24) return "bg-danger-soft text-danger";
  if (v >= 18) return "bg-warning-soft text-warning";
  if (v >= 13) return "bg-info-soft text-info";
  return "bg-muted text-muted-foreground";
}

export function FrictionMatrix({
  columns,
  rows,
  onCell,
}: {
  columns: string[];
  rows: { specialty: string; values: number[] }[];
  onCell?: (specialty: string, column: string) => void;
}) {
  return (
    <div className="scroll-slim overflow-x-auto">
      <table className="w-full min-w-[720px] border-separate border-spacing-[3px]">
        <thead>
          <tr>
            <th className="w-[150px] px-2 py-1.5 text-left text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase">
              Specialty
            </th>
            {columns.map((c) => (
              <th
                key={c}
                className="px-2 py-1.5 text-center text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.specialty}>
              <td className="px-2 py-1.5 text-[12px] font-medium whitespace-nowrap">{r.specialty}</td>
              {r.values.map((v, i) => (
                <td key={columns[i]}>
                  <button
                    type="button"
                    onClick={() => onCell?.(r.specialty, columns[i]!)}
                    className={cn(
                      "flex h-9 w-full items-center justify-center rounded-md text-[12px] font-semibold tabular-nums transition-transform hover:scale-[1.04]",
                      frictionClass(v),
                    )}
                    title={`${r.specialty} · ${columns[i]} · ${v}% of blocked enquiries`}
                  >
                    {v}%
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex flex-wrap items-center gap-3 px-2">
        <span className="text-[10.5px] text-muted-foreground">Share of blocked enquiries</span>
        {[
          { l: "<13%", c: "bg-muted" },
          { l: "13–17%", c: "bg-info-soft" },
          { l: "18–23%", c: "bg-warning-soft" },
          { l: "24–29%", c: "bg-danger-soft" },
          { l: "30%+", c: "bg-danger" },
        ].map((s) => (
          <span key={s.l} className="flex items-center gap-1.5">
            <span className={cn("h-2.5 w-4 rounded-sm", s.c)} />
            <span className="text-[10.5px] text-muted-foreground">{s.l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Patient Access Journey (per enquiry)                                */
/* ------------------------------------------------------------------ */

export function AccessJourney({
  stages,
  current,
}: {
  stages: readonly string[];
  current: string;
}) {
  const idx = stages.indexOf(current);
  return (
    <div className="scroll-slim flex items-start gap-0 overflow-x-auto pb-1">
      {stages.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={s} className="flex min-w-[132px] flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <span className={cn("h-[2px] flex-1", i === 0 ? "bg-transparent" : done || active ? "bg-primary" : "bg-border")} />
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-semibold",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : active
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3 w-3" /> : active ? <CircleDot className="h-3 w-3" /> : i + 1}
              </span>
              <span
                className={cn("h-[2px] flex-1", i === stages.length - 1 ? "bg-transparent" : done ? "bg-primary" : "bg-border")}
              />
            </div>
            <p
              className={cn(
                "mt-1.5 px-1 text-center text-[10.5px] leading-[1.35]",
                active ? "font-semibold text-primary" : done ? "text-foreground/80" : "text-muted-foreground",
              )}
            >
              {s}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reason breakdown (clickable)                                        */
/* ------------------------------------------------------------------ */

export function ReasonBars({
  items,
  active,
  onSelect,
}: {
  items: { label: string; value: number; color: string }[];
  active?: string | null;
  onSelect?: (label: string) => void;
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className="space-y-2">
      {items.map((i) => (
        <button
          key={i.label}
          type="button"
          onClick={() => onSelect?.(i.label)}
          className={cn(
            "group w-full rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted/60",
            active === i.label && "bg-primary-soft",
          )}
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className={cn("truncate text-[12px]", active === i.label ? "font-semibold text-primary" : "text-foreground/90")}>
              {i.label}
            </span>
            <span className="text-[11.5px] font-semibold tabular-nums">{i.value}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.max(4, (i.value / max) * 100)}%`, background: i.color }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Attention widget                                                    */
/* ------------------------------------------------------------------ */

export function AttentionRow({
  value,
  text,
  tone,
  onClick,
}: {
  value: number;
  text: string;
  tone: Tone;
  onClick?: () => void;
}) {
  const toneRing: Record<string, string> = {
    danger: "border-danger/30 bg-danger-soft text-danger",
    warning: "border-warning/30 bg-warning-soft text-warning",
    info: "border-info/30 bg-info-soft text-info",
    primary: "border-primary/30 bg-primary-soft text-primary",
    success: "border-success/30 bg-success-soft text-success",
    classify: "border-classify/30 bg-classify-soft text-classify",
    neutral: "border-border bg-muted text-muted-foreground",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
    >
      <span
        className={cn(
          "flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border text-[16px] font-semibold tabular-nums",
          toneRing[tone],
        )}
      >
        {value}
      </span>
      <span className="min-w-0 flex-1 text-[12px] leading-[1.45] text-foreground/90">{text}</span>
      <Pill tone={tone}>Review</Pill>
    </button>
  );
}
