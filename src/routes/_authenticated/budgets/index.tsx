import { createFileRoute } from '@tanstack/react-router'
import Budgets from '@/features/budgets'
import {
  isTransactionType,
  TransactionType,
  TransactionTypes,
} from '@/features/budgets/types/budget-types'

type BudgetSearchSortOptions = 'processed_at' | '-processed_at' | ''

type BudgetSearch = {
  type: TransactionType
  page: number
  per_page: number
  sort: BudgetSearchSortOptions
}

export const Route = createFileRoute('/_authenticated/budgets/')({
  component: Budgets,
  validateSearch: (search: Record<string, unknown>): BudgetSearch => {
    return {
      page: Number(search?.page ?? 1),
      per_page: Number(search?.per_page ?? 10),
      sort: (search.sort as BudgetSearchSortOptions) || '',
      type: isTransactionType(search.type) ? search.type : TransactionTypes.ALL,
    }
  },
})
