import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { ColumnDefinitionParams } from '@/lib/dataTableTypes';
import { ColumnHeader } from '@/components/DataTableColumnHeader';
import { ColumnCell } from '@/components/DataTableColumnCell';

export function createColumnDefinition<T>({
  id,
  key,
  header,
  isSortable = false,
  isHideable = false,
  cellRenderer,
}: ColumnDefinitionParams<T>): ColumnDef<T> {
  return {
    id,
    accessorKey: key as string,
    header:
      typeof header === 'string'
        ? () => <ColumnHeader header={header} />
        : header,
    cell: cellRenderer ?? ((info) => <ColumnCell info={info} />),
    enableSorting: isSortable,
    enableHiding: isHideable,
  };
}
