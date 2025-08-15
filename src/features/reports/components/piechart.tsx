import { useMemo, useState } from 'react'
import { color } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import LucideIconByName from '@/components/lucideiconbyname'
import { BudgetOnCategory } from '@/features/budgets/types/budget-types'
import { formatMoney } from '@/lib/utils'

type BudgetPieChartProps = {
  title: string
  total_amount: number
  data: BudgetOnCategory[]
}

type PieChartDataType = {
  id: number
  name: string
  color: string
  amount: number
}

export function BudgetPieChart({ title, total_amount, data }: BudgetPieChartProps) {

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <h2 className='text-xl font-semibold'>{title} (Total: {formatMoney(total_amount)})</h2>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center gap-6'>
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='percentage'
                  label={({ category, percent }) =>
                    `${category.name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${entry.category.name}`} fill={entry.category.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(percentage, name, props) => [
                    `${percentage}%`,
                    props.payload.category.name,
                    `$${props.payload.amount.toLocaleString()}`,
                  ]}
                />
                {/* <Legend /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className='space-y-3'>
            {data.map((item) => (
              <div key={item.category.name} className='flex items-center gap-2'>
                <div
                  className='flex h-12 w-12 items-center justify-center rounded-full p-3'
                  style={{ backgroundColor: item.category.color }}
                >
                  <span className='flex items-center justify-center text-xl text-white'>
                    <LucideIconByName name={item.category.icon.name} />
                  </span>
                </div>
                <Label className='font-medium'>
                  {item.category.name} ({item.amount.toLocaleString()}) -{' '}
                  {item.percentage}%
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
