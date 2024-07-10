import type { User } from '@/lib/users';
import { Checkbox } from './ui/checkbox';
import type { ColumnDef, Row, Table } from '@tanstack/react-table';
import { UserTableDropdown } from '@/components/UserTableDropdown';

const selectHeader = (table: Table<User>) => (
  <div className="flex justify-center">
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  </div>
);

const getSelectCell = (row: Row<User>) => (
  <div className="flex justify-center">
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  </div>
);

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-center">ID</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-center">Name</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: () => <div className="text-center">Email</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: 'phone',
    header: () => <div className="text-center">Telefono</div>,
    cell: (info) => (
      <div className="text-center">{String(info.getValue())}</div>
    ),
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => <UserTableDropdown user={row.original} />,
  // },
];
