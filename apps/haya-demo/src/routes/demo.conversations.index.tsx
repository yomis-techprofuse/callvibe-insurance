import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Panel, Pill, TableWrap, Td, Th, EmptyRow, scoreCellTone } from "@/components/mi/kit";
import { PageHead } from "@/components/mi/ui";
import { conversations, drivers, languages } from "@/data/techtar";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  driver: fallback(z.string(), "All").default("All"),
});

export const Route = createFileRoute("/demo/conversations/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Conversations — CallVibe" },
      { name: "description", content: "Classified applicant support conversations with contact driver, sub-driver, resolution, repeat contact, QA score and escalation risk." },
      { property: "og:title", content: "Conversations — CallVibe" },
      { property: "og:description", content: "Every applicant conversation, classified and searchable. Simulated demo data." },
    ],
  }),
  component: ConversationsPage,
});

function ConversationsPage() {
  const { driver } = Route.useSearch();
  const [language, setLanguage] = useState("All");
  const [resolution, setResolution] = useState("All");
  const [repeat, setRepeat] = useState("All");
  const [q, setQ] = useState("");

  const rows = useMemo(
    () =>
      conversations.filter((c) => {
        if (driver !== "All" && c.driver !== driver) return false;
        if (language !== "All" && c.language !== language) return false;
        if (resolution !== "All" && c.resolution !== resolution) return false;
        if (repeat !== "All" && (repeat === "Yes") !== c.repeat) return false;
        if (q && !(`${c.id} ${c.subDriver} ${c.agent}`.toLowerCase().includes(q.toLowerCase()))) return false;
        return true;
      }),
    [driver, language, resolution, repeat, q],
  );

  return (
    <div className="space-y-4">
      <PageHead
        title="Conversations"
        subtitle="Every applicant support conversation classified by contact driver, resolution outcome and repeat-contact behaviour. Select any row to open the full conversation intelligence view."
      />

      <Panel className="flex flex-wrap items-center gap-2.5 px-3.5 py-2.5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search conversation ID, sub-driver or agent"
          className="h-7 w-[260px] rounded-lg border border-border bg-card px-2.5 text-[12px] outline-none focus:border-primary"
        />
        <Select label="Driver" value={driver} options={["All", ...drivers.map((d) => d.name)]} link />
        <Select label="Language" value={language} onChange={setLanguage} options={["All", ...languages]} />
        <Select label="Resolution" value={resolution} onChange={setResolution} options={["All", "Resolved", "Partially Resolved", "Unresolved"]} />
        <Select label="Repeat" value={repeat} onChange={setRepeat} options={["All", "Yes", "No"]} />
        <span className="ml-auto text-[11px] text-muted-foreground">{rows.length} of {conversations.length} demo conversations</span>
      </Panel>

      <Panel>
        <TableWrap>
          <table className="w-full min-w-[1240px]">
            <thead>
              <tr>
                <Th>Conversation ID</Th>
                <Th>Date / Time</Th>
                <Th>Market</Th>
                <Th>Language</Th>
                <Th>Contact Driver</Th>
                <Th>Sub-Driver</Th>
                <Th>Resolution</Th>
                <Th>Repeat</Th>
                <Th>Sentiment</Th>
                <Th>QA</Th>
                <Th>Escalation Risk</Th>
                <Th>Agent</Th>
                <Th>Duration</Th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <EmptyRow span={13} />
              ) : (
                rows.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-muted/50">
                    <Td>
                      <Link to="/demo/conversations/$id" params={{ id: c.id }} className="font-medium text-primary hover:underline">
                        {c.id}
                      </Link>
                    </Td>
                    <Td className="whitespace-nowrap text-muted-foreground">{c.datetime}</Td>
                    <Td>{c.market}</Td>
                    <Td>{c.language}</Td>
                    <Td className="whitespace-nowrap">{c.driver}</Td>
                    <Td className="whitespace-nowrap text-muted-foreground">{c.subDriver}</Td>
                    <Td>
                      <Pill tone={c.resolution === "Resolved" ? "success" : c.resolution === "Partially Resolved" ? "warning" : "danger"} dot>
                        {c.resolution}
                      </Pill>
                    </Td>
                    <Td>{c.repeat ? <Pill tone="danger">Yes</Pill> : <span className="text-muted-foreground">No</span>}</Td>
                    <Td>
                      <Pill tone={c.sentiment === "Positive" ? "success" : c.sentiment === "Neutral" ? "neutral" : "danger"}>{c.sentiment}</Pill>
                    </Td>
                    <Td>
                      <span className={cn("rounded-md px-1.5 py-[2px] text-[11.5px] font-semibold tabular-nums", scoreCellTone(c.qa))}>{c.qa}</span>
                    </Td>
                    <Td>
                      <Pill tone={c.risk === "High" ? "danger" : c.risk === "Medium" ? "warning" : "neutral"}>{c.risk}</Pill>
                    </Td>
                    <Td>{c.agent}</Td>
                    <Td className="tabular-nums">{c.duration}</Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  link,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  options: string[];
  link?: boolean;
}) {
  const navigate = Route.useNavigate();
  return (
    <label className="flex items-center gap-1.5">
      <span className="text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase">{label}</span>
      <select
        value={value}
        onChange={(e) => {
          if (link) navigate({ search: { driver: e.target.value } });
          else onChange?.(e.target.value);
        }}
        className="h-7 max-w-[190px] rounded-lg border border-border bg-card px-2 text-[12px] font-medium outline-none focus:border-primary"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
