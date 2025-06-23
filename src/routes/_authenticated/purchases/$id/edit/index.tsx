import { createFileRoute } from '@tanstack/react-router'
import AllPurchasesForm from '@/features/purchases/all-purchases/pages/all-purchases-form/all-purchases-form'

export const Route = createFileRoute('/_authenticated/purchases/$id/edit/')({
  component: AllPurchasesForm,
})
