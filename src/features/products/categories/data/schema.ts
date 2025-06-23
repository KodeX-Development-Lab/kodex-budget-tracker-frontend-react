import { z } from 'zod'

export const categorySchema = z.object({
  categoryName: z.any(),
  categoryCode: z.any(),
  description: z.any(),
  categoryImage: z.any(), // assuming it's a valid image URL
  status: z.any(),
})

export type Category = z.infer<typeof categorySchema>
