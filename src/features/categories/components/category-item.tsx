import { Button } from '@/components/ui/button'
import { DollarSign, X } from 'lucide-react'

export const CategoryItem = () => {
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
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='icon'>
          <X className='h-4 w-4 text-black' />
        </Button>
      </div>
    </div>
  )
}
