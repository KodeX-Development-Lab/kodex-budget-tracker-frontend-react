import { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'
import moment from 'moment'
import { formatMoney } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import LucideIconByName from '@/components/lucideiconbyname'
import {
  CategoryType,
  TransactionTypes,
} from '@/features/budgets/types/budget-types'

export const columns = (
  onEdit: (item: CategoryType) => void,
  onDelete: (id: number) => void
): ColumnDef<CategoryType>[] => [
  {
    header: 'Symbol',
    cell: ({ row }) => {
      return (
        <div
          className='flex h-12 w-12 items-center justify-center rounded-full p-3'
          style={{ backgroundColor: row.original.color }}
        >
          <span className='flex items-center justify-center text-xl text-white'>
            <LucideIconByName name={row.original.icon.name} />
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='text-primary hover:text-primary'
            onClick={() => onEdit(row.original)}
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
