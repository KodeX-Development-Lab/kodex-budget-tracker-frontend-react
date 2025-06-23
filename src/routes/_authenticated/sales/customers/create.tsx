import { createFileRoute } from '@tanstack/react-router'
import CustomersForm from '@/features/sales/customers/pages/customers-form'

export const Route = createFileRoute('/_authenticated/sales/customers/create')({
  component: CustomersForm,
})
