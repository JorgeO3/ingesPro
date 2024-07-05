import type { User } from '@/lib/users';
import { Table } from '@/components/ui/table';
import { useUserTable } from '@/hooks/useUserTable';
import { UserTableBody } from '@/components/UserTableBody';
import { UserTableHeader } from '@/components/UserTableHeader';
import { UserTablePagination } from '@/components/UserTablePagination';

interface UserTableProps {
  data: User[];
}

export const UsersTable = ({ data }: UserTableProps) => {
  const table = useUserTable(data);
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
