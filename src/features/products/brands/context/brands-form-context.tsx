import React, { createContext, useContext } from 'react'

interface BrandsFormContextType {}

const BrandsFormContext = createContext<BrandsFormContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function BrandsFormProvider({ children }: Props) {
  return (
    <BrandsFormContext.Provider value={{}}>
      {children}
    </BrandsFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBrandsForm = () => {
  const context = useContext(BrandsFormContext)

  if (!context) {
    throw new Error('useBrandsForm must be used within an <BrandsFormProvider>')
  }

  return context
}
