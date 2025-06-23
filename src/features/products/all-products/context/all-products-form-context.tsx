import React, { createContext, useContext, useState } from 'react'

interface AllProductsFormContextType {
  products: string[] // or your custom product type like `Product[]`
  setProducts: React.Dispatch<React.SetStateAction<string[]>>
}

const AllProductsFormContext = createContext<AllProductsFormContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function AllProductsFormProvider({ children }: Props) {
  const [products, setProducts] = useState<string[]>([])

  return (
    <AllProductsFormContext.Provider value={{ products, setProducts }}>
      {children}
    </AllProductsFormContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAllProductsForm = () => {
  const context = useContext(AllProductsFormContext)

  if (!context) {
    throw new Error(
      'useAllProductsForm must be used within an <AllProductsFormProvider>'
    )
  }

  return context
}
