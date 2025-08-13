import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { fetchOverviewDashboardData } from '@/lib/budget-fetcher'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { BudgetCard } from '@/features/budgets/components/budget-card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import IncomeExpenseGraph from '../dashboard/components/overview'
import { BudgetPieChart } from './components/piechart'
import { MonthPicker } from '@/components/month-picker'
import { useState } from 'react'

export default function Monthly() {
  const data = [
    { month: 'Jul 01', income: 160000, expense: 95000 },
    { month: 'Jul 04', income: 150000, expense: 120000 },
    { month: 'Jul 06', income: 130000, expense: 75000 },
    { month: 'Jul 08', income: 130000, expense: 65000 },
    { month: 'Jul 13', income: 30000, expense: 32000 },
    { month: 'Jul 16', income: 30000, expense: 34000 },
    { month: 'Jul 20', income: 125000, expense: 120000 },
    { month: 'Jul 22', income: 125000, expense: 120000 },
  ]

  // const { data } = useQuery({
  //   queryKey: ['overviewDashboard'],
  //   queryFn: fetchOverviewDashboardData,
  // })

  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'></div>
          <TabsContent value='overview' className='space-y-4'>
            {/* <h1>July, 2025</h1> */}
            <MonthPicker value={date} onChange={setDate} />
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
                  <div className='text-2xl font-bold'>$ 10000</div>
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
                  <div className='text-2xl font-bold'>$ 0</div>
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
                  <div className='text-2xl font-bold'>$ 1000</div>
                  {/* <p className='text-muted-foreground text-xs'>
                    +20.1% from last month
                  </p> */}
                </CardContent>
              </Card>
            </div>
            <div className='my-5'>
              <IncomeExpenseGraph data={data} />
            </div>
            <div className='mt-10 grid gap-4 px-20 md:grid-cols-2'>
              <BudgetPieChart />
              <BudgetPieChart />
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
