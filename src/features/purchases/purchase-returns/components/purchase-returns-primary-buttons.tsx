import { Link } from '@tanstack/react-router'
import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

const PurchaseReturnsPrimaryButtons = () => {
  return (
    <div className='flex gap-2'>
      <Button variant='outline' className='space-x-1'>
        <span>Import</span> <IconDownload size={18} />
      </Button>
      <Link to='/purchases/purchase-returns/create'>
        <Button className='space-x-1'>
          <span>Create</span> <IconPlus size={18} />
        </Button>
      </Link>
    </div>
  )
}
export default PurchaseReturnsPrimaryButtons
