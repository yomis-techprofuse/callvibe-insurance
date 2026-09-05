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

export function AreaTrend({
  data,
  dataKey = "value",
  height = 220,
  color = "var(--color-primary)",
  name = "Value",
}: {
  data: Record<string, unknown>[];
  dataKey?: string;
  height?: number;
  color?: string;
  name?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={`g-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="day" {...axis} axisLine={false} />
        <YAxis {...axis} axisLine={false} width={44} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey={dataKey} name={name} stroke={color} strokeWidth={2} fill={`url(#g-${dataKey})`} dot={false} activeDot={{ r: 3 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MultiLine({
  data,
  series,
  height = 240,
}: {
  data: Record<string, unknown>[];
  series: { key: string; name: string; color: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="day" {...axis} axisLine={false} />
        <YAxis {...axis} axisLine={false} width={44} />
        <Tooltip {...tooltipStyle} />
        {series.map((s) => (
          <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={false} activeDot={{ r: 3 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ColumnChart({
  data,
  height = 220,
  color = "var(--color-primary)",
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="label" {...axis} axisLine={false} interval={0} height={40} angle={-12} textAnchor="end" />
        <YAxis {...axis} axisLine={false} width={44} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
        <Bar dataKey="value" name="Value" fill={color} radius={[5, 5, 0, 0]} maxBarSize={38} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const donutColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function DonutChart({
  data,
  height = 200,
  centerLabel,
  centerValue,
}: {
  data: { name: string; value: number }[];
  height?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="88%" paddingAngle={2} stroke="none">
            {data.map((_, i) => (
              <Cell key={i} fill={donutColors[i % donutColors.length]} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
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

export function Legend({ items }: { items: { label: string; color: string; value?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: i.color }} />
          {i.label}
          {i.value ? <span className="font-semibold text-foreground tabular-nums">{i.value}</span> : null}
        </span>
      ))}
    </div>
  );
}

export const chartColors = donutColors;

export function Sparkline({ data, height = 44, color = "var(--color-primary)" }: { data: { day: string; value: number }[]; height?: number; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        <Tooltip {...tooltipStyle} />
      </LineChart>
    </ResponsiveContainer>
  );
}
