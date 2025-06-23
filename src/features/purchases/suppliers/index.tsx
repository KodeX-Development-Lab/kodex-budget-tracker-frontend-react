import { useGetAllSuppliers } from '@/graphql/queries/purchase.query'
import { DataTable } from '@/components/data-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import SuppliersDialog from './components/suppliers-dialog'
import SuppliersPrimaryButtons from './components/suppliers-primary-buttons'
import SuppliersProvider from './context/suppliers-context'

export default function Suppliers() {
  const { data, isLoading } = useGetAllSuppliers()
  if (isLoading) return <div>Loading...</div>
  return (
    <SuppliersProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>All Suppliers</h2>
          </div>
          <SuppliersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable
            data={data?.suppliers || []}
            // @ts-ignore
            columns={columns}
            searchKey='name'
          />
        </div>
      </Main>
      <SuppliersDialog />
    </SuppliersProvider>
  )
}
