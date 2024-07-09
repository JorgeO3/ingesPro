import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type PaginationState,
  type OnChangeFn,
  type ColumnDef,
} from '@tanstack/react-table';
import type { User } from '@/lib/users';

interface UseUserTableProps {
  data: User[];
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  columns: ColumnDef<User>[];
  rowCount: number;
}

export const useUserTable = (props: UseUserTableProps) => {
  const { data, pagination, onPaginationChange, rowCount, columns } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  return useReactTable({
    data,
    columns,
    rowCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange,
    manualPagination: true,
    autoResetPageIndex: false,
  });
};
