'use client';

import { useUsers } from '@/hooks/useUsers';
import { Table } from '@/components/ui/table';
import { useUserTable } from '@/hooks/useUserTable';
import { UserTableBody } from '@/components/UserTableBody';
import { UserTableHeader } from '@/components/UserTableHeader';
import { UserTablePagination } from '@/components/UserTablePagination';

export const UsersTable = () => {
  const { error, loading, totalCount, users, pagination, onPaginationChange } =
    useUsers();

  const table = useUserTable({
    setPagination: onPaginationChange,
    data: users,
    pagination,
    rowCount: totalCount,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
