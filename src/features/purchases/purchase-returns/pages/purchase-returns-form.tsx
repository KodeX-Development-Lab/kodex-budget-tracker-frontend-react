import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/form-fields/input-field'
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
import { PurchaseReturnsFormProvider } from '../context/purchase-returns-form-context'

const formSchema = z.object({
  item_name: z.string().min(1, 'Title is required.'),
  slug: z.string().min(1, 'Slug is required.'),
  description: z.string().min(1, 'Slug is required.'),
  price: z.number().min(1, 'Price is required.'),
  stock: z.number().min(1, 'Price is required.'),
  discount: z.number().min(1, 'Price is required.'),
  status: z.string().min(1, 'Please select a status.'),
  label: z.string().min(1, 'Please select a label.'),
  priority: z.string().min(1, 'Please choose a priority.'),
  images: z.any(),
  categories: z.any(),
  tags: z.any(),
})
type PurchasesReturnForm = z.infer<typeof formSchema>

const PurchasesReturnForm = () => {
  const form = useForm<PurchasesReturnForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item_name: '',
      slug: '',
      discount: 0,
      status: '',
      label: '',
      priority: '',
      images: [],
      categories: [],
      tags: [],
    },
  })

  const onSubmit = (data: PurchasesReturnForm) => {
    // eslint-disable-next-line no-console
    console.log(data)
    form.reset()
  }

  return (
    <PurchaseReturnsFormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              New Purchases Return
            </h2>
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
                      name='unit_name'
                      label='Unit Name'
                      placeholder='Enter PurchasesReturn Name'
                    />
                  </div>
                  <InputField
                    name='unit_symbol'
                    label='Unit Symbol'
                    placeholder='Enter Unit Symbol'
                  />
                  <SelectField
                    name='status'
                    label='Status'
                    placeholder='Select Status'
                    options={[]}
                    search={true}
                    searchPlaceholder='Search Status'
                  />
                  <div className='col-span-2'>
                    <TextareaField
                      name='description'
                      label='Description'
                      placeholder='Enter PurchasesReturn Description'
                      rows={7}
                      className='h-34'
                    />
                  </div>
                </FormWrapper>
              </LeftSection>
              <RightSection>placeholder</RightSection>
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
    </PurchaseReturnsFormProvider>
  )
}

export default PurchasesReturnForm
