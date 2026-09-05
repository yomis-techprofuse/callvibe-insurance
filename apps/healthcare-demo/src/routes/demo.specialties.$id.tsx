import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, HelpCircle, Sparkles, Stethoscope } from "lucide-react";
import {
  HBarList,
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
import { Legend, TrendLines } from "@/components/mi/charts";
import { EnquiryDetailsModal } from "@/components/mi/enquiry-details-modal";
import { doctors, enquiries, specialties, type Enquiry } from "@/data/hospital";

export const Route = createFileRoute("/demo/specialties/$id")({
  loader: ({ params }) => {
    const specialty = specialties.find((s) => s.id === params.id);
    if (!specialty) throw notFound();
    return { specialty };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Specialty not found — CallVibe" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.specialty;
    const title = `${s.name} Demand Intelligence — CallVibe`;
    const description = `${s.enquiries} patient enquiries, ${s.highIntentPct}% high appointment intent, ${s.requests} appointment requests. Top barrier: ${s.topBarrier}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: SpecialtyNotFound,
  component: SpecialtyDetail,
});

function SpecialtyNotFound() {
  return (
    <Panel className="px-6 py-12 text-center">
      <p className="text-[14px] font-semibold">Specialty not found</p>
      <p className="mt-1 text-[12.5px] text-muted-foreground">This specialty is not part of the analysed conversation set.</p>
      <Link to="/demo/specialties" className="mt-4 inline-block text-[12.5px] font-medium text-primary hover:underline">
        Back to Specialties & Services
      </Link>
    </Panel>
  );
}

function SpecialtyDetail() {
  const { specialty: s } = Route.useLoaderData();
  const navigate = useNavigate();
  const [open, setOpen] = useState<Enquiry | null>(null);

  const specDoctors = useMemo(() => doctors.filter((d) => d.specialty === s.name || s.name.startsWith(d.specialty)), [s]);
  const rows = useMemo(() => enquiries.filter((e) => e.specialty === s.name).slice(0, 10), [s]);

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate({ to: "/specialties" })}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Specialties & Services
      </button>

      <Panel className="px-4 py-3.5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary-soft p-1.5 text-primary">
                <Stethoscope className="h-4 w-4" />
              </span>
              <h2 className="text-[17px] font-semibold tracking-tight">{s.name}</h2>
              <Pill tone="info">Peak: {s.peak}</Pill>
            </div>
            <p className="mt-1.5 max-w-3xl text-[12.5px] text-muted-foreground">{s.brief}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill tone="primary">{s.enquiries.toLocaleString("en-IN")} enquiries</Pill>
            <Pill tone="success">{s.highIntentPct}% high intent</Pill>
            <Pill tone="warning">{s.topBarrier}</Pill>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricTile label="Enquiries" value={s.enquiries.toLocaleString("en-IN")} sub="last 30 days" />
        <MetricTile label="High Appointment Intent" value={`${s.highIntentPct}%`} sub="of specialty enquiries" />
        <MetricTile label="Appointment Requests" value={String(s.requests)} sub={`${s.confirmed} confirmed`} />
        <MetricTile label="Unresolved Enquiries" value={String(s.unresolved)} sub="no documented outcome" />
        <MetricTile label="Repeat Contact Rate" value={`${s.repeatRate}%`} sub="same unresolved issue" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelHead title="Demand Trend" subtitle="Weekly enquiries and appointment-intent share" />
          <div className="px-2 pt-3">
            <TrendLines
              data={s.trend}
              xKey="week"
              height={230}
              series={[
                { key: "enquiries", color: "var(--color-primary)" },
                { key: "intent", color: "var(--color-success)" },
              ]}
            />
          </div>
          <div className="border-t border-border px-4 py-2.5">
            <Legend
              items={[
                { label: "Enquiries", color: "var(--color-primary)" },
                { label: "Appointment intent %", color: "var(--color-success)" },
              ]}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHead title="AI Insight" subtitle="Generated from this specialty's conversations" icon={<Sparkles className="h-3.5 w-3.5" />} />
          <div className="space-y-2.5 px-4 py-3.5">
            <InsightCard tone="primary" title="Demand pattern" body={s.brief} meta={`Peak demand · ${s.peak}`} />
            <InsightCard
              tone="warning"
              title={`Leading access barrier — ${s.topBarrier}`}
              body={`${s.barriers[0]!.value}% of ${s.name} enquiries that did not convert ended on ${s.topBarrier.toLowerCase()}. ${s.topDoctor} is the most requested consultant in this specialty.`}
              meta="Access Intelligence"
            />
            <InsightCard
              tone={s.unresolved > 28 ? "danger" : "info"}
              title="Unresolved demand"
              body={`${s.unresolved} ${s.name} enquiries closed without a documented outcome and ${s.repeatRate}% of patients contacted the hospital again about the same issue.`}
              meta="Enquiry Operations Intelligence"
            />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel>
          <PanelHead title="Top Services Discussed" />
          <div className="px-4 py-3.5">
            <HBarList items={s.services} tone="info" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Top Access Barriers" />
          <div className="px-4 py-3.5">
            <HBarList items={s.barriers} suffix="%" tone="danger" />
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Top Patient Questions" icon={<HelpCircle className="h-3.5 w-3.5" />} />
          <div className="space-y-2 px-4 py-3.5">
            {s.questions.map((q, i) => (
              <div key={q} className="flex items-start gap-2 rounded-lg border border-border px-2.5 py-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-muted text-[10.5px] font-semibold">{i + 1}</span>
                <p className="text-[12px] leading-[1.45]">{q}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelHead title="Consultant Demand" subtitle="Named requests in this specialty" />
          <div className="space-y-2 px-4 py-3.5">
            {specDoctors.length === 0 ? (
              <p className="text-[12px] text-muted-foreground">
                No named-consultant demand recorded; patients ask for the next available doctor in this specialty.
              </p>
            ) : (
              specDoctors.map((d) => (
                <div key={d.id} className="rounded-lg border border-border px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[12.5px] font-medium">{d.name}</p>
                    <span className="text-[12px] font-semibold tabular-nums">{d.requested}</span>
                  </div>
                  <p className="mt-0.5 text-[10.5px] text-muted-foreground">
                    {d.requests} appointment requests · {d.highIntentPct}% high intent
                  </p>
                </div>
              ))
            )}
            <Link to="/demo/doctors" className="inline-block pt-1 text-[11.5px] font-medium text-primary hover:underline">
              Doctor demand intelligence →
            </Link>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelHead title={`${s.name} Enquiries`} subtitle="Conversations behind the numbers above" />
        <TableWrap>
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th>Enquiry</Th>
                <Th>Doctor / Service</Th>
                <Th>Intent</Th>
                <Th>Barrier</Th>
                <Th>Status</Th>
                <Th>Agent</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-muted/40">
                  <Td className="font-medium">{e.patient}</Td>
                  <Td className="max-w-[240px] truncate text-muted-foreground">{e.enquiry}</Td>
                  <Td>
                    <p className="truncate">{e.doctor}</p>
                    <p className="truncate text-[10.5px] text-muted-foreground">{e.service}</p>
                  </Td>
                  <Td>
                    <Pill tone={intentTone(e.intentLevel)} dot>
                      {e.intent}
                    </Pill>
                  </Td>
                  <Td>
                    <Pill tone="warning">{e.barrier}</Pill>
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
