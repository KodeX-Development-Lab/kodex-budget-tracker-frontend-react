import { createFileRoute } from '@tanstack/react-router'
import AllSalesForm from '@/features/sales/all-sales/pages/all-sales-form'

export const Route = createFileRoute('/_authenticated/sales/create')({
  component: AllSalesForm,
})
