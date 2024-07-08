import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = Readonly<{
  children: React.ReactNode;
  redirectTo?: string;
}>;

const ProtectedRoute = ({ children, redirectTo = '/auth/login' }: Props) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
      } else {
        setIsReady(true);
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading || !isReady) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
