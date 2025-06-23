import { ColumnDef } from '@tanstack/react-table';

// Define your data type
export interface CustomersData {
  id: string;
  // Add other fields here
}

export const columns: ColumnDef<CustomersData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  // Add more columns here
];
