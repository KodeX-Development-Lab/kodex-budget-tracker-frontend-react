import { useState } from 'react'
import { BookCheck } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CategoryCreateModal } from './components/category-create'
import { CategoryItem } from './components/category-item'

export default function Categories() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [showIncome, setShowIncome] = useState(true)
  const [showExpense, setShowExpense] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [incomeCategories, setIncomeCategories] = useState([
    { id: 1, name: 'Salary', checked: false },
    { id: 2, name: 'Part-time Job', checked: false },
    { id: 3, name: 'Dividends', checked: false },
    { id: 4, name: 'Pocket-money', checked: true },
    { id: 5, name: 'Sale', checked: false },
  ])

  const [expenseCategories, setExpenseCategories] = useState([
    { id: 6, name: 'Food', checked: false },
    { id: 7, name: 'Home & Hostel Fee', checked: false },
    { id: 8, name: 'Drink', checked: false },
    { id: 9, name: 'Clothing', checked: false },
    { id: 10, name: 'Shopping', checked: false },
    { id: 11, name: 'Travel', checked: false },
    { id: 12, name: 'Transportation', checked: false },
    { id: 13, name: 'Education', checked: false },
  ])

  const toggleIncome = () => {
    setShowIncome(!showIncome)
    setShowExpense(!showExpense)
  }
  const toggleExpense = () => {
    setShowIncome(!showIncome)
    setShowExpense(!showExpense)
  }

  const handleIncomeCheck = (id: number) => {
    setIncomeCategories(
      incomeCategories.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    )
  }

  const handleExpenseCheck = (id: number) => {
    setExpenseCategories(
      expenseCategories.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    )
  }

  const addIncomeCategory = () => {
    if (newCategory.trim()) {
      setIncomeCategories([
        ...incomeCategories,
        { id: Date.now(), name: newCategory.trim(), checked: false },
      ])
      setNewCategory('')
    }
  }

  // Always show both sections on desktop
  const shouldShowIncome = isDesktop || showIncome
  const shouldShowExpense = isDesktop || showExpense

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mx-auto px-20'>
          <h1 className='mb-6 text-2xl font-bold'>Categories</h1>

          {!isDesktop && (
            <div className='mb-6 flex gap-4'>
              <div className='flex items-center space-x-2'>
                <Button className='rounded-2xl' onClick={toggleIncome}>
                  {showIncome ? <BookCheck /> : ''} Income
                </Button>
              </div>
              <div className='flex items-center space-x-2'>
                <Button className='rounded-2xl' onClick={toggleExpense}>
                  {showExpense ? <BookCheck /> : ''} Expense
                </Button>
              </div>
            </div>
          )}

          <div className='grid gap-8 md:grid-cols-2'>
            {shouldShowIncome && (
              <div className='rounded-lg border p-4'>
                <h2 className='mb-4 text-lg font-semibold'>
                  Income Categories
                </h2>
                <div className='space-y-3'>
                  {incomeCategories.map((category, index) => (
                    <CategoryItem key={index} />
                  ))}
                </div>

                <div className='mt-4 flex gap-2'>
                  <CategoryCreateModal />
                </div>
              </div>
            )}

            {shouldShowExpense && (
              <div className='rounded-lg border p-4'>
                <h2 className='mb-4 text-lg font-semibold'>
                  Expense Categories
                </h2>
                <div className='space-y-3'>
                  {expenseCategories.map((category, index) => (
                    <CategoryItem key={index} />
                  ))}
                </div>
                <div className='mt-4 flex gap-2'>
                  <CategoryCreateModal />
                </div>
              </div>
            )}
          </div>
        </div>
      </Main>
    </>
  )
}
