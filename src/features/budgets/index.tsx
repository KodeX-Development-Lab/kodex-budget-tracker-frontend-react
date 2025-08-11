import { useState } from 'react'
import DatePicker from 'react-datepicker'
import FilterDropdown from '@/components/filter-dropdown'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import TasksProvider from './context/tasks-context'
import { budgets } from './data/budgets'
import 'react-datepicker/dist/react-datepicker.css'

export default function Budgets() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <TasksProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>All Budgets</h2>
          </div>
        </div>
        <div className='flex justify-start space-x-1'>
          <div className='flex w-full flex-col gap-3 rounded-lg p-4 md:flex-row'>
            {/* Search Input */}
            <div className=''>
              <Search />
            </div>

            {/* Filter Dropdowns */}
            <div className='flex flex-wrap justify-start gap-2'>
              <FilterDropdown label='Type' />
              <FilterDropdown label='Category' />
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date as any)}
                />
              </div>
              <div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date as any)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable data={budgets} columns={columns} />
        </div>
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
