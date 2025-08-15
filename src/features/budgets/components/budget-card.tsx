import React from 'react'
import { Music, Home } from 'lucide-react'
import { formatMoney } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { DailyBudgetCard } from '../types/budget-types'
import { BudgetItemComponent } from './budget-item'
import moment from 'moment'

export const BudgetCard = ({
  daily_budget,
  onDelete,
}: {
  daily_budget: DailyBudgetCard
  onDelete: (id: string | number) => void
}) => {
  return (
    <Card className='mx-auto mt-3 w-full max-w-md bg-[#2f2f2f] text-white shadow-lg'>
      <div className='flex items-center justify-between rounded-t-md bg-[#3f3f3f] px-4 py-2'>
        <span>{ moment(daily_budget.date).format("MMM DD, YYYY") }</span>
        <span className='text-sm'>
          income:{' '}
          <span className='text-[var(--income)]'>
            {formatMoney(daily_budget.total_income)}
          </span>{' '}
          &nbsp; expense:{' '}
          <span className='text-[var(--expense)]'>
            {formatMoney(daily_budget.total_expense)}
          </span>
        </span>
      </div>
      <CardContent className='divide-y divide-gray-700 p-0 px-3'>
        {daily_budget.items.map((item) => (
          <BudgetItemComponent
            key={item.id}
            item={item}
            onDelete={onDelete}
          />
        ))}
        {/* <div className='px-4 py-2 text-sm text-gray-400'>
          17.39% of your monthly income was spent.
        </div> */}
      </CardContent>
    </Card>
  )
}
