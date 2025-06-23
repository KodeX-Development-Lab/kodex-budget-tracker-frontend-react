import React, { createContext, useContext, useState } from 'react'
import { Enum, useGetAllEnums } from '@/graphql/queries/product.query'

interface CategoriesContextType {
  status: Enum[]
  open: string
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

const CategoriesContext = createContext<CategoriesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function CategoriesProvider({ children }: Props) {
  const { data } = useGetAllEnums()
  const [open, setOpen] = useState('')
  return (
    <CategoriesContext.Provider
      value={{ status: data?.status || [], open, setOpen }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => {
  const context = useContext(CategoriesContext)

  if (!context) {
    throw new Error('useCategories must be used within an <CategoriesProvider>')
  }

  return context
}
