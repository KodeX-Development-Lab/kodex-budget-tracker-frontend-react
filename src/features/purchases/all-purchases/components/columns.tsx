import { parseISO, format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { useAllPurchases } from '../context/all-purchases-context'

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
    accessorKey: 'supplier',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Supplier' />
    ),
    cell: ({ row }) => (
      // @ts-ignore
      <div className='min-w-[150px]'>{row.getValue('supplier')?.name}</div>
    ),
  },

  {
    accessorKey: 'purchaseDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Purchase Date' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>
        {format(parseISO(row.getValue('purchaseDate')), 'yyyy-MM-dd')}
      </div>
    ),
  },
  {
    accessorKey: 'invoiceNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Invoice Number' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>{row.getValue('invoiceNumber')}</div>
    ),
  },
  {
    accessorKey: 'reference',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reference' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>{row.getValue('reference')}</div>
    ),
  },
  {
    accessorKey: 'purchaseStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Purchase Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('purchaseStatus')
      const { status: enumStatus } = useAllPurchases()
      const value = enumStatus?.purchaseOrderStatuses?.find(
        (e) => e.id === Number(status)
      )?.name
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
  },
  {
    accessorKey: 'paymentStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payment Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('paymentStatus')
      const { status: enumStatus } = useAllPurchases()
      const value = enumStatus?.purchasePaymentStatuses?.find(
        (e) => e.id === Number(status)
      )?.name
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
  },
  {
    accessorKey: 'shippingFee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Shipping Fee' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>{row.getValue('shippingFee')}</div>
    ),
  },
  {
    accessorKey: 'grandTotal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Grand Total' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>{row.getValue('grandTotal')}</div>
    ),
  },
  {
    accessorKey: 'createdBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created By' />
    ),
    cell: ({ row }) => (
      // @ts-ignore
      <div className='min-w-[100px]'>{row.getValue('createdBy')?.name}</div>
    ),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: ({ row }) => {
      console.log(row, 'this is row')
      return (
        <DataTableRowActions
          row={row}
          id={row.original.id}
          editRoute='/purchases/$id/edit'
          detailRoute='/purchases/$id/detail'
        />
      )
    },
  },
]
