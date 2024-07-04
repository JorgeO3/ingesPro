import { type Table, flexRender } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from './ui/table';
import type { Transaction } from '@/lib/transactions';

interface Props {
  table: Table<Transaction>;
}

export const TransactionTableHeader = ({ table }: Props) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);
