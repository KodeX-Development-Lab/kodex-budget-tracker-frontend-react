import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import axiosClient from '@/lib/axios-client'
import { BudgetFormSchemaType } from '../../data/schema'

export async function saveBudgetItem(payload: BudgetFormSchemaType) {
  const data = {
    ...payload,
    processed_at: moment(payload.processed_at).format('YYYY-MM-DD HH:mm:ss'),
  }
  const response = await axiosClient.post(`/budget-tracker/budgets`, data)

  return response
}

export function useSaveBudgetItem() {
  return useMutation({
    mutationFn: (payload: BudgetFormSchemaType) => saveBudgetItem(payload),
  })
}

export async function updateBudgetItem(
  id: number | string,
  payload: BudgetFormSchemaType
) {
  const data = {
    ...payload,
    processed_at: moment(payload.processed_at).format('YYYY-MM-DD HH:mm:ss'),
  }
  const response = await axiosClient.put(`/budget-tracker/budgets/${id}`, data)

  return response
}

export function useUpdateBudgetItem() {
  return useMutation({
    mutationFn: (data: {
      id: number | string
      payload: BudgetFormSchemaType
    }) => updateBudgetItem(data.id, data.payload),
  })
}

export async function deleteBudgetItem(id: string | number) {
  const response = await axiosClient.delete(`/budget-tracker/budgets/${id}`)

  return response
}

export function useDeleteBudgetItem() {
  return useMutation({
    mutationFn: (id: string | number) => deleteBudgetItem(id),
  })
}
