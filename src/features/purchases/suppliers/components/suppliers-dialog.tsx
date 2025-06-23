import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useCreateSupplier } from '@/graphql/mutations/purchase.mutation'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/form-fields/input-field'
import FormTemplate from '@/components/form-template/form-template'
import { SideDrawer } from '@/components/side-drawer'
import { useSuppliers } from '../context/suppliers-context'

const formSchema = z.object({
  name: z.string().min(1, 'Company Name is required'),
  contactPerson: z.string().min(1, 'Contact Person is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(1, 'Address is required'),
})

type SuppliersForm = z.infer<typeof formSchema>

const SuppliersDialog = () => {
  const queryClient = useQueryClient()
  const { open, setOpen } = useSuppliers()

  const form = useForm<SuppliersForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
    },
  })

  const { mutateAsync: createSupplier } = useCreateSupplier()

  const onSubmit = async (data: SuppliersForm) => {
    try {
      await createSupplier({
        ...data,
      })
      toast.success('Supplier created successfully!')
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })

      setOpen('')
    } catch (error: any) {
      toast.error('Failed to create supplier')
      console.error('Create Supplier Error:', error)
    }
  }
  return (
    <SideDrawer
      title='Create Supplier'
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
              name='name'
              label='Company Name'
              placeholder='Enter Company Name'
            />
            <InputField
              name='contactPerson'
              label='Contact Person'
              placeholder='Enter Contact Person'
            />
            <InputField
              name='phone'
              label='Phone Number'
              placeholder='Enter Phone Number'
              type='number'
            />
            <InputField name='email' label='Email' placeholder='Enter Email' />
            <InputField
              name='address'
              label='Address'
              placeholder='Enter Address'
            />
          </FormTemplate>
        </form>
      </Form>
    </SideDrawer>
  )
}

export default SuppliersDialog
