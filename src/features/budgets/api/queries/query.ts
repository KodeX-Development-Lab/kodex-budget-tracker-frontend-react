import { useQuery } from '@tanstack/react-query'
import axiosClient from '@/lib/axios-client'
import { AllBudgetsResponse, TransactionType } from '../../types/budget-types'
import { allBudgetsQueryKey } from '../key'

const staleTime = 2 * 60 * 1000

type BudgetListParams = {
  page?: string
  per_page?: string
  search?: string | null
}

const fetchAllBudgets = async (
  params?: BudgetListParams
): Promise<AllBudgetsResponse> => {
  try {
    const res = await axiosClient.get(`budget-tracker/budgets`, { params })

    return res.data.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'failed to fetch')
    }
    throw new Error('failed to fetch')
  }
}

export const useBudgetList = (params?: BudgetListParams) => {
  return useQuery({
    queryKey: [allBudgetsQueryKey, params],
    queryFn: () => fetchAllBudgets(params),
    staleTime,
  })
}
