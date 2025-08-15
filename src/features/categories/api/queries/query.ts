import { useQuery } from '@tanstack/react-query'
import axiosClient from '@/lib/axios-client'
import {
  CategoriesByParamsResponse,
  CategoryType,
  IconType,
  TransactionType,
} from '@/features/budgets/types/budget-types'
import { allCategoriesQueryKey, allIconsQueryKey, CategoriesByParamsQueryKey } from '../key'

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

type CategoriesParams = {
  page?: string | number
  per_page?: string | number
  search?: string | null
  type?: TransactionType | null
}

export const fetchCategoriesByParams = async (
  params?: CategoriesParams
): Promise<CategoriesByParamsResponse> => {
  try {
    const res = await axiosClient.get('/budget-tracker/categories', {
      params,
    })

    return res.data.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'failed to fetch')
    }
    throw new Error('failed to fetch')
  }
}

export const useCategoriesByParams = (params?: CategoriesParams) => {
  return useQuery({
    queryKey: [CategoriesByParamsQueryKey, params],
    queryFn: () => fetchCategoriesByParams(params),
  })
}


export const fetchAllIcons = async (): Promise<IconType[]> => {
  try {
    const res = await axiosClient.get('/budget-tracker/icons')

    return res.data?.data?.icons
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'failed to fetch')
    }
    throw new Error('failed to fetch')
  }
}

export const useIcons = () => {
  return useQuery({
    queryKey: [allIconsQueryKey],
    queryFn: () => fetchAllIcons(),
    // initialData: [],
  })
}