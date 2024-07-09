import { UserForm } from '@/components/UsersForm';
import { UsersTable } from '@/components/UsersTable';

const Users = () => {
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
          <UsersTable />
        </div>
      </div>
    </>
  );
};

export default Users;
