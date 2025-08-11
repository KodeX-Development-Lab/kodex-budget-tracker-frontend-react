import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const data = [
  { name: 'Salary', amount: 100000, value: 70, color: '#0088FE' },
  { name: 'Part-time Teaching', amount: 100000, value: 22, color: '#00C49F' },
  { name: 'Pocket-money', amount: 100000, value: 8, color: '#FFBB28' },
]

export function BudgetPieChart() {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Income Category Distribution</h2>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-6 items-center'>
          {/* Pie Chart - Added fixed height */}
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}%`, 
                    props.payload.name,
                    `$${props.payload.amount.toLocaleString()}`
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className='space-y-3'>
            {data.map((item) => (
              <div key={item.name} className='flex items-center gap-2'>
                <div
                  className='h-4 w-4 rounded-full'
                  style={{ backgroundColor: item.color }}
                />
                <Label className='font-medium'>
                  {item.name} (${item.amount.toLocaleString()}) - {item.value}%
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}