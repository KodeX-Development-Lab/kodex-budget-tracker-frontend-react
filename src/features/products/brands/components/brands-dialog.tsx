import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateBrand } from '@/graphql/mutations/product.mutation'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/form-fields/input-field'
import MultipleImageUpload from '@/components/form-fields/multiple-image-upload'
import { SelectField } from '@/components/form-fields/select-field'
import { TextareaField } from '@/components/form-fields/textarea-field'
import FormTemplate from '@/components/form-template/form-template'
import { SideDrawer } from '@/components/side-drawer'
import { useBrands } from '../context/brands-context'

export const formSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required'),
  brandCode: z.string().min(1, 'Brand code is required'),
  description: z.string().optional(),
  status: z.any(),
  brandLogo: z.any().array(),
})

type BrandsForm = z.infer<typeof formSchema>

const BrandsDialog = () => {
  const { open, setOpen } = useBrands()
  const queryClient = useQueryClient()

  const form = useForm<BrandsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: '',
      brandCode: '',
      description: '',
      status: null,
      brandLogo: [],
    },
  })

  const { mutateAsync: createBrand } = useCreateBrand()

  const onSubmit = async (data: BrandsForm) => {
    try {
      await createBrand({
        ...data,
        brandLogo: JSON.stringify(data.brandLogo),
      })
      toast.success('Brand created successfully!', {
        duration: 2000, // time in milliseconds (e.g., 2000ms = 2 seconds)
      })
      setOpen('')
      queryClient.invalidateQueries({ queryKey: ['brands'] })

      form.reset()
    } catch (error: any) {
      toast.error('Failed to create brand')
      console.error('Create brand Error:', error)
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
              name='brandName'
              label='Brand Name'
              placeholder='Enter Brand Name'
            />
            <InputField
              name='brandCode'
              label='Brand Code'
              placeholder='Enter Brand Code'
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
            <TextareaField
              name='description'
              label='Description'
              placeholder='Enter Brand description'
              rows={7}
              className='h-34'
            />
            <MultipleImageUpload name='brandLogo' />
          </FormTemplate>
        </form>
      </Form>
    </SideDrawer>
  )
}

export default BrandsDialog
