import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useCategories } from '../context/categories-context'

const CategoriesPrimaryButtons = () => {
  const { setOpen } = useCategories()
  return (
    <div className='flex gap-2'>
      <Button variant='outline' className='space-x-1'>
        <span>Import</span> <IconDownload size={18} />
      </Button>
      <Button
        onClick={() => {
          setOpen('create')
        }}
        className='space-x-1'
      >
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}

export default CategoriesPrimaryButtons
