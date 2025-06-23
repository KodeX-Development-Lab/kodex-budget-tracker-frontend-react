import { createFileRoute } from '@tanstack/react-router'
import Customers from '@/features/sales/customers'

export const Route = createFileRoute('/_authenticated/sales/customers/')({
  component: Customers,
})
