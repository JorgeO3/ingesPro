import { UserForm } from '@/components/UsersForm';
import { UsersTable } from '@/components/UsersTable';
import { useUsers } from '@/hooks/useUsers';
import { useSession } from 'next-auth/react';

const Users = () => {
  const { users } = useUsers();
  const session = useSession();
  console.log({ session });
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
          <UsersTable data={users} />
        </div>
      </div>

      {/* Total */}
      <div className="text-right">
        <span className="text-lg font-medium text-muted-foreground">
          Total:{' '}
        </span>
        <span className="text-lg font-bold text-foreground">$45.000.000</span>
      </div>
    </>
  );
};

export default Users;
