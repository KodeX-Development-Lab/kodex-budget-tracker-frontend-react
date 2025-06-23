import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { Product, productSchema } from '../data/schema'

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='w-6'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px]'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='w-6'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-[2px]'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'images',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Image' />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue('images')
        ? JSON.parse(row.getValue('images'))[0]
        : null
      return (
        <div className='flex w-full items-center justify-center truncate'>
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
    accessorKey: 'productName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='max-w-[300px] min-w-[200px] truncate'>
          {row.getValue('productName')}
        </div>
      )
    },
  },
  {
    accessorKey: 'productCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product Code' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] min-w-[150px] truncate'>
        {row.getValue('productCode')}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue('category')
      return <div className='min-w-[100px]'>{value?.categoryName}</div>
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand' />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue('brand')
      return <div className='min-w-[100px]'>{value?.brandName}</div>
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit' />
    ),
    cell: ({ row }) => {
      const value: any = row.getValue('unit')
      return <div className='min-w-[100px]'>{value?.unitName}</div>
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'costPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cost Price' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>${row.getValue('costPrice')}</div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'salePrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sale Price' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>${row.getValue('salePrice')}</div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'reorderLevel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reorder Level' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>{row.getValue('reorderLevel')}</div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'stockQuantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock Quantity' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[120px]'>{row.getValue('stockQuantity')}</div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
