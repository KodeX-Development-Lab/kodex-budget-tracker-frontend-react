export type TotalBriefType = {
  total_income: number
  total_expense: number
  balance: number
}

export type TransactionType = 'income' | 'expense'

export type IconType = {
  id: number
  name: number
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
  id: number
  type: TransactionType
  amount: number
  remark: string
  processed_at: string
  category: CategoryType
}
