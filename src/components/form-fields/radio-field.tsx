import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type RadioOption = { label: string; value: string }

interface RadioFieldProps {
  name: string
  label?: string
  options: RadioOption[]
}

const RadioField = ({ name, label, options }: RadioFieldProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-1'>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className='flex h-8 flex-row space-x-6'
              aria-label={label}
            >
              {options.map(({ label, value }) => (
                <FormItem key={value} className='flex items-center space-x-2'>
                  <RadioGroupItem value={value} id={`${name}-${value}`} />
                  <FormLabel
                    htmlFor={`${name}-${value}`}
                    className='cursor-pointer'
                  >
                    {label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default RadioField

{
  /* <div className='col-span-2'>
  <RadioField
    name='product_type'
    label='Product Type'
    options={[
      { label: 'Simple', value: 'standard' },
      { label: 'Variable', value: 'express' },
      { label: 'Package', value: 'next_day' },
      { label: 'Combo', value: 'combo' },
    ]}
  />
</div> */
}
