import { z } from 'zod'

export const productSchema = z.object({
  productName: z.string(),
  // product_code: z.string(),
  // category: z.string(),
  // brand: z.string(),
  // unit: z.string(),
  // cost_price: z.number(),
  // sale_price: z.number(),
  // reorder_level: z.number(),
  // stock_quantity: z.number(),
  // description: z.string().optional(), // optional if you want to allow empty
})

export type Product = z.infer<typeof productSchema>
