/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetAllBrands } from '@/graphql/queries/product.query'
import { DataTable } from '@/components/data-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import BrandsDialog from './components/brands-dialog'
import BrandsPrimaryButtons from './components/brands-primary-buttons'
import { columns } from './components/columns'
import BrandsProvider from './context/brands-context'

export default function Brands() {
  const { data, isLoading } = useGetAllBrands()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <BrandsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>All Brands</h2>
          </div>
          <BrandsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable
            data={data?.brands || []}
            columns={columns}
            searchKey='brandName'
          />
        </div>
      </Main>
      <BrandsDialog />
    </BrandsProvider>
  )
}
