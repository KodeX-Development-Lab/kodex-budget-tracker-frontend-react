import { DailyBudgetCard, TotalBriefType } from "@/features/budgets/types/budget-types"

export type MonthlyBudgetsResponse = {
    brief: TotalBriefType,
    daily_budgets: DailyBudgetCard[]
}