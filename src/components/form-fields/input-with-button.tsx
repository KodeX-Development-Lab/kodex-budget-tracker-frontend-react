import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InputWithButtonProps {
  name: string
  label: string
  placeholder?: string
  buttonText?: string
  onButtonClick?: () => void
  disabled?: boolean
}

export const InputWithButton = ({
  name,
  label,
  placeholder = 'Enter value',
  buttonText = 'Generate',
  onButtonClick,
  disabled = false,
}: InputWithButtonProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-1'>
          <FormLabel>{label}</FormLabel>
          <div className='relative'>
            <FormControl>
              <Input
                disabled
                {...field}
                placeholder={placeholder}
                className='pr-24'
              />
            </FormControl>
            <Button
              type='button'
              onClick={onButtonClick}
              className='absolute top-1/2 right-3 h-6 -translate-y-1/2 rounded-md px-3 py-1 text-xs'
            >
              {buttonText}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
