import ProtectedRoute from '@/components/ProtectedRoute';

export const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};
