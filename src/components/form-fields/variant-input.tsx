import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MoreVertical } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface Variant {
  name: string
  values: string[]
}

interface VariantInputProps {
  name: string
  label: string
}

const VariantInput = ({ name, label }: VariantInputProps) => {
  const { control, watch, setValue } = useFormContext()
  const variants: Variant[] = watch(name) || []

  // dialog open state and whether editing or adding
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // form state inside dialog
  const [variantName, setVariantName] = useState('')
  const [variantValues, setVariantValues] = useState('')

  // Open dialog for adding new variant
  const openAddDialog = () => {
    setIsEditing(false)
    setEditIndex(null)
    setVariantName('')
    setVariantValues('')
    setOpen(true)
  }

  // Open dialog for editing existing variant
  const openEditDialog = (index: number) => {
    const variant = variants[index]
    setIsEditing(true)
    setEditIndex(index)
    setVariantName(variant.name)
    setVariantValues(variant.values.join(', '))
    setOpen(true)
  }

  const addOrEditVariant = () => {
    if (!variantName.trim() || !variantValues.trim()) return

    const newVariant: Variant = {
      name: variantName.trim(),
      values: variantValues
        .split(',')
        .map((val) => val.trim())
        .filter(Boolean),
    }

    if (isEditing && editIndex !== null) {
      const updated = [...variants]
      updated[editIndex] = newVariant
      setValue(name, updated, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      })
    } else {
      setValue(name, [...variants, newVariant], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      })
    }

    setOpen(false)
    setVariantName('')
    setVariantValues('')
    setEditIndex(null)
    setIsEditing(false)
  }

  const removeVariant = (index: number) => {
    const updated = variants.filter((_, i) => i !== index)
    setValue(name, updated, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    })
    // If editing this variant, reset edit state
    if (editIndex === index) {
      setOpen(false)
      setEditIndex(null)
      setIsEditing(false)
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className='space-y-2'>
          <FormLabel>{label}</FormLabel>

          {variants.length > 0 ? (
            <div className='space-y-1'>
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className='relative flex items-center gap-2 rounded-md border p-2'
                >
                  <div className='text-sm font-medium'>{variant.name}</div>
                  <span>-</span>
                  <div className='text-muted-foreground text-sm'>
                    {variant.values.join(', ')}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='ml-auto p-1'
                        aria-label='Open menu'
                      >
                        <MoreVertical className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align='end'
                      side='bottom'
                      className='w-28'
                    >
                      <DropdownMenuItem onClick={() => openEditDialog(index)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => removeVariant(index)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className='relative flex w-full items-center gap-2 rounded-md border p-3 text-sm'>
              No {label.toLowerCase()} added.
            </div>
          )}

          <FormControl>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type='button'
                  className='w-fit'
                  size='sm'
                  onClick={openAddDialog}
                >
                  + Add {label}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? 'Edit Variant' : 'Add New Variant'}
                  </DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                  <Input
                    placeholder='Variant Name (e.g. Size, Color)'
                    value={variantName}
                    onChange={(e) => setVariantName(e.target.value)}
                    autoFocus
                  />
                  <Input
                    placeholder='Values (comma-separated e.g. S, M, L)'
                    value={variantValues}
                    onChange={(e) => setVariantValues(e.target.value)}
                  />
                  <Button type='button' onClick={addOrEditVariant}>
                    {isEditing ? 'Save' : 'Add'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default VariantInput
