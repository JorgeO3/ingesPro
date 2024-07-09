import { useMemo, useState } from 'react';
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
} from '@tanstack/react-table';
import { columns as rawColumns } from '@/components/UserTableColumns';
import type { User } from '@/lib/users';

interface UseUserTableProps {
  data: User[];
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  rowCount: number;
}

export const useUserTable = (props: UseUserTableProps) => {
  const { data, pagination, setPagination, rowCount } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo(() => rawColumns, []);

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
    onPaginationChange: setPagination,
    manualPagination: true,
    autoResetPageIndex: false,
  });
};
