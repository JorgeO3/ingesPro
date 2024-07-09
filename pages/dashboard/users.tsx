import { UserForm } from '@/components/UsersForm';
import { UsersTable } from '@/components/UsersTable';
import { useUsers } from '@/hooks/useUsers';
import type { User } from '@/lib/users';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

const Users = () => {
  const { totalCount, users, pagination, onPaginationChange } = useUsers();

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'email',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'phone',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
    [],
  );
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-semibold text-center my-10">
        User Management System
      </h1>

      {/* Revenue and expenses form */}
      <UserForm />

      {/*  Revenue and expenses table */}
      <div className="flex justify-center">
        <div className="w-full">
          <UsersTable
            data={users}
            rowCount={totalCount}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
