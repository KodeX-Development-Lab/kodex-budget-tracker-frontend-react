import { z } from 'zod'
import { TransactionTypes } from '@/features/budgets/types/budget-types'

export const CategoryFormSchema = z.object({
  type: z.enum([TransactionTypes.INCOME, TransactionTypes.EXPENSE]),
  name: z.string().min(1, "Name is required"),
  icon_id: z.number().int().positive('Icon is required'),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Must be a valid hex color (e.g. #FF0000 or #F00)',
  }),
})

export type CategoryFormSchemaType = z.infer<typeof CategoryFormSchema>
