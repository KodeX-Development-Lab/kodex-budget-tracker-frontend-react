/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataTable } from '@/components/data-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import PurchaseReturnsPrimaryButtons from './components/purchase-returns-primary-buttons'
import {PurchaseReturnsProvider} from './context/purchase-returns-context'
import { purchaseReturns } from './data/purchase-returns'

export default function PurchaseReturns() {
  return (
    <PurchaseReturnsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>All PurchaseReturns</h2>
          </div>
          <PurchaseReturnsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable
            // @ts-ignore
            data={purchaseReturns}
            // @ts-ignore
            columns={columns}
          />
        </div>
      </Main>
    </PurchaseReturnsProvider>
  )
}
