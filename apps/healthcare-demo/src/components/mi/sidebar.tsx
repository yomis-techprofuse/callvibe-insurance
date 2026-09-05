import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  CheckSquare,
  HeartPulse,
  LayoutDashboard,
  MessageSquare,
  Route as RouteIcon,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WORKSPACE } from "@/data/hospital";

type NavDef = { to: string; label: string; icon: typeof Users; exact?: boolean };

const main: NavDef[] = [
  { to: "/demo", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/demo/enquiries", label: "Enquiries", icon: MessageSquare },
  { to: "/demo/patient-access", label: "Patient Access", icon: RouteIcon },
  { to: "/demo/patients", label: "Patients", icon: UserRound },
  { to: "/demo/action-centre", label: "Action Centre", icon: CheckSquare },
];

const secondary: NavDef[] = [
  { to: "/demo/specialties", label: "Specialties & Services", icon: Stethoscope },
  { to: "/demo/doctors", label: "Doctors", icon: HeartPulse },
  { to: "/demo/patient-experience", label: "Patient Experience", icon: Activity },
  { to: "/demo/enquiry-team", label: "Enquiry Team", icon: Users },
];

function Wordmark() {
  return (
    <Link to="/demo" className="flex items-center gap-2.5 px-4 py-4">
      <img
        src={`${import.meta.env.BASE_URL}favicon.png`}
        alt="CallVibe logo"
        className="h-8 w-8 shrink-0 rounded-md"
      />
      <span className="leading-tight">
        <span className="block text-[13.5px] font-semibold tracking-tight">CallVibe</span>
        <span className="block text-[10px] font-medium text-muted-foreground">Hospital Enquiry &amp; Patient Access</span>
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
  icon: typeof Users;
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

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r border-border bg-sidebar">
      <Wordmark />

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 py-2">
          <BarChart3 className="h-3.5 w-3.5 text-primary" />
          <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium">{WORKSPACE}</span>
        </div>
      </div>

      <nav className="scroll-slim flex-1 overflow-y-auto px-3 pb-4">
        <p className="px-2.5 pt-1 pb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Operations
        </p>
        <div className="space-y-0.5">
          {main.map((i) => (
            <NavItem key={i.to} to={i.to} label={i.label} icon={i.icon} active={isActive(i.to, i.exact)} />
          ))}
        </div>

        <p className="px-2.5 pt-4 pb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Intelligence
        </p>
        <div className="space-y-0.5">
          {secondary.map((i) => (
            <NavItem key={i.to} to={i.to} label={i.label} icon={i.icon} active={isActive(i.to)} />
          ))}
        </div>
      </nav>

      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-success-soft px-2.5 py-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          <span className="text-[11px] font-medium text-success">AI Engine Active</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5 px-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-[10.5px] font-semibold text-primary">
            PA
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[11.5px] font-medium">Head of Patient Access</span>
            <span className="block truncate text-[10px] text-muted-foreground">Marhaba Multispecialty</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
