import { z } from 'zod'
import { TransactionTypes } from '../types/budget-types'
import moment from 'moment'

export const BudgetFormSchema = z.object({
  type: z.enum([TransactionTypes.INCOME, TransactionTypes.EXPENSE]),
  category_id: z.number().int().positive("Category is required"),
  processed_at: z
    .date(),
    // .regex(
    //   /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}$/,
    //   'processed_at must be "YYYY-MM-DD HH:mm:ss" (or "YYYY-MM-DDTHH:mm:ss")'
    // ),
  amount: z.preprocess(
    (val) => Number(val), // Convert string to number
    z.number().gt(0, "Amount must be greater than 0") // Then validate as number
  ),
  remark: z.string().nullable(),
})

export type BudgetFormSchemaType = z.infer<typeof BudgetFormSchema>
