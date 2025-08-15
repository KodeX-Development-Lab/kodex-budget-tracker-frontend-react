import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LucideIconByName from '@/components/lucideiconbyname'
import {
  CategoryType,
  IconType,
  TransactionTypes,
} from '@/features/budgets/types/budget-types'
import { CategoriesByParamsQueryKey } from '../api/key'
import { useSaveCategory, useUpdateCategory } from '../api/mutations/mutation'
import { useCategoryContext } from '../context/CategoryContext'
import { CategoryFormSchema, CategoryFormSchemaType } from '../data/schema'

export function CategoryFormDialog({
  mode,
  open,
  onOpenChange,
  initialData,
}: {
  mode: 'create' | 'edit'
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData: CategoryType | null
}) {
  const queryClient = useQueryClient()
  const { icons } = useCategoryContext()
  const categorySaveMutation = useSaveCategory()
  const categoryUpdateMutation = useUpdateCategory()
  const [selectedIcon, setSelectedIcon] = useState<IconType | null>()

  useMemo(() => {
    if (initialData && initialData.icon) {
      setSelectedIcon(initialData.icon)
    }
  }, [initialData])

  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      type: TransactionTypes.INCOME,
      name: '',
      icon_id: 0,
      color: '',
    },
  })


  useEffect(() => {
    if (initialData && mode === 'edit') {
      form.reset({
        type: initialData.type,
        icon_id: initialData.icon.id,
        name: initialData.name,
        color: initialData.color,
      })
    } else if (mode === 'create') {
      setSelectedIcon(null);
      form.reset({
        type: TransactionTypes.INCOME,
        icon_id: 0,
        name: '',
        color: '#000000',
      })
    }
  }, [initialData, mode, form])

  const handleBackendErrors = (error: any) => {
    const backendErrors = error?.response?.data?.errors
    if (backendErrors) {
      Object.entries(backendErrors).forEach(([field, messages]) => {
        form.setError(field as keyof CategoryFormSchemaType, {
          type: 'server',
          message: (messages as string[])[0],
        })
      })
    } else {
      toast.error(error.data?.message ?? 'Error')
    }
  }

  const handleSubmit = async (payload: CategoryFormSchemaType) => {
    if (mode == 'create') {
      categorySaveMutation.mutate(payload, {
        onError: handleBackendErrors,
        onSuccess: (res) => {
          toast.success(res?.data?.message)
          form.reset()
          setSelectedIcon(null)
          onOpenChange(false)
          queryClient.invalidateQueries({
            queryKey: [CategoriesByParamsQueryKey],
          })
        },
      })
    } else if (initialData && mode == 'edit') {
      categoryUpdateMutation.mutate(
        { id: initialData.id, payload },
        {
          onError: handleBackendErrors,
          onSuccess: (res) => {
            toast.success(res?.data?.message)
            form.reset()
            setSelectedIcon(null)
            onOpenChange(false)
            queryClient.invalidateQueries({
              queryKey: [CategoriesByParamsQueryKey],
            })
          },
        }
      )
    }
  }

  const colorValue = form.watch('color')

  const getIconStyle = (icon: IconType) => {
    if (selectedIcon && selectedIcon.id == icon.id && colorValue) {
      return {
        backgroundColor: colorValue,
        color: '#fff',
      }
    } else if (selectedIcon && selectedIcon.id == icon.id && !colorValue) {
      return {
        backgroundColor: '#ccc',
        color: '#fff',
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{mode == 'create' ? 'New' : 'Edit'}</DialogTitle>
              <DialogDescription>
                {mode == 'create' ? 'New' : 'Edit'} Category
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TransactionTypes.INCOME}>
                          Income
                        </SelectItem>
                        <SelectItem value={TransactionTypes.EXPENSE}>
                          Expense
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedIcon && form.getValues('color') && (
                <div>
                  <FormLabel>Symbol Preview</FormLabel>
                  <div
                    className='mt-3 flex h-12 w-12 items-center justify-center rounded-full p-3'
                    style={{ backgroundColor: form.getValues('color') }}
                  >
                    <span className='flex items-center justify-center text-xl text-white'>
                      <LucideIconByName name={selectedIcon?.name} />
                    </span>
                  </div>
                </div>
              )}
              <div>
                <FormLabel>Color</FormLabel>
                <input
                  type='color'
                  {...form.register('color')}
                  // value={form.getValues('color')}
                  // onChange={(event) =>
                  //   form.setValue('color', event.target.value)
                  // }
                />
              </div>
              <div>
                <FormLabel>Icon</FormLabel>
                <div
                  className='grid grid-cols-5 gap-3 overflow-y-auto'
                  style={{ height: '100px' }} // Fixed height
                >
                  {icons?.map((icon) => (
                    <div
                      key={icon.id}
                      onClick={() => {
                        setSelectedIcon(icon)
                        form.setValue('icon_id', icon.id)
                      }}
                      className={`flex cursor-pointer flex-col items-center rounded p-2 transition-colors hover:bg-gray-50`}
                      style={getIconStyle(form.getValues('color'), icon)}
                    >
                      <div className='mb-1 text-2xl'>
                        <LucideIconByName name={icon?.name} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button onClick={form.handleSubmit(handleSubmit)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
