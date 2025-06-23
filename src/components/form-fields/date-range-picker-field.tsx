/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { format } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
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

interface DateRangePickerFieldProps {
  startName: string
  endName: string
  label: string
  startPlaceholder?: string
  endPlaceholder?: string
  className?: string
  disabled?: boolean
  dateFormat?: string
  minDate?: Date
  maxDate?: Date
  disabledDates?: (date: Date) => boolean
  numberOfMonths?: number
}

export const DateRangePickerField = ({
  startName,
  endName,
  label,
  startPlaceholder = 'Start date',
  endPlaceholder = 'End date',
  className,
  disabled = false,
  dateFormat = 'MMM dd',
  minDate,
  maxDate,
  disabledDates,
  numberOfMonths = 2,
}: DateRangePickerFieldProps) => {
  const { control, setValue, watch } = useFormContext()
  const [open, setOpen] = useState(false)

  const startDate = watch(startName)
  const endDate = watch(endName)

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    if (disabledDates && disabledDates(date)) return true
    return false
  }

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setValue(startName, range.from)
      if (range.to) {
        setValue(endName, range.to)
      } else {
        setValue(endName, undefined)
      }
    } else {
      setValue(startName, undefined)
      setValue(endName, undefined)
    }
  }

  const currentRange: DateRange | undefined = startDate
    ? { from: startDate, to: endDate }
    : undefined

  return (
    <FormField
      control={control}
      name={startName} // Use startName as primary field for validation
      render={({ field }) => (
        <FormItem className='space-y-1'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'h-11 w-full justify-between bg-transparent px-3 py-2 text-left font-normal',
                    !startDate && !endDate && 'text-muted-foreground',
                    className
                  )}
                  disabled={disabled}
                >
                  <div className='flex w-full items-center gap-4'>
                    {/* Start Date Section */}
                    <div className='min-w-0'>
                      {startDate
                        ? format(startDate, dateFormat)
                        : startPlaceholder}
                    </div>

                    {/* Divider */}
                    <div className='bg-border h-px w-2 flex-shrink-0'></div>

                    {/* End Date Section */}
                    <div className='min-w-0'>
                      {endDate ? format(endDate, dateFormat) : endPlaceholder}
                    </div>
                  </div>

                  <CalendarIcon className='ml-2 h-4 w-4 flex-shrink-0' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={startDate || new Date()}
                  selected={currentRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={numberOfMonths}
                  disabled={isDateDisabled}
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
