import React, { createContext, useContext, useState } from 'react'

interface AllProductsContextType {
  products: string[] // or your custom product type like `Product[]`
  setProducts: React.Dispatch<React.SetStateAction<string[]>>
}

const AllProductsContext = createContext<AllProductsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function AllProductsProvider({ children }: Props) {
  const [products, setProducts] = useState<string[]>([])

  return (
    <AllProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </AllProductsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAllProducts = () => {
  const context = useContext(AllProductsContext)

  if (!context) {
    throw new Error(
      'useAllProducts must be used within an <AllProductsProvider>'
    )
  }

  return context
}
