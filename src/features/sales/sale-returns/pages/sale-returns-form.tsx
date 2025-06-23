import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
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
import { SaleReturnsFormProvider } from '../context/sale-returns-form-context'

const formSchema = z.object({})

type SaleReturnsForm = z.infer<typeof formSchema>

const SaleReturnsForm = () => {
  const form = useForm<SaleReturnsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = (data: SaleReturnsForm) => {
    // eslint-disable-next-line no-console
    console.log(data)
    form.reset()
  }

  return (
    <SaleReturnsFormProvider>
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
              New Sale Return
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
                <FormWrapper>placeholder</FormWrapper>
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
    </SaleReturnsFormProvider>
  )
}

export default SaleReturnsForm
