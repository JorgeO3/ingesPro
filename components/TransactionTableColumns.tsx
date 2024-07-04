import type { ColumnDef, Row, Table } from '@tanstack/react-table';
import type { Transaction } from '@/lib/transactions';
import { Checkbox } from './ui/checkbox';
import { TransactionTableDropdown } from '@/components/TransactionTableDropdown';

const selectHeader = (table: Table<Transaction>) => (
  <div className="flex justify-center">
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  </div>
);

const getSelectCell = (row: Row<Transaction>) => (
  <div className="flex justify-center">
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  </div>
);

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => selectHeader(table),
    cell: ({ row }) => getSelectCell(row),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: () => <div className="text-center">ID</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: 'concept',
    header: () => <div className="text-center">Concept</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-center">Amount</div>,
    cell: (info) => {
      const amount = Number.parseFloat(String(info.getValue()));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: () => <div className="text-center">Date</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: 'user',
    header: () => <div className="text-center">User</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <TransactionTableDropdown transaction={row.original} />,
  },
];
