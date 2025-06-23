import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Search } from 'lucide-react'
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

export interface Option {
  label: string
  value: number
}

interface SelectFieldProps {
  name: string
  label: string
  placeholder?: string
  options: Option[]
  className?: string
  search?: boolean
  searchPlaceholder?: string
  maxHeight?: string
  required?: boolean
  fetchOptions?: () => void
}

export const SelectField = ({
  name,
  label,
  placeholder = 'Select an option',
  options,
  className,
  search = false,
  searchPlaceholder = 'Search options...',
  maxHeight = '200px',
  required = false,
  fetchOptions,
}: SelectFieldProps) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLabel, setActiveLabel] = useState('')

  const getFilteredOptions = () => {
    if (!search || !searchQuery.trim()) return options
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full space-y-1'>
          <FormLabel className='flex items-center'>
            <span>{label}</span>
            {required && <span className='text-red-600'>*</span>}
          </FormLabel>
          <FormControl>
            <Select
              open={open}
              onOpenChange={(isOpen) => {
                setOpen(isOpen)
                if (isOpen && fetchOptions) {
                  fetchOptions() // Fetch categories when dropdown opens
                }
              }}
              onValueChange={(value) => {
                field.onChange(Number(value))
                setOpen(false)
              }}
              value={String(field.value)}
            >
              <SelectTrigger className={className || 'w-full'}>
                <SelectValue placeholder={placeholder}>
                  {options?.find((el) => el.value == field.value)?.label ||
                    placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className='max-h-none p-0'>
                {search && (
                  <div className='sticky top-0 z-10 border-b py-2'>
                    <div className='border-input relative flex items-center rounded-sm border'>
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
                      <SelectItem key={opt.value} value={String(opt.value)}>
                        {opt.label}
                      </SelectItem>
                    ))
                  )}
                </div>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
