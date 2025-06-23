import { ColumnDef } from '@tanstack/react-table';

// Define your data type
export interface AllSalesData {
  id: string;
  // Add other fields here
}

export const columns: ColumnDef<AllSalesData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  // Add more columns here
];
