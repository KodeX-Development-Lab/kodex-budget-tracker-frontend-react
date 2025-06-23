/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { X } from 'lucide-react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

const ItemType = 'ITEM'

const DraggableItem = ({
  item,
  index,
  moveItem,
  removeItem,
}: {
  item: string
  index: number
  moveItem: (from: number, to: number) => void
  removeItem: (index: number) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem: { index: number }) {
      if (!ref.current || draggedItem.index === index) return
      moveItem(draggedItem.index, index)
      draggedItem.index = index
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center gap-2 rounded-md border p-2 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <DragHandleDots2Icon />
      <div className='text-muted-foreground truncate text-sm'>{item}</div>
      <button onClick={() => removeItem(index)} className='ml-auto'>
        <X width={12} />
      </button>
    </div>
  )
}

interface DraggableMultiSelectProps {
  name: string
  label: string
  options: string[]
}

const DraggableMultiSelect = ({
  name,
  label,
  options,
}: DraggableMultiSelectProps) => {
  const { control, watch, setValue } = useFormContext<any>()
  const selectedItems = watch(name) || []
  const [open, setOpen] = useState(false)

  const moveItem = (from: number, to: number) => {
    const updated = [...selectedItems]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    setValue(name, updated, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    })
  }

  const removeItem = (index: number) => {
    const updated = selectedItems.filter((_: string, i: number) => i !== index)
    setValue(name, updated, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    })
  }

  const addItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setValue(name, [...selectedItems, item], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      })
    }
    setOpen(false)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem className='space-y-2'>
            <FormLabel>{label}</FormLabel>
            {selectedItems.length > 0 ? (
              <div className='flex flex-col gap-2'>
                {selectedItems.map((item: string, index: number) => (
                  <DraggableItem
                    key={index}
                    item={item}
                    index={index}
                    moveItem={moveItem}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            ) : (
              <div className='relative flex w-full items-center gap-2 rounded-md border p-3 text-sm'>
                No {label.toLowerCase()} selected
              </div>
            )}
            <FormControl>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button type='button' className='w-fit' size='sm'>
                    + Add {label}
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[350px]'>
                  <DialogHeader>
                    <DialogTitle>Select {label}</DialogTitle>
                  </DialogHeader>
                  <Command>
                    <CommandInput
                      placeholder={`Search ${label.toLowerCase()}...`}
                    />
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup className='max-h-60 overflow-y-auto'>
                      {options.map((option) => (
                        <CommandItem
                          key={option}
                          onSelect={() => addItem(option)}
                        >
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </DialogContent>
              </Dialog>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </DndProvider>
  )
}

export default DraggableMultiSelect

/* <div className='bg-primary-foreground w-full rounded-lg p-5'>
    <DraggableMultiSelect
      name='categories'
      label='Categories'
      options={[
        'Technology',
        'Sports',
        'Health',
        'Entertainment',
        'Education',
        'Business',
        'Lifestyle',
      ]}
    />
  </div>
  <div className='bg-primary-foreground w-full rounded-lg p-5'>
    <VariantInput name='variants' label='Product Variants' />
  </div> */
