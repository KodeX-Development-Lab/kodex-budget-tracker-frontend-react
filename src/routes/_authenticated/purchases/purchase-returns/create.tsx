import { createFileRoute } from '@tanstack/react-router'
import PurchaseReturnsForm from '@/features/purchases/purchase-returns/pages/purchase-returns-form'

export const Route = createFileRoute(
  '/_authenticated/purchases/purchase-returns/create'
)({
  component: PurchaseReturnsForm,
})
