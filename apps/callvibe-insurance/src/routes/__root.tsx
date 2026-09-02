import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useState, type FormEvent, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Sidebar } from "../components/mi/sidebar";
import { TopBar } from "../components/mi/topbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AUTH_KEY, LEAD_KEY } from "../lib/auth-storage";
import { submitLead } from "../lib/lead-form";

// Single hardcoded credential pair, checked client-side only. This is a
// lightweight access gate for a temporary client demo, not real auth — the
// password is visible in the browser's JS bundle to anyone who looks.
const CREDENTIALS = { email: "Demo@callvibe.ai", password: "Demo@123" };

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === CREDENTIALS.email.toLowerCase() && password === CREDENTIALS.password) {
      localStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-12rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative w-full max-w-sm">
        <BrandHeader />

        <form
          onSubmit={onSubmit}
          className="w-full rounded-xl border border-border bg-background p-8 shadow-sm"
        >
          <h1 className="mb-6 text-lg font-semibold text-foreground">Sign in</h1>

          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

          <div className="mb-4 space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6 space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="mb-6 flex flex-col items-center text-center">
      <img
        src={`${import.meta.env.BASE_URL}favicon.png`}
        alt="CallVibe logo"
        className="mb-3 h-12 w-12 rounded-xl shadow-sm"
      />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">CallVibe</span>
      <span className="text-[11.5px] font-medium text-muted-foreground">Insurance Conversation Intelligence</span>
    </div>
  );
}

function LeadForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    const digitsOnly = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (digitsOnly.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (trimmedCompany.length < 2) {
      setError("Please enter your company name.");
      return;
    }

    setError("");
    setPending(true);
    await submitLead({ name: trimmedName, email: email.trim(), phone: phone.trim(), company: trimmedCompany });
    setPending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-12rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative w-full max-w-sm">
          <BrandHeader />
          <div className="w-full rounded-xl border border-border bg-background p-8 text-center shadow-sm">
            <h1 className="mb-2 text-lg font-semibold text-foreground">Request received</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Your login credentials have been sent to your email.
            </p>
            <Button onClick={onSuccess} className="w-full">
              Continue to sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-12rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative w-full max-w-sm">
        <BrandHeader />

        <form
          onSubmit={onSubmit}
          className="w-full rounded-xl border border-border bg-background p-8 shadow-sm"
        >
          <h1 className="mb-1 text-lg font-semibold text-foreground">Request access</h1>
          <p className="mb-6 text-sm text-muted-foreground">Tell us a bit about yourself to continue.</p>

          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

          <div className="mb-4 space-y-1.5">
            <Label htmlFor="lead-name">Name</Label>
            <Input id="lead-name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label htmlFor="lead-email">Email</Label>
            <Input
              id="lead-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 space-y-1.5">
            <Label htmlFor="lead-phone">Phone</Label>
            <Input
              id="lead-phone"
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-6 space-y-1.5">
            <Label htmlFor="lead-company">Company</Label>
            <Input
              id="lead-company"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Submitting…" : "Continue"}
          </Button>

          <button
            type="button"
            onClick={onSuccess}
            className="mt-4 w-full text-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Already have credentials? Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

function LoginGate({ children }: { children: ReactNode }) {
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [authed, setAuthed] = useState(false);

  // Runs client-only, before paint — avoids a hydration mismatch (server
  // always renders unauthenticated) while still avoiding a visible flash
  // for a returning, already-authenticated visitor.
  useLayoutEffect(() => {
    if (localStorage.getItem(LEAD_KEY) === "1") setLeadCaptured(true);
    if (localStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  const markLeadCaptured = () => {
    localStorage.setItem(LEAD_KEY, "1");
    setLeadCaptured(true);
  };

  if (!leadCaptured) return <LeadForm onSuccess={markLeadCaptured} />;
  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />;
  return <>{children}</>;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-lg font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-[13px] text-muted-foreground">
          This screen isn&apos;t part of the CallVibe demo.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">This page didn&apos;t load</h1>
        <p className="mt-2 text-[13px] text-muted-foreground">
          Something went wrong. You can try refreshing or head back to the dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-card px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CallVibe — Insurance Conversation Intelligence" },
      {
        name: "description",
        content:
          "CallVibe turns every Harbour Insurance customer conversation into structured intelligence: quotes, renewals, claims experience, complaint signals and next actions.",
      },
      { name: "author", content: "Harbour Insurance Australia" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginGate>
        <div className="min-h-screen bg-canvas">
          <Sidebar />
          <div className="pl-[240px]">
            <TopBar />
            <main className="px-6 py-5">
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </main>
          </div>
        </div>
      </LoginGate>
    </QueryClientProvider>
  );
}
