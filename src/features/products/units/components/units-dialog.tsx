import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateUnit } from '@/graphql/mutations/product.mutation'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/form-fields/input-field'
import { SelectField } from '@/components/form-fields/select-field'
import FormTemplate from '@/components/form-template/form-template'
import { SideDrawer } from '@/components/side-drawer'
import { useUnits } from '../context/units-context'

export const formSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
  unitSymbol: z.string().min(1, 'Unit symbol is required'),
  status: z.any(),
  // description: z.string().optional(),
})
type UnitsForm = z.infer<typeof formSchema>

const UnitsDialog = () => {
  const queryClient = useQueryClient()
  const { open, setOpen } = useUnits()
  const form = useForm<UnitsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitName: '',
      unitSymbol: '',
      status: null,
    },
  })

  const { mutateAsync: createUnit } = useCreateUnit()

  const onSubmit = async (data: UnitsForm) => {
    try {
      await createUnit({
        ...data,
      })
      toast.success('Unit created successfully!', {
        duration: 2000,
      })
      setOpen('')
      queryClient.invalidateQueries({ queryKey: ['units'] })
    } catch (error: any) {
      toast.error('Failed to create unit')
      console.error('Create unit Error:', error)
    }
  }

  return (
    <SideDrawer
      title='Create Category'
      open={open === 'create'}
      onOpenChange={(e) => {
        if (!e) setOpen('')
      }}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <form
          id='tasks-form'
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex-1 space-y-5'
        >
          <FormTemplate className='mb-0 flex flex-col p-4'>
            <InputField
              name='unitName'
              label='Unit Name'
              placeholder='Enter Units Name'
            />
            <InputField
              name='unitSymbol'
              label='Unit Symbol'
              placeholder='Enter Unit Symbol'
            />
            <SelectField
              name='status'
              label='Status'
              placeholder='Select Status'
              options={[
                { label: 'Active', value: 1 },
                { label: 'Inactive', value: 2 },
              ]}
              search={true}
              searchPlaceholder='Search Status'
            />
          </FormTemplate>
        </form>
      </Form>
    </SideDrawer>
  )
}

export default UnitsDialog
