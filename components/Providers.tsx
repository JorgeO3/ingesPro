import { UsersProvider } from '@/lib/store/UsersContext';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apolloClient';
import type { Session } from 'next-auth';

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

const InnerProviders = ({ children }: { children: React.ReactNode }) => {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <UsersProvider>{children}</UsersProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <InnerProviders>{children}</InnerProviders>
    </SessionProvider>
  );
};
