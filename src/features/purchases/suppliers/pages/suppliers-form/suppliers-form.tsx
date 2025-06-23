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
import SuppliersFormProvider from '../../context/suppliers-form-context'

const formSchema = z.object({})

type SuppliersForm = z.infer<typeof formSchema>

const SuppliersForm = () => {
  const form = useForm<SuppliersForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = (data: SuppliersForm) => {
    // eslint-disable-next-line no-console
    console.log(data)
    form.reset()
  }

  return (
    <SuppliersFormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>New Supplier</h2>
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
                      name='name'
                      label='Company Name'
                      placeholder='Enter Company Name'
                    />
                  </div>
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
                  <InputField
                    name='email'
                    label='Email'
                    placeholder='Enter Email'
                  />
                  <InputField
                    name='address'
                    label='Address'
                    placeholder='Enter Address'
                  />
                </FormWrapper>
              </LeftSection>
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
    </SuppliersFormProvider>
  )
}

export default SuppliersForm
