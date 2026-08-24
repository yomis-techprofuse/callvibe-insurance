import { useEffect, useState } from "react";
import { Loader2, Search, Sparkles, X } from "lucide-react";
import { ASK_SUGGESTIONS, askCallVibe, type AskAnswer } from "@/data/callvibe";
import { Pill } from "./kit";

export function AskCallVibe({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [thinking, setThinking] = useState(false);
  const [answer, setAnswer] = useState<AskAnswer | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const run = (text: string) => {
    if (!text.trim()) return;
    setQ(text);
    setThinking(true);
    setAnswer(null);
    setTimeout(() => {
      setAnswer(askCallVibe(text));
      setThinking(false);
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-6 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative z-10 mt-8 w-full max-w-[720px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-pop)]">
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run(q)}
            placeholder="Ask a question about your conversations…"
            className="h-8 min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70"
          />
          <button
            onClick={() => run(q)}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-[12px] font-medium text-primary-foreground"
          >
            <Search className="h-3.5 w-3.5" /> Ask
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="scroll-slim max-h-[70vh] overflow-y-auto bg-canvas px-4 py-4">
          {thinking ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-3 text-[12.5px] text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              Analysing 48,276 simulated conversations…
            </div>
          ) : answer ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-primary/25 bg-primary-soft px-3.5 py-3">
                <p className="text-[13px] leading-[1.55] font-semibold text-primary">{answer.headline}</p>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {answer.stats.map((s) => (
                  <div key={s.label} className="rounded-lg border border-border bg-card px-3 py-2.5">
                    <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{s.label}</p>
                    <p className="mt-1 text-[16px] leading-none font-semibold tabular-nums">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 rounded-lg border border-border bg-card px-3.5 py-3">
                {answer.body.map((b) => (
                  <p key={b} className="text-[12.5px] leading-[1.6] text-foreground/90">
                    {b}
                  </p>
                ))}
                <p className="pt-1 text-[10.5px] text-muted-foreground">
                  Generated from simulated demonstration data. Subject to human review.
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                Suggested questions
              </p>
              <div className="space-y-1.5">
                {ASK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => run(s)}
                    className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-[12.5px] transition-colors hover:border-primary/40 hover:bg-primary-soft/50"
                  >
                    <Sparkles className="h-3 w-3 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1 truncate">{s}</span>
                    <Pill tone="neutral">Ask</Pill>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
