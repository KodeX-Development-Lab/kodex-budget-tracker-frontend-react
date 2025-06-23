import { createFileRoute } from '@tanstack/react-router'
import SaleReturns from '@/features/sales/sale-returns'

export const Route = createFileRoute('/_authenticated/sales/sale-returns/')({
  component: SaleReturns,
})
