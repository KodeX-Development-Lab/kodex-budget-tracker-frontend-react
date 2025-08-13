import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
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
import { BudgetCard } from '@/features/budgets/components/budget-card'
import { deleteBudgetItem } from '../budgets/api/mutations/mutation'
import { BudgetBrief } from '../budgets/components/budget-brief'
import { recentBudgetsQueryKey } from './api/key'
import { fetchCurrentMonthBudgets } from './api/queries/query'

export default function RecentBudgets() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: [recentBudgetsQueryKey],
    queryFn: fetchCurrentMonthBudgets,
  })

  const deleteBudget = useMutation({
    mutationFn: deleteBudgetItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [recentBudgetsQueryKey] })
    },
  })

  function handleDelete(id: string | number) {
    deleteBudget.mutate(id)
  }

  if (isLoading) {
    return <FullPageSpinner />
  }

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
          <h1 className='font-bold'>{moment().format('MMM YYYY')}</h1>
        </div>
        <div>
          <BudgetBrief budgetBrief={data?.brief} />
        </div>
        <div className='mt-5'>
          {data?.daily_budgets
            .filter((daily_budget) => daily_budget.items.length)
            .map((daily_budget) => (
              <BudgetCard
                key={daily_budget.id}
                daily_budget={daily_budget}
                onDelete={handleDelete}
              />
            ))}
        </div>
      </Main>
    </>
  )
}
