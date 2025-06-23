import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateCategory } from '@/graphql/mutations/product.mutation'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/form-fields/input-field'
import MultipleImageUpload from '@/components/form-fields/multiple-image-upload'
import { SelectField } from '@/components/form-fields/select-field'
import { TextareaField } from '@/components/form-fields/textarea-field'
import FormTemplate from '@/components/form-template/form-template'
import { SideDrawer } from '@/components/side-drawer'
import { useCategories } from '../context/categories-context'

const formSchema = z.object({
  categoryName: z.string().min(1, 'Category name is required'),
  categoryCode: z.string().min(1, 'Category code is required'),
  description: z.string().optional(),
  categoryImage: z.any().array(),
  status: z.any(), // Or z.boolean(), depending on how you're using status
})
type CategoryForm = z.infer<typeof formSchema>

const CategoriesDialog = () => {
  const queryClient = useQueryClient()
  const { open, setOpen } = useCategories()
  const form = useForm<CategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: '',
      categoryCode: '',
      description: '',
      categoryImage: [],
      status: null,
    },
  })

  const { mutateAsync: createCategory } = useCreateCategory()

  const onSubmit = async (data: CategoryForm) => {
    try {
      await createCategory({
        ...data,
        categoryImage: JSON.stringify(data.categoryImage),
      })
      toast.success('Category created successfully!', {
        duration: 2000,
      })
      setOpen('')
      queryClient.invalidateQueries({ queryKey: ['categories'] })

      form.reset()
    } catch (error: any) {
      toast.error('Failed to create category', {
        duration: 2000,
      })
      console.error('Create category Error:', error)
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
              name='categoryName'
              label='Category Name'
              placeholder='Enter Category Name'
            />
            <InputField
              name='categoryCode'
              label='Category Code'
              placeholder='Enter Category Code'
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
              placeholder='Enter Category description'
              rows={7}
              className='h-34'
            />
            <MultipleImageUpload name='categoryImage' />
          </FormTemplate>
        </form>
      </Form>
    </SideDrawer>
  )
}

export default CategoriesDialog
