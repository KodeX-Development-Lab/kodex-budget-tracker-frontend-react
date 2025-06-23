import { createFileRoute } from '@tanstack/react-router'
import AllProducts from '@/features/products/all-products'

export const Route = createFileRoute('/_authenticated/products/')({
  component: AllProducts,
})
