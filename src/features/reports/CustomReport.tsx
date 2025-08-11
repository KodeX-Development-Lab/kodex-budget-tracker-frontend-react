import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import DatePicker from 'react-datepicker'
import { fetchOverviewDashboardData } from '@/lib/budget-fetcher'
import { Button } from '@/components/ui/button'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { BudgetCard } from '@/components/budget/budget-card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import IncomeExpenseGraph from '../dashboard/components/overview'
import { BudgetPieChart } from './components/piechart'

export default function CustomReport() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  // const { data } = useQuery({
  //   queryKey: ['overviewDashboard'],
  //   queryFn: fetchOverviewDashboardData,
  // })

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
            {/* <h1>From 04-01-2025 To 22-7-2025</h1>
             */}
            <div className='flex'>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date as any)}
                />
              </div>
              <div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date as any)}
                />
              </div>
            </div>

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
