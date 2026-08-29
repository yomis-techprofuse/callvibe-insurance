import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Bell, CalendarDays, LogOut, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AUTH_KEY } from "@/lib/auth-storage";

const titles: { match: (p: string) => boolean; title: string; subtitle: string }[] = [
  { match: (p) => p === "/", title: "Executive Dashboard", subtitle: "Destination demand, traveller intent and opportunity leakage across holiday enquiries" },
  { match: (p) => p.startsWith("/ai-insights"), title: "AI Insights", subtitle: "Cross-conversation scoring, classifications and emerging themes" },
  { match: (p) => p.startsWith("/calls"), title: "Calls", subtitle: "Every holiday enquiry call, transcribed, scored and classified" },
  { match: (p) => p.startsWith("/whatsapp"), title: "WhatsApp", subtitle: "Traveller chat intelligence, summaries and extracted next actions" },
  { match: (p) => p.startsWith("/travellers"), title: "Travellers", subtitle: "Traveller records, trip requirements, pipeline stage and next actions" },
  { match: (p) => p.startsWith("/destinations"), title: "Destinations", subtitle: "Destination demand, objections, competitor pressure and traveller mix" },
  { match: (p) => p.startsWith("/action-items"), title: "Action Items", subtitle: "AI-extracted follow-ups and operational next steps" },
  { match: (p) => p.startsWith("/sales-advisors"), title: "Sales Advisors", subtitle: "Advisor quality scores, behaviours and coaching insights" },
  { match: (p) => p.startsWith("/market-intelligence"), title: "Market Intelligence", subtitle: "Competitor mentions, traveller trends and lead-source quality" },
];

const ranges = ["Last 7 days", "Last 30 days", "Last 90 days", "Year to date"];

export function TopBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const meta = titles.find((t) => t.match(pathname)) ?? titles[0]!;
  const [range, setRange] = useState("Last 30 days");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-border bg-card/95 px-6 backdrop-blur">
      <div className="min-w-0">
        <h1 className="truncate text-[15px] leading-tight font-semibold tracking-tight">{meta.title}</h1>
        <p className="truncate text-[11.5px] text-muted-foreground">{meta.subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
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

        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-muted">
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground",
          )}
        >
          HS
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
    </header>
  );
}
