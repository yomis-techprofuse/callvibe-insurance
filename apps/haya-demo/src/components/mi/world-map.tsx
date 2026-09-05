import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { WORLD_H, WORLD_W, project, worldLandPath } from "@/data/world";
import { mappedMarkets, type Market } from "@/data/geo";

export function WorldMap({ height = 300 }: { height?: number }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState<Market | null>(null);
  const max = Math.max(...mappedMarkets.map((m) => m.conversations));

  return (
    <div className="relative">
      <svg viewBox={`0 24 ${WORLD_W} ${WORLD_H - 76}`} style={{ height }} className="w-full" role="img" aria-label="Applicant conversations by market">
        <path d={worldLandPath} fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth={0.5} />
        {mappedMarkets.map((m) => {
          const { x, y } = project(m.lon, m.lat);
          const r = 5 + Math.sqrt(m.conversations / max) * 18;
          const hot = m.repeat >= 23;
          const color = hot ? "var(--color-danger)" : "var(--color-primary)";
          return (
            <g
              key={m.id}
              className="cursor-pointer"
              onMouseEnter={() => setHover(m)}
              onMouseLeave={() => setHover(null)}
              onClick={() => navigate({ to: "/markets/$id", params: { id: m.id } })}
            >
              <circle cx={x} cy={y} r={r} fill={color} fillOpacity={hover?.id === m.id ? 0.42 : 0.24} stroke={color} strokeWidth={1.2} />
              <circle cx={x} cy={y} r={2.2} fill={color} />
              <title>{`${m.name} — ${m.conversations.toLocaleString()} conversations (${m.share}%)`}</title>
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute top-2 right-3 rounded-lg border border-border bg-card/90 px-2.5 py-1.5 text-[10.5px] backdrop-blur">
        {hover ? (
          <>
            <span className="font-semibold">{hover.name}</span>
            <span className="ml-2 tabular-nums text-muted-foreground">
              {hover.conversations.toLocaleString()} · FCR {hover.fcr}% · Repeat {hover.repeat}%
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Hover a market · click to drill down</span>
        )}
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[10.5px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/40 ring-1 ring-primary" /> Repeat contact at or below average
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/40 ring-1 ring-danger" /> Elevated repeat contact
        </span>
        <span className="ml-auto">Bubble size = conversation volume · simulated demo data</span>
      </div>
    </div>
  );
}
