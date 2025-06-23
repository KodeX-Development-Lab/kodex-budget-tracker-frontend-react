import { z } from 'zod';

export const purchaseReturnsSchema = z.object({
  id: z.string().optional(),
  // Add your schema fields here
});

export type PurchaseReturnsSchema = z.infer<typeof purchaseReturnsSchema>;
