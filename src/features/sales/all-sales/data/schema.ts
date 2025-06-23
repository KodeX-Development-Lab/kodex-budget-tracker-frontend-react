import { z } from 'zod';

export const allSalesSchema = z.object({
  id: z.string().optional(),
  // Add your schema fields here
});

export type AllSalesSchema = z.infer<typeof allSalesSchema>;
