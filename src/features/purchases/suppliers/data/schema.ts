import { z } from 'zod'

export const unitSchema = z.object({
  unit_name: z.string(),
  unit_symbol: z.string(),
  status: z.enum(['Active', 'Inactive']),
})

export type Unit = z.infer<typeof unitSchema>
