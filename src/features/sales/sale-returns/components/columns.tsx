import { ColumnDef } from '@tanstack/react-table';

// Define your data type
export interface SaleReturnsData {
  id: string;
  // Add other fields here
}

export const columns: ColumnDef<SaleReturnsData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  // Add more columns here
];
