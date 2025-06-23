import { createFileRoute } from '@tanstack/react-router'
import AllPurchases from '@/features/purchases/all-purchases'

export const Route = createFileRoute('/_authenticated/purchases/')({
  component: AllPurchases,
})
