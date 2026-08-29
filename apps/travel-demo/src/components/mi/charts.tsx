import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const axis = {
  stroke: "var(--color-border)",
  tick: { fontSize: 10.5, fill: "var(--color-muted-foreground)" },
  tickLine: false,
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 10,
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-pop)",
    fontSize: 12,
    padding: "8px 10px",
  },
  labelStyle: { fontSize: 11, fontWeight: 600, marginBottom: 2 },
};

export function VolumeChart({
  data,
  height = 240,
}: {
  data: { day: string; calls: number; whatsapp: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="gCalls" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gWa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="day" {...axis} interval={4} />
        <YAxis {...axis} width={44} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="calls"
          name="Calls"
          stroke="var(--color-primary)"
          strokeWidth={2}
          fill="url(#gCalls)"
          dot={false}
          activeDot={{ r: 3 }}
        />
        <Area
          type="monotone"
          dataKey="whatsapp"
          name="WhatsApp"
          stroke="var(--color-chart-3)"
          strokeWidth={2}
          fill="url(#gWa)"
          dot={false}
          activeDot={{ r: 3 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  height = 200,
  centerLabel,
  centerValue,
}: {
  data: { name: string; value: number; color: string }[];
  height?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="88%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} formatter={(v: number, n: string) => [`${v}%`, n]} />
        </PieChart>
      </ResponsiveContainer>
      {centerValue ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[19px] leading-none font-semibold tabular-nums">{centerValue}</span>
          {centerLabel ? <span className="mt-1 text-[10.5px] text-muted-foreground">{centerLabel}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export function MiniBars({
  data,
  height = 130,
  dataKey = "calls",
  xKey = "day",
}: {
  data: Record<string, string | number>[];
  height?: number;
  dataKey?: string;
  xKey?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey={xKey} {...axis} />
        <YAxis {...axis} width={40} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey={dataKey} fill="var(--color-primary)" radius={[3, 3, 0, 0]} maxBarSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TrendLines({
  data,
  xKey,
  series,
  height = 240,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  series: { key: string; color: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey={xKey} {...axis} />
        <YAxis {...axis} width={44} />
        <Tooltip {...tooltipStyle} />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function Legend({ items }: { items: { label: string; color: string; value?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: i.color }} />
          <span className="text-[11.5px] text-muted-foreground">{i.label}</span>
          {i.value ? <span className="text-[11.5px] font-semibold tabular-nums">{i.value}</span> : null}
        </div>
      ))}
    </div>
  );
}
