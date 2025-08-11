import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export default function IncomeExpenseGraph({data}: {data: any}) {
  return (
    <div className="w-full h-[400px] text-white rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Income Expense Line Graph</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip
            formatter={(value: number) => `${value.toLocaleString()} ks`}
            contentStyle={{ backgroundColor: "#333", borderColor: "#555", color: "#fff" }}
          />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="lime" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="expense" stroke="red" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}