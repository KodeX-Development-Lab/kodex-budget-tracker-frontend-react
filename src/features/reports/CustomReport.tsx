import { useMemo, useState } from 'react'
import { Route } from '@/routes/_authenticated/reports/custom'
import moment from 'moment'
import { FullPageSpinner } from '@/components/ui/fullpage-spinner'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import TableLoadingSkeleton from '@/components/TableLoadingSkeleton'
import { DatePickerFilter } from '@/components/date-picker-filter'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { BudgetBrief } from '../budgets/components/budget-brief'
import { useCustomDatesBudgetsReport } from './api/queries/query'
import { BudgetPieChart } from './components/piechart'

export default function CustomReport() {
  const searchParams = Route.useSearch()
  const navigate = Route.useNavigate()

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  useMemo(() => {
    if (searchParams.start_date) {
      const newDate = moment(searchParams.start_date).toDate()
      setStartDate(newDate)
    }

    if (searchParams.end_date) {
      const newDate = moment(searchParams.end_date).toDate()
      setEndDate(newDate)
    }
  }, [searchParams.start_date, searchParams.end_date])

  const handleStartDateChange = (value: Date) => {
    setStartDate(value)

    navigate({
      search: (prev) => ({
        ...prev, // Keep existing search params
        start_date: moment(value).format('YYYY-MM-DD'),
      }),
    })
  }

  const handleEndDateChange = (value: Date) => {
    setEndDate(value)

    navigate({
      search: (prev) => ({
        ...prev, // Keep existing search params
        end_date: moment(value).format('YYYY-MM-DD'),
      }),
    })
  }

  const params = useMemo(
    () => ({
      start_date: searchParams.start_date || '',
      end_date: searchParams.end_date || '',
    }),
    [searchParams]
  )

  const { data, isLoading } = useCustomDatesBudgetsReport(params)

  if (isLoading) return <TableLoadingSkeleton />

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
            <div className='flex gap-1'>
              <div>
                <DatePickerFilter
                  placeholder='Start Date'
                  date={startDate}
                  setDate={handleStartDateChange}
                />
              </div>
              <div>
                <DatePickerFilter
                  placeholder='End Date'
                  date={endDate}
                  setDate={handleEndDateChange}
                />
              </div>
            </div>

            <div>
              <BudgetBrief budgetBrief={data?.brief} />
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
