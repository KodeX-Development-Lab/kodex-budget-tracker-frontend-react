import { createFileRoute } from '@tanstack/react-router'
import Categories from '@/features/products/categories'

export const Route = createFileRoute('/_authenticated/products/categories/')({
  component: Categories,
})
