import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import Year from 'node_modules/react-datepicker/dist/year'
import { fetchOverviewDashboardData } from '@/lib/budget-fetcher'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FullPageSpinner } from '@/components/ui/fullpage-spinner'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { BudgetBrief } from '../budgets/components/budget-brief'
import YearlyLineGraph from '../budgets/components/yearly-line-graph'
import { dashboardQueryKey } from './api/key'
import { fetchDashboardData } from './api/queries/query'
import { RecentSales } from './components/recent-sales'

export default function Dashboard() {
  
  const { data } = useQuery({
    queryKey: [dashboardQueryKey],
    queryFn: fetchDashboardData,
  })

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
        <div>
          <BudgetBrief budgetBrief={data?.brief} />
        </div>
        <div className='mt-5'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <div className='rounded-lg bg-slate-100 p-4'>
              <RecentSales
                total_income={
                  data?.current_month_recent_budgets?.total_income ?? 0
                }
                total_expense={
                  data?.current_month_recent_budgets?.total_expense ?? 0
                }
                items={data?.current_month_recent_budgets?.items ?? []}
              />
            </div>
            <div className='rounded-lg bg-slate-100 p-4'>
              <Card>
                <CardHeader>
                  <CardTitle>This Year</CardTitle>
                </CardHeader>

                <CardContent className='pl-2'>
                  <YearlyLineGraph
                    summary_budgets={data?.summary_budgets ?? []}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
