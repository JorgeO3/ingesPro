'use client';

import { UserForm } from '@/components/UsersForm';
import { UsersTable } from '@/components/UsersTable';
import { UserTableDropdown } from '@/components/UserTableDropdown';
import { useUsers } from '@/hooks/useUsers';
import type { User } from '@/lib/users';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

const Users = () => {
  const { rowCount, users, pagination, onPaginationChange } = useUsers();

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
      {
        id: 'actions',
        enableHiding: false,
        // cell: ({ row }) => <UserTableDropdown2 id={row.original.id} />,
        cell: ({ row }) => <UserTableDropdown id={row.original.id} />,
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
            rowCount={rowCount}
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
