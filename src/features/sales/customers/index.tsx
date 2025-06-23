/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataTable } from '@/components/data-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import CustomersPrimaryButtons from './components/customers-primary-buttons'
import {CustomersProvider} from './context/customers-context'
import { customers } from './data/customers'

export default function Customers() {
  return (
    <CustomersProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>All Customers</h2>
          </div>
          <CustomersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable
            // @ts-ignore
            data={customers}
            // @ts-ignore
            columns={columns}
          />
        </div>
      </Main>
    </CustomersProvider>
  )
}
