import { createFileRoute } from '@tanstack/react-router'
import AllSales from '@/features/sales/all-sales'

export const Route = createFileRoute('/_authenticated/sales/')({
  component: AllSales,
})
