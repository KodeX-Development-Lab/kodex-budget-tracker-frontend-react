import { createFileRoute } from '@tanstack/react-router'
import CustomReport from '@/features/reports/CustomReport'

export const Route = createFileRoute('/_authenticated/reports/custom/')({
  component: CustomReport,
})
