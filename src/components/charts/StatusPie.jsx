import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444"];

function StatusPie({ data }) {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[420px]">
  <h3 className="font-semibold mb-4 text-lg">
    Loyihalar holati
  </h3>

  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        outerRadius={130}   // ❗ oldin 90 edi
        label
      >
        {chartData.map((_, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>

    <div className="flex justify-center gap-6 mt-4 text-sm">
    {chartData.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
        <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[i] }}
        />
        <span>{item.name}: {item.value}</span>
        </div>
    ))}
    </div>

</div>

  );
}

export default StatusPie;
