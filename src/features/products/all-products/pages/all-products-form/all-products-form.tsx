import { useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useCreateProduct } from '@/graphql/mutations/product.mutation'
import {
  Brand,
  Category,
  Unit,
  useGetAllBrands,
  useGetAllCategories,
  useGetAllUnits,
} from '@/graphql/queries/product.query'
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
import AllProductsFormProvider from '../../context/all-products-form-context'

const formSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productCode: z.string().min(1, 'Product code is required'),
  costPrice: z.coerce.number().min(0, 'Cost price must be positive'),
  salePrice: z.coerce.number().min(0, 'Sale price must be positive'),
  reorderLevel: z.coerce.number().min(0, 'Reorder level must be positive'),
  stockQuantity: z.coerce.number().min(0, 'Stock quantity must be positive'),
  description: z.string().optional(),
  brandId: z.coerce.number().min(1, 'Brand is required'),
  categoryId: z.coerce.number().min(1, 'Category is required'),
  unitId: z.coerce.number().min(1, 'Unit is required'),
  images: z.any().array(), // Include images in schema
})

type AllProductForm = z.infer<typeof formSchema>

const AllProductsForm = () => {
  const { data: categoriesData } = useGetAllCategories()
  const { data: brandsData } = useGetAllBrands()
  const { data: unitsData } = useGetAllUnits()
  const navigate = useNavigate()

  const form = useForm<AllProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productCode: '',
      costPrice: 0,
      salePrice: 0,
      reorderLevel: 0,
      stockQuantity: 0,
      description: '',
      brandId: 0,
      categoryId: 0,
      unitId: 0,
      images: [],
    },
  })

  const { mutateAsync: createProduct } = useCreateProduct()

  const onSubmit = async (data: AllProductForm) => {
    try {
      await createProduct({ ...data, images: JSON.stringify(data.images) })
      toast.success('Product created successfully!', {
        duration: 2000,
      })
      form.reset(form.getValues())
      navigate({ to: '/products' })
    } catch (error: any) {
      toast.error('Failed to create product', {
        duration: 2000,
      })
      console.error('Create Product Error:', error)
    }
  }

  const categoriesOptions = useMemo(() => {
    return categoriesData?.categories?.map((cat: Category) => ({
      label: cat.categoryName,
      value: cat.id,
    }))
  }, [categoriesData])

  const brandsOptions = useMemo(() => {
    return brandsData?.brands?.map((cat: Brand) => ({
      label: cat.brandName,
      value: cat.id,
    }))
  }, [brandsData])

  const unitsOptions = useMemo(() => {
    return unitsData?.units?.map((unit: Unit) => ({
      label: unit.unitName,
      value: unit.id,
    }))
  }, [unitsData])

  return (
    <AllProductsFormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>New Product</h2>
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
                      name='productName'
                      label='Product Name'
                      placeholder='Enter Product Name'
                      required
                    />
                  </div>
                  <InputField
                    name='productCode'
                    label='Product Code'
                    placeholder='Enter Product Code'
                    required
                  />
                  <SelectField
                    name='categoryId'
                    label='Category'
                    placeholder='Select Category'
                    options={categoriesOptions || []}
                    search
                    searchPlaceholder='Search Category'
                    required
                  />
                  <SelectField
                    name='brandId'
                    label='Brand'
                    placeholder='Select Brand'
                    options={brandsOptions || []}
                    search
                    searchPlaceholder='Search Brand'
                    required
                  />
                  <SelectField
                    name='unitId'
                    label='Unit'
                    placeholder='Select Unit'
                    options={unitsOptions || []}
                    search
                    searchPlaceholder='Search Unit'
                    required
                  />
                  <InputField
                    name='costPrice'
                    label='Cost Price'
                    placeholder='Enter Cost Price'
                    type='number'
                    required
                  />
                  <InputField
                    name='salePrice'
                    label='Sale Price'
                    placeholder='Enter Sale Price'
                    type='number'
                    required
                  />
                  <InputField
                    name='reorderLevel'
                    label='Reorder Level'
                    placeholder='Enter Reorder Level'
                    type='number'
                    required
                  />
                  <InputField
                    name='stockQuantity'
                    label='Stock Quantity'
                    placeholder='Enter Stock Quantity'
                    type='number'
                    required
                  />
                  <div className='col-span-2'>
                    <TextareaField
                      name='description'
                      label='Description'
                      placeholder='Enter product description'
                      rows={7}
                      className='h-34'
                    />
                  </div>
                </FormWrapper>
              </LeftSection>
              <RightSection>
                <FormWrapper className='grid-cols-1'>
                  <MultipleImageUpload name='images' />
                </FormWrapper>
              </RightSection>
            </FormTemplate>
          </form>
        </Form>
        <ButtonContainer>
          <Button form='tasks-form' type='submit'>
            {false ? 'Saving...' : 'Save changes'}
          </Button>
          <Button variant='outline'>Close</Button>
        </ButtonContainer>
      </Main>
    </AllProductsFormProvider>
  )
}

export default AllProductsForm
