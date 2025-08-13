import { useFormContext, UseFormReturn } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axiosClient from '@/lib/axios-client'
import { BudgetFormSchemaType } from '../../data/schema'

export async function saveBudgetItem(payload: BudgetFormSchemaType) {
  const response = await axiosClient.post(`/budget-tracker/budgets`, payload)

  return response
}

export function useSaveBudgetItem() {
  return useMutation({
    mutationFn: (payload: BudgetFormSchemaType) => saveBudgetItem(payload),
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