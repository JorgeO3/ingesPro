import React from 'react';
import { Table } from '@/components/ui/table';
import type { DataTableProps } from '@/lib/dataTableTypes';
import { useDataTable } from '../hooks/useDataTable';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import DataTablePagination from './DataTablePagination';

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const table = useDataTable<T>(data, columns);
  return (
    <div>
      <Table>
        <DataTableHeader table={table} />
        <DataTableBody table={table} />
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
