import { createFileRoute } from '@tanstack/react-router'
import AllProductsForm from '@/features/products/all-products/pages/all-products-form/all-products-form'

export const Route = createFileRoute('/_authenticated/products/create')({
  component: AllProductsForm,
})
