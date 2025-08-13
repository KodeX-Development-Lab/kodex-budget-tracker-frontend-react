import { PaginationResponseType } from '@/lib/types'

export type TotalBriefType = {
  total_income: number
  total_expense: number
  balance: number
}

export const TransactionTypes = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const

export type TransactionType = 'income' | 'expense'

export type IconType = {
  id: number
  name: string
}

export type CategoryType = {
  id: number
  name: number
  type: TransactionType
  color: string
  is_default_by_system: boolean
  status: boolean
  icon: IconType
}

export type BudgetItem = {
  id: number | string
  type: TransactionType
  amount: number
  remark: string
  processed_at: string
  category: CategoryType
}

export type DailyBudgetCard = {
  id: number | string
  date: string
  total_income: number
  total_expense: number
  balance: number
  items: BudgetItem[]
}

export type SummaryBudget = {
  label: string
  income: number
  expense: number
  balance: number
}

export type AllBudgetsResponse = {
  brief: TotalBriefType
  budgets: PaginationResponseType<BudgetItem>
}
