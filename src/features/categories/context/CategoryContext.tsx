import React, { useMemo, useState } from 'react'
import {
  useIcons,
} from '@/features/categories/api/queries/query'
import { IconType } from '@/features/budgets/types/budget-types'

interface CategoryContextType {
  isLoading: boolean
  icons?: IconType[]
}

const CategoryContext = React.createContext<CategoryContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function CategoryContextProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [icons, setIcons] = useState<IconType[]>()

  const {
    data: iconsData,
    isLoading: isIconLoading,
  } = useIcons()

  useMemo(() => {
    setIsLoading(isIconLoading)
    setIcons(iconsData)
  }, [iconsData])

  return (
    <CategoryContext.Provider value={{ isLoading, icons }}>
      {children}
    </CategoryContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategoryContext = () => {
  const categoryContext = React.useContext(CategoryContext)

  if (!categoryContext) {
    throw new Error('useTasks has to be used within <CategoryContext>')
  }

  return categoryContext
}
