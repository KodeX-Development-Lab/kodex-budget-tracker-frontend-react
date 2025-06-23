import { z } from 'zod'

export const brandSchema = z.object({
  brandName: z.string(),
  brandCode: z.string(),
  description: z.string().optional(),
  id: z.number(),
  status: z.any(), // You can adjust the enum values as needed
  brandLogo: z.string().url().optional(), // Assuming it's a URL to the logo
})

export type Brand = z.infer<typeof brandSchema>
