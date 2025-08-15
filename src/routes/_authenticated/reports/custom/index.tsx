import { createFileRoute } from '@tanstack/react-router'
import CustomReport from '@/features/reports/CustomReport'

type CustomReportSearch = {
  start_date: string
  end_date: string
}

export const Route = createFileRoute('/_authenticated/reports/custom/')({
  component: CustomReport,
  validateSearch: (search: Record<string, unknown>): CustomReportSearch => {
    return {
      start_date:
        typeof search.start_date === 'string' ? search.start_date : '',
      end_date: typeof search.end_date === 'string' ? search.end_date : '',
    }
  },
})
