import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BrandHeader } from "../components/mi/brand-header";
import { AUTH_KEY } from "../lib/auth-storage";

// Single hardcoded credential pair, checked client-side only. This is a
// lightweight access gate for a temporary client demo, not real auth — the
// password is visible in the browser's JS bundle to anyone who looks.
const CREDENTIALS = { email: "Demo@callvibe.ai", password: "Demo@123" };

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === CREDENTIALS.email.toLowerCase() && password === CREDENTIALS.password) {
      localStorage.setItem(AUTH_KEY, "1");
      router.navigate({ to: "/demo" });
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

        <form onSubmit={onSubmit} className="w-full rounded-xl border border-border bg-background p-8 shadow-sm">
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

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
