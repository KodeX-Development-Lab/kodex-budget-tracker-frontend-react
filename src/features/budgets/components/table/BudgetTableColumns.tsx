import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { formatMoney } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BudgetItem, TransactionTypes } from '../../types/budget-types'
import { Edit, Trash2 } from 'lucide-react'

export const columns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,

): ColumnDef<BudgetItem>[] => [
  {
    accessorKey: 'processed_at',
    header: 'Date',
    enableSorting: true,
    cell: ({ row }) => {
      return moment(row.getValue('processed_at')).format('DD-MM-YYYY h:mm A')
    },
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type')
      return type == TransactionTypes.INCOME ? (
        <Badge variant='default'>{TransactionTypes.INCOME}</Badge>
      ) : (
        <Badge variant='destructive'>{TransactionTypes.EXPENSE}</Badge>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: 'Income',
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.getValue('type')
      return type == TransactionTypes.INCOME
        ? formatMoney(row.getValue('amount'))
        : '-'
    },
  },
  {
    accessorKey: 'amount',
    enableSorting: true,
    header: 'Expense',
    cell: ({ row }) => {
      const type = row.getValue('type')
      return type == TransactionTypes.EXPENSE
        ? formatMoney(row.getValue('amount'))
        : '-'
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='text-primary hover:text-primary'
          >
            <Edit className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='text-red-500 hover:text-red-700'
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 className='h-5 w-5' />
          </Button>
        </div>
      )
    },
  },
]
