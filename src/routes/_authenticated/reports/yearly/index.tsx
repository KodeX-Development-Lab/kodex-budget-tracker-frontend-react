import { createFileRoute } from '@tanstack/react-router'
import Yearly from '@/features/reports/yearly'

type YearlyReportSearch = {
  year: string
}


export const Route = createFileRoute('/_authenticated/reports/yearly/')({
  component: Yearly,
validateSearch: (search: Record<string, unknown>): YearlyReportSearch => {
    return {
      year: typeof search.year === 'string' ? search.year : '',
    }
  },
})
