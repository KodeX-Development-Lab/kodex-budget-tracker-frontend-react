import React, { createContext, useContext, useState } from 'react'
import { Enum, useGetAllEnums } from '@/graphql/queries/product.query'

interface BrandsContextType {
  status: Enum[]
  open: string
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

const BrandsContext = createContext<BrandsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function BrandsProvider({ children }: Props) {
  const { data } = useGetAllEnums()
  const [open, setOpen] = useState('')
  return (
    <BrandsContext.Provider
      value={{ status: data?.status || [], open, setOpen }}
    >
      {children}
    </BrandsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBrands = () => {
  const context = useContext(BrandsContext)

  if (!context) {
    throw new Error('useBrands must be used within an <BrandsProvider>')
  }

  return context
}
