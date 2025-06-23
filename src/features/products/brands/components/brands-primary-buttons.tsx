import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useBrands } from '../context/brands-context'

const BrandsPrimaryButtons = () => {
  const { setOpen } = useBrands()
  return (
    <div className='flex gap-2'>
      <Button variant='outline' className='space-x-1'>
        <span>Import</span> <IconDownload size={18} />
      </Button>
      <Button onClick={() => setOpen('create')} className='space-x-1'>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}

export default BrandsPrimaryButtons
