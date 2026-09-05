import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Stethoscope, UserRound } from "lucide-react";
import { HBarList, InsightCard, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th } from "@/components/mi/kit";
import { SearchBox, Select } from "@/components/mi/controls";
import { ObservedNote } from "@/components/mi/hospital-viz";
import { doctors, specialtyNames } from "@/data/hospital";

export const Route = createFileRoute("/demo/doctors")({
  head: () => ({
    meta: [
      { title: "Doctor Demand Intelligence — CallVibe Hospital" },
      {
        name: "description",
        content:
          "How often patients ask for each consultant by name, their appointment intent, preferred times, common questions and the barriers that stop patients booking.",
      },
      { property: "og:title", content: "Doctor Demand Intelligence — CallVibe Hospital" },
      { property: "og:description", content: "Consultant demand, never clinical performance — measured from patient conversations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Doctors,
});

function Doctors() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("All Specialties");
  const [selected, setSelected] = useState(doctors[0]!.id);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return doctors.filter(
      (d) => (!s || d.name.toLowerCase().includes(s)) && (spec === "All Specialties" || d.specialty === spec),
    );
  }, [q, spec]);

  const active = doctors.find((d) => d.id === selected)!;
  const totalNamed = doctors.reduce((s, d) => s + d.requested, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Named-Doctor Requests" value={totalNamed.toLocaleString("en-IN")} sub="patients asking for a specific consultant" />
        <MetricTile label="Consultants in Demand" value={String(doctors.length)} sub="named in analysed conversations" />
        <MetricTile
          label="Appointment Requests"
          value={doctors.reduce((s, d) => s + d.requests, 0).toLocaleString("en-IN")}
          sub={`${doctors.reduce((s, d) => s + d.confirmed, 0)} confirmed`}
        />
        <MetricTile label="Unresolved Named Requests" value={String(doctors.reduce((s, d) => s + d.unresolved, 0))} sub="no appointment recorded" />
      </div>

      <Panel className="px-4 py-3">
        <ObservedNote>
          This module measures <strong>demand</strong>, not doctors. CallVibe has no basis to evaluate clinical
          quality, outcomes or consultant performance, and deliberately produces no such score. Every figure below reflects
          what patients asked for and what happened to their enquiry.
        </ObservedNote>
      </Panel>

      <Panel>
        <PanelHead
          title="Consultant Demand"
          subtitle="Click a consultant for their demand profile"
          icon={<Stethoscope className="h-3.5 w-3.5" />}
          right={
            <div className="flex items-center gap-2">
              <SearchBox value={q} onChange={setQ} placeholder="Search consultant…" />
              <Select label="All Specialties" value={spec} onChange={setSpec} options={["All Specialties", ...specialtyNames]} className="w-[180px]" />
            </div>
          }
        />
        <TableWrap>
          <table className="w-full min-w-[1120px] border-collapse">
            <thead>
              <tr>
                <Th>Consultant</Th>
                <Th>Specialty</Th>
                <Th>Times Requested</Th>
                <Th>Appointment Intent</Th>
                <Th>Appointment Requests</Th>
                <Th>Confirmed</Th>
                <Th>Top Preferred Time</Th>
                <Th>Leading Access Barrier</Th>
                <Th>Unresolved</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr
                  key={d.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/40 ${selected === d.id ? "bg-primary-soft/60" : ""}`}
                  onClick={() => setSelected(d.id)}
                >
                  <Td className="font-medium">{d.name}</Td>
                  <Td className="text-muted-foreground">{d.specialty}</Td>
                  <Td className="tabular-nums">{d.requested}</Td>
                  <Td>
                    <Pill tone={d.highIntentPct >= 42 ? "success" : "primary"}>{d.highIntentPct}%</Pill>
                  </Td>
                  <Td className="tabular-nums">{d.requests}</Td>
                  <Td className="tabular-nums">{d.confirmed}</Td>
                  <Td className="text-muted-foreground">{d.preferredTimes[0]!.label}</Td>
                  <Td>
                    <Pill tone="warning">{d.barriers[0]!.label}</Pill>
                  </Td>
                  <Td>
                    <Pill tone={d.unresolved > 16 ? "danger" : "neutral"}>{d.unresolved}</Pill>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] font-medium text-primary">View</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
        <Panel>
          <PanelHead
            title={active.name}
            subtitle={`${active.specialty} · ${active.requested} named requests`}
            icon={<UserRound className="h-3.5 w-3.5" />}
          />
          <div className="space-y-3 px-4 py-3.5">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border px-3 py-2">
                <p className="text-[10.5px] text-muted-foreground">Appointment Requests</p>
                <p className="mt-1 text-[16px] font-semibold tabular-nums">{active.requests}</p>
              </div>
              <div className="rounded-lg border border-border px-3 py-2">
                <p className="text-[10.5px] text-muted-foreground">Confirmed</p>
                <p className="mt-1 text-[16px] font-semibold tabular-nums">{active.confirmed}</p>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Associated services</p>
              <div className="flex flex-wrap gap-1.5">
                {active.services.map((sv) => (
                  <Pill key={sv} tone="info">
                    {sv}
                  </Pill>
                ))}
              </div>
            </div>
            <InsightCard tone="primary" title="Demand note" body={active.note} meta="Doctor Demand Intelligence" />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Preferred Appointment Times" subtitle="Requested by patients in conversation" />
          <div className="px-4 py-3.5">
            <HBarList items={active.preferredTimes} />
          </div>
          <div className="border-t border-border px-4 py-3.5">
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Access barriers</p>
            <HBarList items={active.barriers} suffix="%" tone="danger" />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Common Patient Questions" subtitle={`Asked when requesting ${active.name}`} />
          <div className="space-y-2 px-4 py-3.5">
            {active.questions.map((qn, i) => (
              <div key={qn} className="flex items-start gap-2 rounded-lg border border-border px-2.5 py-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-muted text-[10.5px] font-semibold">{i + 1}</span>
                <p className="text-[12px] leading-[1.45]">{qn}</p>
              </div>
            ))}
            <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
              <p className="text-[11px] text-muted-foreground">
                {active.unresolved} named requests for {active.name} have no appointment recorded.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
