import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateUnit } from '@/graphql/mutations/product.mutation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputField } from '@/components/form-fields/input-field'
import { SelectField } from '@/components/form-fields/select-field'
import { TextareaField } from '@/components/form-fields/textarea-field'
import FormTemplate, {
  ButtonContainer,
  FormWrapper,
  LeftSection,
} from '@/components/form-template/form-template'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import UnitsFormProvider from '../../context/units-form-context'

export const formSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
  unitSymbol: z.string().min(1, 'Unit symbol is required'),
  status: z.any(),
  // description: z.string().optional(),
})
type UnitsForm = z.infer<typeof formSchema>

const UnitsForm = () => {
  const form = useForm<UnitsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitName: '',
      unitSymbol: '',
      status: null,
      // description: '',
    },
  })

  const { mutateAsync: createUnit } = useCreateUnit()

  const onSubmit = async (data: UnitsForm) => {
    try {
      await createUnit({
        ...data,
      })
      toast.success('Unit created successfully!')
      form.reset(form.getValues())
    } catch (error: any) {
      toast.error('Failed to create unit')
      console.error('Create unit Error:', error)
    }
  }

  return (
    <UnitsFormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>New Units</h2>
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
                      name='unitName'
                      label='Unit Name'
                      placeholder='Enter Units Name'
                    />
                  </div>
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
                  {/* <div className='col-span-2'>
                    <TextareaField
                      name='description'
                      label='Description'
                      placeholder='Enter Units Description'
                      rows={7}
                      className='h-34'
                    />
                  </div> */}
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
    </UnitsFormProvider>
  )
}

export default UnitsForm
