import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { useUnits } from '../context/units-context'

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
    accessorKey: 'unitName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit Name' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[150px]'>{row.getValue('unitName')}</div>
    ),
  },
  {
    accessorKey: 'unitSymbol',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit Symbol' />
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px]'>{row.getValue('unitSymbol')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status')
      const { status: enumStatus } = useUnits()
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
