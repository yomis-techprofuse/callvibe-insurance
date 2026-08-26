import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Bell, CalendarDays, LogOut, Loader2, RefreshCw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AskCallVibe } from "./ask-callvibe";
import { AUTH_KEY } from "@/lib/auth-storage";

const titles: { match: (p: string) => boolean; title: string; subtitle: string }[] = [
  {
    match: (p) => p === "/",
    title: "Insurance Intelligence Overview",
    subtitle: "Commercial, operational and risk signals extracted from customer conversations",
  },
  {
    match: (p) => p.startsWith("/executive-intelligence"),
    title: "Executive Intelligence",
    subtitle: "Portfolio-level findings, drivers and recommended actions",
  },
  {
    match: (p) => p.startsWith("/conversations"),
    title: "Conversations",
    subtitle: "Every customer conversation classified, scored and reviewable",
  },
  {
    match: (p) => p.startsWith("/customers"),
    title: "Customers",
    subtitle: "Customer-level intelligence, policies, risk and open actions",
  },
  {
    match: (p) => p.startsWith("/action-items"),
    title: "Action Items",
    subtitle: "Recommended follow-ups extracted from conversations for human review",
  },
  {
    match: (p) => p.startsWith("/quotes"),
    title: "Quotes and Sales Intelligence",
    subtitle: "Quote demand, purchase barriers, competitor mentions and follow-up gaps",
  },
  {
    match: (p) => p.startsWith("/renewals"),
    title: "Renewals and Retention",
    subtitle: "Cancellation drivers, at-risk renewals and save opportunities",
  },
  {
    match: (p) => p.startsWith("/claims"),
    title: "Claims Experience",
    subtitle: "Claim-stage friction, repeat contact and escalation drivers",
  },
  {
    match: (p) => p.startsWith("/complaints"),
    title: "Complaints and Escalations",
    subtitle: "Potential complaint signals detected for human review",
  },
  {
    match: (p) => p.startsWith("/product-intelligence"),
    title: "Product Intelligence",
    subtitle: "Product-level demand, objections, confusion and coverage questions",
  },
  {
    match: (p) => p.startsWith("/agent-intelligence"),
    title: "Agent Intelligence",
    subtitle: "Conversation quality, customer care and coaching opportunities",
  },
  {
    match: (p) => p.startsWith("/risk-review"),
    title: "Risk and Review Queue",
    subtitle: "Detected signals requiring qualified human review",
  },
];

const ranges = ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date"];

export function TopBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const meta = titles.find((t) => t.match(pathname)) ?? titles[0]!;
  const [range, setRange] = useState("Last 30 days");
  const [refreshing, setRefreshing] = useState(false);
  const [askOpen, setAskOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-border bg-card/95 px-6 backdrop-blur">
      <div className="min-w-0">
        <h1 className="truncate text-[15px] leading-tight font-semibold tracking-tight">{meta.title}</h1>
        <p className="truncate text-[11.5px] text-muted-foreground">{meta.subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => setAskOpen(true)}
          className="hidden h-8 min-w-[280px] items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 text-left text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary-soft/40 lg:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="min-w-0 flex-1 truncate">Ask a question about your conversations…</span>
        </button>

        <div className="relative">
          <CalendarDays className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            aria-label="Date range"
            className="h-8 appearance-none rounded-lg border border-border bg-card pr-7 pl-7 text-[12px] font-medium outline-none focus:border-primary"
          >
            {ranges.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setRefreshing(true);
            setTimeout(() => setRefreshing(false), 1100);
          }}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-[12px] font-medium transition-colors hover:bg-muted"
        >
          {refreshing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          {refreshing ? "Refreshing" : "Refresh"}
        </button>

        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground",
          )}
        >
          HO
        </span>

        <button
          onClick={() => {
            localStorage.removeItem(AUTH_KEY);
            window.location.reload();
          }}
          title="Log out"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>

      <AskCallVibe open={askOpen} onClose={() => setAskOpen(false)} />
    </header>
  );
}
