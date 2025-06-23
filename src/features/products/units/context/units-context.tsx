import React, { createContext, useContext, useState } from 'react'
import { Enum, useGetAllEnums } from '@/graphql/queries/product.query'

interface UnitsContextType {
  status: Enum[]
  open: string
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

const UnitsContext = createContext<UnitsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function UnitsProvider({ children }: Props) {
  const { data } = useGetAllEnums()
  const [open, setOpen] = useState('')
  return (
    <UnitsContext.Provider
      value={{ status: data?.status || [], open, setOpen }}
    >
      {children}
    </UnitsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUnits = () => {
  const context = useContext(UnitsContext)

  if (!context) {
    throw new Error('useUnits must be used within an <UnitsProvider>')
  }

  return context
}
