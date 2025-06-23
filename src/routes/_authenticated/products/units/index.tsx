import { createFileRoute } from '@tanstack/react-router'
import Units from '@/features/products/units'

export const Route = createFileRoute('/_authenticated/products/units/')({
  component: Units,
})
