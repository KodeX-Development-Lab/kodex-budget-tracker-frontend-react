/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { useCategories } from '../context/categories-context'

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'categoryImage',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='max-w-[60px]'
        column={column}
        title='Image'
      />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue('categoryImage')
        ? JSON.parse(row.getValue('categoryImage'))[0]
        : null
      return (
        <div className='flex items-center justify-center truncate'>
          {imageUrl && (
            <img
              className='h-8 w-8 rounded-full object-cover'
              src={imageUrl}
              alt=''
            />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'categoryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category Name' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[250px] min-w-[150px] truncate text-sm'>
        {row.getValue('categoryName')}
      </div>
    ),
  },
  {
    accessorKey: 'categoryCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category Code' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] min-w-[120px] truncate text-sm'>
        {row.getValue('categoryCode')}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[300px] truncate'>
        {row.getValue('description') || '—'}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status')
      const { status: enumStatus } = useCategories()
      const value = enumStatus.find((e) => e.id === status)?.name
      return (
        <span
          className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
            status === 1
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value as any}
        </span>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} id={row.original.id} />,
  },
]
