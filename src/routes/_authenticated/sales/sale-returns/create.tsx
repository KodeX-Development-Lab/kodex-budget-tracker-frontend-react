import { createFileRoute } from '@tanstack/react-router'
import SaleReturnsForm from '@/features/sales/sale-returns/pages/sale-returns-form'

export const Route = createFileRoute(
  '/_authenticated/sales/sale-returns/create'
)({
  component: SaleReturnsForm,
})
