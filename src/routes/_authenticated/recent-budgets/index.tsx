import { createFileRoute } from '@tanstack/react-router'
import RecentBudgets from '@/features/recent-budgets'

export const Route = createFileRoute('/_authenticated/recent-budgets/')({
  component: RecentBudgets,
})
