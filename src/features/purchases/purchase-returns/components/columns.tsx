import { ColumnDef } from '@tanstack/react-table';

// Define your data type
export interface PurchaseReturnsData {
  id: string;
  // Add other fields here
}

export const columns: ColumnDef<PurchaseReturnsData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  // Add more columns here
];
