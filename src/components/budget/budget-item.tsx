import { DollarSign, X } from 'lucide-react'
import { Button } from '../ui/button'

export const BudgetItem = () => {
  return (
    <div className='flex items-center justify-between px-4 py-3'>
      <div className='flex items-center gap-3'>
        <div className='rounded-full bg-yellow-500 p-2'>
          <span className='text-xl text-white'>
            <DollarSign />
          </span>
        </div>
        <div>
          <div className='text-lg font-semibold'>Part-time Job</div>
          <div className='text-sm text-gray-400'>Teaching</div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <span className='font-semibold text-green-500'>+60,000 ks</span>
        <Button variant='ghost' size='icon'>
          <X className='h-4 w-4 text-white' />
        </Button>
      </div>
    </div>
  )
}
