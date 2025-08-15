import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import axiosClient from '@/lib/axios-client'
import { CategoryFormSchemaType } from '../../data/schema'

export async function saveCategory(payload: CategoryFormSchemaType) {
  const response = await axiosClient.post(`/budget-tracker/categories`, payload)

  return response
}

export function useSaveCategory() {
  return useMutation({
    mutationFn: (payload: CategoryFormSchemaType) => saveCategory(payload),
  })
}

export async function updateCategory(
  id: number | string,
  payload: CategoryFormSchemaType
) {
  const response = await axiosClient.put(`/budget-tracker/categories/${id}`, payload)

  return response
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: (data: {
      id: number | string
      payload: CategoryFormSchemaType
    }) => updateCategory(data.id, data.payload),
  })
}

export async function deleteCategory(id: string | number) {
  const response = await axiosClient.delete(`/budget-tracker/categories/${id}`)

  return response
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id: string | number) => deleteCategory(id),
  })
}
