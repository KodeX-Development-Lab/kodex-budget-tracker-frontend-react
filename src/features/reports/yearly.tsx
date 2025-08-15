import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/reports/yearly'
import { ArrowRight } from 'lucide-react'
import moment from 'moment'
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
import { YearPicker } from '@/components/year-picker'
import { BudgetCard } from '@/features/budgets/components/budget-card'
import { BudgetBrief } from '../budgets/components/budget-brief'
import IncomeExpenseGraph from '../budgets/components/income-expense-line-graph'
import { useYearlyBudgetsReport } from './api/queries/query'
import { BudgetPieChart } from './components/piechart'

export default function Yearly() {
  const searchParams = Route.useSearch()
  const navigate = Route.useNavigate()

  const [date, setDate] = useState<Date>(new Date())
  useMemo(() => {
    if (searchParams.year) {
      const newDate = moment(searchParams.year, 'YYYY').toDate()
      if (!moment(newDate).isSame(date, 'year')) {
        setDate(newDate)
      }
    }
  }, [searchParams.year])

  const handleYearChange = (value: Date) => {
    setDate(value)

    navigate({
      search: {
        year: moment(value).format('YYYY'),
      },
    })
  }

  const params = useMemo(
    () => ({
      year: searchParams.year || '',
    }),
    [searchParams]
  )

  const { data, isLoading } = useYearlyBudgetsReport(params)

  if (isLoading) return <FullPageSpinner />

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
            <div className='p-4'>
              <YearPicker value={date} onChange={handleYearChange} />
              <div className='text-muted-foreground mt-4 text-sm'>
                Selected Year: {date.getFullYear()}
              </div>
            </div>
            <div>
              <BudgetBrief budgetBrief={data?.brief} />
            </div>
            <div className='my-5'>
              <IncomeExpenseGraph data={data?.summary_budgets} />
            </div>
            <div className='mt-10 grid gap-4 md:grid-cols-2'>
              <BudgetPieChart
                title='Income'
                total_amount={data?.income_budget_on_categories.total_amount}
                data={data?.income_budget_on_categories.items}
              />
              <BudgetPieChart
                title='Expense'
                total_amount={data?.expense_budget_on_categories.total_amount}
                data={data?.expense_budget_on_categories.items}
              />
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
