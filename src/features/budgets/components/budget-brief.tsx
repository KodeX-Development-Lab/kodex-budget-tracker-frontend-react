import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { DollarSign, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../../../components/ui/button'
import { TotalBriefType } from '../types/budget-types'
import { formatMoney } from '@/lib/utils'

export const BudgetBrief = ({
  budgetBrief,
}: {
  budgetBrief: TotalBriefType
}) => {
  return (
    <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
      <div className='w-full overflow-x-auto pb-2'></div>
      <TabsContent value='overview' className='space-y-4'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Income
              </CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-muted-foreground h-4 w-4'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$ {formatMoney(budgetBrief?.total_income)}</div>
              {/* <p className='text-muted-foreground text-xs'>
                    +20.1% from last month
                  </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Expense
              </CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-muted-foreground h-4 w-4'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$ {formatMoney(budgetBrief?.total_expense)}</div>
              {/* <p className='text-muted-foreground text-xs'>
                    +20.1% from last month
                  </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Balance</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-muted-foreground h-4 w-4'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$ {formatMoney(budgetBrief?.balance)}</div>
              {/* <p className='text-muted-foreground text-xs'>
                    +20.1% from last month
                  </p> */}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
