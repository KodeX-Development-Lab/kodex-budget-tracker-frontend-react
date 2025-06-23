import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateBrand } from '@/graphql/mutations/product.mutation'
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
import BrandsFormProvider from '../../context/brands-form-context'

export const formSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required'),
  brandCode: z.string().min(1, 'Brand code is required'),
  description: z.string().optional(),
  status: z.any(),
  brandLogo: z.any().array(),
})

type BrandsForm = z.infer<typeof formSchema>

const BrandsForm = () => {
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
      toast.success('Brand created successfully!')
      form.reset(form.getValues())
    } catch (error: any) {
      toast.error('Failed to create brand')
      console.error('Create brand Error:', error)
    }
  }

  return (
    <BrandsFormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>New Brand</h2>
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
                      name='brandName'
                      label='Brand Name'
                      placeholder='Enter Brand Name'
                    />
                  </div>
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
                  <div className='col-span-2'>
                    <TextareaField
                      name='description'
                      label='Description'
                      placeholder='Enter Brand description'
                      rows={7}
                      className='h-34'
                    />
                  </div>
                </FormWrapper>
              </LeftSection>
              <RightSection>
                <FormWrapper className='grid-cols-1'>
                  <MultipleImageUpload name='brandLogo' />
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
    </BrandsFormProvider>
  )
}

export default BrandsForm
