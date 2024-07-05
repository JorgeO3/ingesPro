import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import type { DataTableComponentProps } from '@/lib/dataTableTypes';
import { flexRender } from '@tanstack/react-table';
import { typedMemo } from '@/lib/dataTableTypes';

function DataTableBody<T>({ table }: DataTableComponentProps<T>) {
  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default typedMemo(DataTableBody);
