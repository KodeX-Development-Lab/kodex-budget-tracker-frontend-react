/* eslint-disable no-console */
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { X, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface Option {
  label: string
  value: string
}

interface MultiSelectFieldProps {
  name: string
  label: string
  placeholder?: string
  options: Option[]
  className?: string
  maxSelections?: number
  search?: boolean
  searchPlaceholder?: string
  maxHeight?: string
}

export const MultiSelectField = ({
  name,
  label,
  placeholder = 'Select options',
  options,
  className,
  maxSelections,
  search = false,
  searchPlaceholder = 'Search options...',
  maxHeight = '200px',
}: MultiSelectFieldProps) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getSelectedLabels = (values: string[]) => {
    if (!values || values.length === 0) return []
    return options
      .filter((opt) => values.includes(opt.value))
      .map((opt) => opt.label)
  }

  const getFilteredOptions = () => {
    if (!search || !searchQuery.trim()) return options
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const removeValue = (
    valueToRemove: string,
    currentValues: string[],
    onChange: (values: string[]) => void
  ) => {
    const newValues = currentValues.filter((val) => val !== valueToRemove)
    onChange(newValues)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues = field.value || []
        const selectedLabels = getSelectedLabels(selectedValues)

        return (
          <FormItem className='space-y-1'>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className='space-y-2'>
                <Select
                  open={open}
                  onOpenChange={setOpen}
                  onValueChange={(value) => {
                    if (!selectedValues.includes(value)) {
                      if (
                        !maxSelections ||
                        selectedValues.length < maxSelections
                      ) {
                        field.onChange([...selectedValues, value])
                      }
                    }
                    setOpen(false)
                  }}
                >
                  <SelectTrigger className={className || 'w-full'}>
                    <SelectValue placeholder={placeholder}>
                      {!selectedValues || selectedValues.length === 0 ? (
                        <div>{placeholder}</div>
                      ) : (
                        <span className='text-muted-foreground'>
                          {selectedValues.length} option
                          {selectedValues.length !== 1 ? 's' : ''} selected
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className='max-h-none p-0'>
                    {search && (
                      <div className='sticky top-0 z-10 border-b px-3 py-2'>
                        <div className='relative flex items-center'>
                          <Input
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='h-8 w-full border-0 bg-transparent pr-8 focus-visible:ring-0 focus-visible:ring-offset-0'
                          />
                          <Search
                            size={14}
                            className='text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2'
                          />
                        </div>
                      </div>
                    )}
                    <div className='overflow-y-auto' style={{ maxHeight }}>
                      {getFilteredOptions().length === 0 ? (
                        <div className='text-muted-foreground py-6 text-center text-sm'>
                          No options found.
                        </div>
                      ) : (
                        getFilteredOptions().map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            disabled={selectedValues.includes(opt.value)}
                          >
                            {opt.label}
                          </SelectItem>
                        ))
                      )}
                    </div>
                  </SelectContent>
                </Select>

                {selectedLabels.length > 0 && (
                  <div className='flex flex-wrap gap-1'>
                    {selectedLabels.map((label, index) => {
                      const value = selectedValues[index]
                      return (
                        <Badge
                          key={value}
                          variant='secondary'
                          className='text-xs'
                        >
                          {label}
                          <button
                            type='button'
                            onClick={() =>
                              removeValue(value, selectedValues, field.onChange)
                            }
                            className='hover:text-destructive ml-1 focus:outline-none'
                          >
                            <X className='h-3 w-3' />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

{
  /* <MultiSelectField
name='tags'
label='Tags'
placeholder='Select tags'
options={[
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Fullstack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend1' },
  { label: 'Backend', value: 'backend1' },
  { label: 'Fullstack', value: 'fullstack1' },
  { label: 'Frontend', value: 'frontend2' },
  { label: 'Backend', value: 'backend3' },
  { label: 'Fullstack', value: 'fullstack4' },
  { label: 'Frontend', value: 'frontendf' },
  { label: 'Backend', value: 'backenda' },
  { label: 'Fullstack', value: 'fullstackb' },
]}
/> */
}
