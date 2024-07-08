import { useSession, signIn, signOut } from 'next-auth/react';

interface AuthCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { data: session, status } = useSession();

  const login = async (credentials: AuthCredentials) => {
    const result = await signIn('credentials', {
      redirect: false,
      ...credentials,
    });
  };

  const logout = () => {
    signOut();
  };

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    login,
    logout,
  };
};
