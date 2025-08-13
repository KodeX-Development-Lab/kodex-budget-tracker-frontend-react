import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { FullPageSpinner } from '@/components/ui/fullpage-spinner'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { allCategoriesQueryKey } from '../categories/api/key'
import { fetchAllCategoriess } from '../categories/api/queries/query'
import { allBudgetsQueryKey } from './api/key'
import { deleteBudgetItem } from './api/mutations/mutation'
import { fetchAllBudgets } from './api/queries/query'
import { BudgetBrief } from './components/budget-brief'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import BudgetContextProvider, {
  useBudgetContext,
} from './context/budget-context'
import BudgetTable from './view/BudgetTable'

export default function AllBudgets() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [start_date, setStartDate] = useState(null)
  const [end_date, setEndDate] = useState(null)
  const { isLoading, brief } = useBudgetContext()

  const params = {
    page,
    search: search.trim() || null,
    type: 'all' as const,
    start_date: null,
    end_date: null,
  }

  const deleteBudget = useMutation({
    mutationFn: deleteBudgetItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [allBudgetsQueryKey] })
    },
  })

  if(isLoading) return <FullPageSpinner />

  return (
    <>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div>
          <BudgetBrief budgetBrief={brief} />
        </div>
        <div className='mt-5'>
          <BudgetTable />
        </div>
      </Main>
    </>
  )
}
