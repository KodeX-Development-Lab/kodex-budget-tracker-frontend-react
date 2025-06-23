import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCategory } from '@/graphql/mutations/product.mutation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/form-fields/input-field'
import MultipleImageUpload from '@/components/form-fields/multiple-image-upload'
import { SelectField } from '@/components/form-fields/select-field'
import { TextareaField } from '@/components/form-fields/textarea-field'
import FormTemplate, {
  ButtonContainer,
  FormWrapper,
  LeftSection,
  RightSection,
} from '@/components/form-template/form-template'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import CategoriesFormProvider from '../../context/categories-form-context'

const formSchema = z.object({
  categoryName: z.string().min(1, 'Category name is required'),
  categoryCode: z.string().min(1, 'Category code is required'),
  description: z.string().optional(),
  categoryImage: z.any().array(),
  status: z.any(), // Or z.boolean(), depending on how you're using status
})
type CategoryForm = z.infer<typeof formSchema>

const CategoryForm = () => {
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
      toast.success('Category created successfully!')
      form.reset(form.getValues())
    } catch (error: any) {
      toast.error('Failed to create category')
      console.error('Create category Error:', error)
    }
  }

  return (
    <CategoriesFormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>New Category</h2>
          </div>
        </div>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='mb-15 flex-1 space-y-5'
          >
            <FormTemplate>
              <LeftSection>
                <FormWrapper>
                  <div className='col-span-2'>
                    <InputField
                      name='categoryName'
                      label='Category Name'
                      placeholder='Enter Category Name'
                    />
                  </div>
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
                  <div className='col-span-2'>
                    <TextareaField
                      name='description'
                      label='Description'
                      placeholder='Enter Category description'
                      rows={7}
                      className='h-34'
                    />
                  </div>
                </FormWrapper>
              </LeftSection>
              <RightSection>
                <FormWrapper className='grid-cols-1'>
                  <MultipleImageUpload name='categoryImage' />
                </FormWrapper>
              </RightSection>
            </FormTemplate>
          </form>
        </Form>
        <ButtonContainer>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
          <Button variant='outline'>Close</Button>
        </ButtonContainer>
      </Main>
    </CategoriesFormProvider>
  )
}

export default CategoryForm
