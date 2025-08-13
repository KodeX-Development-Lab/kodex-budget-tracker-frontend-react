import { AxiosResponse } from 'axios'
import axiosClient from '@/lib/axios-client'
import { DashboardResponse } from '../../types/Dashboard'

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  try {
    const res: any = await axiosClient.get('/budget-tracker/overview-report')

    return res.data.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'failed to fetch employee list')
    }
    throw new Error('failed to fetch employee list')
  }
}
