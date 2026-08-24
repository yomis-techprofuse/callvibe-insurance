import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GraduationCap, UserSquare2, X } from "lucide-react";
import {
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  ScoreBar,
  TableWrap,
  Td,
  Th,
  scoreCellTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select } from "@/components/mi/controls";
import { agents, type Agent } from "@/data/callvibe";

export const Route = createFileRoute("/agent-intelligence")({
  head: () => ({
    meta: [
      { title: "Agent Intelligence — CallVibe" },
      {
        name: "description",
        content:
          "Conversation quality, retention save rate, complaint recognition and coaching opportunities for Harbour Insurance agents.",
      },
      { property: "og:title", content: "Agent Intelligence — CallVibe" },
      { property: "og:description", content: "Quality, coaching and capability signals across the agent population." },
    ],
  }),
  component: AgentIntelligencePage,
});

const TEAMS = ["All Teams", "Sales", "Retention", "Claims", "Service"];

function AgentIntelligencePage() {
  const [q, setQ] = useState("");
  const [team, setTeam] = useState("All Teams");
  const [sort, setSort] = useState("Quality Score");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sel, setSel] = useState<Agent | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = agents.filter((a) => {
      if (needle && !a.name.toLowerCase().includes(needle)) return false;
      if (team !== "All Teams" && a.team !== team) return false;
      return true;
    });
    return [...list].sort((a, b) =>
      sort === "Conversations"
        ? b.conversations - a.conversations
        : sort === "Renewal Save Rate"
          ? b.renewalSaveRate - a.renewalSaveRate
          : sort === "Complaint Recognition"
            ? b.complaintRecognition - a.complaintRecognition
            : b.quality - a.quality,
    );
  }, [q, team, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  const avg = (k: keyof Agent) => Math.round(agents.reduce((s, a) => s + (a[k] as number), 0) / agents.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricTile label="Agents Analysed" value={String(agents.length)} sub="Across four teams" />
        <MetricTile label="Average Quality Score" value={`${avg("quality")}`} sub="Out of 100" />
        <MetricTile label="Average Save Rate" value={`${avg("renewalSaveRate")}%`} sub="Illustrative retention" />
        <MetricTile label="Complaint Recognition" value={`${avg("complaintRecognition")}%`} sub="Signals acknowledged" />
        <MetricTile label="Follow-Up Completion" value={`${avg("followUpCompletion")}%`} sub="Next step confirmed" />
      </div>

      <FilterBar
        onReset={() => {
          setQ("");
          setTeam("All Teams");
          setSort("Quality Score");
          setPage(1);
        }}
      >
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search agent name…" />
        <Select label="All Teams" value={team} onChange={(v) => { setTeam(v); setPage(1); }} options={TEAMS} className="w-[170px]" />
        <Select
          label="Sort by"
          value={sort}
          onChange={setSort}
          options={["Quality Score", "Conversations", "Renewal Save Rate", "Complaint Recognition"]}
          className="w-[215px]"
        />
      </FilterBar>

      <Panel>
        <PanelHead
          title="Agent Performance"
          subtitle="Conversation-derived quality and capability indicators"
          icon={<UserSquare2 className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length} agents</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1080px] border-collapse">
            <thead>
              <tr>
                <Th>Agent</Th>
                <Th>Team</Th>
                <Th>Conversations</Th>
                <Th>Quality</Th>
                <Th>Quote Conversion</Th>
                <Th>Renewal Save Rate</Th>
                <Th>Repeat Contact</Th>
                <Th>Escalation</Th>
                <Th>Complaint Recognition</Th>
                <Th>Customer Care</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.name} onClick={() => setSel(a)} className="cursor-pointer transition-colors hover:bg-primary-soft/50">
                  <Td className="font-medium">{a.name}</Td>
                  <Td>
                    <Pill tone="classify">{a.team}</Pill>
                  </Td>
                  <Td className="tabular-nums text-muted-foreground">{a.conversations}</Td>
                  <Td className={`tabular-nums font-medium ${scoreCellTone(a.quality)}`}>{a.quality}</Td>
                  <Td className="tabular-nums text-muted-foreground">{a.quoteConversion}%</Td>
                  <Td className={`tabular-nums ${scoreCellTone(a.renewalSaveRate)}`}>{a.renewalSaveRate}%</Td>
                  <Td className="tabular-nums text-muted-foreground">{a.repeatContact}%</Td>
                  <Td className="tabular-nums text-muted-foreground">{a.escalation}%</Td>
                  <Td className={`tabular-nums ${scoreCellTone(a.complaintRecognition)}`}>{a.complaintRecognition}%</Td>
                  <Td className={`tabular-nums ${scoreCellTone(a.customerCare)}`}>{a.customerCare}%</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <Pagination
          page={current}
          pageCount={pageCount}
          perPage={perPage}
          total={filtered.length}
          onPage={setPage}
          onPerPage={(n) => {
            setPerPage(n);
            setPage(1);
          }}
        />
      </Panel>

      {sel ? (
        <>
          <button
            aria-label="Close agent panel"
            onClick={() => setSel(null)}
            className="fixed inset-0 z-40 cursor-default bg-foreground/25 backdrop-blur-[1px]"
          />
          <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col border-l border-border bg-card shadow-xl">
            <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3.5">
              <div>
                <p className="text-[14px] font-semibold tracking-tight">{sel.name}</p>
                <p className="text-[11.5px] text-muted-foreground">
                  {sel.team} team · {sel.conversations} conversations analysed
                </p>
              </div>
              <button
                onClick={() => setSel(null)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Quality Breakdown
                </p>
                <div className="space-y-2.5">
                  <ScoreBar label="Overall quality" value={sel.quality} />
                  <ScoreBar label="Quote conversion" value={sel.quoteConversion} />
                  <ScoreBar label="Renewal save rate" value={sel.renewalSaveRate} />
                  <ScoreBar label="Complaint recognition" value={sel.complaintRecognition} />
                  <ScoreBar label="Customer care handling" value={sel.customerCare} />
                  <ScoreBar label="Follow-up completion" value={sel.followUpCompletion} />
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {sel.strengths.map((s) => (
                    <Pill key={s} tone="success">
                      {s}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5" /> Coaching Opportunities
                </p>
                <ul className="space-y-2">
                  {sel.coaching.map((c) => (
                    <li key={c} className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-[12.5px]">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[11.5px] leading-relaxed text-muted-foreground">
                Quality indicators are illustrative and generated from simulated conversation analysis. Performance
                decisions remain the responsibility of qualified employees.
              </p>
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
