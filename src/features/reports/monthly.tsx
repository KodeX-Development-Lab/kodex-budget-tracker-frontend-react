import { useCallback, useEffect, useMemo, useState } from 'react'
import { Route } from '@/routes/_authenticated/reports/monthly'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FullPageSpinner } from '@/components/ui/fullpage-spinner'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { MonthPicker } from '@/components/month-picker'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { BudgetBrief } from '../budgets/components/budget-brief'
import IncomeExpenseGraph from '../budgets/components/income-expense-line-graph'
import { useMonthlyBudgetsReport } from './api/queries/query'
import { BudgetPieChart } from './components/piechart'
import moment from 'moment'

export default function Monthly() {
  const searchParams = Route.useSearch()
  const navigate = Route.useNavigate()
  const [date, setDate] = useState<Date>(() => {
    return searchParams.month 
      ? moment(searchParams.month, 'YYYY-MM').toDate()
      : new Date()
  })

  useMemo(() => {
    if (searchParams.month) {
      const newDate = moment(searchParams.month, 'YYYY-MM').toDate()
      if (!moment(newDate).isSame(date, 'month')) {
        setDate(newDate)
      }
    }
  }, [searchParams.month])

  const handleMonthChange = (value: Date) => {
    setDate(value)

    navigate({
      search: {
        month: moment(value).format('YYYY-MM'),
      },
    })
  }

   const params = useMemo(
    () => ({
      month: searchParams.month || moment(date).format('YYYY-MM'),
    }),
    [searchParams.month, date]
  )

  const { data, isLoading } = useMonthlyBudgetsReport(params)

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
            {/* <h1>July, 2025</h1> */}
            <MonthPicker value={date} onChange={handleMonthChange} />
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
