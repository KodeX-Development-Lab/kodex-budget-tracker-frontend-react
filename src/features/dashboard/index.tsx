import { useQuery } from '@tanstack/react-query'
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
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import IncomeExpenseGraph  from './components/overview'
import { RecentSales } from './components/recent-sales'
import { Link } from '@tanstack/react-router'

export default function Dashboard() {
  // const { data } = useQuery({
  //   queryKey: ['overviewDashboard'],
  //   queryFn: fetchOverviewDashboardData,
  // })

  const data = [
    { month: "Jan", income: 160000, expense: 95000 },
    { month: "Feb", income: 150000, expense: 120000 },
    { month: "Mar", income: 130000, expense: 75000 },
    { month: "Apr", income: 130000, expense: 65000 },
    { month: "May", income: 30000, expense: 32000 },
    { month: "Jun", income: 30000, expense: 34000 },
    { month: "Jul", income: 125000, expense: 120000 },
    { month: "Aug", income: 125000, expense: 120000 },
    { month: "Sep", income: 125000, expense: 120000 },
    { month: "Nov", income: 125000, expense: 120000 },
    { month: "Dec", income: 125000, expense: 120000 },
  ];

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
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle className='flex justify-between'>
                    <div>Recent</div>
                    <Link to='/recent-budgets'><ArrowRight /></Link>
                  </CardTitle>
                  <CardDescription>
                    This month Income: $20000, Expense: $8000
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales/>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>This Year</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <IncomeExpenseGraph data={data} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
