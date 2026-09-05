import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CalendarCheck,
  MessageSquare,
  Route as RouteIcon,
  Sparkles,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import {
  HBarList,
  InsightCard,
  KpiCard,
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
import { DonutChart, Legend, MiniBars, VolumeChart } from "@/components/mi/charts";
import { AccessFunnel, AttentionRow, ObservedNote, ReasonBars } from "@/components/mi/hospital-viz";
import { EnquiryDetailsModal } from "@/components/mi/enquiry-details-modal";
import { Select } from "@/components/mi/controls";
import {
  accessFunnel,
  attentionItems,
  channelSplit,
  enquiries,
  enquiryReasons,
  executiveInsights,
  funnelTail,
  heroKpis,
  hourlyLoad,
  intentDistribution,
  managementBrief,
  patientTypeSplit,
  specialtyDemand,
  specialtyNames,
  supportKpis,
  volumeTrend,
  type Enquiry,
} from "@/data/hospital";

export const Route = createFileRoute("/demo/")({
  head: () => ({
    meta: [
      { title: "Patient Access Command Centre — CallVibe" },
      {
        name: "description",
        content:
          "Hospital enquiry and patient access intelligence for Marhaba Multispecialty Hospital, Bengaluru: patient demand, appointment intent, access barriers and unresolved enquiries.",
      },
      { property: "og:title", content: "Patient Access Command Centre — CallVibe" },
      {
        property: "og:description",
        content: "Thousands of patient conversations turned into demand, access and enquiry-operations intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});

const kpiIcons = [Users, Activity, Target, CalendarCheck];

function Overview() {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("All Specialties");
  const [reason, setReason] = useState<string | null>(null);
  const [open, setOpen] = useState<Enquiry | null>(null);

  const trend = useMemo(() => {
    if (specialty === "All Specialties") return volumeTrend;
    const idx = specialtyNames.indexOf(specialty);
    const factor = 0.3 - idx * 0.012;
    return volumeTrend.map((d) => ({
      ...d,
      calls: Math.round(d.calls * factor),
      whatsapp: Math.round(d.whatsapp * factor),
    }));
  }, [specialty]);

  const reasonEnquiries = useMemo(
    () => (reason ? enquiries.filter((e) => e.category === reason).slice(0, 6) : []),
    [reason],
  );

  const attentionQueue = useMemo(
    () =>
      enquiries
        .filter((e) => e.intentLevel === "High" && e.status !== "Appointment Confirmed")
        .sort((a, b) => b.intent - a.intent)
        .slice(0, 8),
    [],
  );

  return (
    <div className="space-y-4">
      {/* Hero KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {heroKpis.map((k, i) => {
          const Icon = kpiIcons[i]!;
          return (
            <KpiCard
              key={k.label}
              label={k.label}
              value={k.value}
              delta={k.delta}
              up={k.up}
              tone={k.tone}
              sub={k.sub}
              icon={<Icon className="h-3.5 w-3.5" />}
            />
          );
        })}
      </div>

      {/* Support metrics */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {supportKpis.map((k) => (
          <MetricTile key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      {/* Management brief */}
      <Panel>
        <PanelHead
          title={managementBrief.headline}
          subtitle={managementBrief.generated}
          icon={<Sparkles className="h-3.5 w-3.5" />}
          right={
            <Link to="/demo/enquiries" className="text-[11.5px] font-medium text-primary hover:underline">
              View underlying enquiries →
            </Link>
          }
        />
        <div className="space-y-3 px-4 py-3.5">
          <p className="text-[13px] leading-[1.7] text-foreground/90">{managementBrief.body}</p>
          <div className="grid gap-2.5 lg:grid-cols-2">
            {executiveInsights.map((b) => (
              <InsightCard key={b.title} tone={b.tone} title={b.title} body={b.body} meta={b.meta} />
            ))}
          </div>
        </div>
      </Panel>

      {/* Funnel + attention */}
      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Panel>
          <PanelHead
            title="Patient Access Funnel"
            subtitle="Reconstructed from patient conversations and connected hospital records"
            icon={<RouteIcon className="h-3.5 w-3.5" />}
            right={
              <Link to="/demo/patient-access" className="text-[11.5px] font-medium text-primary hover:underline">
                Open Patient Access
              </Link>
            }
          />
          <div className="space-y-3 px-4 py-3.5">
            <ObservedNote>
              CallVibe does not manage or control this funnel. It observes and reconstructs the patient
              access journey from what was actually said in conversations, then reconciles it with recorded appointment
              data.
            </ObservedNote>
            <AccessFunnel steps={accessFunnel} tail={funnelTail} onStep={() => navigate({ to: "/patient-access" })} />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Patient Enquiries Requiring Attention"
            subtitle="Ranked by operational consequence, not volume"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            right={<Pill tone="danger">Live</Pill>}
          />
          <div className="space-y-2 px-4 py-3.5">
            {attentionItems.map((a) => (
              <AttentionRow
                key={a.text}
                value={a.value}
                text={a.text}
                tone={a.tone}
                onClick={() => navigate({ to: "/action-centre" })}
              />
            ))}
          </div>
        </Panel>
      </div>

      {/* Why patients contact us */}
      <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <Panel>
          <PanelHead
            title="What Are Patients Contacting Us About?"
            subtitle="Click a category to explore the underlying conversations"
            icon={<MessageSquare className="h-3.5 w-3.5" />}
          />
          <div className="px-3 py-3">
            <ReasonBars items={enquiryReasons} active={reason} onSelect={(l) => setReason(l === reason ? null : l)} />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title={reason ? `Conversations — ${reason}` : "Select a contact reason"}
            subtitle={
              reason
                ? `${enquiries.filter((e) => e.category === reason).length} matching enquiries in the current sample`
                : "Choose a category on the left to see the actual patient conversations behind the number"
            }
            right={
              reason ? (
                <button onClick={() => setReason(null)} className="text-[11.5px] font-medium text-primary hover:underline">
                  Clear
                </button>
              ) : null
            }
          />
          {reason ? (
            <TableWrap>
              <table className="w-full min-w-[620px] border-collapse">
                <thead>
                  <tr>
                    <Th>Patient</Th>
                    <Th>Enquiry</Th>
                    <Th>Specialty</Th>
                    <Th>Intent</Th>
                    <Th>Status</Th>
                    <Th />
                  </tr>
                </thead>
                <tbody>
                  {reasonEnquiries.map((e) => (
                    <tr key={e.id} className="transition-colors hover:bg-muted/40">
                      <Td className="font-medium">{e.patient}</Td>
                      <Td className="max-w-[260px] truncate text-muted-foreground">{e.enquiry}</Td>
                      <Td>{e.specialty}</Td>
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
          ) : (
            <div className="flex h-[280px] items-center justify-center px-6 text-center">
              <p className="max-w-sm text-[12.5px] text-muted-foreground">
                Every percentage on the left is derived from analysed conversations. Selecting a category moves you from
                the insight straight to the evidence.
              </p>
            </div>
          )}
        </Panel>
      </div>

      {/* Volume + intent */}
      <div className="grid gap-4 xl:grid-cols-[1.75fr_1fr]">
        <Panel>
          <PanelHead
            title="Enquiry Volume — Last 30 Days"
            subtitle="Daily patient calls and WhatsApp enquiries"
            icon={<MessageSquare className="h-3.5 w-3.5" />}
            right={
              <Select
                label="All Specialties"
                value={specialty}
                onChange={setSpecialty}
                options={["All Specialties", ...specialtyNames]}
                className="w-[200px]"
              />
            }
          />
          <div className="px-2 pt-3 pb-2">
            <VolumeChart data={trend} />
          </div>
          <div className="border-t border-border px-4 py-2.5">
            <Legend
              items={[
                { label: "Calls", color: "var(--color-primary)" },
                { label: "WhatsApp", color: "var(--color-chart-3)" },
              ]}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Appointment Intent" subtitle="Across analysed conversations" icon={<Target className="h-3.5 w-3.5" />} />
          <div className="px-4 pt-2">
            <DonutChart data={intentDistribution} centerValue="1,436" centerLabel="with appointment intent" />
          </div>
          <div className="border-t border-border px-4 py-3">
            <div className="space-y-2">
              {intentDistribution.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-sm" style={{ background: d.color }} />
                    <span className="text-[12px]">{d.name} intent</span>
                  </div>
                  <span className="text-[12px] font-semibold tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Demand strip */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel>
          <PanelHead
            title="Specialty Demand"
            subtitle="Enquiries in the last 30 days"
            icon={<Stethoscope className="h-3.5 w-3.5" />}
            right={
              <Link to="/demo/specialties" className="text-[11.5px] font-medium text-primary hover:underline">
                View all
              </Link>
            }
          />
          <div className="px-4 py-3.5">
            <HBarList items={specialtyDemand} />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Patient Type" subtitle="Share of analysed enquiries" />
          <div className="px-4 py-3.5">
            <HBarList items={patientTypeSplit} suffix="%" tone="info" max={60} />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Channel Mix" subtitle="Where patients reach us" />
          <div className="px-4 pt-2">
            <DonutChart data={channelSplit} height={168} centerValue="4,862" centerLabel="enquiries" />
          </div>
          <div className="border-t border-border px-4 py-2.5">
            <Legend items={channelSplit.map((c) => ({ label: c.name, color: c.color, value: `${c.value}%` }))} />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="Enquiry Load by Hour" subtitle="Peak demand 10–11 AM and 5–6 PM" />
          <div className="px-2 py-3">
            <MiniBars data={hourlyLoad} dataKey="enquiries" xKey="hour" height={186} />
          </div>
        </Panel>
      </div>

      {/* High-intent queue */}
      <Panel>
        <PanelHead
          title="High-Intent Enquiries Without a Confirmed Appointment"
          subtitle="Patients who signalled strong intent but have no appointment recorded"
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          right={
            <Link to="/demo/action-centre" className="text-[11.5px] font-medium text-primary hover:underline">
              Action Centre
            </Link>
          }
        />
        <TableWrap>
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th>Enquiry</Th>
                <Th>Specialty</Th>
                <Th>Doctor</Th>
                <Th>Barrier</Th>
                <Th>Intent</Th>
                <Th>Status</Th>
                <Th>Agent</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {attentionQueue.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-muted/40">
                  <Td className="font-medium">{e.patient}</Td>
                  <Td className="max-w-[240px] truncate text-muted-foreground">{e.enquiry}</Td>
                  <Td>{e.specialty}</Td>
                  <Td className="text-muted-foreground">{e.doctor}</Td>
                  <Td>
                    <Pill tone="danger">{e.barrier}</Pill>
                  </Td>
                  <Td>
                    <Pill tone={intentTone(e.intentLevel)} dot>
                      {e.intent}
                    </Pill>
                  </Td>
                  <Td>
                    <Pill tone={statusTone(e.status)}>{e.status}</Pill>
                  </Td>
                  <Td className="text-muted-foreground">{e.agent}</Td>
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

      <EnquiryDetailsModal enquiry={open} onClose={() => setOpen(null)} />
    </div>
  );
}
