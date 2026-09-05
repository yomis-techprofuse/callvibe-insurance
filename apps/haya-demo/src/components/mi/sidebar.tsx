import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  BadgeCheck,
  FileBarChart,
  Gauge,
  LayoutDashboard,
  ListTree,
  MessagesSquare,
  Settings,
  ShieldCheck,
  UserSquare2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CONFIG_LABEL, PRODUCT } from "@/data/techtar";

type NavDef = { to: string; label: string; icon: typeof Users; exact?: boolean };

const main: NavDef[] = [
  { to: "/demo", label: "Command Center", icon: LayoutDashboard, exact: true },
  { to: "/demo/conversations", label: "Conversations", icon: MessagesSquare },
  { to: "/demo/applicant-intelligence", label: "Applicant Intelligence", icon: Users },
  { to: "/demo/contact-drivers", label: "Contact Drivers", icon: ListTree },
  { to: "/demo/resolution", label: "Resolution Intelligence", icon: Gauge },
];

const secondary: NavDef[] = [
  { to: "/demo/quality", label: "Quality & QA", icon: ShieldCheck },
  { to: "/demo/agents", label: "Agents", icon: UserSquare2 },
  { to: "/demo/emerging-issues", label: "Emerging Issues", icon: AlertTriangle },
];

const tertiary: NavDef[] = [
  { to: "/demo/reports", label: "Reports", icon: FileBarChart },
  { to: "/demo/settings", label: "Settings", icon: Settings },
];

function Wordmark() {
  return (
    <Link to="/demo" className="flex items-center gap-2.5 px-4 py-4">
      <img
        src={`${import.meta.env.BASE_URL}favicon.png`}
        alt="CallVibe"
        className="h-8 w-8 shrink-0 rounded-lg object-contain"
      />
      <span className="leading-tight">
        <span className="block text-[13.5px] font-semibold tracking-tight">{PRODUCT}</span>
        <span className="block text-[10px] font-medium text-muted-foreground">Conversation Intelligence</span>
      </span>
    </Link>
  );
}

function NavItem({ to, label, icon: Icon, active }: { to: string; label: string; icon: typeof Users; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] font-medium transition-colors",
        active ? "bg-primary-soft text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function Group({ title, items, isActive }: { title: string; items: NavDef[]; isActive: (to: string, exact?: boolean) => boolean }) {
  return (
    <>
      <p className="px-2.5 pt-4 pb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{title}</p>
      <div className="space-y-0.5">
        {items.map((i) => (
          <NavItem key={i.to} to={i.to} label={i.label} icon={i.icon} active={isActive(i.to, i.exact)} />
        ))}
      </div>
    </>
  );
}

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r border-border bg-sidebar">
      <Wordmark />

      <div className="px-3 pb-1">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 py-2">
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium">{CONFIG_LABEL}</span>
        </div>
      </div>

      <nav className="scroll-slim flex-1 overflow-y-auto px-3 pb-4">
        <Group title="Operations" items={main} isActive={isActive} />
        <Group title="Intelligence" items={secondary} isActive={isActive} />
        <Group title="Workspace" items={tertiary} isActive={isActive} />
      </nav>

      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-warning-soft px-2.5 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          <span className="text-[10.5px] font-semibold tracking-wide text-warning uppercase">Demo data</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5 px-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-[10.5px] font-semibold text-primary">
            HS
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[11.5px] font-medium">Head of Support</span>
            <span className="block truncate text-[10px] text-muted-foreground">{PRODUCT}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
