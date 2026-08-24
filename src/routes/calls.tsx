import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Clock, Phone, Sparkles } from "lucide-react";
import {
  EmptyRow,
  MetricTile,
  Panel,
  PanelHead,
  Pill,
  TableWrap,
  Td,
  Th,
  intentTone,
  sentimentTone,
  statusTone,
} from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select, TabBar } from "@/components/mi/controls";
import { CallDetailsModal } from "@/components/mi/call-details-modal";
import { advisors, phoneCalls, projectNames, type Call } from "@/data/marhaba";

export const Route = createFileRoute("/calls")({
  head: () => ({
    meta: [
      { title: "Buyer Calls — Marhaba Intelligence" },
      {
        name: "description",
        content:
          "Every buyer call analysed: intent score, buyer stage, objections, competitor mentions, AI summary and full transcript.",
      },
      { property: "og:title", content: "Buyer Calls — Marhaba Intelligence" },
      { property: "og:description", content: "AI-analysed buyer calls with intent scoring and full transcripts." },
    ],
  }),
  component: CallsPage,
});

const TABS = ["All Calls", "High Intent", "Site Visit Signals", "Objections Raised", "Competitor Mentioned"];

function CallsPage() {
  const [tab, setTab] = useState(TABS[0]!);
  const [q, setQ] = useState("");
  const [project, setProject] = useState("All Projects");
  const [advisor, setAdvisor] = useState("All Advisors");
  const [intent, setIntent] = useState("All Intent Levels");
  const [stage, setStage] = useState("All Stages");
  const [direction, setDirection] = useState("All Directions");
  const [sentiment, setSentiment] = useState("All Sentiment");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState<Call | null>(null);

  const reset = () => {
    setQ("");
    setProject("All Projects");
    setAdvisor("All Advisors");
    setIntent("All Intent Levels");
    setStage("All Stages");
    setDirection("All Directions");
    setSentiment("All Sentiment");
    setTab(TABS[0]!);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return phoneCalls.filter((c) => {
      if (needle && !`${c.buyer} ${c.phone} ${c.id}`.toLowerCase().includes(needle)) return false;
      if (project !== "All Projects" && c.project !== project) return false;
      if (advisor !== "All Advisors" && c.advisor !== advisor) return false;
      if (intent !== "All Intent Levels" && c.intentLevel !== intent.replace(" Intent", "")) return false;
      if (stage !== "All Stages" && c.stage !== stage) return false;
      if (direction !== "All Directions" && c.direction !== direction) return false;
      if (sentiment !== "All Sentiment" && c.sentiment !== sentiment) return false;
      if (tab === "High Intent" && c.intentLevel !== "High") return false;
      if (tab === "Site Visit Signals" && c.siteVisit === "Not raised") return false;
      if (tab === "Objections Raised" && (c.objection === "—" || c.objection === "None")) return false;
      if (tab === "Competitor Mentioned" && c.competitor === "—") return false;
      return true;
    });
  }, [q, project, advisor, intent, stage, direction, sentiment, tab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);

  const highIntent = filtered.filter((c) => c.intentLevel === "High").length;
  const siteVisits = filtered.filter((c) => c.siteVisit !== "Not raised").length;
  const competitors = filtered.filter((c) => c.competitor !== "—").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Calls in View" value={filtered.length.toLocaleString()} sub={`of ${phoneCalls.length} analysed`} />
        <MetricTile label="High Intent" value={String(highIntent)} sub="Intent score 75+" />
        <MetricTile label="Site Visit Signals" value={String(siteVisits)} sub="Requested or confirmed" />
        <MetricTile label="Competitor Mentions" value={String(competitors)} sub="Named developer discussed" />
      </div>

      <FilterBar onReset={reset}>
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search buyer, phone or call ID…" />
        <Select label="All Projects" value={project} onChange={(v) => { setProject(v); setPage(1); }} options={["All Projects", ...projectNames]} className="w-[180px]" />
        <Select label="All Advisors" value={advisor} onChange={(v) => { setAdvisor(v); setPage(1); }} options={["All Advisors", ...advisors.map((a) => a.name)]} className="w-[150px]" />
        <Select label="All Intent Levels" value={intent} onChange={(v) => { setIntent(v); setPage(1); }} options={["All Intent Levels", "High Intent", "Medium Intent", "Low Intent"]} className="w-[150px]" />
        <Select label="All Stages" value={stage} onChange={(v) => { setStage(v); setPage(1); }} options={["All Stages", "Enquiry", "Qualification", "Consideration", "Site Visit", "Negotiation", "Booking"]} className="w-[145px]" />
        <Select label="All Directions" value={direction} onChange={(v) => { setDirection(v); setPage(1); }} options={["All Directions", "Inbound", "Outbound"]} className="w-[135px]" />
        <Select label="All Sentiment" value={sentiment} onChange={(v) => { setSentiment(v); setPage(1); }} options={["All Sentiment", "Positive", "Neutral", "Negative"]} className="w-[135px]" />
      </FilterBar>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={TABS} value={tab} onChange={(v) => { setTab(v); setPage(1); }} />
        <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Click any row to open the full AI call analysis
        </p>
      </div>

      <Panel>
        <PanelHead
          title="Buyer Calls"
          subtitle="Every call transcribed, scored and classified automatically"
          icon={<Phone className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{filtered.length.toLocaleString()} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr>
                <Th>Buyer</Th>
                <Th>Project</Th>
                <Th>Advisor</Th>
                <Th>Date / Time</Th>
                <Th>Dir.</Th>
                <Th>Duration</Th>
                <Th>Intent</Th>
                <Th>Stage</Th>
                <Th>Sentiment</Th>
                <Th>Objection</Th>
                <Th>Outcome</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="cursor-pointer transition-colors hover:bg-primary-soft/50"
                >
                  <Td>
                    <p className="font-medium">{c.buyer}</p>
                    <p className="text-[11px] text-muted-foreground tabular-nums">{c.phone}</p>
                  </Td>
                  <Td className="text-muted-foreground">{c.project.replace("Marhaba ", "")}</Td>
                  <Td>{c.advisor}</Td>
                  <Td className="whitespace-nowrap text-muted-foreground tabular-nums">
                    {c.date} · {c.time}
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
                      {c.direction === "Inbound" ? (
                        <ArrowDownLeft className="h-3 w-3 text-success" />
                      ) : (
                        <ArrowUpRight className="h-3 w-3 text-info" />
                      )}
                      {c.direction}
                    </span>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1 tabular-nums text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {c.duration}
                    </span>
                  </Td>
                  <Td>
                    <Pill tone={intentTone(c.intentLevel)} dot>
                      {c.intent} · {c.intentLevel}
                    </Pill>
                  </Td>
                  <Td>
                    <Pill tone="classify">{c.stage}</Pill>
                  </Td>
                  <Td>
                    <Pill tone={sentimentTone(c.sentiment)}>{c.sentiment}</Pill>
                  </Td>
                  <Td className="text-muted-foreground">{c.objection}</Td>
                  <Td>
                    <Pill tone={statusTone(c.outcome)}>{c.outcome}</Pill>
                  </Td>
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

      <CallDetailsModal call={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
