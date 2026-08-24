import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  CheckSquare,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  MessageSquareWarning,
  Package,
  Phone,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  UserSquare2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WORKSPACE } from "@/data/callvibe";

function LogoIcon() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-[12px] font-bold tracking-tight text-primary-foreground">
      CV
    </span>
  );
}

type NavDef = { to: string; label: string; icon: typeof Phone; exact?: boolean };

const main: NavDef[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/executive-intelligence", label: "Executive Intelligence", icon: Sparkles },
  { to: "/conversations", label: "Conversations", icon: Phone },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/action-items", label: "Action Items", icon: CheckSquare },
];

const business: NavDef[] = [
  { to: "/quotes", label: "Quotes and Sales", icon: FileText },
  { to: "/renewals", label: "Renewals and Retention", icon: RefreshCcw },
  { to: "/claims", label: "Claims Experience", icon: LifeBuoy },
  { to: "/complaints", label: "Complaints and Escalations", icon: MessageSquareWarning },
];

const intelligence: NavDef[] = [
  { to: "/product-intelligence", label: "Product Intelligence", icon: Package },
  { to: "/agent-intelligence", label: "Agent Intelligence", icon: UserSquare2 },
  { to: "/risk-review", label: "Risk and Review Queue", icon: ShieldAlert },
];

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-4 py-4">
      <LogoIcon />
      <span className="leading-tight">
        <span className="block text-[13.5px] font-semibold tracking-tight">CallVibe</span>
        <span className="block text-[10px] font-medium text-muted-foreground">Insurance Conversation Intelligence</span>
      </span>
    </Link>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Phone;
  active: boolean;
}) {
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

function Group({ title, items, isActive }: { title: string; items: NavDef[]; isActive: (t: string, e?: boolean) => boolean }) {
  return (
    <>
      <p className="px-2.5 pt-4 pb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        {title}
      </p>
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
          <BarChart3 className="h-3.5 w-3.5 text-primary" />
          <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium">{WORKSPACE}</span>
        </div>
      </div>

      <nav className="scroll-slim flex-1 overflow-y-auto px-3 pb-4">
        <p className="px-2.5 pt-3 pb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Main
        </p>
        <div className="space-y-0.5">
          {main.map((i) => (
            <NavItem key={i.to} to={i.to} label={i.label} icon={i.icon} active={isActive(i.to, i.exact)} />
          ))}
        </div>

        <Group title="Business Intelligence" items={business} isActive={isActive} />
        <Group title="Intelligence" items={intelligence} isActive={isActive} />
      </nav>

      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-warning-soft px-2.5 py-2">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-warning" />
          <span className="text-[10px] leading-tight font-medium text-warning">
            Demonstration data — simulated conversations only
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-success-soft px-2.5 py-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          <span className="text-[11px] font-medium text-success">Analysis Engine Active</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5 px-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-[10.5px] font-semibold text-primary">
            HO
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[11.5px] font-medium">Head of Operations</span>
            <span className="block truncate text-[10px] text-muted-foreground">Harbour Insurance Australia</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
