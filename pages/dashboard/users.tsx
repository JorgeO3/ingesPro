import { DebugTable } from '@/components/DebugTable';
import { UserForm } from '@/components/UsersForm';
import { useUsers } from '@/hooks/useUsers';
import { makeData, type Person } from '@/lib/makeData';
import type { ColumnDef } from '@tanstack/react-table';
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Users = () => {
  const { error, loading, totalCount, users, pagination, onPaginationChange } =
    useUsers();
  const columns = React.useMemo<ColumnDef<User>[]>(
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
          <DebugTable
            data={users}
            columns={columns}
            pagination={pagination}
            rowCount={totalCount}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
