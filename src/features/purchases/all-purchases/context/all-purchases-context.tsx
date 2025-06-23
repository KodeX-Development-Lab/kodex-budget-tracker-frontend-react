import React, { createContext, useContext } from 'react'
import {
  GetEnumsResponse,
  useGetAllEnums,
} from '@/graphql/queries/product.query'

interface AllPurchasesContextType {
  status: GetEnumsResponse | undefined
}

const AllPurchasesContext = createContext<AllPurchasesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function AllPurchasesProvider({ children }: Props) {
  const { data } = useGetAllEnums()
  return (
    <AllPurchasesContext.Provider value={{ status: data }}>
      {children}
    </AllPurchasesContext.Provider>
  )
}

export const useAllPurchases = () => {
  const context = useContext(AllPurchasesContext)

  if (!context) {
    throw new Error(
      'useAllPurchases must be used within an <AllPurchasesProvider>'
    )
  }

  return context
}
