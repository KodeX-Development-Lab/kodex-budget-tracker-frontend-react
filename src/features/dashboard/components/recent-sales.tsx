import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BudgetItem } from '@/components/budget/budget-item'

export function RecentSales() {
  return (
    <div className='space-y-8'>
      <BudgetItem />
      <BudgetItem />
      <BudgetItem />
      <BudgetItem />
    </div>
  )
}
