import { DollarSign, Trash2, X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import LucideIconByName from '@/components/lucideiconbyname'
import { Button } from '../../../components/ui/button'
import { BudgetItem, TransactionTypes } from '../types/budget-types'

export const BudgetItemComponent = ({
  item,
  onDelete,
}: {
  item: BudgetItem
  onDelete: (id: string | number) => void
}) => {
  return (
    <div className='my-3 grid grid-cols-10 items-center gap-4'>
      <div className='col-span-6 flex items-center gap-3'>
        <div
          className='flex h-12 w-12 items-center justify-center rounded-full p-3'
          style={{ backgroundColor: item.category.color }}
        >
          <span className='flex items-center justify-center text-xl text-white'>
            <LucideIconByName name={item.category.icon.name} />
          </span>
        </div>
        <div>
          <div className='text-lg font-semibold'>{item.category.name}</div>
          <div className='text-sm text-gray-400'>{item.remark}</div>
        </div>
      </div>
      <div className='col-span-3 text-right'>
        <span
          className={`font-semibold ${item.type == TransactionTypes.INCOME ? 'text-[var(--income)]' : 'text-[var(--expense)]'}`}
        >
          {(item.type == TransactionTypes.INCOME ? '+' : '') + item.amount}
        </span>
      </div>
      <div className='col-span-1'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='text-red-500 hover:text-red-700'
            >
              <Trash2 className='h-5 w-5' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this item?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Are you sure you want to remove{' '}
                <strong>{item.category.name}</strong> from your budget list?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className='bg-red-500 hover:bg-red-600'
                onClick={() => onDelete(item.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
