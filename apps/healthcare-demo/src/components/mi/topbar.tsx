import { useState } from "react";
import { useRouterState, useRouter } from "@tanstack/react-router";
import { Bell, CalendarDays, LogOut, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AUTH_KEY } from "@/lib/auth-storage";

const titles: { match: (p: string) => boolean; title: string; subtitle: string }[] = [
  { match: (p) => p === "/demo", title: "Patient Access Command Centre", subtitle: "What thousands of patient conversations reveal about demand, access and unresolved need" },
  { match: (p) => p.startsWith("/demo/enquiries"), title: "Enquiries", subtitle: "Every patient enquiry across calls and WhatsApp, transcribed, classified and scored" },
  { match: (p) => p.startsWith("/demo/patient-access"), title: "Patient Access", subtitle: "Where patients are struggling to reach the right doctor, service and appointment" },
  { match: (p) => p.startsWith("/demo/patients"), title: "Patients", subtitle: "Patient-level intelligence across every interaction and channel" },
  { match: (p) => p.startsWith("/demo/action-centre"), title: "Action Centre", subtitle: "Operational actions extracted from patient conversations, prioritised by impact" },
  { match: (p) => p.startsWith("/demo/specialties"), title: "Specialties & Services", subtitle: "Demand intelligence by specialty, service, question and access barrier" },
  { match: (p) => p.startsWith("/demo/doctors"), title: "Doctors", subtitle: "Consultant demand intelligence — how often patients ask, and what stops them booking" },
  { match: (p) => p.startsWith("/demo/patient-experience"), title: "Patient Experience", subtitle: "What frustrates patients, why enquiries stay unresolved and why patients contact us again" },
  { match: (p) => p.startsWith("/demo/enquiry-team"), title: "Enquiry Team", subtitle: "How effectively the enquiry desk understands, routes and resolves patient conversations" },
];

const ranges = ["Today", "Last 7 days", "Last 30 days", "Last 90 days"];

export function TopBar() {
  const router = useRouter();
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
          PA
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
