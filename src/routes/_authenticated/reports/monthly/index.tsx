import { createFileRoute } from '@tanstack/react-router'
import Monthly from '@/features/reports/monthly'

type MonthReportSearch = {
  month: string
}

export const Route = createFileRoute('/_authenticated/reports/monthly/')({
  component: Monthly,
  validateSearch: (search: Record<string, unknown>): MonthReportSearch => {
    return {
      month: typeof search.month === 'string' ? search.month : '',
    }
  },
})
