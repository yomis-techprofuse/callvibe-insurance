import { useRouterState, useRouter } from "@tanstack/react-router";
import { Bell, LogOut, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { IntelligenceSearch } from "./search";
import { AUTH_KEY } from "@/lib/auth-storage";

const titles: { match: (p: string) => boolean; title: string; subtitle: string }[] = [
  { match: (p) => p === "/demo", title: "Applicant Support Command Center", subtitle: "Understand why applicants are contacting Hayya, what is driving repeat demand, and where support journeys are breaking down." },
  { match: (p) => p.startsWith("/demo/markets"), title: "Market Intelligence", subtitle: "Applicant support performance for a single market within the global operation" },
  { match: (p) => p.startsWith("/demo/languages"), title: "Language Intelligence", subtitle: "Language performance connected to contact drivers and repeat demand" },
  { match: (p) => p.startsWith("/demo/conversations"), title: "Conversations", subtitle: "Every applicant conversation, classified by driver, resolution and repeat behaviour" },
  { match: (p) => p.startsWith("/demo/applicant-intelligence"), title: "Applicant Intelligence", subtitle: "What applicants are saying across conversations, beyond the agent disposition" },
  { match: (p) => p.startsWith("/demo/contact-drivers"), title: "Contact Drivers", subtitle: "Why applicants are contacting Hayya, with root-cause analysis" },
  { match: (p) => p.startsWith("/demo/resolution"), title: "Resolution Intelligence", subtitle: "Don't just measure repeat contact — understand what creates it" },
  { match: (p) => p.startsWith("/demo/quality"), title: "Quality Intelligence", subtitle: "AI-assisted QA signals, exceptions and coaching opportunities" },
  { match: (p) => p.startsWith("/demo/agents"), title: "Agents", subtitle: "Coaching intelligence across the applicant support team" },
  { match: (p) => p.startsWith("/demo/emerging-issues"), title: "Emerging Applicant Issues", subtitle: "Newly detected issue clusters generating contact demand" },
  { match: (p) => p.startsWith("/demo/reports"), title: "Reports", subtitle: "Operational and management reporting packs" },
  { match: (p) => p.startsWith("/demo/settings"), title: "Settings", subtitle: "Workspace configuration for this demonstration environment" },
];

export function TopBar() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const meta = titles.find((t) => t.match(pathname)) ?? titles[0]!;
  const [refreshing, setRefreshing] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-border bg-card/95 px-6 backdrop-blur">
      <div className="min-w-0 shrink">
        <h1 className="truncate text-[15px] leading-tight font-semibold tracking-tight">{meta.title}</h1>
        <p className="truncate text-[11.5px] text-muted-foreground">{meta.subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <IntelligenceSearch />

        <button
          onClick={() => {
            setRefreshing(true);
            setTimeout(() => setRefreshing(false), 1100);
          }}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-[12px] font-medium transition-colors hover:bg-muted"
        >
          {refreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> : <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />}
          {refreshing ? "Refreshing" : "Refresh"}
        </button>

        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-muted">
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          HS
        </span>

        <button
          onClick={() => {
            localStorage.removeItem(AUTH_KEY);
            router.navigate({ to: "/login" });
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
