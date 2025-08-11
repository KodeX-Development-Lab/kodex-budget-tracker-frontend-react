import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

export function Search() {
  return (
    <div className='relative flex-1'>
      <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input placeholder='Search' className='w-full py-2 pr-4 pl-10' />
    </div>
  )
}
