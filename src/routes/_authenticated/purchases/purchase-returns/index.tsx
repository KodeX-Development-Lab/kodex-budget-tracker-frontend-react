import { createFileRoute } from '@tanstack/react-router'
import PurchaseReturns from '@/features/purchases/purchase-returns'

export const Route = createFileRoute(
  '/_authenticated/purchases/purchase-returns/'
)({
  component: PurchaseReturns,
})
