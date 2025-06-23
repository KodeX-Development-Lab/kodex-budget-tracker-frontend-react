import { createFileRoute } from '@tanstack/react-router'
import SuppliersForm from '@/features/purchases/suppliers/pages/suppliers-form/suppliers-form'

export const Route = createFileRoute(
  '/_authenticated/purchases/suppliers/create'
)({
  component: SuppliersForm,
})
