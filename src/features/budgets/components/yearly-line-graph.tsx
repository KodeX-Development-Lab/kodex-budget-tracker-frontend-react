import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SummaryBudget } from '../types/budget-types'
import IncomeExpenseGraph from './income-expense-line-graph'

export default function YearlyLineGraph({
  summary_budgets,
}: {
  summary_budgets: SummaryBudget[]
}) {
  const inputData = summary_budgets

  const allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const filledData = allMonths.map((month) => {
    const existing = inputData.find((item) => item.label === month)
    if (existing) return existing

    return {
      label: month,
      income: 0,
      expense: 0,
      balance: 0, // income - expense
    }
  })

  // const result = {
  //   labels: filledData.map((data) => data.label),
  //   datasets: [
  //     {
  //       label: 'Income',
  //       backgroundColor: '#08fa08',
  //       borderColor: '#08fa08',
  //       data: filledData.map((data) => data.income),
  //     },
  //     {
  //       label: 'Expense',
  //       backgroundColor: '#fa0808',
  //       borderColor: '#fa0808',
  //       data: filledData.map((data) => data.expense),
  //     },
  //   ],
  // }

  return <IncomeExpenseGraph data={filledData} />
}
