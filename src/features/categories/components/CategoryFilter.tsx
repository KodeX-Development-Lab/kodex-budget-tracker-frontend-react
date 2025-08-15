import { useMemo, useState } from 'react'
import { Route } from '@/routes/_authenticated/categories'
import { SingleSelectDropdown } from '@/components/form-fields/SingleSelectDropdown'
import { isTransactionType, TransactionTypes } from '@/features/budgets/types/budget-types'



const CategoryFilter = () => {
  const searchParams = Route.useSearch()
  const navigate = Route.useNavigate()
  

  useMemo(() => {
    if (searchParams.type) {
      
    }
  }, [searchParams.type])

  

  return (
    <>
      
    </>
  )
}

export default CategoryFilter
