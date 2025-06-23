/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetAllCategories } from '@/graphql/queries/product.query'
import { DataTable } from '@/components/data-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import CategoriesDialog from './components/categories-dialog'
import CategoriesPrimaryButtons from './components/categories-primary-buttons'
import { columns } from './components/columns'
import CategoriesProvider from './context/categories-context'

export default function Categories() {
  const { data, isLoading } = useGetAllCategories()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <CategoriesProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>All Categores</h2>
          </div>
          <CategoriesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable
            data={data?.categories || []}
            columns={columns}
            searchKey='categoryName'
          />
        </div>
      </Main>
      <CategoriesDialog />
    </CategoriesProvider>
  )
}
