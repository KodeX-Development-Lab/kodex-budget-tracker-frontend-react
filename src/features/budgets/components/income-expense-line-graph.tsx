import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function IncomeExpenseGraph({ data }: { data: any }) {
  return (
    <div className='h-[400px] w-full rounded-xl p-4 text-white'>
      <h2 className='mb-4 text-xl font-semibold'>Income Expense Line Graph</h2>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <XAxis dataKey='label' stroke='#ccc' />
          <YAxis
            stroke='#ccc'
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            formatter={(value: number) => `${value.toLocaleString()} ks`}
            contentStyle={{
              backgroundColor: '#333',
              borderColor: '#555',
              color: '#fff',
            }}
          />
          <Legend />
          <Line
            type='monotone'
            dataKey='income'
            stroke='lime'
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type='monotone'
            dataKey='expense'
            stroke='red'
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
