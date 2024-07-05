import { typedMemo } from '@/lib/dataTableTypes';
import { flexRender } from '@tanstack/react-table';
import type { DataTableComponentProps } from '@/lib/dataTableTypes';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

function DataTableHeader<T>({ table }: DataTableComponentProps<T>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default typedMemo(DataTableHeader);
