import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { EmptyRow, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, intentTone, statusTone } from "@/components/mi/kit";
import { FilterBar, Pagination, SearchBox, Select } from "@/components/mi/controls";
import { PatientDrawer } from "@/components/mi/patient-drawer";
import { agentNames, doctorNames, patients, patientTypes, specialtyNames, type Patient } from "@/data/hospital";

export const Route = createFileRoute("/demo/patients")({
  head: () => ({
    meta: [
      { title: "Patient Intelligence — CallVibe Hospital" },
      {
        name: "description",
        content:
          "A lightweight patient intelligence layer: interactions across channels, primary enquiry, appointment intent, access status and the next operational action.",
      },
      { property: "og:title", content: "Patient Intelligence — CallVibe Hospital" },
      { property: "og:description", content: "Understand the patient, not just the individual call." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Patients,
});

function Patients() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All Patient Types");
  const [spec, setSpec] = useState("All Specialties");
  const [doc, setDoc] = useState("All Doctors");
  const [intent, setIntent] = useState("All Intent Levels");
  const [agent, setAgent] = useState("All Agents");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [open, setOpen] = useState<Patient | null>(null);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return patients.filter(
      (p) =>
        (!s || p.name.toLowerCase().includes(s) || p.phone.includes(s)) &&
        (type === "All Patient Types" || p.patientType === type) &&
        (spec === "All Specialties" || p.specialty === spec) &&
        (doc === "All Doctors" || p.doctor === doc) &&
        (intent === "All Intent Levels" || p.intentLevel === intent) &&
        (agent === "All Agents" || p.agent === agent),
    );
  }, [q, type, spec, doc, intent, agent]);

  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const current = rows.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Patients in View" value={String(rows.length)} sub="unique patients matched across channels" />
        <MetricTile label="Repeat Contacts" value={String(patients.filter((p) => p.interactions > 1).length)} sub="more than one interaction" />
        <MetricTile label="High Appointment Intent" value={String(patients.filter((p) => p.intentLevel === "High").length)} sub="ready to book" />
        <MetricTile
          label="Awaiting Next Action"
          value={String(patients.filter((p) => p.accessStatus !== "Appointment Confirmed").length)}
          sub="no confirmed appointment"
        />
      </div>

      <FilterBar
        title="Patient Filters"
        onReset={() => {
          setQ("");
          setType("All Patient Types");
          setSpec("All Specialties");
          setDoc("All Doctors");
          setIntent("All Intent Levels");
          setAgent("All Agents");
          setPage(1);
        }}
      >
        <SearchBox value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search patient or mobile…" />
        <Select label="All Patient Types" value={type} onChange={setType} options={["All Patient Types", ...patientTypes]} className="w-[170px]" />
        <Select label="All Specialties" value={spec} onChange={setSpec} options={["All Specialties", ...specialtyNames]} className="w-[185px]" />
        <Select label="All Doctors" value={doc} onChange={setDoc} options={["All Doctors", ...doctorNames, "Any Available Doctor"]} className="w-[185px]" />
        <Select label="Appointment Intent" value={intent} onChange={setIntent} options={["All Intent Levels", "High", "Medium", "Low"]} className="w-[165px]" />
        <Select label="All Agents" value={agent} onChange={setAgent} options={["All Agents", ...agentNames]} className="w-[165px]" />
      </FilterBar>

      <Panel>
        <PanelHead
          title="Patients"
          subtitle="Aggregated from every call and WhatsApp interaction — not a medical record"
          icon={<Users className="h-3.5 w-3.5" />}
          right={<Pill tone="info">{rows.length} patients</Pill>}
        />
        <TableWrap>
          <table className="w-full min-w-[1240px] border-collapse">
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th>Contact</Th>
                <Th>Type</Th>
                <Th>Interactions</Th>
                <Th>Primary Enquiry</Th>
                <Th>Specialty</Th>
                <Th>Doctor</Th>
                <Th>Intent</Th>
                <Th>Access Status</Th>
                <Th>Next Action</Th>
                <Th>Agent</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {current.length === 0 ? (
                <EmptyRow span={12} />
              ) : (
                current.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-muted/40">
                    <Td className="font-medium">{p.name}</Td>
                    <Td className="text-muted-foreground tabular-nums">{p.phone}</Td>
                    <Td>
                      <Pill tone={p.patientType === "New Patient" ? "primary" : p.patientType === "International Patient" ? "classify" : "neutral"}>
                        {p.patientType.replace(" Patient", "")}
                      </Pill>
                    </Td>
                    <Td className="tabular-nums">{p.interactions}</Td>
                    <Td className="max-w-[230px] truncate text-muted-foreground">{p.primaryEnquiry}</Td>
                    <Td>{p.specialty}</Td>
                    <Td className="text-muted-foreground">{p.doctor}</Td>
                    <Td>
                      <Pill tone={intentTone(p.intentLevel)} dot>
                        {p.intent}
                      </Pill>
                    </Td>
                    <Td>
                      <Pill tone={statusTone(p.accessStatus)}>{p.accessStatus}</Pill>
                    </Td>
                    <Td className="max-w-[220px] truncate text-muted-foreground">{p.nextAction}</Td>
                    <Td className="text-muted-foreground">{p.agent}</Td>
                    <Td>
                      <button onClick={() => setOpen(p)} className="text-[11.5px] font-medium text-primary hover:underline">
                        Open
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

      <PatientDrawer patient={open} onClose={() => setOpen(null)} />
    </div>
  );
}
