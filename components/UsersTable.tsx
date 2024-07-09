import { Table } from '@/components/ui/table';
import type { User } from '@/lib/users';
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
} from '@tanstack/react-table';

import { useUserTable } from '@/hooks/useUserTable';
import { UserTableHeader } from '@/components/UserTableHeader';
import { UserTableBody } from './UserTableBody';
import { UserTablePagination } from './UserTablePagination';

interface UsersTableProps {
  data: User[];
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  rowCount: number;
  columns: ColumnDef<User>[];
}

export const UsersTable = (props: UsersTableProps) => {
  const table = useUserTable(props);
  return (
    <div className="flex flex-col">
      <div className="rounded-md border">
        <Table>
          <UserTableHeader table={table} />
          <UserTableBody table={table} />
        </Table>
      </div>
      <UserTablePagination table={table} />
    </div>
  );
};
