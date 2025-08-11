import Monthly from '@/features/reports/monthly'
import Yearly from '@/features/reports/yearly'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports/yearly copy/')({
  component: Monthly,
})
