import { UsersProvider } from '@/lib/store/UsersContext';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <UsersProvider>{children}</UsersProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
