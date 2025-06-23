import { createFileRoute } from '@tanstack/react-router'
import Suppliers from '@/features/purchases/suppliers'

export const Route = createFileRoute('/_authenticated/purchases/suppliers/')({
  component: Suppliers,
})
