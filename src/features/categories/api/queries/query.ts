import axiosClient from '@/lib/axios-client'
import { CategoryType } from '@/features/budgets/types/budget-types'
import { useQuery } from '@tanstack/react-query'
import { allCategoriesQueryKey } from '../key'

export const fetchAllCategories = async (): Promise<CategoryType[]> => {
  try {
    const res = await axiosClient.get('/budget-tracker/all-categories')

    return res.data?.data?.categories
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'failed to fetch')
    }
    throw new Error('failed to fetch')
  }
}

export const useCategories = () => {
  return useQuery({
    queryKey: [allCategoriesQueryKey],
    queryFn: () => fetchAllCategories(),
  })
}
