import { PaginationResponseType } from '@/lib/types'

export type TotalBriefType = {
  total_income: number
  total_expense: number
  balance: number
}

export const TransactionTypes = {
  ALL: 'all',
  INCOME: 'income',
  EXPENSE: 'expense',
} as const

export const transactionTypeOptions = Object.entries(TransactionTypes).map(
  ([label, value]) => ({
    label,
    value,
  })
)

export type TransactionType = typeof TransactionTypes[keyof typeof TransactionTypes];

export const isTransactionType = (value: unknown): value is TransactionType => {
  return Object.values(TransactionTypes).includes(value as TransactionType)
}

export type IconType = {
  id: number
  name: string
}

export type CategoryType = {
  id: number
  name: string
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

export type CategoriesByParamsResponse = {
  categories: PaginationResponseType<CategoryType>
}

export type BudgetOnCategory = {
  id: number | string
  category: CategoryType
  amount: number
  percentage: number
}

export type MonthlyBudgetsReportResponse = {
  brief: TotalBriefType
  summary_budgets: SummaryBudget[]
  income_budget_on_categories: {
    total_amount: number
    items: BudgetOnCategory[]
  }
  expense_budget_on_categories: {
    total_amount: number
    items: BudgetOnCategory[]
  }
}
