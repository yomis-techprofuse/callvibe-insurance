import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Users, X } from "lucide-react";
import {
  EmptyRow,
  InsightCard,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  TableWrap,
  Td,
  Th,
  intentTone,
  statusTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select } from "@/components/mi/controls";
import { advisors, travellers, destinationNames, type Traveller } from "@/data/marhaba";

export const Route = createFileRoute("/travellers")({
  head: () => ({
    meta: [
      { title: "Travellers — CallVibe" },
      {
        name: "description",
        content:
          "Unified traveller records for GT Holidays: pipeline status, intent score, destination, trip type, party mix, budget, requirements and next actions.",
      },
      { property: "og:title", content: "Travellers — CallVibe" },
      { property: "og:description", content: "Every traveller with AI status, intent score and full conversation history." },
    ],
  }),
  component: BuyersPage,
});

const AI_STATUSES = [
  "All AI Statuses",
  "New / Cold",
  "Attempting Contact",
  "Connected / Warm",
  "Qualified",
  "Itinerary Shared",
  "Quote Negotiation",
  "Booking Ready",
  "Nurturing",
  "Lost",
];

function BuyersPage() {
  const [q, setQ] = useState("");
  const [project, setProject] = useState("All Destinations");
  const [status, setStatus] = useState(AI_STATUSES[0]!);
  const [intent, setIntent] = useState("All Intent Levels");
  const [advisor, setAdvisor] = useState("All Advisors");
  const [type, setType] = useState("All Trip Types");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [open, setOpen] = useState<Traveller | null>(null);

  const reset = () => {
    setQ("");
    setProject("All Destinations");
    setStatus(AI_STATUSES[0]!);
    setIntent("All Intent Levels");
    setAdvisor("All Advisors");
    setType("All Trip Types");
    setPage(1);
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return travellers.filter((b) => {
      if (needle && !`${b.name} ${b.phone} ${b.id}`.toLowerCase().includes(needle)) return false;
      if (project !== "All Destinations" && b.destination !== project) return false;
      if (status !== AI_STATUSES[0] && b.aiStatus !== status) return false;
      if (intent !== "All Intent Levels" && b.intentLevel !== intent.replace(" Intent", "")) return false;
      if (advisor !== "All Advisors" && b.advisor !== advisor) return false;
      if (type !== "All Trip Types" && b.tripType !== type) return false;
      return true;
    });
  }, [q, project, status, intent, advisor, type]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Travellers in View" value={filtered.length.toLocaleString()} sub={`of ${travellers.length} records`} />
        <MetricTile label="Booking Ready" value={String(travellers.filter((b) => b.aiStatus === "Booking Ready").length)} sub="AI classified" />
        <MetricTile label="Itinerary Shared" value={String(travellers.filter((b) => b.aiStatus === "Itinerary Shared").length)} sub="AI classified" />
        <MetricTile label="Qualified" value={String(travellers.filter((b) => b.aiStatus === "Qualified").length)} sub="AI classified" />
        <MetricTile label="Nurturing" value={String(travellers.filter((b) => b.aiStatus === "Nurturing").length)} sub="Long-cycle travellers" />
        <MetricTile label="High Intent" value={String(travellers.filter((b) => b.intentLevel === "High").length)} sub="Score 75+" />
      </div>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search traveller name, phone or ID…" />
        <Select label="All Destinations" value={project} onChange={(v) => { setProject(v); setPage(1); }} options={["All Destinations", ...destinationNames]} className="w-[180px]" />
        <Select label="All AI Statuses" value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={AI_STATUSES} className="w-[165px]" />
        <Select label="All Intent Levels" value={intent} onChange={(v) => { setIntent(v); setPage(1); }} options={["All Intent Levels", "High Intent", "Medium Intent", "Low Intent"]} className="w-[150px]" />
        <Select label="All Advisors" value={advisor} onChange={(v) => { setAdvisor(v); setPage(1); }} options={["All Advisors", ...advisors.map((a) => a.name)]} className="w-[150px]" />
        <Select label="All Trip Types" value={type} onChange={(v) => { setType(v); setPage(1); }} options={["All Trip Types", "Investor", "Existing Investor", "End User", "First-Time Traveller", "Undecided"]} className="w-[160px]" />
      </FilterBar>

      <Panel>
        <PanelHead
          title="Traveller Records"
          subtitle="Click any traveller to open the full intelligence profile"
          icon={<Users className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} travellers</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1160px] border-collapse">
            <thead>
              <tr>
                <Th>Traveller</Th>
                <Th>Destination</Th>
                <Th>AI Status</Th>
                <Th>Intent</Th>
                <Th>Party</Th>
                <Th>Budget</Th>
                <Th>Trip Type</Th>
                <Th>Departure City</Th>
                <Th>Chats</Th>
                <Th>Advisor</Th>
                <Th>Next Action</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} onClick={() => setOpen(b)} className="cursor-pointer transition-colors hover:bg-primary-soft/50">
                  <Td>
                    <p className="font-medium">{b.name}</p>
                    <p className="text-[11px] text-muted-foreground tabular-nums">{b.phone}</p>
                  </Td>
                  <Td className="text-muted-foreground">{b.destination.replace("Marhaba ", "")}</Td>
                  <Td>
                    <Pill tone={statusTone(b.aiStatus)}>{b.aiStatus}</Pill>
                  </Td>
                  <Td>
                    <Pill tone={intentTone(b.intentLevel)} dot>
                      {b.intent}
                    </Pill>
                  </Td>
                  <Td>{b.party}</Td>
                  <Td className="tabular-nums">{b.budget}</Td>
                  <Td className="text-muted-foreground">{b.tripType}</Td>
                  <Td className="text-muted-foreground">{b.departureCity}</Td>
                  <Td className="tabular-nums">{b.conversations}</Td>
                  <Td>{b.advisor}</Td>
                  <Td className="max-w-[220px] truncate text-muted-foreground">{b.nextAction}</Td>
                </tr>
              ))}
              {rows.length === 0 ? <EmptyRow span={11} /> : null}
            </tbody>
          </table>
        </TableWrap>
        <Pagination
          page={current}
          pageCount={pageCount}
          perPage={perPage}
          total={filtered.length}
          onPage={setPage}
          onPerPage={(n) => { setPerPage(n); setPage(1); }}
        />
      </Panel>

      {open ? <BuyerDrawer traveller={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}

function BuyerDrawer({ traveller, onClose }: { traveller: Traveller; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/35 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <aside className="relative z-10 flex h-full w-full max-w-[560px] flex-col border-l border-border bg-card shadow-[var(--shadow-pop)]">
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-semibold tracking-tight">{traveller.name}</h2>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">
              {traveller.id} · {traveller.phone} · Created {traveller.created}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
            aria-label="Close traveller profile"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/30 px-5 py-2.5">
          <Pill tone={statusTone(traveller.aiStatus)} dot>
            {traveller.aiStatus}
          </Pill>
          <Pill tone={intentTone(traveller.intentLevel)}>Intent {traveller.intent}</Pill>
          <Pill tone="primary">{traveller.tripType}</Pill>
          <Pill tone="info">{traveller.source}</Pill>
          <Pill tone="neutral">{traveller.departureCity}</Pill>
        </div>

        <div className="scroll-slim flex-1 space-y-4 overflow-y-auto bg-canvas p-4">
          <Panel>
            <PanelHead title="AI Traveller Summary" />
            <div className="px-4 py-3">
              <p className="text-[12.5px] leading-[1.6] text-foreground/90">{traveller.summary}</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 border-t border-border px-4 py-3">
              {[
                ["Destination", traveller.destination],
                ["Departure City", traveller.departureCity],
                ["Trip Type", traveller.tripType],
                ["Visa", traveller.visa],
                ["Party Size", traveller.party],
                ["Budget", traveller.budget],
                ["Travel Window", traveller.travelWindow],
                ["Payment", traveller.payment],
                ["Advisor", traveller.advisor],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{l}</p>
                  <p className="mt-1 text-[12.5px] font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Topics, Objections & Competitors" />
            <div className="space-y-2.5 px-4 py-3.5">
              <div className="flex flex-wrap gap-1.5">
                {traveller.topics.map((t) => (
                  <Pill key={t} tone="info">
                    {t}
                  </Pill>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {traveller.objections.map((t, i) => (
                  <Pill key={t + i} tone="danger">
                    {t}
                  </Pill>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {traveller.competitors.map((t) => (
                  <Pill key={t} tone="classify">
                    Compared with {t}
                  </Pill>
                ))}
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Conversation Timeline" subtitle={`${traveller.conversations} touchpoints`} />
            <div className="space-y-3 px-4 py-3.5">
              {traveller.timeline_events.map((e, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    {i < traveller.timeline_events.length - 1 ? <span className="mt-1 w-px flex-1 bg-border" /> : null}
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center gap-2">
                      <Pill tone={e.type === "Itinerary" ? "success" : e.type === "WhatsApp" ? "info" : "neutral"}>
                        {e.type}
                      </Pill>
                      <span className="text-[10.5px] text-muted-foreground tabular-nums">{e.at}</span>
                    </div>
                    <p className="mt-1 text-[12px] leading-[1.55] text-foreground/90">{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHead
              title="Action Items"
              right={
                <Link to="/action-items" className="text-[11.5px] font-medium text-primary hover:underline">
                  All actions
                </Link>
              }
            />
            <div className="space-y-1.5 px-4 py-3.5">
              {traveller.actions.map((a) => (
                <div key={a.text} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                  <span className="min-w-0 flex-1 truncate text-[12px]">{a.text}</span>
                  <span className="shrink-0 text-[10.5px] text-muted-foreground tabular-nums">{a.due}</span>
                  <Pill tone={statusTone(a.status)}>{a.status}</Pill>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Notes" />
            <div className="space-y-2.5 px-4 py-3.5">
              {traveller.notes.map((n, i) =>
                n.auto ? (
                  <InsightCard key={i} tone="primary" title="Marhaba AI note" body={n.text} meta={n.at} />
                ) : (
                  <div key={i} className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                    <p className="text-[12px] leading-[1.55]">{n.text}</p>
                    <p className="mt-1 text-[10.5px] text-muted-foreground">
                      {n.author} · {n.at}
                    </p>
                  </div>
                ),
              )}
            </div>
          </Panel>
        </div>
      </aside>
    </div>
  );
}
