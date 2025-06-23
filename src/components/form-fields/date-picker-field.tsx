import { useState } from 'react'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { Calendar as CalendarIcon } from 'lucide-react'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerFieldProps {
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

export const DatePickerField = ({
  name,
  label,
  placeholder = 'Pick a date',
  className,
  disabled = false,
  dateFormat = 'PPP', // Default: "January 1, 2023"
  minDate,
  maxDate,
  disabledDates,
  required = false,
}: DatePickerFieldProps) => {
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
      render={({ field }) => (
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
                  {field.value ? (
                    format(field.value, dateFormat)
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date)
                    setOpen(false)
                  }}
                  disabled={isDateDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// usage

// Basic date picker
{
  /* <DatePickerField
  name="birthDate"
  label="Birth Date"
  placeholder="Select your birth date"
/>

// Date picker with constraints
<DatePickerField
  name="appointmentDate"
  label="Appointment Date"
  placeholder="Choose appointment date"
  minDate={new Date()} // No past dates
  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // Next 30 days
  dateFormat="dd/MM/yyyy"
/>

// Date picker with custom disabled dates (e.g., weekends)
<DatePickerField
  name="workDate"
  label="Work Date"
  placeholder="Select work date"
  disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6}
/> */
}
