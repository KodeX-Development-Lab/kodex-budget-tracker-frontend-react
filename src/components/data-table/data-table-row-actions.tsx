/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from '@tanstack/react-router'
import { Row } from '@tanstack/react-table'
import { Edit, EyeIcon, Trash } from 'lucide-react'
import { Button } from '../ui/button'

interface DataTableRowActionsProps<TData> {
  id: number
  row?: Row<TData>
  editRoute?: string
  detailRoute?: string
}

export function DataTableRowActions<TData>({
  id,
  editRoute,
  detailRoute,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className='flex items-center gap-2'>
      <Link
        to={editRoute}
        // @ts-ignore
        params={{ id: id.toString() }}
      >
        <Button
          className='h-7 w-7 rounded-sm'
          size={'icon'}
          variant={'default'}
        >
          <Edit size={18} />
        </Button>
      </Link>

      <Link
        to={detailRoute}
        // @ts-ignore
        params={{ id: id?.toString() || 0 }}
      >
        <Button
          className='bg-pos-cash h-7 w-7 rounded-sm'
          size={'icon'}
          variant={'default'}
        >
          <EyeIcon size={18} />
        </Button>
      </Link>

      <Button
        className='bg-destructive h-7 w-7 rounded-sm'
        size={'icon'}
        variant={'default'}
      >
        <Trash size={18} />
      </Button>
    </div>
  )
}
