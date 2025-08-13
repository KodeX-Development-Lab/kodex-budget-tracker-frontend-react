import {
  BudgetItem,
  SummaryBudget,
  TotalBriefType,
} from '@/features/budgets/types/budget-types'

export type DashboardResponse = {
  brief: TotalBriefType
  current_month_recent_budgets: {
    total_income: number
    total_expense: number
    items: BudgetItem[]
  }
  summary_budgets: SummaryBudget[]
}
