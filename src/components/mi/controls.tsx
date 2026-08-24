import type { ReactNode } from "react";
import { ChevronDown, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterBar({
  children,
  onReset,
  title = "Smart Filters",
}: {
  children: ReactNode;
  onReset?: () => void;
  title?: string;
}) {
  return (
    <div className="card-surface px-4 py-3">
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">{title}</p>
        {onReset ? (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] font-medium text-primary transition-colors hover:bg-primary-soft"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap items-end gap-2">{children}</div>
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder = "Search buyer name or phone…",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative min-w-[230px] flex-1", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-full rounded-lg border border-border bg-card pr-3 pl-8 text-[12.5px] outline-none placeholder:text-muted-foreground/70 focus:border-primary"
      />
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  const active = value !== options[0];
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={cn(
          "h-8 w-full appearance-none rounded-lg border bg-card pr-7 pl-2.5 text-[12px] font-medium outline-none focus:border-primary",
          active ? "border-primary/60 bg-primary-soft text-primary" : "border-border",
        )}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === options[0] ? label : o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export function Pagination({
  page,
  pageCount,
  perPage,
  total,
  onPage,
  onPerPage,
}: {
  page: number;
  pageCount: number;
  perPage: number;
  total: number;
  onPage: (p: number) => void;
  onPerPage: (n: number) => void;
}) {
  const nums: number[] = [];
  const from = Math.max(1, Math.min(page - 2, pageCount - 4));
  for (let i = from; i <= Math.min(pageCount, from + 4); i++) nums.push(i);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-2.5">
      <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
        <span>Rows</span>
        <select
          value={perPage}
          onChange={(e) => onPerPage(Number(e.target.value))}
          className="h-7 rounded-md border border-border bg-card px-1.5 text-[11.5px] font-medium outline-none focus:border-primary"
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span>
          {total === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          className="h-7 rounded-md border border-border px-2 text-[11.5px] font-medium disabled:opacity-40 enabled:hover:bg-muted"
        >
          Prev
        </button>
        {nums.map((n) => (
          <button
            key={n}
            onClick={() => onPage(n)}
            className={cn(
              "h-7 min-w-7 rounded-md border px-2 text-[11.5px] font-medium",
              n === page ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
            )}
          >
            {n}
          </button>
        ))}
        <button
          disabled={page >= pageCount}
          onClick={() => onPage(page + 1)}
          className="h-7 rounded-md border border-border px-2 text-[11.5px] font-medium disabled:opacity-40 enabled:hover:bg-muted"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function TabBar({
  tabs,
  value,
  onChange,
}: {
  tabs: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={cn(
            "rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors",
            value === t ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
