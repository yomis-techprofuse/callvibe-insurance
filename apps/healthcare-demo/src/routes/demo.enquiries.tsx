import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";
import { MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, EmptyRow, intentTone, sentimentTone, statusTone } from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select } from "@/components/mi/controls";
import { EnquiryDetailsModal } from "@/components/mi/enquiry-details-modal";
import { enquiries, enquiryFilterOptions, type Enquiry } from "@/data/hospital";

export const Route = createFileRoute("/demo/enquiries")({
  head: () => ({
    meta: [
      { title: "Enquiries — CallVibe Hospital" },
      {
        name: "description",
        content:
          "Unified patient enquiry intelligence across calls and WhatsApp: specialty, doctor, appointment intent, outcome, sentiment and agent for every conversation.",
      },
      { property: "og:title", content: "Enquiries — CallVibe Hospital" },
      { property: "og:description", content: "Every patient enquiry, transcribed, classified and scored in one intelligence layer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Enquiries,
});

function Enquiries() {
  const o = enquiryFilterOptions;
  const [q, setQ] = useState("");
  const [date, setDate] = useState(o.date[0]!);
  const [channel, setChannel] = useState(o.channel[0]!);
  const [specialty, setSpecialty] = useState(o.specialty[0]!);
  const [doctor, setDoctor] = useState(o.doctor[0]!);
  const [service, setService] = useState(o.service[0]!);
  const [ptype, setPtype] = useState(o.patientType[0]!);
  const [intent, setIntent] = useState(o.intent[0]!);
  const [outcome, setOutcome] = useState(o.outcome[0]!);
  const [sentiment, setSentiment] = useState(o.sentiment[0]!);
  const [agent, setAgent] = useState(o.agent[0]!);
  const [priority, setPriority] = useState(o.priority[0]!);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [open, setOpen] = useState<Enquiry | null>(null);

  const reset = () => {
    setQ("");
    setDate(o.date[0]!);
    setChannel(o.channel[0]!);
    setSpecialty(o.specialty[0]!);
    setDoctor(o.doctor[0]!);
    setService(o.service[0]!);
    setPtype(o.patientType[0]!);
    setIntent(o.intent[0]!);
    setOutcome(o.outcome[0]!);
    setSentiment(o.sentiment[0]!);
    setAgent(o.agent[0]!);
    setPriority(o.priority[0]!);
    setPage(1);
  };

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return enquiries.filter(
      (e) =>
        (!s || e.patient.toLowerCase().includes(s) || e.phone.includes(s) || e.enquiry.toLowerCase().includes(s)) &&
        (date === o.date[0] || e.date === date) &&
        (channel === o.channel[0] || e.channel === channel) &&
        (specialty === o.specialty[0] || e.specialty === specialty) &&
        (doctor === o.doctor[0] || e.doctor === doctor) &&
        (service === o.service[0] || e.service === service) &&
        (ptype === o.patientType[0] || e.patientType === ptype) &&
        (intent === o.intent[0] || e.intentLevel === intent) &&
        (outcome === o.outcome[0] || e.outcome === outcome) &&
        (sentiment === o.sentiment[0] || e.sentiment === sentiment) &&
        (agent === o.agent[0] || e.agent === agent) &&
        (priority === o.priority[0] || e.priority),
    );
  }, [q, date, channel, specialty, doctor, service, ptype, intent, outcome, sentiment, agent, priority, o]);

  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const current = rows.slice((page - 1) * perPage, page * perPage);

  const stats = useMemo(
    () => ({
      total: rows.length,
      high: rows.filter((r) => r.intentLevel === "High").length,
      requested: rows.filter((r) => r.status === "Appointment Pending" || r.status === "Appointment Confirmed").length,
      unresolved: rows.filter((r) => r.status === "Unresolved").length,
      insurance: rows.filter((r) => r.status === "Insurance Pending").length,
      priority: rows.filter((r) => r.priority).length,
    }),
    [rows],
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile label="Enquiries in View" value={String(stats.total)} sub="matching current filters" />
        <MetricTile label="High Appointment Intent" value={String(stats.high)} sub="ready to book" />
        <MetricTile label="Appointment Requested" value={String(stats.requested)} sub="slot asked for or confirmed" />
        <MetricTile label="Insurance Pending" value={String(stats.insurance)} sub="cashless unverified" />
        <MetricTile label="Unresolved" value={String(stats.unresolved)} sub="no documented outcome" />
        <MetricTile label="Priority Flags" value={String(stats.priority)} sub="routed per protocol" />
      </div>

      <FilterBar onReset={reset} title="Enquiry Filters">
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search patient, phone or enquiry…" />
        <Select label="All Dates" value={date} onChange={(v) => { setDate(v); setPage(1); }} options={o.date} className="w-[130px]" />
        <Select label="All Channels" value={channel} onChange={(v) => { setChannel(v); setPage(1); }} options={o.channel} className="w-[150px]" />
        <Select label="All Specialties" value={specialty} onChange={(v) => { setSpecialty(v); setPage(1); }} options={o.specialty} className="w-[180px]" />
        <Select label="All Doctors" value={doctor} onChange={(v) => { setDoctor(v); setPage(1); }} options={o.doctor} className="w-[180px]" />
        <Select label="All Services" value={service} onChange={(v) => { setService(v); setPage(1); }} options={o.service} className="w-[180px]" />
        <Select label="All Patient Types" value={ptype} onChange={(v) => { setPtype(v); setPage(1); }} options={o.patientType} className="w-[165px]" />
        <Select label="Appointment Intent" value={intent} onChange={(v) => { setIntent(v); setPage(1); }} options={o.intent} className="w-[165px]" />
        <Select label="All Outcomes" value={outcome} onChange={(v) => { setOutcome(v); setPage(1); }} options={o.outcome} className="w-[190px]" />
        <Select label="All Sentiment" value={sentiment} onChange={(v) => { setSentiment(v); setPage(1); }} options={o.sentiment} className="w-[145px]" />
        <Select label="All Agents" value={agent} onChange={(v) => { setAgent(v); setPage(1); }} options={o.agent} className="w-[165px]" />
        <Select label="Priority" value={priority} onChange={(v) => { setPriority(v); setPage(1); }} options={o.priority} className="w-[140px]" />
      </FilterBar>

      <Panel>
        <PanelHead
          title="Patient Enquiries"
          subtitle="Calls and WhatsApp threads analysed by CallVibe"
          icon={<MessageSquare className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{rows.length} results</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1220px] border-collapse">
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th>Enquiry</Th>
                <Th>Specialty</Th>
                <Th>Doctor / Service</Th>
                <Th>Intent</Th>
                <Th>Status</Th>
                <Th>Channel</Th>
                <Th>Agent</Th>
                <Th>Time</Th>
                <Th>Sentiment</Th>
                <Th>Details</Th>
              </tr>
            </thead>
            <tbody>
              {current.length === 0 ? (
                <EmptyRow span={11} />
              ) : (
                current.map((e) => (
                  <tr key={e.id} className="transition-colors hover:bg-muted/40">
                    <Td>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{e.patient}</p>
                        <p className="truncate text-[10.5px] text-muted-foreground">{e.patientType} · {e.phone}</p>
                      </div>
                    </Td>
                    <Td className="max-w-[250px]">
                      <p className="truncate">{e.enquiry}</p>
                      <p className="truncate text-[10.5px] text-muted-foreground">{e.category}</p>
                    </Td>
                    <Td>{e.specialty}</Td>
                    <Td>
                      <p className="truncate">{e.doctor}</p>
                      <p className="truncate text-[10.5px] text-muted-foreground">{e.service}</p>
                    </Td>
                    <Td>
                      <Pill tone={intentTone(e.intentLevel)} dot>
                        {e.intent} · {e.intentLevel}
                      </Pill>
                    </Td>
                    <Td>
                      <Pill tone={statusTone(e.status)}>{e.status}</Pill>
                    </Td>
                    <Td className="text-muted-foreground">{e.channel}</Td>
                    <Td className="text-muted-foreground">{e.agent}</Td>
                    <Td className="tabular-nums text-muted-foreground">{e.date} · {e.time}</Td>
                    <Td>
                      <Pill tone={sentimentTone(e.sentiment)} dot>
                        {e.sentiment}
                      </Pill>
                    </Td>
                    <Td>
                      <button onClick={() => setOpen(e)} className="text-[11.5px] font-medium text-primary hover:underline">
                        View
                      </button>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableWrap>
        <Pagination
          page={page}
          pageCount={pageCount}
          perPage={perPage}
          total={rows.length}
          onPage={setPage}
          onPerPage={(n) => { setPerPage(n); setPage(1); }}
        />
      </Panel>

      <EnquiryDetailsModal enquiry={open} onClose={() => setOpen(null)} />
    </div>
  );
}
