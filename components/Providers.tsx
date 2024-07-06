import { UsersProvider } from '@/lib/store/UsersContext';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apolloClient';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const client = useApollo();
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
};
