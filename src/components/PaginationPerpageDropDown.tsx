import * as React from 'react'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DropdownItem {
  label: string
  value: string | number
}

interface PaginationPerpageDropDownProps {
  mode?: 'single' | 'multiple'
  value: string | number | Array<string | number> | undefined
  onChange: (
    value: string | number | Array<string | number> | undefined
  ) => void
  options: DropdownItem[]
  placeholder?: string
  searchPlaceholder?: string
  noOptionsText?: string
  error?: string
  className?: string
  dropdownWidth?: number | string
  triggerClassName?: string
  searchable?: boolean
  clearable?: boolean
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  hasMore?: boolean
  onLoadMore?: () => void
  pageSize?: number
  currentPage?: number
}

export default function PaginationPerpageDropDown({
  mode = 'single',
  value,
  onChange,
  error,
  options,
  placeholder = 'Select',
  searchPlaceholder = 'Search',
  noOptionsText = 'No options found',
  className = '',
  dropdownWidth = 'auto',
  triggerClassName = '',
  searchable = true,
  clearable = true,
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  hasMore = false,
  onLoadMore,
  pageSize = 10,
  currentPage = 1,
}: PaginationPerpageDropDownProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const selectedItems = React.useMemo(() => {
    if (!value) return []
    if (mode === 'single') {
      const selected = options.find((item) => item.value === value)
      return selected ? [selected] : []
    }
    return options.filter((item) =>
      Array.isArray(value) ? value.includes(item.value) : false
    )
  }, [value, options, mode])

  const filteredOptions = React.useMemo(() => {
    if (loading) return []
    if (!searchable || !search) return options
    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [options, search, loading, searchable])

  const handleSelect = (item: DropdownItem) => {
    if (mode === 'single') {
      onChange(item.value === value ? undefined : item.value)
      setOpen(false)
    } else {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(item.value)
        ? currentValues.filter((v) => v !== item.value)
        : [...currentValues, item.value]
      onChange(newValues.length > 0 ? newValues : undefined)
    }
  }

  const handleClear = () => {
    onChange(undefined)
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'h-12 w-full justify-between px-3 text-left font-normal',
              error ? 'border-destructive' : '',
              triggerClassName
            )}
          >
            <div className='flex-1 overflow-hidden'>
              {selectedItems.length === 0 ? (
                <span className='text-muted-foreground truncate'>
                  {placeholder}
                </span>
              ) : mode === 'single' ? (
                <span className='truncate'>{selectedItems[0].label}</span>
              ) : (
                <div className='flex flex-nowrap gap-1 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                  {selectedItems.map((item) => (
                    <Badge
                      key={item.value}
                      variant='secondary'
                      className='flex-shrink-0'
                    >
                      {item.label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className='ml-2 flex items-center'>
              {clearable && selectedItems.length > 0 && (
                <X
                  className='mr-1 h-4 w-4 opacity-50 hover:opacity-100'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                />
              )}
              <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-full p-0'
          style={{ width: dropdownWidth }}
          align='start'
        >
          <Command shouldFilter={false}>
            {searchable && (
              <CommandInput
                placeholder={searchPlaceholder}
                value={search}
                onValueChange={setSearch}
              />
            )}
            <CommandEmpty>{noOptionsText}</CommandEmpty>
            <CommandGroup className='max-h-60 overflow-y-auto'>
              {loading && currentPage === 1 ? (
                <div className='text-muted-foreground px-3 py-2 text-center text-sm'>
                  {loadingText}
                </div>
              ) : filteredOptions.length > 0 ? (
                <>
                  {filteredOptions.map((item) => {
                    const isSelected =
                      mode === 'single'
                        ? item.value === value
                        : Array.isArray(value) && value.includes(item.value)
                    return (
                      <CommandItem
                        key={item.value}
                        value={item.value.toString()}
                        onSelect={() => handleSelect(item)}
                        className='cursor-pointer'
                      >
                        <div
                          className={cn(
                            'mr-2 h-4 w-4',
                            isSelected ? 'opacity-100' : 'opacity-0'
                          )}
                        >
                          ✓
                        </div>
                        {item.label}
                      </CommandItem>
                    )
                  })}
                  {loading && currentPage > 1 && (
                    <div className='text-muted-foreground px-3 py-2 text-center text-sm'>
                      Loading more...
                    </div>
                  )}
                </>
              ) : (
                <div className='text-muted-foreground px-3 py-2 text-sm'>
                  {noOptionsText}
                </div>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <p className='text-destructive mt-1 text-sm font-medium'>{error}</p>
      )}
    </div>
  )
}
