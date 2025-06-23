import React, { createContext, useContext } from 'react'

interface CategoriesFormContextType {}

const CategoriesFormContext = createContext<CategoriesFormContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function CategoriesFormProvider({ children }: Props) {
  return (
    <CategoriesFormContext.Provider value={{}}>
      {children}
    </CategoriesFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategoriesForm = () => {
  const context = useContext(CategoriesFormContext)

  if (!context) {
    throw new Error(
      'useCategoriesForm must be used within an <CategoriesFormProvider>'
    )
  }

  return context
}
