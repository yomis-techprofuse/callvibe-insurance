import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { searchExamples, type SearchAnswer } from "@/data/techtar";

export function IntelligenceSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<SearchAnswer | null>(null);

  const suggestions = searchExamples.filter((s) =>
    query.trim() ? s.q.toLowerCase().includes(query.trim().toLowerCase()) : true,
  );

  const run = (s: SearchAnswer) => {
    setQuery(s.q);
    setAnswer(s);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden h-8 w-[300px] items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 text-left text-[12px] text-muted-foreground transition-colors hover:bg-muted lg:flex"
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">Ask TechTar about your applicant conversations...</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/25 px-4 pt-[10vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="card-surface w-full max-w-2xl overflow-hidden shadow-pop" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setAnswer(null);
                }}
                placeholder="Ask TechTar about your applicant conversations..."
                className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
              />
              <button onClick={() => setOpen(false)} className="rounded-md p-1 text-muted-foreground hover:bg-muted">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="scroll-slim max-h-[60vh] overflow-y-auto p-3">
              {answer ? (
                <div className="rounded-lg border border-border bg-primary-soft/40 p-3.5">
                  <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">Illustrative demo answer</p>
                  <p className="mt-1.5 text-[13px] leading-[1.55] font-medium">{answer.answer}</p>
                  <ul className="mt-2.5 space-y-1">
                    {answer.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[12px] text-muted-foreground">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={answer.to}
                    params={answer.params as never}
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline"
                  >
                    {answer.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : null}

              <p className="px-1 pt-3 pb-1.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                Example questions
              </p>
              <div className="space-y-1">
                {suggestions.map((s) => (
                  <button
                    key={s.q}
                    onClick={() => run(s)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-[12.5px] transition-colors hover:bg-muted"
                  >
                    <span className="truncate">{s.q}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </button>
                ))}
                {suggestions.length === 0 ? (
                  <p className="px-2.5 py-6 text-center text-[12px] text-muted-foreground">
                    No demo answer is configured for that question yet. Try one of the example questions.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
