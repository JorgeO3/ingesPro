import { createColumnDefinition } from '@/components/DataTableUtils';
import type {
  Table,
  ColumnDef,
  CellContext,
  HeaderContext,
} from '@tanstack/react-table';
import React from 'react';

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export interface DataTableComponentProps<T> {
  table: Table<T>;
}

export interface ColumnDefinitionParams<T> {
  id?: string;
  key?: keyof T;
  header?: string | ((props: HeaderContext<T, unknown>) => React.ReactNode);
  isSortable?: boolean;
  isHideable?: boolean;
  cellRenderer?: (context: CellContext<T, unknown>) => React.ReactNode;
}

export const typedMemo: <T>(c: T) => T = React.memo;
