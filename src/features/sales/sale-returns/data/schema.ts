import { z } from 'zod';

export const saleReturnsSchema = z.object({
  id: z.string().optional(),
  // Add your schema fields here
});

export type SaleReturnsSchema = z.infer<typeof saleReturnsSchema>;
