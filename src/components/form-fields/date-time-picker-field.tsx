import { useState } from 'react'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { Calendar as CalendarIcon, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateTimePickerFieldProps {
  name: string
  label: string
  placeholder?: string
  className?: string
  disabled?: boolean
  dateFormat?: string
  minDate?: Date
  maxDate?: Date
  disabledDates?: (date: Date) => boolean
  required?: boolean
}

export const DateTimePickerField = ({
  name,
  label,
  placeholder = 'Pick date & time',
  className,
  disabled = false,
  dateFormat = 'PPP p', // e.g., "Jan 1, 2023 10:00 AM"
  minDate,
  maxDate,
  disabledDates,
  required = false,
}: DateTimePickerFieldProps) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    if (disabledDates && disabledDates(date)) return true
    return false
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!field.value) return
          const [hours, minutes] = e.target.value.split(':').map(Number)
          const updated = new Date(field.value)
          updated.setHours(hours)
          updated.setMinutes(minutes)
          field.onChange(updated)
        }

        return (
          <FormItem className='w-full space-y-1'>
            <FormLabel className='flex items-center'>
              <span>{label}</span>
              {required && <span className='text-red-600'>*</span>}
            </FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'h-11 w-full justify-start bg-transparent text-left font-normal',
                      !field.value && 'text-muted-foreground',
                      className
                    )}
                    disabled={disabled}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {field.value ? format(field.value, dateFormat) : <span>{placeholder}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-2 flex flex-col gap-2' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={(date) => {
                      // preserve time if already selected
                      const newDate = field.value ? new Date(field.value) : date
                      newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
                      field.onChange(newDate)
                    }}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                  <div className='flex items-center gap-2'>
                    <Input
                      type='time'
                      value={field.value ? format(field.value, 'HH:mm') : ''}
                      onChange={handleTimeChange}
                      className='w-full'
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}