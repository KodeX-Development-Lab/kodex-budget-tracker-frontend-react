import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InputFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: 'text' | 'number'
  className?: string
  step?: string | number
  min?: number
  max?: number
  required?: boolean
}

export const InputField = ({
  name,
  label,
  placeholder = 'Enter value',
  type = 'text',
  className,
  step,
  min,
  max,
  required = false,
}: InputFieldProps) => {
  const { control, register } = useFormContext()

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
            <Input
              {...field}
              {...register(name)}
              type={type}
              placeholder={placeholder}
              className={className}
              step={step}
              min={min}
              max={max}
              onChange={(e) => {
                type == 'number'
                  ? field.onChange(Number(e.target.value))
                  : field.onChange(e.target.value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
