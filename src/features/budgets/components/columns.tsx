import { ColumnDef } from '@tanstack/react-table'
import { Delete, Edit, MoreHorizontal, Trash } from 'lucide-react'
import moment from 'moment'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { BudgetItem } from '../types/budget-types'


export const columns: ColumnDef<BudgetItem>[] = [
  {
    accessorKey: 'processed_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Processed At' />
    ),
    cell: ({ row }) => (
      <div className=''>
        {moment(row.getValue('processed_at')).format('MM-DD-YYYY h:mm A')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'category.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      return (
        <>
          {row.getValue('type') == 'income' ? (
            <Badge variant='default'>Income</Badge>
          ) : (
            <Badge variant='destructive'>Expense</Badge>
          )}
        </>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Income' />
    ),
    cell: ({ row }) => {
      return (
        <>
          {row.getValue('type') == 'income' ? (
            row.getValue('amount')
          ) : '-'}
        </>
      )
    },
    enableSorting: false,
  },
 {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expense' />
    ),
    cell: ({ row }) => {
      return (
        <>
          {row.getValue('type') == 'expense' ? (
            row.getValue('amount')
          ) : '-'}
        </>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'remark',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Remark' />
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Action' />
    ),
    cell: ({ row }) => {
      return (
        <div className='space-x-0.5'>
          <Button variant='default'><Edit /></Button>
          <Button variant='destructive'><Trash /></Button>
        </div>
      )
    },
  },
]
