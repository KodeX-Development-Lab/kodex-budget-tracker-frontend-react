import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DateTimePickerField } from '@/components/form-fields/date-time-picker-field'
import { useSaveBudgetItem } from '../api/mutations/mutation'
import { useBudgetContext } from '../context/budget-context'
import { BudgetFormSchema, BudgetFormSchemaType } from '../data/schema'
import { TransactionTypes } from '../types/budget-types'

export function BudgetAddDialog({
  mode,
  open,
  onOpenChange,
}: {
  mode: 'create' | 'edit'
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { categories: allCategories } = useBudgetContext()
  const mutation = useSaveBudgetItem()

  const form = useForm<BudgetFormSchemaType>({
    resolver: zodResolver(BudgetFormSchema),
    defaultValues: {
      type: TransactionTypes.INCOME,
      category_id: 0,
      processed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      amount: 0,
      remark: '',
    },
  })

  const typeValue = form.watch('type')
  const selectCategories = useMemo(() => {
    return allCategories.filter((cat) => cat.type == typeValue)
  }, [typeValue, allCategories])

  const handleBackendErrors = (error: any) => {
    const backendErrors = error?.response?.data?.errors
    if (backendErrors) {
      Object.entries(backendErrors).forEach(([field, messages]) => {
        form.setError(field as keyof BudgetFormSchemaType, {
          type: 'server',
          message: (messages as string[])[0],
        })
      })
    } else {
      toast.error(error.data?.message ?? 'Error')
    }
  }

  const handleSubmit = async (payload: BudgetFormSchemaType) => {
    mutation.mutate(payload, {
      onError: handleBackendErrors,
      onSuccess: (res) => {
        toast.success(res?.data?.message)
        form.reset();
        onOpenChange(false);
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{mode == 'create' ? 'New' : 'Edit'}</DialogTitle>
              <DialogDescription>
                Add income or expense record.
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
              {/* Category Select */}
              <FormField
                control={form.control}
                name='category_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectCategories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DateTimePickerField
                name='processed_at'
                label='Date'
                placeholder='Select Date'
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='remark'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remark</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ''}
                        placeholder=''
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
