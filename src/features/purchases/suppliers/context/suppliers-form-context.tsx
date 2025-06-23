import React, { createContext, useContext } from 'react'

interface SuppliersFormContextType {}

const SuppliersFormContext = createContext<SuppliersFormContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function SuppliersFormProvider({ children }: Props) {
  return (
    <SuppliersFormContext.Provider value={{}}>
      {children}
    </SuppliersFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSuppliersForm = () => {
  const context = useContext(SuppliersFormContext)

  if (!context) {
    throw new Error(
      'useSuppliersForm must be used within an <SuppliersFormProvider>'
    )
  }

  return context
}
