import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid3x3, Route as RouteIcon, ShieldCheck, TrendingDown } from "lucide-react";
import { HBarList, InsightCard, MetricTile, Panel, PanelHead, Pill, TableWrap, Td, Th, intentTone, statusTone } from "@/components/mi/kit";
import { Legend, TrendLines } from "@/components/mi/charts";
import { AccessFunnel, FrictionMatrix, ObservedNote } from "@/components/mi/hospital-viz";
import { EnquiryDetailsModal } from "@/components/mi/enquiry-details-modal";
import {
  accessBarriers,
  accessFunnel,
  accessKpis,
  accessTrend,
  enquiries,
  frictionColumns,
  frictionInsight,
  frictionMatrix,
  funnelTail,
  type Enquiry,
} from "@/data/hospital";

export const Route = createFileRoute("/demo/patient-access")({
  head: () => ({
    meta: [
      { title: "Patient Access — CallVibe Hospital" },
      {
        name: "description",
        content:
          "Appointment intent, requests, confirmations, access barriers and a specialty-level friction matrix reconstructed from patient conversations.",
      },
      { property: "og:title", content: "Patient Access — CallVibe Hospital" },
      { property: "og:description", content: "Where patients struggle to reach the right doctor, service and appointment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PatientAccess,
});

function PatientAccess() {
  const navigate = useNavigate();
  const [cell, setCell] = useState<{ specialty: string; column: string } | null>(null);
  const [barrier, setBarrier] = useState<string | null>(null);
  const [open, setOpen] = useState<Enquiry | null>(null);

  const evidence = useMemo(() => {
    let rows = enquiries;
    if (cell) rows = rows.filter((e) => e.specialty.startsWith(cell.specialty.replace("OB-GYN", "Obstetrics")));
    if (barrier) rows = rows.filter((e) => e.barrier === barrier || e.barrier.startsWith(barrier.split(" /")[0]!));
    return rows.slice(0, 8);
  }, [cell, barrier]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {accessKpis.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
        <Panel>
          <PanelHead
            title="Patient Access Funnel"
            subtitle="Observed across 4,862 analysed patient conversations"
            icon={<RouteIcon className="h-3.5 w-3.5" />}
          />
          <div className="space-y-3 px-4 py-3.5">
            <ObservedNote>
              This funnel is not a workflow the product controls. Each stage is inferred from what patients and enquiry
              agents actually said, then reconciled with recorded appointment data — so drop-off shows where conversations
              ended, not where a system step failed.
            </ObservedNote>
            <AccessFunnel steps={accessFunnel} tail={funnelTail} />
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelHead
              title="What Stops Patients From Getting an Appointment?"
              subtitle="Share of enquiries that ended without a confirmed appointment"
              icon={<TrendingDown className="h-3.5 w-3.5" />}
              right={
                barrier ? (
                  <button onClick={() => setBarrier(null)} className="text-[11.5px] font-medium text-primary hover:underline">
                    Clear
                  </button>
                ) : null
              }
            />
            <div className="space-y-2 px-4 py-3.5">
              {accessBarriers.map((b) => (
                <button
                  key={b.label}
                  onClick={() => setBarrier(b.label === barrier ? null : b.label)}
                  className={`w-full rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted/60 ${
                    barrier === b.label ? "bg-primary-soft" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[12px]">{b.label}</span>
                    <span className="text-[11.5px] font-semibold tabular-nums">{b.value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-danger/70" style={{ width: `${(b.value / 24) * 100}%` }} />
                  </div>
                </button>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Intent → Request → Confirmation" subtitle="Weekly, last 12 weeks" />
            <div className="px-2 pt-3">
              <TrendLines
                data={accessTrend}
                xKey="week"
                height={190}
                series={[
                  { key: "intent", color: "var(--color-primary)" },
                  { key: "requested", color: "var(--color-chart-3)" },
                  { key: "confirmed", color: "var(--color-success)" },
                ]}
              />
            </div>
            <div className="border-t border-border px-4 py-2.5">
              <Legend
                items={[
                  { label: "Appointment intent", color: "var(--color-primary)" },
                  { label: "Requested", color: "var(--color-chart-3)" },
                  { label: "Confirmed", color: "var(--color-success)" },
                ]}
              />
            </div>
          </Panel>
        </div>
      </div>

      <Panel>
        <PanelHead
          title="Access Friction Matrix"
          subtitle="Share of specialty enquiries stalled by each friction type — click a cell for the underlying conversations"
          icon={<Grid3x3 className="h-3.5 w-3.5" />}
          right={cell ? <Pill tone="primary">{cell.specialty} · {cell.column}</Pill> : null}
        />
        <div className="space-y-3 px-4 py-3.5">
          <FrictionMatrix
            columns={frictionColumns}
            rows={frictionMatrix}
            onCell={(specialty, column) => setCell({ specialty, column })}
          />
          <InsightCard tone="warning" title="Friction is specialty-specific, not hospital-wide" body={frictionInsight} meta="Access Friction Intelligence" />
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title={cell || barrier ? "Evidence — Underlying Enquiries" : "Underlying Enquiries"}
          subtitle={
            cell
              ? `${cell.specialty} · ${cell.column}`
              : barrier
                ? barrier
                : "Select a friction cell or barrier above to narrow this list"
          }
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          right={
            <button onClick={() => navigate({ to: "/enquiries" })} className="text-[11.5px] font-medium text-primary hover:underline">
              Open full enquiry list →
            </button>
          }
        />
        <TableWrap>
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th>Enquiry</Th>
                <Th>Specialty</Th>
                <Th>Doctor</Th>
                <Th>Barrier</Th>
                <Th>Intent</Th>
                <Th>Status</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {evidence.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-muted/40">
                  <Td className="font-medium">{e.patient}</Td>
                  <Td className="max-w-[250px] truncate text-muted-foreground">{e.enquiry}</Td>
                  <Td>{e.specialty}</Td>
                  <Td className="text-muted-foreground">{e.doctor}</Td>
                  <Td>
                    <Pill tone="warning">{e.barrier}</Pill>
                  </Td>
                  <Td>
                    <Pill tone={intentTone(e.intentLevel)} dot>
                      {e.intent}
                    </Pill>
                  </Td>
                  <Td>
                    <Pill tone={statusTone(e.status)}>{e.status}</Pill>
                  </Td>
                  <Td>
                    <button onClick={() => setOpen(e)} className="text-[11.5px] font-medium text-primary hover:underline">
                      Details
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <PanelHead title="Doctor Availability Friction by Specialty" subtitle="Share of enquiries stalled on slot availability" />
          <div className="px-4 py-3.5">
            <HBarList
              items={frictionMatrix.map((r) => ({ label: r.specialty, value: r.values[0]! }))}
              suffix="%"
              tone="danger"
              max={40}
            />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Insurance Friction by Specialty" subtitle="Share of enquiries stalled on cashless eligibility" />
          <div className="px-4 py-3.5">
            <HBarList
              items={frictionMatrix.map((r) => ({ label: r.specialty, value: r.values[1]! }))}
              suffix="%"
              tone="warning"
              max={40}
            />
          </div>
        </Panel>
      </div>

      <EnquiryDetailsModal enquiry={open} onClose={() => setOpen(null)} />
    </div>
  );
}
