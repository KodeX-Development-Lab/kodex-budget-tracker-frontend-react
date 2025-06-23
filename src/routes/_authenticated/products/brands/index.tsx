import { createFileRoute } from '@tanstack/react-router'
import Brands from '@/features/products/brands'

export const Route = createFileRoute('/_authenticated/products/brands/')({
  component: Brands,
})
