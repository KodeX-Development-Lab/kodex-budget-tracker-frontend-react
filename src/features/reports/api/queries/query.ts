import { useQuery } from '@tanstack/react-query'
import axiosClient from '@/lib/axios-client'
import { MonthlyBudgetsReportResponse } from '@/features/budgets/types/budget-types'
import {
  monthlyBudgetsReportQueryKey,
  yearlyBudgetsReportQueryKey,
} from '../key'

const staleTime = 2 * 60 * 1000

type MonthlyReportParams = {
  month?: string
}

const fetchMonthlyBudgetsReport = async (
  params?: MonthlyReportParams
): Promise<MonthlyBudgetsReportResponse> => {
  try {
    const res = await axiosClient.get(`budget-tracker/reports/monthly`, {
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

export const useMonthlyBudgetsReport = (params?: MonthlyReportParams) => {
  return useQuery({
    queryKey: [monthlyBudgetsReportQueryKey, params],
    queryFn: () => fetchMonthlyBudgetsReport(params),
    staleTime,
  })
}

type YearlyReportParams = {
  year?: string | null
}

const fetchYearlyBudgetsReport = async (
  params?: YearlyReportParams
): Promise<MonthlyBudgetsReportResponse> => {
  try {
    const res = await axiosClient.get(`budget-tracker/reports/yearly`, {
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

export const useYearlyBudgetsReport = (params?: YearlyReportParams) => {
  return useQuery({
    queryKey: [yearlyBudgetsReportQueryKey, params],
    queryFn: () => fetchYearlyBudgetsReport(params),
    staleTime,
  })
}

type CstomDatesReportParams = {
  start_date?: string | null
  end_date?: string | null
}

const fetchCsutomDatesBudgetsReport = async (
  params?: CstomDatesReportParams
): Promise<MonthlyBudgetsReportResponse> => {
  try {
    const res = await axiosClient.get(`budget-tracker/reports/custom`, {
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

export const useCustomDatesBudgetsReport = (
  params?: CstomDatesReportParams
) => {
  return useQuery({
    queryKey: [yearlyBudgetsReportQueryKey, params],
    queryFn: () => fetchCsutomDatesBudgetsReport(params),
    staleTime,
  })
}
