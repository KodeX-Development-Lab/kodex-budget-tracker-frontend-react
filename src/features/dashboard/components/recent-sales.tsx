import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'
import { formatMoney } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { deleteBudgetItem } from '@/features/budgets/api/mutations/mutation'
import { BudgetItemComponent } from '@/features/budgets/components/budget-item'
import { BudgetItem } from '@/features/budgets/types/budget-types'
import { dashboardQueryKey } from '../api/key'

export function RecentSales({
  total_income,
  total_expense,
  items,
}: {
  total_income: number
  total_expense: number
  items: BudgetItem[]
}) {
  const queryClient = useQueryClient()

  const deleteBudget = useMutation({
    mutationFn: deleteBudgetItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [dashboardQueryKey] })
    },
  })

  function handleDelete(id: string | number) {
    deleteBudget.mutate(id)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>This Month</CardTitle>
        <CardDescription>
          <div className='flex gap-2'>
            <p>
              Income: <span>{formatMoney(total_income)}</span>,
            </p>
            <p>
              Expense: <span>{formatMoney(total_expense)}</span>
            </p>
          </div>
        </CardDescription>
        <CardAction>
          <Link to='/recent-budgets'>
            <MoveRight />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {items.map((item) => (
          <BudgetItemComponent
            key={item.id}
            item={item}
            onDelete={handleDelete}
          />
        ))}
      </CardContent>
    </Card>
  )
}
