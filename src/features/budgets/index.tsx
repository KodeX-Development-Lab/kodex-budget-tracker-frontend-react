import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { FullPageSpinner } from '@/components/ui/fullpage-spinner'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import BudgetContextProvider, {
  useBudgetContext,
} from './context/budget-context'
import BudgetTable from './view/BudgetTable'

export default function AllBudgets() {
  return (
    <BudgetContextProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mt-5'>
          <BudgetTable />
        </div>
      </Main>
    </BudgetContextProvider>
  )
}
