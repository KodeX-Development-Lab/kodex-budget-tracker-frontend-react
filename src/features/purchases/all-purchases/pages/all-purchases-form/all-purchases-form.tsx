import { useEffect, useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { useCreatePurchaseOrder } from '@/graphql/mutations/purchase.mutation'
import {
  useGetAllEnums,
  useGetAllProducts,
} from '@/graphql/queries/product.query'
import {
  Supplier,
  useGetAllSuppliers,
  useGetPoCode,
  useGetPurchase,
} from '@/graphql/queries/purchase.query'
import { toast } from 'sonner'
import { mapToLabelValue } from '@/lib/utils'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import CustomTable from '@/components/custom-table/CustomTable'
import { DatePickerField } from '@/components/form-fields/date-picker-field'
import { InputField } from '@/components/form-fields/input-field'
import { InputWithButton } from '@/components/form-fields/input-with-button'
import SearchAndDropdown from '@/components/form-fields/search-and-dropdown'
import { SelectField } from '@/components/form-fields/select-field'
import { TextareaField } from '@/components/form-fields/textarea-field'
import FormTemplate, {
  FormWrapper,
  LeftSection,
  RightSection,
} from '@/components/form-template/form-template'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import AllPurchasesFormProvider from '../../context/all-purchases-form-context'

export const formSchema = z.object({
  supplierId: z.number(),
  purchaseDate: z.date(),
  invoiceNumber: z.string().optional().nullable(),
  reference: z.string().optional().nullable(),
  purchaseStatus: z.number().nullable(),
  paymentStatus: z.number().nullable(),
  shippingFee: z.any(),
  totalDiscount: z.number().optional(),
  totalTax: z.number().optional(),
  grandTotal: z.number().optional(),
  note: z.string().optional().nullable(),
  attachment: z.string().optional().nullable(),
  createdById: z.number().int().optional(),
  items: z.any().optional(),
  code: z.string(),
})
type AllPurchasesForm = z.infer<typeof formSchema>

const AllPurchasesForm = () => {
  const { data: suppliersData } = useGetAllSuppliers()
  const { data: productsData } = useGetAllProducts()
  const { data: statusData } = useGetAllEnums()

  const navigate = useNavigate()

  const { id } = useParams({ strict: false })
  const { data: poCode } = useGetPoCode(Number(id))

  const { data: purchaseDetail } = useGetPurchase(Number(id))

  const { user } = useAuth()

  const suppliersOptions = useMemo(() => {
    return suppliersData?.suppliers?.map((cat: Supplier) => ({
      label: cat.name,
      value: cat.id,
    }))
  }, [suppliersData])

  const productDropdownList = useMemo(() => {
    return productsData?.products.map((product) => {
      return {
        id: product?.id,
        label: product?.productName,
        image: JSON.parse(product?.images)[0],
        productCode: product?.productCode,
        qty: product?.stockQuantity,
      }
    })
  }, [productsData])

  const form = useForm<AllPurchasesForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
      createdById: user?.id,
      purchaseStatus: 1,
      code: poCode,
    },
  })

  useEffect(() => {
    if (poCode) form.setValue('code', poCode)
  }, [poCode])

  useEffect(() => {
    if (purchaseDetail) {
      form.reset({
        ...purchaseDetail,
        supplierId: purchaseDetail?.supplier?.id,
        items: purchaseDetail?.items?.map((el) => ({
          ...el,
          productId: el?.product?.id,
        })),
      })
    }
  }, [purchaseDetail])

  const { mutateAsync: createPurchaseOrder } = useCreatePurchaseOrder()

  const onSubmit = async (data: AllPurchasesForm) => {
    try {
      await createPurchaseOrder({
        ...data,
        items: data?.items?.map((item: any) => {
          const { productId, quantity, subTotal, unitPrice } = item
          return {
            productId,
            quantity,
            subTotal,
            unitPrice,
          }
        }),
        shippingFee: Number(data.shippingFee),
      })
      toast.success('Purchase order created successfully!', { duration: 2000 })
      navigate({ to: '/purchases' })
      form.reset(form.getValues())
    } catch (error: any) {
      toast.error('Failed to create purchase order', { duration: 2000 })
      console.error('Create purchase order error:', error)
    }
  }

  const calculateAndUpdateRow = (row: any, activeItem: any) => {
    const quantity = row.quantity
    const unitPrice = row.unitPrice || 0
    const subTotal = quantity * unitPrice
    const total = subTotal
    form.setValue(
      'items',
      form.watch('items').map((product: any) => {
        if (product?.rowId === row?.rowId) {
          return {
            ...product,
            productId: activeItem?.id,
            quantity,
            unitPrice,
            subTotal: subTotal,
            total,
          }
        }
        return product
      })
    )
  }

  const handleProductChange = (id: number, row: any) => {
    const activeItem = productDropdownList?.find(
      (product) => product?.id === id
    )
    row.quantity = row.quantity || 1
    calculateAndUpdateRow(row, activeItem)
  }

  const handleTableRowChange = (
    value: number | string,
    row: any,
    type: string
  ) => {
    form.setValue(
      'items',
      form.watch('items').map((product: any) => {
        if (product?.rowId === row?.rowId) {
          return {
            ...product,
            [type]: value,
          }
        }
        return product
      })
    )
  }

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) => {
    const activeItem = productDropdownList?.find(
      (product) => product?.id === row?.productId
    )
    const inputValue = e.target.value
    if (inputValue === '' || inputValue === '0' || inputValue === '-1') {
      const resetColumn = ['quantity', 'subTotal', 'total']
      resetColumn.forEach((key) => handleTableRowChange(' ', row, key))
      return
    }
    row.quantity = Math.max(0, Number(inputValue))
    calculateAndUpdateRow(row, activeItem)
  }

  const handleUnitPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) => {
    const activeItem = productDropdownList?.find(
      (product) => product?.id === row?.productId
    )
    row.unitPrice = Math.max(0, Number(e.target.value))
    calculateAndUpdateRow(row, activeItem)
  }

  const selectedProductIds = useMemo(() => {
    return form.watch('items')?.map((item: any) => item?.productId)
  }, [form.watch('items')])

  const tableColumns = [
    {
      id: 'productId',
      name: 'ITEM NAME',
      width: '30%',
      component: (row: any) => {
        return (
          <div className='flex w-full items-center p-[10px]'>
            <SearchAndDropdown
              value={row?.productId}
              dropdownList={productDropdownList || []}
              onChange={(id: number) => {
                handleProductChange(id, row)
              }}
              selectedIds={selectedProductIds}
            />
          </div>
        )
      },
    },
    {
      id: 'quantity',
      name: 'QTY',
      width: '14%',
      component: (row: any) => {
        return (
          <input
            value={row.quantity}
            onChange={(e) => {
              handleQuantityChange(e, row)
            }}
            type='number'
            className='text-black2 border-x-vorpgraylight mx-[5px] h-[38px] w-full rounded-[4px] border px-[5px] text-[13px] font-[500] focus:outline-none'
          />
        )
      },
    },
    {
      id: 'unitPrice',
      name: 'RATE',
      width: '14%',
      component: (row: any) => {
        return (
          <input
            value={row.unitPrice}
            onChange={(e) => {
              handleUnitPriceChange(e, row)
            }}
            type='number'
            className='text-black2 border-x-vorpgraylight mx-[5px] h-[38px] w-full rounded-[4px] border px-[5px] text-[13px] font-[500] focus:outline-none'
          />
        )
      },
    },
    {
      id: 'tax',
      name: 'TAX',
      width: '14%',
      component: (row: any) => {
        return (
          <div className='text-black2 w-full overflow-hidden px-[10px] text-xs font-[500]'>
            0%
          </div>
        )
      },
    },
    {
      id: 'subTotal',
      name: 'SUB TOTAL',
      width: '14%',
      component: (row: any) => {
        return (
          <div className='text-black2 w-full px-[10px] text-xs font-[500]'>
            <input
              readOnly
              className='w-full bg-none focus:outline-none'
              value={Number(row.subTotal)}
              type='number'
            />
          </div>
        )
      },
    },
    {
      id: 'total',
      name: 'TOTAL',
      width: '14%',
      component: (row: any) => {
        return (
          <div className='text-black2 w-full px-[10px] text-xs font-[500]'>
            <input
              readOnly
              className='w-full bg-none focus:outline-none'
              value={Number(row.total)}
              type='number'
            />
          </div>
        )
      },
    },
  ]

  const total = useMemo(() => {
    if (!!id) {
      return purchaseDetail?.grandTotal
    }
    if (!form.watch('items')?.length) return
    const sumOfTotal = form
      .watch('items')
      .reduce((sum: any, row: any) => sum + row?.total, 0)
    form.setValue('grandTotal', sumOfTotal)
    return sumOfTotal
  }, [form.watch('items')])

  return (
    <AllPurchasesFormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>New Purchase</h2>
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
                    <CardTitle>Purchase Order</CardTitle>
                  </div>
                  <SelectField
                    name='supplierId'
                    label='Supplier'
                    placeholder='Select Supplier'
                    options={suppliersOptions || []}
                    search={true}
                    searchPlaceholder='Search Supplier'
                    required={true}
                  />
                  <DatePickerField
                    name='purchaseDate'
                    label='Purchase Date'
                    placeholder='Select Purchase Date'
                    required={true}
                  />
                  <InputWithButton
                    name='code'
                    label='PO Code'
                    buttonText='Auto Generate'
                    disabled
                  />
                  <InputField
                    name='invoiceNumber'
                    label='Invoice Number'
                    placeholder='Enter Invoice Number'
                    required={true}
                  />
                  <InputField
                    name='reference'
                    label='Reference Number'
                    placeholder='Enter Reference Number'
                  />
                  <InputField
                    name='shippingFee'
                    label='Shipping Charge'
                    placeholder='Enter Shipping Charge'
                    type='number'
                  />
                  <div className='col-span-2'>
                    <TextareaField
                      name='note'
                      label='Note'
                      placeholder='Enter Note'
                      rows={7}
                      className='h-34'
                    />
                  </div>
                </FormWrapper>
                <FormWrapper className='grid-cols-1'>
                  <div className='relative'>
                    <CustomTable
                      columns={tableColumns}
                      data={form.watch('items')}
                      onChange={(rows) => {
                        form.setValue('items', rows)
                      }}
                    />
                  </div>
                  {!!total && (
                    <div className='mt-[-58px] flex min-h-[150px] w-full justify-end'>
                      <div className='bg-primary mr-[15px] flex w-1/2 flex-col items-start gap-[12px] rounded-[12px] p-[20px] text-white'>
                        <div className='flex w-full items-start justify-between'>
                          <div className='text-black2 text-left text-[13px] font-[600]'>
                            Discount (0%)
                          </div>
                          <span className='text-[12px] font-[400]'>0</span>
                        </div>
                        <div className='flex w-full items-start justify-between'>
                          <div className='text-black2 text-left text-[13px] font-[600]'>
                            Tax (0%)
                          </div>
                          <span className='text-[12px] font-[400]'>0</span>
                        </div>
                        <div className='flex w-full items-start justify-between'>
                          <h3 className='black2 text-sm font-[600]'>
                            Total (MMK)
                          </h3>
                          <span className='black2 text-sm font-[600]'>
                            {total}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </FormWrapper>
              </LeftSection>
              <RightSection>
                {/* <FormWrapper className='flex flex-col'>
                  <CardTitle>Status</CardTitle>
                  <SelectField
                    name='purchaseStatus'
                    label='Purchase Status'
                    placeholder='Purchase Status'
                    options={
                      mapToLabelValue(statusData?.purchaseOrderStatuses) || []
                    }
                    search={true}
                    searchPlaceholder='Search Purchase Status'
                    required={true}
                  />
                </FormWrapper> */}
                <FormWrapper className='flex flex-col'>
                  <CardTitle>Payment</CardTitle>
                  <SelectField
                    name='paymentStatus'
                    label='Payment Status'
                    placeholder='Payment Status'
                    options={
                      mapToLabelValue(statusData?.purchasePaymentStatuses) || []
                    }
                    search={true}
                    searchPlaceholder='Search Payment Status'
                    required={true}
                  />
                  {/* <InputField
                    name='amount'
                    label='Amount'
                    placeholder='Enter Amount'
                    type='number'
                    required={true}
                  /> */}
                  <SelectField
                    name='payment_method'
                    label='Payment Method'
                    placeholder='Select Payment Method'
                    options={[]}
                    search={true}
                    searchPlaceholder='Search Payment Method'
                    required={true}
                  />
                  <DatePickerField
                    name='payment_date'
                    label='Payment Date'
                    placeholder='Select Payment Date'
                    required={true}
                  />
                </FormWrapper>
              </RightSection>
            </FormTemplate>
          </form>
        </Form>
        <div className='bg-background fixed bottom-0 flex w-full items-center gap-3 py-4'>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
          <Link to='/purchases'>
            <Button variant='outline'>Close</Button>
          </Link>
        </div>
      </Main>
    </AllPurchasesFormProvider>
  )
}

export default AllPurchasesForm
