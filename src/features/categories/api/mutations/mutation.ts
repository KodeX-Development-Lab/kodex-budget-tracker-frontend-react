import axiosClient from '@/lib/axios-client'

export async function saveBudgetItem() {
  const response = await axiosClient.post(`/budget-tracker/budgets`)

  return response
}


export async function deleteBudgetItem(id: string | number) {
  const response = await axiosClient.delete(`/budget-tracker/budgets/${id}`)

  return response
}
