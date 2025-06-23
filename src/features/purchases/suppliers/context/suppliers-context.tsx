import React, { createContext, useContext, useState } from 'react'

interface SuppliersContextType {
  open: string
  setOpen: React.Dispatch<React.SetStateAction<string>>
}

const SuppliersContext = createContext<SuppliersContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function SuppliersProvider({ children }: Props) {
  const [open, setOpen] = useState('')
  return (
    <SuppliersContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </SuppliersContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSuppliers = () => {
  const context = useContext(SuppliersContext)

  if (!context) {
    throw new Error('useSuppliers must be used within an <SuppliersProvider>')
  }

  return context
}
