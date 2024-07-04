import ProtectedRoute from '@/components/ProtectedRoute';
import { SideBar } from '@/components/Sidebar';

export const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <div className="flex flex-row w-full h-full">
        <SideBar />
        <main className="flex-grow p-4 box-border bg-background overflow-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};
