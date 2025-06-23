import { z } from 'zod';

export const customersSchema = z.object({
  id: z.string().optional(),
  // Add your schema fields here
});

export type CustomersSchema = z.infer<typeof customersSchema>;
