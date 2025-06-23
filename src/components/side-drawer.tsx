import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface Props {
  title: string
  open: boolean
  onOpenChange: (v: boolean) => void
  children: ReactNode
  onSubmit: () => void
}

export function SideDrawer({
  open,
  onOpenChange,
  title,
  children,
  onSubmit,
}: Props) {
  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className='overflow-scroll'>{children}</div>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button onSubmit={onSubmit} form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
