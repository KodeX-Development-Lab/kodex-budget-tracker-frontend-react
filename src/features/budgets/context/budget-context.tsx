import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PaginationResponseType } from '@/lib/types'
import { allCategoriesQueryKey } from '@/features/categories/api/key'
import { useCategories } from '@/features/categories/api/queries/query'
import { useBudgetList } from '../api/queries/query'
import { BudgetItem, CategoryType, TotalBriefType } from '../types/budget-types'

interface BudgetContextType {
  isLoading: boolean
  brief: TotalBriefType
  budgets: PaginationResponseType<BudgetItem>
  categories: CategoryType[]
  setCategories: (categories: CategoryType[]) => void
}

const BudgetContext = React.createContext<BudgetContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function BudgetContextProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [brief, setBrief] = useState<TotalBriefType>()
  const [budgets, setBudgets] = useState<PaginationResponseType<BudgetItem>>()
  const [categories, setCategories] = useState<CategoryType[]>()

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories()

  const {
    data: budgetData,
    isLoading: isBudgetsLoading,
    error: budgetsError,
  } = useBudgetList()

  useMemo(() => {
    setIsLoading(isCategoriesLoading || isBudgetsLoading)
    setBrief(budgetData?.brief)
    setBudgets(budgetData?.budgets)
    setCategories(categoriesData)
  }, [
    isCategoriesLoading,
    isBudgetsLoading,
    budgetData,
    categoriesData,
    categoriesError,
    budgetsError,
  ])

  return (
    <BudgetContext.Provider
      value={{ isLoading, brief, budgets, categories, setCategories }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBudgetContext = () => {
  const budgetContext = React.useContext(BudgetContext)

  if (!budgetContext) {
    throw new Error('useTasks has to be used within <budgetContext>')
  }

  return budgetContext
}
