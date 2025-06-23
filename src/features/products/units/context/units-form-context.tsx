import React, { createContext, useContext } from 'react'

interface UnitsFormContextType {}

const UnitsFormContext = createContext<UnitsFormContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function UnitsFormProvider({ children }: Props) {
  return (
    <UnitsFormContext.Provider value={{}}>{children}</UnitsFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUnitsForm = () => {
  const context = useContext(UnitsFormContext)

  if (!context) {
    throw new Error('useUnitsForm must be used within an <UnitsFormProvider>')
  }

  return context
}
