import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { InsightCard, MetricTile, Panel, PanelHead, Pill, intentTone, statusTone } from "@/components/mi/kit";
import { SearchBox, Select } from "@/components/mi/controls";
import { destinationNames, whatsappKpis, whatsappThreads } from "@/data/marhaba";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "WhatsApp Intelligence — CallVibe" },
      {
        name: "description",
        content:
          "Traveller WhatsApp chats analysed like calls: trip requirements, intent scoring, objections, stage classification and AI-recommended replies for GT Holidays.",
      },
      { property: "og:title", content: "WhatsApp Intelligence — CallVibe" },
      { property: "og:description", content: "Chat-based traveller intelligence with intent scoring and recommended replies." },
    ],
  }),
  component: WhatsAppPage,
});

function WhatsAppPage() {
  const [q, setQ] = useState("");
  const [project, setProject] = useState("All Destinations");
  const [activeId, setActiveId] = useState(whatsappThreads[0]?.id ?? "");

  const threads = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return whatsappThreads.filter(
      (t) =>
        (!needle || `${t.traveller} ${t.phone}`.toLowerCase().includes(needle)) &&
        (project === "All Destinations" || t.destination === project),
    );
  }, [q, project]);

  const active = whatsappThreads.find((t) => t.id === activeId) ?? threads[0] ?? whatsappThreads[0]!;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {whatsappKpis.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
        {/* Thread list */}
        <Panel className="flex flex-col">
          <PanelHead
            title="Conversations"
            subtitle={`${threads.length} chat threads`}
            icon={<MessageSquare className="h-3.5 w-3.5" />}
          />
          <div className="space-y-2 border-b border-border px-3 py-2.5">
            <SearchBox value={q} onChange={setQ} placeholder="Search traveller or number…" className="min-w-0" />
            <Select
              label="All Destinations"
              value={project}
              onChange={setProject}
              options={["All Destinations", ...destinationNames]}
              className="w-full"
            />
          </div>
          <div className="scroll-slim max-h-[620px] overflow-y-auto">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={cn(
                  "flex w-full items-start gap-2.5 border-b border-border/70 px-3 py-2.5 text-left transition-colors",
                  t.id === active.id ? "bg-primary-soft" : "hover:bg-muted/50",
                )}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-soft text-[10.5px] font-semibold text-success">
                  {t.traveller.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[12.5px] font-medium">{t.traveller}</p>
                    <span className="shrink-0 text-[10.5px] text-muted-foreground tabular-nums">{t.time}</span>
                  </div>
                  <p className="truncate text-[11.5px] text-muted-foreground">
                    {t.transcript[t.transcript.length - 1]?.text}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Pill tone={intentTone(t.intentLevel)} dot>
                      {t.intent}
                    </Pill>
                    <span className="truncate text-[10.5px] text-muted-foreground">{t.destination.replace("Marhaba ", "")}</span>
                  </div>
                </div>
              </button>
            ))}
            {threads.length === 0 ? (
              <p className="px-3 py-10 text-center text-[12.5px] text-muted-foreground">No conversations match.</p>
            ) : null}
          </div>
        </Panel>

        {/* Chat + intelligence */}
        <div className="space-y-4">
          <Panel>
            <PanelHead
              title={active.traveller}
              subtitle={`${active.phone} · ${active.destination} · Advisor ${active.advisor}`}
              right={
                <div className="flex items-center gap-1.5">
                  <Pill tone={intentTone(active.intentLevel)} dot>
                    Intent {active.intent}
                  </Pill>
                  <Pill tone="classify">{active.stage}</Pill>
                  <Pill tone={statusTone(active.outcome)}>{active.outcome}</Pill>
                </div>
              }
            />
            <div className="scroll-slim max-h-[400px] space-y-2.5 overflow-y-auto bg-canvas px-4 py-3.5">
              {active.transcript.map((m, i) => (
                <div key={i} className={cn("flex", m.speaker === "advisor" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[74%] rounded-xl border px-3 py-2",
                      m.speaker === "advisor"
                        ? "rounded-br-sm border-primary/20 bg-primary-soft"
                        : "rounded-bl-sm border-border bg-card",
                    )}
                  >
                    <p className="text-[12.5px] leading-[1.55] text-foreground/90">{m.text}</p>
                    <p className="mt-1 text-right text-[10px] text-muted-foreground tabular-nums">{m.at}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-border px-3 py-2.5">
              <input
                disabled
                placeholder="Replying is disabled in this demo prototype"
                className="h-8 flex-1 rounded-lg border border-border bg-muted/40 px-3 text-[12.5px] text-muted-foreground outline-none"
              />
              <button
                disabled
                className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-[12px] font-medium text-primary-foreground opacity-60"
              >
                <Send className="h-3.5 w-3.5" />
                Send
              </button>
            </div>
          </Panel>

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <PanelHead title="Chat Intelligence" subtitle="Extracted from this thread" icon={<Sparkles className="h-3.5 w-3.5" />} />
              <div className="grid grid-cols-2 gap-2.5 px-4 py-3.5">
                {[
                  ["Departure City", active.departureCity],
                  ["Party Size", active.party],
                  ["Budget", active.budget],
                  ["Trip Type", active.tripType],
                  ["Travel Window", active.travelWindow],
                  ["Payment", active.payment],
                  ["Objection", active.objection],
                  ["Competitor", active.competitor],
                  ["Visa", active.visa],
                  ["Itinerary", active.itinerary],
                  ["Requirements", active.requirements.join(", ")],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                    <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{l}</p>
                    <p className="mt-1 text-[12.5px] font-semibold">{v}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <PanelHead title="AI Summary & Next Reply" subtitle="Recommended by GT Holidays AI" />
              <div className="space-y-2.5 px-4 py-3.5">
                <InsightCard tone="info" title="Conversation summary" body={active.summary} meta={`${active.date} · ${active.time}`} />
                <InsightCard tone="primary" title="Recommended next action" body={active.recommendedAction} meta="Priority follow-up" />
                <InsightCard tone="warning" title="Coaching note" body={active.coaching} meta={active.advisor} />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
