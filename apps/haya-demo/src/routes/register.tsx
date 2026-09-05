import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BrandHeader } from "../components/mi/brand-header";
import { LEAD_KEY } from "../lib/auth-storage";
import { submitLead } from "../lib/lead-form";
import { COUNTRY_CODES } from "../lib/country-codes";

function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]!.code);
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const goToLogin = () => router.navigate({ to: "/login" });

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
    await submitLead({
      name: trimmedName,
      email: email.trim(),
      phone: `${countryCode} ${digitsOnly}`,
      company: trimmedCompany,
    });
    setPending(false);
    localStorage.setItem(LEAD_KEY, "1");
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
            <Button onClick={goToLogin} className="w-full">
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

        <form onSubmit={onSubmit} className="w-full rounded-xl border border-border bg-background p-8 shadow-sm">
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
            <div className="flex gap-2">
              <select
                aria-label="Country code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="h-9 w-[7.5rem] shrink-0 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-primary"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Input
                id="lead-phone"
                type="tel"
                autoComplete="tel-national"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="mb-6 space-y-1.5">
            <Label htmlFor="lead-company">Company</Label>
            <Input id="lead-company" required value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Submitting…" : "Continue"}
          </Button>

          <button
            type="button"
            onClick={goToLogin}
            className="mt-4 w-full text-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Already have credentials? Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});
