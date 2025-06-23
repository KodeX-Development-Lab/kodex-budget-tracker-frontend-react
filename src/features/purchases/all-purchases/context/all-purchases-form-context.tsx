import React, { createContext, useContext } from 'react'
import { useParams } from '@tanstack/react-router'
import {
  GetEnumsResponse,
  useGetAllEnums,
} from '@/graphql/queries/product.query'
import { useGetPurchase } from '@/graphql/queries/purchase.query'

interface AllPurchasesFormContextType {
  status: GetEnumsResponse | undefined
}

const AllPurchasesFormContext =
  createContext<AllPurchasesFormContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function AllPurchasesFormProvider({ children }: Props) {
  const { data } = useGetAllEnums()
  return (
    <AllPurchasesFormContext.Provider value={{ status: data }}>
      {children}
    </AllPurchasesFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAllPurchasesForm = () => {
  const context = useContext(AllPurchasesFormContext)

  if (!context) {
    throw new Error(
      'useAllPurchasesForm must be used within an <AllPurchasesFormProvider>'
    )
  }

  return context
}
