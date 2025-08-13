import { AxiosResponse } from 'axios'
import axiosClient from '@/lib/axios-client'
import { MonthlyBudgetsResponse } from '../../types/types'

export const fetchCurrentMonthBudgets =
  async (): Promise<MonthlyBudgetsResponse> => {
    try {
      const res: any = await axiosClient.get('/budget-tracker/monthly-budgets')

      return res.data?.data
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'failed to fetch')
      }
      throw new Error('failed to fetch')
    }
  }
